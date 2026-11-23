// The "brain" of the bot. Right now it's a simple rule-based mock so the
// project runs with zero setup and no API keys.
//
// Later you can replace the body of getBotReply with a real API call
// (see README "Next steps"). Because App.jsx only cares that this function
// returns a Promise<string>, nothing else in the UI has to change.

const RULES = [
  { match: /\b(hi|hello|hey)\b/i, reply: 'Hello! 👋 How can I help you today?' },
  {
    match: /\bhelp\b/i,
    reply: "Try asking me: 'what is react', 'what is state', 'what are props', 'tell me a joke', or 'what time is it'.",
  },
  {
    match: /what is react/i,
    reply: 'React is a JavaScript library for building user interfaces out of reusable pieces called components.',
  },
  {
    match: /what (is|are) state/i,
    reply: 'State is data a component remembers between renders. When it changes (via a setter like setMessages), React re-renders.',
  },
  {
    match: /what (is|are) props/i,
    reply: 'Props are inputs passed from a parent component to a child, like arguments to a function. They are read-only.',
  },
  {
    match: /joke/i,
    reply: 'Why do React developers love hooks? Because classes were too much of a commitment. 🎣',
  },
  {
    match: /time/i,
    reply: () => `It's ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
  },
  { match: /\b(thanks|thank you)\b/i, reply: "You're welcome! 😊" },
];

// A tiny helper that waits `ms` milliseconds — simulates network delay
// so you can see the typing indicator.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getBotReply(userText) {
  await wait(600 + Math.random() * 800);

  const rule = RULES.find((r) => r.match.test(userText));
  if (rule) {
    return typeof rule.reply === 'function' ? rule.reply() : rule.reply;
  }
  return `You said: "${userText}". I'm a demo bot — type 'help' to see what I know.`;
}
