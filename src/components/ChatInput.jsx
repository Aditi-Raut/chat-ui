// The text box + send button. This shows a CONTROLLED INPUT:
// React state is the single source of truth for what's in the box.
import { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  // Put the cursor back in the box once the bot finishes replying.
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page on form submit
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed); // tell the parent (App) about the new message
    setText(''); // clear the box
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder={disabled ? 'Bot is typing…' : 'Type a message…'}
        value={text} // value comes FROM state…
        onChange={(e) => setText(e.target.value)} // …and every keystroke updates state
        disabled={disabled}
        aria-label="Message"
        autoFocus
      />
      <button type="submit" disabled={disabled || !text.trim()} aria-label="Send message">
        ➤
      </button>
    </form>
  );
}
