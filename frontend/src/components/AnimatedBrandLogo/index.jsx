import { useEffect, useRef, useState } from "react";
import { useThemeContext } from "@/ThemeContext";
import AnimatedLogoDark from "@/media/animations/logo-animated-dark.svg";
import AnimatedLogoLight from "@/media/animations/logo-animated-light.svg";

const ANIMATION_DURATION_MS = 4000;
const consumedAnimationKeys = new Set();

export default function AnimatedBrandLogo({
  staticSrc,
  isCustomLogo,
  alt,
  className,
  shouldAnimate = false,
  animationKey = null,
}) {
  const { resolvedTheme = "dark" } = useThemeContext() ?? {};
  const [animatedSrc] = useState(() =>
    resolvedTheme === "light" ? AnimatedLogoLight : AnimatedLogoDark
  );
  const hasMountedRef = useRef(false);
  const previousStaticSrcRef = useRef(staticSrc);
  const [showAnimatedLogo, setShowAnimatedLogo] = useState(
    shouldAnimate && !isCustomLogo
  );

  useEffect(() => {
    if (hasMountedRef.current) {
      setShowAnimatedLogo(false);
      return;
    }

    hasMountedRef.current = true;
    if (
      isCustomLogo ||
      !shouldAnimate ||
      (animationKey && consumedAnimationKeys.has(animationKey))
    ) {
      setShowAnimatedLogo(false);
      return;
    }

    if (animationKey) consumedAnimationKeys.add(animationKey);

    const timeoutId = window.setTimeout(() => {
      setShowAnimatedLogo(false);
    }, ANIMATION_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [animationKey, isCustomLogo, shouldAnimate]);

  useEffect(() => {
    if (!hasMountedRef.current) return;
    if (previousStaticSrcRef.current === staticSrc) return;

    previousStaticSrcRef.current = staticSrc;
    setShowAnimatedLogo(false);
  }, [staticSrc]);

  return (
    <img
      src={showAnimatedLogo ? animatedSrc : staticSrc}
      alt={alt}
      className={className}
    />
  );
}
