import './App.css';
import Table from "./Table";
import Updater from './Updater';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Tiro Tamil", "Lobster", "Caveat", "Dancing Script", "Cormorant Garamond", "Joan", "Pacifico", "Kalam", "Poppins", "EB Garamond"]
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Table />} />
          <Route exact path="/user/:id" element={<Updater />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
