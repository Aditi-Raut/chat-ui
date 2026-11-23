// Displays ONE chat bubble. Pure "presentational" component:
// same props in → same UI out. No state of its own.
function formatTime(ms) {
  return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Message({ role, text, time, isError }) {
  const isUser = role === 'user';

  // Build the class list conditionally — a very common React pattern.
  const bubbleClass = `bubble ${isUser ? 'bubble-user' : 'bubble-bot'} ${isError ? 'bubble-error' : ''}`;

  return (
    <div className={`message-row ${isUser ? 'from-user' : 'from-bot'}`}>
      {/* Conditional rendering: only show the bot avatar for bot messages */}
      {!isUser && <div className="avatar bot-avatar small" aria-hidden="true">🤖</div>}
      <div className={bubbleClass}>
        <p>{text}</p>
        <span className="time">{formatTime(time)}</span>
      </div>
    </div>
  );
}
