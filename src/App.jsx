import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  return (
    <div className="portfolio">
      <header>
        <h1>Portfolio</h1>
        <p>Welcome to my portfolio — built with React + Vite</p>
      </header>
      <main>
        <section className="stack">
          <h2>Tech Stack</h2>
          <div className="logos">
            <img src={reactLogo} className="logo" alt="React" />
            <img src={viteLogo} className="logo" alt="Vite" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
