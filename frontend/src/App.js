// src/App.js
import {BrowserRouter, Routes, Route } from "react-router-dom"; // ❌ No need to import BrowserRouter here
import Home from "./components/Home";
import Editor from "./components/Editor";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:roomId" element={<Editor />} />
        </Routes>
    );
}

export default App;
