import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Cards from './components/Cards/Cards'
import Home from './components/Home/Home'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile'

function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <NavBar />
          <div className="content-container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<SignUp />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/products' element={<Cards />} />
              <Route path='/cart' element={<ShoppingCart />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
