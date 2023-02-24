import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Navbar from './components/Navbar/Navbar'
import './assets/global.css'
import Create from './views/Create'
const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<Create/>}/>
            </Routes>
        </Router>
    )
        
}

export default App