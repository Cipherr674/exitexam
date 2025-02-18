import { useLocation } from 'react-router-dom';

const WelcomePage = () => {
  const { state } = useLocation();
  
  return (
    <div className="welcome-container">
      <h1>Welcome! 🎉</h1>
      <p>Your email {state?.email || ''} has been successfully verified!</p>
    </div>
  );
};

export default WelcomePage; 