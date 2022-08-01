import 'regenerator-runtime/runtime';
import React from 'react';
import App from './_app';
import {useEffect} from "react";

const HomePage = () => {
  useEffect(() => {
    alert('Finished loading');
  }, []);
  if (typeof window === 'object') {
    // Check if document is finally loaded

    document.addEventListener("DOMContentLoaded", function () {
        alert('Finished loading')
    });
    

    return (
        <div>
        <App />
        </div>
    )
  }
}

export default HomePage 
