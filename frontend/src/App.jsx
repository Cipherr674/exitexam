import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Secure Authentication</h1>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
