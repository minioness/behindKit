import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <input type="checkbox" id="side-menu" className="drawer-toggle" />
      <section className="drawer-content">
        <Nav />
        <section className="main pt-16">
          <Router />
        </section>
        <Footer />
      </section>
    </BrowserRouter>
  )
}

export default App
