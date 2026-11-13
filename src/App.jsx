import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import useOsStore from './store/osStore';
import Landing from './pages/Landing';
import AgentStore from './pages/AgentStore';
import Docs from './pages/Docs';
import Community from './pages/Community';
import Enterprise from './pages/Enterprise';
import OS from './pages/OS';
import Auth from './pages/Auth';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import TechnologyPage from './pages/TechnologyPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const theme = useOsStore(state => state.theme);
  
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/agents" element={<AgentStore />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/community" element={<Community />} />
        <Route path="/os" element={<OS />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
