#!/usr/bin/env python3
import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


REQUIRED_EVENTS = (
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
)


def expected_webhook_url(domain="", billing_app_base_url=""):
    billing_app_base_url = str(billing_app_base_url or "").strip()
    if billing_app_base_url:
        parsed = urllib.parse.urlparse(billing_app_base_url)
        if parsed.scheme and parsed.netloc:
            return f"{parsed.scheme}://{parsed.netloc}/api/billing/stripe/webhook"

    domain = str(domain or "").strip()
    if not domain:
        raise ValueError(
            "DOMAIN or BILLING_APP_BASE_URL is required for Stripe webhook validation."
        )
    return f"https://{domain}/api/billing/stripe/webhook"


def stripe_livemode_from_key(secret_key):
    secret_key = str(secret_key or "").strip()
    if secret_key.startswith("sk_live_"):
        return True
    if secret_key.startswith("sk_test_"):
        return False
    raise ValueError("STRIPE_SECRET_KEY must start with sk_test_ or sk_live_.")


def validate_webhook_endpoints(endpoints, webhook_url, livemode):
    matches = [endpoint for endpoint in endpoints if endpoint.get("url") == webhook_url]
    if not matches:
        raise ValueError(
            f"No Stripe webhook endpoint found for {webhook_url}. "
            "Create it in Stripe before deploying billing changes."
        )

    enabled_matches = [
        endpoint
        for endpoint in matches
        if str(endpoint.get("status", "")).lower() == "enabled"
    ]
    if not enabled_matches:
        raise ValueError(f"Stripe webhook endpoint for {webhook_url} exists but is not enabled.")

    failures = []
    for endpoint in enabled_matches:
        endpoint_livemode = bool(endpoint.get("livemode"))
        if endpoint_livemode != livemode:
            failures.append(
                f"Stripe webhook endpoint for {webhook_url} has livemode mismatch. "
                f"Expected {livemode}, got {endpoint_livemode}."
            )
            continue

        enabled_events = set(endpoint.get("enabled_events") or [])
        missing_events = [event for event in REQUIRED_EVENTS if event not in enabled_events]
        if missing_events:
            failures.append(
                f"Stripe webhook endpoint for {webhook_url} is missing required events: "
                f"{', '.join(missing_events)}."
            )
            continue

        return True

    raise ValueError(failures[0])


def fetch_webhook_endpoints(secret_key):
    auth = base64.b64encode(f"{secret_key}:".encode("utf-8")).decode("ascii")
    request = urllib.request.Request(
        "https://api.stripe.com/v1/webhook_endpoints?limit=100",
        headers={"Authorization": f"Basic {auth}"},
        method="GET",
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return payload.get("data", [])


def main():
    secret_key = os.getenv("STRIPE_SECRET_KEY", "").strip()
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "").strip()
    if not secret_key and not webhook_secret:
        print("Stripe webhook validation skipped: billing webhook secrets are not configured.")
        return 0

    if not secret_key or not webhook_secret:
        raise ValueError(
            "Both STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET must be set together "
            "to validate Stripe webhook configuration."
        )

    webhook_url = expected_webhook_url(
        domain=os.getenv("DOMAIN", ""),
        billing_app_base_url=os.getenv("BILLING_APP_BASE_URL", ""),
    )
    livemode = stripe_livemode_from_key(secret_key)
    endpoints = fetch_webhook_endpoints(secret_key)
    validate_webhook_endpoints(
        endpoints=endpoints,
        webhook_url=webhook_url,
        livemode=livemode,
    )
    print(f"Stripe webhook validation OK for {webhook_url}.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        print(
            f"Stripe webhook validation failed with HTTP {error.code}: {detail}",
            file=sys.stderr,
        )
        raise SystemExit(1)
    except Exception as error:
        print(f"Stripe webhook validation failed: {error}", file=sys.stderr)
        raise SystemExit(1)
