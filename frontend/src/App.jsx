import { Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp'
import Home from './pages/home/Home'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/404'
import { Navigate } from "react-router"
import { Loader } from "lucide-react";

import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"


function App() {

	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);
	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUp /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
			<Toaster />
		</>
	)

}

export default App
