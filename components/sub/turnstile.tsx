"use client";

import { useEffect, useRef } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export const Turnstile = ({ siteKey, onVerify, onExpire }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set callback references in the global scope
    const verifyCallbackName = `onTurnstileVerify_${siteKey.replace(/[^a-zA-Z0-9]/g, "")}`;
    const expireCallbackName = `onTurnstileExpire_${siteKey.replace(/[^a-zA-Z0-9]/g, "")}`;

    (window as any)[verifyCallbackName] = (token: string) => {
      onVerify(token);
    };

    if (onExpire) {
      (window as any)[expireCallbackName] = () => {
        onExpire();
      };
    }

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

    const renderWidget = () => {
      if ((window as any).turnstile && containerRef.current) {
        try {
          widgetId = (window as any).turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: verifyCallbackName,
            "expired-callback": expireCallbackName,
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
      // Clean up callbacks and rendered widget
      delete (window as any)[verifyCallbackName];
      delete (window as any)[expireCallbackName];
      if (widgetId && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetId);
        } catch (e) {
          // ignore
        }
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [siteKey, onVerify, onExpire]);

  return <div ref={containerRef} className="my-2 min-h-[65px]" />;
};
