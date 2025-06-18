import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Router from './router/router'

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';

import './App.css'

function App() {
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  return (
      <section className='layout'>
        <Nav user={user}/>
        <section className='main'>
          <Router user={user}/>
        </section>
        <Footer />
      </section>
  )
}

export default App
