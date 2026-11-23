# ChatBot UI (React + Vite)

A responsive chat interface built with React: message bubbles, typing indicator,
auto-scroll, persistent history, dark mode, and a pluggable bot "brain".

---

## Step 0: Install the tools (one time)

1. Install **Node.js (LTS)** from https://nodejs.org. It includes `npm`, the package manager.
2. Check it worked:
   ```bash
   node -v
   ```
3. Install a code editor such as **VS Code**.

## Step 1: Run the project

```bash
cd chatbot-ui
```
```bash
npm install
```
```bash
npm run dev
```
Open the URL it prints (usually http://localhost:5173).

- `npm install` downloads React and Vite into `node_modules/`, using the list in `package.json`.
- `npm run dev` starts **Vite**, a dev server that reloads the page every time you save a file.

---

## Step 2: How the project is organized

```
chatbot-ui/
├── index.html              ← the single HTML page; has <div id="root">
├── package.json            ← project name, scripts, dependencies
├── vite.config.js          ← tells Vite to understand React/JSX
└── src/
    ├── main.jsx            ← entry point: mounts <App/> into #root
    ├── App.jsx             ← parent component: owns the chat state
    ├── App.css             ← all styles
    ├── botReply.js         ← the bot's "brain" (mock for now)
    └── components/
        ├── ChatHeader.jsx
        ├── MessageList.jsx
        ├── Message.jsx
        ├── TypingIndicator.jsx
        └── ChatInput.jsx
```

The component tree:

```
App  (state: messages, isTyping)
├── ChatHeader     (props: onClear)
├── MessageList    (props: messages, isTyping)
│   ├── Message × N
│   └── TypingIndicator
└── ChatInput      (props: onSend, disabled)
```

---

## Step 3: React basics, one concept at a time

Read the files in this order. Each one introduces something new.

### 3.1 Components and JSX: `ChatHeader.jsx`
A **component** is a JavaScript function that returns UI. The HTML-looking code is **JSX**.
- Component names start with a Capital letter.
- Use `className`, not `class`.
- Put JavaScript inside `{curly braces}`.

### 3.2 Props: `Message.jsx`
**Props** are a component's inputs, the way arguments are a function's inputs.
`<Message text="hi" role="user" />` gives the `Message` function `{ text: "hi", role: "user" }`.
Props are **read-only**: a child never changes its own props.

### 3.3 Conditional rendering: `Message.jsx`, `MessageList.jsx`
```jsx
{!isUser && <Avatar />}          // show only if the condition is true
{isUser ? 'right' : 'left'}      // choose between two options
```

### 3.4 State with `useState`: `App.jsx`
```jsx
const [messages, setMessages] = useState([]);
```
**State** is data that changes over time. Calling `setMessages(newValue)` makes React
**re-render** the component and every child that uses it.

Golden rule: **never mutate state.** Build a new array or object instead:
```jsx
setMessages(prev => [...prev, newMsg]);   // ✅
messages.push(newMsg);                    // ❌ React won't notice
```

### 3.5 Rendering lists: `MessageList.jsx`
```jsx
{messages.map(msg => <Message key={msg.id} {...msg} />)}
```
Each item needs a unique, stable `key`, so React knows which item is which.

### 3.6 Events and controlled inputs: `ChatInput.jsx`
The input's `value` comes **from** state, and `onChange` writes **to** state on every keystroke.
React state is then the single source of truth for what's in the box.
`e.preventDefault()` stops the form from reloading the page.

### 3.7 Lifting state up: `App.jsx` ↔ `ChatInput.jsx`
`ChatInput` doesn't own the messages, so it can't add one itself. Instead, App passes it a
function (`onSend`) and ChatInput calls it. **Data flows down through props; events flow up through callbacks.**

### 3.8 Side effects with `useEffect`: `App.jsx`, `MessageList.jsx`
`useEffect(fn, [deps])` runs `fn` **after** render, and runs it again whenever something in `deps` changes.
In this project it's used to:
- save messages to `localStorage` (so the chat survives a refresh)
- scroll to the newest message

### 3.9 Refs with `useRef`: `MessageList.jsx`, `ChatInput.jsx`
A ref gives you a handle on a real DOM element (to scroll it or focus it) without causing a re-render.

### 3.10 Async code: `App.jsx` + `botReply.js`
`handleSend` is an `async` function. It shows the typing indicator, `await`s the reply,
then adds it. `try/catch/finally` handles errors and always hides the indicator.

---

## Step 4: Practice exercises (do these yourself!)

Doing these is how the concepts stick. They're also good talking points in interviews.

1. **Easy:** Add a new rule to `botReply.js` (for example, reply to "your name").
2. **Easy:** Change the accent color in `App.css` (`--accent`).
3. **Medium:** Add a "suggested questions" row above the input. Clicking a chip calls `onSend`.
4. **Medium:** Add a "copy" button on bot messages (`navigator.clipboard.writeText`).
5. **Medium:** Add a dark/light toggle button that overrides the system setting.
6. **Hard:** Connect a real AI API (see below).

## Step 5: Connecting a real AI (next level)

`App.jsx` only needs `getBotReply(text)` to return a Promise that resolves to a string,
so you can swap the mock for a real model without touching any UI code.

⚠️ **Never put an API key in front-end code.** Anyone can read it in the browser.
The safe pattern is a small backend (Node/Express, or a serverless function on Vercel or Netlify) that:
1. receives `{ message }` from your React app,
2. calls the AI provider with the secret key stored in an environment variable,
3. returns the reply.

Then `getBotReply` becomes:
```js
export async function getBotReply(userText) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userText }),
  });
  if (!res.ok) throw new Error('Request failed');
  const data = await res.json();
  return data.reply;
}
```

---

## Step 6: Put it on your resume

1. **Push to GitHub:** create a repo and push this folder. `node_modules` is already ignored.
2. **Deploy for free:** import the repo on **Vercel** or **Netlify**. They detect Vite automatically
   (build command `npm run build`, output folder `dist`). You get a live link.
3. **Add a screenshot or GIF** to this README.
4. **Resume bullet ideas:**
   - *Built a responsive chatbot interface in React (Hooks, Vite) with real-time typing indicators,
     auto-scrolling message history, and localStorage persistence.*
   - *Designed a modular component architecture with a pluggable response service, so the mock
     backend can be replaced by an LLM API with no UI changes.*
   - *Implemented accessible UI (ARIA live regions, reduced-motion support) and automatic dark mode using CSS custom properties.*

Only list what you can explain in an interview. Work through Step 3 and a few exercises first.
# chat-ui
