// The animated "..." bubble shown while the bot is "thinking".
// The animation itself is pure CSS (see .dot in App.css).
export default function TypingIndicator() {
  return (
    <div className="message-row from-bot">
      <div className="avatar bot-avatar small" aria-hidden="true">🤖</div>
      <div className="bubble bubble-bot typing" aria-label="Bot is typing">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
