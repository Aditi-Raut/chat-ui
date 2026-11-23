// App is the "parent" component. It OWNS the chat data (state) and passes
// pieces of it down to child components through PROPS.
import { useState, useEffect } from 'react';
import ChatHeader from './components/ChatHeader.jsx';
import MessageList from './components/MessageList.jsx';
import ChatInput from './components/ChatInput.jsx';
import { getBotReply } from './botReply.js';

const STORAGE_KEY = 'chatbot-ui-messages';

const WELCOME = {
  id: 'welcome',
  role: 'bot',
  text: "Hi! I'm your assistant. Ask me anything, or type 'help'.",
  time: Date.now(),
};

// Read saved messages from the browser so the chat survives a page refresh.
function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

export default function App() {
  // useState returns [currentValue, functionToChangeIt].
  // Changing state makes React re-render the component with the new value.
  // Passing a function (loadMessages) means it only runs once, on first render.
  const [messages, setMessages] = useState(loadMessages);
  const [isTyping, setIsTyping] = useState(false);

  // useEffect runs AFTER render. The [messages] array means:
  // "run this again whenever `messages` changes". Here we save to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage might be blocked (private mode) — the app still works */
    }
  }, [messages]);

  // Called by ChatInput when the user sends a message.
  async function handleSend(text) {
    const userMsg = { id: crypto.randomUUID(), role: 'user', text, time: Date.now() };

    // Never mutate state directly (no messages.push!). Make a NEW array.
    // The (prev) => ... form guarantees we use the latest value.
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const reply = await getBotReply(text);
      const botMsg = { id: crypto.randomUUID(), role: 'bot', text: reply, time: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: 'Sorry, something went wrong. Please try again.',
        time: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleClear() {
    setMessages([{ ...WELCOME, time: Date.now() }]);
  }

  // JSX: HTML-like syntax that compiles to JavaScript.
  // Note `className` instead of `class`, and {curly braces} for JS values.
  return (
    <div className="app">
      <div className="chat-window">
        <ChatHeader onClear={handleClear} />
        <MessageList messages={messages} isTyping={isTyping} />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
