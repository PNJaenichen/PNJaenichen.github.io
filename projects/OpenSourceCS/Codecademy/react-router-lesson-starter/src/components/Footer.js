import React from "react";

export default function Footer() {

  // Get the history object

  const goBack = () => {
    // imperatively redirect back

  }

  const goForward = () => {
    // imperatively redirect forward
    
  }

  return (
    <footer>
      <button onClick={goBack}>Back</button>
      <button onClick={goForward}>Forward</button>
    </footer>
  );
}
