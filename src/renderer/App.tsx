import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomeScreen } from './components/HomeScreen'

import { Provider } from 'react-redux'
import store from './store/store'

function MainPage() {
    return <div>hi</div>
}

export default function App() {
    return (
        <div className="app">
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        {/* <Route path="/mainPage" element={<MainPage />} /> */}
                    </Routes>
                </Router>
            </Provider>
        </div>
    )
}
