// import openai from "openai";

// const api = new openai.OpenAI({
//   apiKey: "xxx", // Klucz API w .env
//   // baseURL: 'http://localhost:1234/v1', // Adres lokalnego modelu
//   baseURL: "http://127.0.0.1:1234", // Adres lokalnego modelu
// });

// export async function getLLMResponse(message, history) {
//   const messages = [...history, { role: "user", content: message }];

//   const completion = await api.chat.completions.create({
//     // model: 'bielik-11b-v2.3-instruct',
//     model: "bielik-4.5b-v3.0-instruct",
//     messages,
//     max_tokens: 300,
//   });

//   return completion.choices[0].message.content;
// }

// Nie potrzebujemy już importować biblioteki "openai"

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicjalizacja klienta poza funkcją POST
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MUSI się nazywać POST
export async function POST(request) {
  try {
    // 1. Odbieramy dane (body) wysłane z Twojego frontendu
    const body = await request.json();
    const { message, history } = body;

    // Upewniamy się, że wiadomość została przekazana
    if (!message) {
      return NextResponse.json({ error: "Brak wiadomości" }, { status: 400 });
    }

    // 2. Inicjalizacja modelu Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Formatowanie historii pod wymogi Gemini (role: 'user' lub 'model')
    const formattedHistory =
      history && history.length > 0
        ? history.map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          }))
        : [];

    // 4. Tworzymy instancję czatu z historią
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    // 5. Wysyłamy nową wiadomość do modelu
    const result = await chat.sendMessage(message);
    const textText = result.response.text();

    // 6. Zwracamy odpowiedź do frontendu w formacie JSON
    // UWAGA: sprawdź w swoim frontendzie, czy oczekujesz klucza "message", "reply", czy czegoś innego
    return NextResponse.json({ message: textText });
  } catch (error) {
    console.error("Błąd podczas odpytywania Google AI Studio:", error);
    return NextResponse.json(
      {
        error:
          "Przepraszam, wystąpił problem z połączeniem z usługą Google AI.",
      },
      { status: 500 },
    );
  }
}
