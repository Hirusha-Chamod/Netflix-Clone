import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';


const Home = () => {
  const { user } = useAuthStore();

  return (
    <div>
       {user? <HomeScreen/>:<AuthScreen/>}
    </div>
  )
}

export default Home
