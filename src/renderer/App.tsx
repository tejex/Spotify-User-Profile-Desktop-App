import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ConnectAccount from './components/connectAccount';
import UserProfile from './pages/userProfile';
import { Provider } from 'react-redux';
import store from './store/store';

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<ConnectAccount />} />
                    <Route path="/userProfile" element={<UserProfile />} />
                </Routes>
            </Router>
        </Provider>
    );
}
