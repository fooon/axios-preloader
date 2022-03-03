import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";

function App() {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setContentLoaded(true), 4000)
  }, [])

  return (
    <div className="App">
      <Preloader
        start={!contentLoaded}
        position="top"
      />
    </div>
  );
}

export default App;
