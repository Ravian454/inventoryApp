// import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainScreen from './MainScreen/MainScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mainscreen" exact element={<MainScreen/>} />
        {/* Redirect from default path to mainscreen */}
        {/* <Redirect from="/" to="/mainscreen" /> */}
      </Routes>
    </Router>
  );
}

export default App;
