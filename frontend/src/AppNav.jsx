import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProvider from './Context/AllContext';

//PAGES
import Home from './pages/Home'
import Login from './pages/Login'
import UserFeed from './pages/UserFeed'
import SignUpPage from './pages/SignUp'
import FourZeroFour from './Components/404/FourOFour';
import Profile from './Pages/Profile';
import FriendRequest from './Pages/FriendRequest';


function AppNav() {

  return (
    <>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/signup' element={ <SignUpPage/> }/>
          <Route path='/:id/feed' element={ <UserFeed /> }/>
          <Route path='/:id/profile' element={ <Profile/> }/>
          <Route path='/:id/friend-requests' element={ <FriendRequest/> }/>
          <Route path='*' element={ <FourZeroFour/> }/>
        </Routes>
      </div>
    </>
  )
}

export default AppNav;
