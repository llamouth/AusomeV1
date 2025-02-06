import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProvider from './Context/AllContext';
import AppNav from './AppNav';
import NavBar from './Components/NavBar';
function App() {

  return (
    <AllProvider>
      <NavBar/>
      <AppNav/>
    </AllProvider>
  )
}

export default App
