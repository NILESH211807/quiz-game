import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import { QuizProvider } from './context/QuizContext';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

const App = () => {
   return (
      <QuizProvider>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
         </Routes>
      </QuizProvider>
   )
}

export default App
