import unittest

from deploy.hetzner.scripts.verify_stripe_webhook import (
    REQUIRED_EVENTS,
    expected_webhook_url,
    validate_webhook_endpoints,
)


class ExpectedWebhookUrlTests(unittest.TestCase):
    def test_uses_billing_app_base_url_origin_when_available(self):
        self.assertEqual(
            expected_webhook_url(
                domain="app.lovora.no",
                billing_app_base_url="https://app.lovora.no/settings/system/billing",
            ),
            "https://app.lovora.no/api/billing/stripe/webhook",
        )

    def test_falls_back_to_domain_when_base_url_missing(self):
        self.assertEqual(
            expected_webhook_url(domain="app.lovora.no"),
            "https://app.lovora.no/api/billing/stripe/webhook",
        )


class ValidateWebhookEndpointsTests(unittest.TestCase):
    def test_accepts_enabled_matching_endpoint_with_required_events(self):
        endpoints = [
            {
                "url": "https://app.lovora.no/api/billing/stripe/webhook",
                "status": "enabled",
                "enabled_events": list(REQUIRED_EVENTS),
                "livemode": False,
            }
        ]

        validate_webhook_endpoints(
            endpoints=endpoints,
            webhook_url="https://app.lovora.no/api/billing/stripe/webhook",
            livemode=False,
        )

    def test_rejects_missing_endpoint(self):
        with self.assertRaisesRegex(ValueError, "No Stripe webhook endpoint found"):
            validate_webhook_endpoints(
                endpoints=[],
                webhook_url="https://app.lovora.no/api/billing/stripe/webhook",
                livemode=False,
            )

    def test_rejects_endpoint_missing_required_events(self):
        endpoints = [
            {
                "url": "https://app.lovora.no/api/billing/stripe/webhook",
                "status": "enabled",
                "enabled_events": ["checkout.session.completed"],
                "livemode": False,
            }
        ]

        with self.assertRaisesRegex(ValueError, "missing required events"):
            validate_webhook_endpoints(
                endpoints=endpoints,
                webhook_url="https://app.lovora.no/api/billing/stripe/webhook",
                livemode=False,
            )

    def test_rejects_livemode_mismatch(self):
        endpoints = [
            {
                "url": "https://app.lovora.no/api/billing/stripe/webhook",
                "status": "enabled",
                "enabled_events": list(REQUIRED_EVENTS),
                "livemode": True,
            }
        ]

        with self.assertRaisesRegex(ValueError, "livemode mismatch"):
            validate_webhook_endpoints(
                endpoints=endpoints,
                webhook_url="https://app.lovora.no/api/billing/stripe/webhook",
                livemode=False,
            )

    def test_accepts_any_valid_duplicate_endpoint(self):
        endpoints = [
            {
                "url": "https://app.lovora.no/api/billing/stripe/webhook",
                "status": "enabled",
                "enabled_events": ["checkout.session.completed"],
                "livemode": False,
            },
            {
                "url": "https://app.lovora.no/api/billing/stripe/webhook",
                "status": "enabled",
                "enabled_events": list(REQUIRED_EVENTS),
                "livemode": False,
            },
        ]

        validate_webhook_endpoints(
            endpoints=endpoints,
            webhook_url="https://app.lovora.no/api/billing/stripe/webhook",
            livemode=False,
        )


if __name__ == "__main__":
    unittest.main()
