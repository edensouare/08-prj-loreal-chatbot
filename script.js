// Public Cloudflare endpoint for the chatbot.
const WORKER_URL = "https://loreal-worker.eden-souare.workers.dev/";
const SYSTEM_PROMPT = `You are Beauty Advisor, an independent product-discovery concept. Focus on L’Oréal Paris makeup, skincare, hair care, and hair fragrance. Ask one brief follow-up when the user's preferences are unclear. Give practical, inclusive advice that considers the user's budget and goals when relevant. Distinguish product types accurately, such as serums and moisturizers. Avoid inventing products, prices, availability, ingredient claims, or links. When unsure, recommend a product type and suggest verifying details with the official catalog or product label. Avoid medical advice and never solicit sensitive information. Politely redirect unrelated requests. Use plain text with short paragraphs or numbered steps.`;
const CONTEXT_TURNS = 6;

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");
const chatStatus = document.getElementById("status");
const clearChat = document.getElementById("clearChat");
const suggestions = document.querySelectorAll(".suggestions button");
const recommended = document.querySelectorAll(".recommended button");
const promptButtons = [...suggestions, ...recommended];

// Store completed turns in this page only. The welcome message stays out of API requests.
let history = [];
let waiting = false;

function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = role === "user" ? "msg user" : "msg ai";

  const speaker = document.createElement("strong");
  speaker.textContent = role === "user" ? "You" : "Beauty Advisor";

  const message = document.createElement("p");
  message.textContent = role === "assistant" ? text.replaceAll("**", "") : text;
  bubble.append(speaker, message);
  chatWindow.append(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

function resetChat() {
  history = [];
  chatWindow.replaceChildren();
  userInput.value = "";
  chatStatus.textContent = "";
  addMessage("assistant", "What would you like help with? Choose a topic, try a suggested question, or ask me anything about L’Oréal Paris products.");
}

clearChat.addEventListener("click", () => {
  resetChat();
  userInput.focus();
});

// Starter questions go into the input so you can edit them before sending.
for (const button of suggestions) {
  button.addEventListener("click", () => {
    userInput.value = button.dataset.question;
    userInput.focus();
  });
}

// Recommended questions send immediately and keep any draft in the input.
for (const button of recommended) {
  button.addEventListener("click", () => {
    sendQuestion(button.textContent.trim(), button);
  });
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendQuestion(userInput.value.trim());
});

async function sendQuestion(question, questionButton) {
  if (!question || waiting) return;

  const userMessage = { role: "user", content: question };
  const questionBubble = addMessage("user", question);
  if (!questionButton) userInput.value = "";
  waiting = true;
  userInput.readOnly = true;
  sendBtn.disabled = true;
  clearChat.disabled = true;
  for (const button of promptButtons) button.disabled = true;
  chatStatus.textContent = "Beauty Advisor is replying…";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history, userMessage],
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) throw new Error(`Worker returned ${response.status}`);
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("Empty reply");

    addMessage("assistant", reply);
    history = [...history, userMessage, { role: "assistant", content: reply }].slice(-2 * CONTEXT_TURNS);
    chatStatus.textContent = "";
  } catch {
    questionBubble.remove();
    if (questionButton) {
      chatStatus.textContent = "The advisor couldn’t reply. Select the question again to retry.";
    } else {
      userInput.value = question;
      chatStatus.textContent = "The advisor couldn’t reply. Your question is back in the field so you can try again.";
    }
  } finally {
    waiting = false;
    userInput.readOnly = false;
    sendBtn.disabled = false;
    clearChat.disabled = false;
    for (const button of promptButtons) button.disabled = false;
    if (questionButton) questionButton.focus();
    else userInput.focus();
  }
}

resetChat();
