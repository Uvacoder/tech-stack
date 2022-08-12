import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import StackPage from './pages/StackPage';

export default function App() {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col container mx-auto px-4 py-5 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/stack" element={<StackPage />} />
        </Routes>
      </div>
    </div>
  );
}
