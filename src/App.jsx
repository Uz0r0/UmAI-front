import './App.css';
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StartPage from "./pages/StartPage/StartPage";
import AIPage from "./pages/AIPage/AIPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/works/:bookId/pages/:chapter" element={<MainPage />} />
      <Route path="/umai" element={<AIPage />} />
    </Routes>
  );
}

export default App;