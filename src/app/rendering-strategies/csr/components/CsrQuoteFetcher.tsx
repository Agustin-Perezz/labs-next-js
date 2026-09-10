"use client";

import { useEffect, useState } from "react";

import { CsrQuoteView, type FetchState } from "./CsrQuoteView";

const ZEN_API_URL = "https://api.github.com/zen";
const FETCH_ERROR_MESSAGE = "Could not load the quote right now.";

export function CsrQuoteFetcher() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchQuote() {
      try {
        const response = await fetch(ZEN_API_URL, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const quote = await response.text();
        setState({ status: "success", quote });
      } catch (_error) {
        if (controller.signal.aborted) {
          return;
        }
        setState({ status: "error", message: FETCH_ERROR_MESSAGE });
      }
    }

    fetchQuote();

    return () => {
      controller.abort();
    };
  }, []);

  return <CsrQuoteView state={state} />;
}
