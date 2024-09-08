import { ThemeProvider } from './components/theme-provider'
import { Outlet } from 'react-router-dom'
import Navbar from './features/Navbar'
import Suggestion from './features/Suggestion'
import Profile from './features/Profile'

function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <Outlet/>
      <Profile/>
    </ThemeProvider>
  )
}

export default App
