import "./App.css";
import React, { useState } from "react";

function App() {
  const [isIframeVisible, setIframeVisibility] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e && e.preventDefault();
    const payload = { ...formState };
    payload.eventName = "submit";
    const iframeWin = document.getElementById("test-iframe").contentWindow;
    const targetOrigin = document.getElementById("test-iframe").src;
    iframeWin.postMessage(JSON.stringify(payload), targetOrigin);
  };

  const onInputChange = (e) => {
    e && e.preventDefault();
    const isEmail = e.target.id === "parent-email";
    const isPassword = e.target.id === "parent-password";
    if (isEmail) {
      setFormState((prevState) => ({
        ...prevState,
        email: e.target.value,
      }));
    } else if (isPassword) {
      setFormState((prevState) => ({
        ...prevState,
        password: e.target.value,
      }));
    }
    const payload = {
      eventName: "updateInputs",
      email: document.getElementById("parent-email").value,
      password: document.getElementById("parent-password").value,
    };
    const iframeWin = document.getElementById("test-iframe").contentWindow;
    const targetOrigin = document.getElementById("test-iframe").src;
    iframeWin.postMessage(JSON.stringify(payload), targetOrigin);
  };

  const iframeClass = isIframeVisible ? "visible" : "hidden";
  return (
    <div className="App">
      <button onClick={() => setIframeVisibility(!isIframeVisible)}>
        {isIframeVisible ? "Hide iFrame" : "Show iFrame"}
      </button>

      {!isIframeVisible && (
        <>
          <p>VIEWING REACT APP</p>
          <form id="parent-form">
            <input
              value={formState.email}
              onChange={onInputChange}
              placeholder="email"
              id="parent-email"
            ></input>
            <input
              value={formState.password}
              onChange={onInputChange}
              placeholder="password"
              id="parent-password"
            ></input>
            <button id="btn" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </>
      )}
      {isIframeVisible && <p>VIEWING IFRAME</p>}
      <iframe
        className={iframeClass}
        id="test-iframe"
        src="https://hidden-iframe-test.herokuapp.com/"
        title="test"
      ></iframe>
    </div>
  );
}

export default App;
