import React from "react";
import MapView from "./components/MapView";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <MapView />
    </>
  );
}

export default App;