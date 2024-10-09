import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import Home from './pages/home/Home'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
    </>
  )

}

export default App
