import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import Home from './pages/home/Home'
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"


function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
    <Toaster/>
    <Footer/>
    </>
  )

}

export default App
