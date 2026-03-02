"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { CopilotMessage, CopilotContext } from "@/lib/brain-types";

/**
 * Hook for the AI Copilot connected to Brain LLM via tRPC (HTTP).
 * Communicates through /api/copilot API route (server-side proxy).
 */
export function useCopilotAI(context?: CopilotContext) {
    const [messages, setMessages] = useState<CopilotMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const contextRef = useRef(context);

    // Keep context ref updated
    useEffect(() => {
        contextRef.current = context;
    }, [context]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return;

        // Abort previous request if any
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        // Add user message
        const userMessage: CopilotMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content: content.trim(),
            timestamp: new Date().toISOString(),
            isComplete: true,
        };

        // Add placeholder assistant message
        const assistantMessage: CopilotMessage = {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: "",
            timestamp: new Date().toISOString(),
            isComplete: false,
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/copilot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content.trim(),
                    context: contextRef.current,
                }),
                signal: controller.signal,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al contactar el copilot");
            }

            // Update assistant message with response
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMessage.id
                        ? {
                            ...msg,
                            content: data.response || "Sin respuesta",
                            isComplete: true,
                        }
                        : msg
                )
            );
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") return;

            const errorMsg = err instanceof Error ? err.message : "Error desconocido";
            setError(errorMsg);

            // Update assistant message with error
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMessage.id
                        ? {
                            ...msg,
                            content: `⚠️ ${errorMsg}`,
                            isComplete: true,
                        }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return {
        messages,
        sendMessage,
        clearMessages,
        isLoading,
        error,
    };
}
