import { ThemeProvider } from './components/theme-provider'
import { Outlet } from 'react-router-dom'
import Navbar from './features/Navbar'
import Post from './features/Post'

function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <Outlet/>
      <Post/>
    </ThemeProvider>
  )
}

export default App
