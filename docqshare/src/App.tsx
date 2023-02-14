import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage'
import Login from './pages/login'
import './index.css'
import Signup from './pages/signup';
import AccountPage from './pages/account';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
    <div className="App">
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/account" element={<AccountPage/>}/>
            </Routes>
        </BrowserRouter>
        </Provider>
    </div>
);
}
export default App;