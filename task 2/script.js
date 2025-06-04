const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const typingIndicator = document.getElementById("typingIndicator");

// Knowledge base with patterns and multiple replies
const knowledgeBase = [
  {
    pattern: /price|cost|quote|renovation/i,
    replies: [
      "For 1BHK home renovation, prices start at ₹5 lakhs. 🏠",
      "2BHK renovations typically cost around ₹8-12 lakhs depending on scope.",
      "3BHK renovations usually range between ₹12-18 lakhs, tailored to your needs.",
      "Contact us for a customized quote based on your project's specifics!"
    ]
  },
  {
    pattern: /1bhk/i,
    replies: [
      "A 1BHK project typically takes 2-4 months to complete depending on complexity.",
      "For 1BHK renovations, expect around 2-4 months duration."
    ]
  },
  {
    pattern: /2bhk/i,
    replies: [
      "A 2BHK project usually completes within 4-6 months.",
      "2BHK home renovations take approximately 4-6 months."
    ]
  },
  {
    pattern: /3bhk/i,
    replies: [
      "3BHK home projects generally take 6-9 months to finish.",
      "Expect 6-9 months for a complete 3BHK home renovation."
    ]
  },
  {
    pattern: /time|duration|how long/i,
    replies: [
      "Typical construction or renovation projects take between 3 to 9 months depending on size.",
      "Duration varies by project type, but we keep you updated every step of the way!"
    ]
  },
  {
    pattern: /builder profile|profile of builder|about builder/i,
    replies: [
      "Our builder is Aditya Tata, known for quality and timely delivery. 🏗️",
      "Aditya Tata leads our projects with years of experience in residential and commercial construction.",
      "Builder Profile: Aditya Tata, dedicated to building your dream home with excellence."
    ]
  },
  {
    pattern: /services|work|projects/i,
    replies: [
      "We specialize in residential homes including 1BHK, 2BHK, 3BHK renovations and new builds.",
      "From small renovations to large constructions, we handle all your building needs!",
      "Our services cover home construction, renovations, commercial buildings, and more."
    ]
  },
  {
    pattern: /hello|hi|hey|good morning|good afternoon/i,
    replies: [
      "Hello! How can I assist you with your building or renovation project today? 😊",
      "Hi there! Ready to discuss your dream home? Ask me anything!",
      "Hey! What can I help you build today?"
    ]
  },
  {
    pattern: /thank/i,
    replies: [
      "You're very welcome! Let me know if you have more questions! 🙌",
      "Glad to help! Reach out anytime for your building needs.",
      "Anytime! Happy to assist with your projects."
    ]
  }
];

// Utility: pick random reply
function getRandomReply(replies) {
  return replies[Math.floor(Math.random() * replies.length)];
}

// Add message bubble
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", sender);
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    bubble.style.opacity = "1";
    bubble.style.transform = "translateY(0)";
  }, 10);
}

// Show typing indicator with dynamic delay
function showTypingIndicatorDynamic(message) {
  typingIndicator.style.display = "block";
  const delay = Math.min(Math.max(message.length * 50, 500), 2000);

  return new Promise(resolve => setTimeout(() => {
    typingIndicator.style.display = "none";
    resolve();
  }, delay));
}

// Get reply based on message
function getReply(message) {
  message = message.toLowerCase();

  for (const entry of knowledgeBase) {
    if (entry.pattern.test(message)) {
      return getRandomReply(entry.replies);
    }
  }
  return "I'm here to help with your building projects! Could you please rephrase or ask about something else?";
}

// Handle input enter
chatInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const msg = chatInput.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    chatInput.value = "";

    const botReply = getReply(msg);

    await showTypingIndicatorDynamic(botReply);

    addMessage(botReply, "bot");
  }
});