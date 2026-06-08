"use client";

import { useEffect, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export const Turnstile = ({ siteKey, onVerify, onExpire }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use refs to prevent re-triggering the useEffect and re-rendering the iframe on state changes
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  // Keep callback refs updated with the latest props
  useEffect(() => {
    onVerifyRef.current = onVerify;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load dynamic challenges script if not present
    if (!document.getElementById("cloudflare-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    let widgetId: string | null = null;
    const currentContainer = containerRef.current;

    const renderWidget = () => {
      if ((window as any).turnstile && containerRef.current) {
        try {
          widgetId = (window as any).turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerifyRef.current(token);
            },
            "expired-callback": () => {
              if (onExpireRef.current) {
                onExpireRef.current();
              }
            },
            theme: "dark",
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      } else {
        setTimeout(renderWidget, 100);
      }
    };

    renderWidget();

    return () => {
      // Clean up rendered widget
      if (widgetId && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetId);
        } catch (e) {
          // ignore
        }
      }
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [siteKey]); // Only re-run if siteKey changes

  return <div ref={containerRef} className="my-2 min-h-[65px]" />;
};
