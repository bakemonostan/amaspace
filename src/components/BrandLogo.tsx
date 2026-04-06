import { useState } from "react";

const LOGO_ICON = "/amaspace-logo-icon.jpeg";
const LOGO_FULL = "/amaspace-logo-full.jpeg";

type BrandLogoProps = {
  /** `mark` = square icon; `full` = horizontal wordmark image */
  variant?: "mark" | "full";
  /** Used only for the broken-image fallback on dark backgrounds (not applied to the JPEG — filters would wash it out). */
  invertOnDark?: boolean;
  className?: string;
};

export function BrandLogo({ variant = "mark", invertOnDark = false, className = "" }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = variant === "full" ? LOGO_FULL : LOGO_ICON;

  if (failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-md font-heading text-lg font-bold ${
          invertOnDark
            ? variant === "mark"
              ? "h-9 w-9 bg-white/15 text-white"
              : "h-8 min-w-[100px] bg-white/15 px-2 text-sm text-white"
            : variant === "mark"
              ? "h-9 w-9 bg-navy text-white"
              : "h-8 min-w-[100px] bg-navy px-2 text-sm text-white"
        } ${className}`}
        aria-hidden
      >
        A
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={variant === "mark" ? 36 : 200}
      height={variant === "mark" ? 36 : 48}
      className={`shrink-0 object-contain ${
        variant === "mark" ? "h-9 w-9 rounded-md bg-white" : "h-8 w-auto max-w-[200px] md:h-9"
      } ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
