import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ExampleLibraryPage from './pages/ExampleLibraryPage';
import GlossaryPage from './pages/GlossaryPage';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import ReferencesPage from './pages/ReferencesPage';
import TutorialPage from './pages/TutorialPage';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/examples" element={<ExampleLibraryPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}