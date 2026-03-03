"use client";
import "./styles.scss";
import { useState } from "react";
import {
  checkMessageLength,
  checkForForbiddenLetters,
  checkForKeywords,
  getRandomResponse,
  convertToSpeechImpairment,
} from "../../utils/messageProcessor";

export default function Chat({ setStatusStudent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    let status = "normal";
    let response = null;

    // Zabezpieczamy aktualną treść i od razu czyścimy input
    const messageToSend = input;
    setInput("");

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);

    // 1️⃣ Sprawdzenie długości wiadomości
    if (checkMessageLength(messageToSend)) {
      status = "basic";
      response = getRandomResponse("basic");
    }

    // 2️⃣ Sprawdzenie litery "r"
    if (!response && checkForForbiddenLetters(messageToSend)) {
      status = "angry";
      response = getRandomResponse("angry");
    }

    // 3️⃣ Sprawdzenie słowa kluczowego (Mika)
    if (!response && checkForKeywords(messageToSend)) {
      status = "happy";
    }

    setStatusStudent(status);

    if (response) {
      const botMessage = {
        role: "assistant",
        content: convertToSpeechImpairment(response),
      };
      setMessages((prev) => [...prev, botMessage]);
      // WAŻNE: Dodajemy lokalną odpowiedź do historii, żeby model AI nie gubił wątku!
      setHistory((prev) => [...prev, userMessage, botMessage]);
      return;
    }

    // 4️⃣ Dodajemy loader do czatu (tylko raz!)
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    // 5️⃣ Wysyłanie wiadomości do API
    try {
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, history }),
      });

      if (!apiResponse.ok) {
        throw new Error("Błąd sieci lub serwera");
      }

      const data = await apiResponse.json();

      // POPRAWKA: Czytamy data.message zamiast data.response!
      const botMessage = {
        role: "assistant",
        content: convertToSpeechImpairment(data.message),
      };

      // 6️⃣ Zamieniamy loader na prawdziwą wiadomość
      setMessages((prev) => [...prev.slice(0, -1), botMessage]);

      // Zapisujemy w historii
      setHistory((prev) => [...prev, userMessage, botMessage]);
    } catch (error) {
      console.error("Błąd podczas komunikacji z API:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "Przepraszam, mam problem z połączeniem...",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content === "..." ? (
              <span className="loader">Czekam na odpowiedź...</span>
            ) : (
              msg.content
            )}
          </div>
        ))}
      </div>
      <div className="interface">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="interface__input"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="interface__button"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Wyślij"}
        </button>
      </div>
    </div>
  );
}
