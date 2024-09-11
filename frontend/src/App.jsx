import { ThemeProvider } from './components/theme-provider'
import { Outlet } from 'react-router-dom'
import Navbar from './features/Navbar'
import Post from './features/Post'
import Profile from './features/Profile'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <ThemeProvider >
      <Navbar/>
      <Outlet/>
      <ProfilePage/>
    </ThemeProvider>
  )
}

export default App
