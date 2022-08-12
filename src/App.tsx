import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center container mx-auto px-4 py-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}
