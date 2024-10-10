import React from 'react'
import { useAuthStore } from '../../store/authUser';
import Navbar from './../../components/NavBar';

const HomeScreen = () => {
  const {logout}=useAuthStore();

  return (
    <div>
      <button onClick={logout}> Logout</button>
      <Navbar/>
    </div>
  )
}

export default HomeScreen
