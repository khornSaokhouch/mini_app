"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  theme?: "light" | "dark" | "auto";
  onVerify?: (token: string) => void;
}

export interface TurnstileHandle {
  reset: () => void;
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(
  function Turnstile({ siteKey, theme = "light", onVerify }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch (e) {}
        }
      },
    }));

    // Always call this hook unconditionally
    useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.log("[Turnstile] Dev mode: Bypassing widget.");
        onVerify?.('dev-mock-token');
      }
    }, [onVerify]);

    // Conditional return is allowed after all hooks are called
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div className="flex justify-center items-center p-2 border border-dashed rounded bg-muted/50 text-xs text-muted-foreground my-2">
          Turnstile (Bypassed)
        </div>
      );
    }

    // Normal Turnstile initialization useEffect
    useEffect(() => {
      let active = true;

      const renderWidget = () => {
        if (!window.turnstile || !containerRef.current || !active) return;
        
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {}
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: theme,
          callback: (token: string) => {
            if (onVerify) onVerify(token);
          },
        });
      };

      if (window.turnstile) {
        renderWidget();
      } else {
        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 100);

        return () => {
          clearInterval(checkInterval);
          active = false;
          if (widgetIdRef.current && window.turnstile) {
            try { window.turnstile.remove(widgetIdRef.current); } catch (e) {}
          }
        };
      }

      return () => {
        active = false;
        if (widgetIdRef.current && window.turnstile) {
          try { window.turnstile.remove(widgetIdRef.current); } catch (e) {}
        }
      };
    }, [siteKey, theme, onVerify]);

    return <div ref={containerRef} className="flex justify-center min-h-[65px]" />;
  }
);

export default Turnstile;
