import React, { useState } from "react";
import MathPad from "./Compoment/mathpad";
import KeyPad from './Compoment/keypad';
import { getSuggestedQuery } from "@testing-library/react";
import { Button } from '@mui/material';






function App() {


  const [output, setOutput] = useState(null);
  console.log(output);

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(output);
  } else {
    console.log("Running in a non-React Native environment");
  }


  return (


    <div>




      <MathPad output={output} setOutput={setOutput} />

    </div>

  );


}

export default App;

