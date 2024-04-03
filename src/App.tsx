import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StartPage from './pages/startPage';
import Preloader from './components/preloader';
import MainPage from './pages/mainPage';

const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path = "/" element={<StartPage/>} />
                <Route path = "/main" element={<MainPage/>} />
            </Routes>
            
            <Preloader/>
        </div>
    )
}

export default App;
