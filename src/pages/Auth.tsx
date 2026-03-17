import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const { isAuthenticated, hasPin, setPin, login } = useAuth();
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");

  const handlePinSubmit = () => {
    if (pinInput.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    if (hasPin) {
      if (!login(pinInput)) {
        setError("Incorrect PIN");
      }
    } else {
      setPin(pinInput);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{hasPin ? "Enter PIN" : "Set a new PIN"}</h1>
        <input
          type="password"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          maxLength={4}
          className="pin-input"
        />
        <button onClick={handlePinSubmit} className="auth-button">
          {hasPin ? "Login" : "Set PIN"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Auth;
