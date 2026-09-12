* {
  box-sizing: border-box;
  font-family: 'Segoe UI', Arial, sans-serif;
}

body {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  text-align: center;
  padding: 40px 20px 20px;
}

header h1 {
  font-size: 2.2rem;
  margin-bottom: 8px;
}

header p {
  color: #94a3b8;
}

main {
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
}

.input-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

textarea {
  background: #0f172a;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  resize: vertical;
  font-size: 1rem;
}

button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #b91c1c;
}

.result-card {
  background: #1e293b;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
}

.hidden {
  display: none;
}

.score-bar {
  background: #334155;
  border-radius: 6px;
  height: 12px;
  overflow: hidden;
  margin: 12px 0;
}

.score-fill {
  height: 100%;
  width: 0%;
  transition: width 0.4s ease;
}

#reasonsList li {
  margin-bottom: 6px;
  line-height: 1.4;
}

footer {
  margin-top: auto;
  padding: 20px;
  color: #64748b;
  font-size: 0.85rem;
  text-align: center;
}
