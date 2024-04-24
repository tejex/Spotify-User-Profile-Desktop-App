import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomeScreen } from './components/HomeScreen'

import { Provider } from 'react-redux'
import store from './store/store'

export default function App() {
    return (
        <div className="app">
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                    </Routes>
                </Router>
            </Provider>
        </div>
    )
}
