import Router from './router/router'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'

import './App.css'

function App() {


  return (
      <section className='layout'>
        <Nav />
        <section className='main'>
          <Router />
        </section>
        <Footer />
      </section>
  )
}

export default App
