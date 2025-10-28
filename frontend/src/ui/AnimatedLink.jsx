import { useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

function AnimatedLink({ text, className = "", hoverTriggerRef = null }) {
  const linkTextRef = useRef(null);
  const linkHoverRef = useRef(null);
  const linkTextSplit = useRef(null);
  const linkHoverSplit = useRef(null);
  const defaultWrapperRef = useRef(null);
  const isHovered = useRef(false);

  // Check if device has hover capability (desktop/laptop with mouse)
  const hasHover = useMediaQuery({
    query: "(hover: hover) and (pointer: fine)",
  });

  useGSAP(() => {
    if (!hasHover || !linkTextRef.current || !linkHoverRef.current) return;

    linkTextSplit.current = new SplitText(linkTextRef.current, {
      type: "chars",
      charsClass: "char",
    });
    linkHoverSplit.current = new SplitText(linkHoverRef.current, {
      type: "chars",
      charsClass: "char",
    });

    // Ensure each character maintains its spacing
    [...linkTextSplit.current.chars, ...linkHoverSplit.current.chars].forEach(
      (char) => {
        char.style.display = "inline-block";
      },
    );

    return () => {
      linkTextSplit.current.revert();
      linkHoverSplit.current.revert();
    };
  }, [hasHover]);

  const handleMouseEnter = useCallback(() => {
    if (
      !hasHover ||
      !linkTextSplit.current ||
      !linkHoverSplit.current ||
      isHovered.current
    )
      return;

    isHovered.current = true;
    const chars = linkTextSplit.current.chars.length;
    const totalDuration = 0.3;
    const staggerTime = totalDuration / (chars + 5);

    // Kill any existing animations on these elements
    gsap.killTweensOf([
      ...linkTextSplit.current.chars,
      ...linkHoverSplit.current.chars,
    ]);

    // Animate to hover state
    linkTextSplit.current.chars.forEach((char, index) => {
      gsap.to(char, {
        yPercent: -100,
        duration: totalDuration,
        ease: "circ",
        delay: index * staggerTime,
      });
    });

    linkHoverSplit.current.chars.forEach((char, index) => {
      gsap.to(char, {
        yPercent: -100,
        duration: totalDuration,
        ease: "circ",
        delay: index * staggerTime,
      });
    });
  }, [hasHover]);

  const handleMouseLeave = useCallback(() => {
    if (
      !hasHover ||
      !linkTextSplit.current ||
      !linkHoverSplit.current ||
      !isHovered.current
    )
      return;

    isHovered.current = false;
    const chars = linkTextSplit.current.chars.length;
    const totalDuration = 0.3;
    const staggerTime = totalDuration / (chars + 5);

    // Kill any existing animations on these elements
    gsap.killTweensOf([
      ...linkTextSplit.current.chars,
      ...linkHoverSplit.current.chars,
    ]);

    // Animate back to normal state
    linkTextSplit.current.chars.forEach((char, index) => {
      gsap.to(char, {
        yPercent: 0,
        duration: totalDuration,
        ease: "circ",
        delay: index * staggerTime,
      });
    });

    linkHoverSplit.current.chars.forEach((char, index) => {
      gsap.to(char, {
        yPercent: 0,
        duration: totalDuration,
        ease: "circ",
        delay: index * staggerTime,
      });
    });
  }, [hasHover]);

  useEffect(() => {
    if (!hasHover) return;

    const triggerElement =
      hoverTriggerRef?.current || defaultWrapperRef.current;

    if (triggerElement) {
      triggerElement.addEventListener("mouseenter", handleMouseEnter);
      triggerElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        triggerElement.removeEventListener("mouseenter", handleMouseEnter);
        triggerElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [hasHover, hoverTriggerRef, handleMouseEnter, handleMouseLeave]);

  // If touch device, render simple text without animation
  if (!hasHover) {
    return (
      <div className={className}>
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div className={className} ref={defaultWrapperRef}>
      <div className="navigation__link">
        <span
          className="navigation__link-text"
          ref={linkTextRef}
          style={{ display: "inline-block" }}
        >
          {text}
        </span>
        <span
          className="navigation__link-hover"
          ref={linkHoverRef}
          style={{ display: "inline-block" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export default AnimatedLink;
