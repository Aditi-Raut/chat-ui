// A simple component: receives a function prop `onClear` from App and calls it
// when the button is clicked. The child doesn't know HOW clearing works —
// it just tells the parent "the user clicked clear". This is "lifting state up".
export default function ChatHeader({ onClear }) {
  return (
    <header className="chat-header">
      <div className="bot-identity">
        <div className="avatar bot-avatar" aria-hidden="true">🤖</div>
        <div>
          <h1>ChatBot</h1>
          <span className="status">
            <span className="status-dot" /> Online
          </span>
        </div>
      </div>
      <button className="clear-btn" onClick={onClear} title="Clear conversation">
        Clear
      </button>
    </header>
  );
}
