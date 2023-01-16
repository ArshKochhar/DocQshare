import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage'
import Login from './pages/login'
import './index.css'
import SignUp from './pages/signup';

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    </div>
);
}
export default App;