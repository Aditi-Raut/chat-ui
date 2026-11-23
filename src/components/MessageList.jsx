// Renders the scrolling list of messages and keeps it scrolled to the bottom.
import { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import TypingIndicator from './TypingIndicator.jsx';

export default function MessageList({ messages, isTyping }) {
  // useRef gives us a direct handle to a real DOM element (like
  // document.getElementById) without causing re-renders.
  const bottomRef = useRef(null);

  // Whenever a new message arrives or typing starts/stops, scroll down.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <main className="message-list" aria-live="polite">
      {/* Rendering a list: .map() each item to JSX.
          Every item needs a unique, stable `key` so React can track it. */}
      {messages.map((msg) => (
        // {...msg} "spreads" the object: same as role={msg.role} text={msg.text} ...
        <Message key={msg.id} {...msg} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </main>
  );
}
