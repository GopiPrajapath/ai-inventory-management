import './App.css';
import Dashboard from './pages/dashboard';
import HomePage from './pages/home-page';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import InventoryManagement from './pages/inventory-management';
import AIInsights from './pages/ai-insights';
import AlertsAndNotifications from './pages/alerts-and-notifications';
import AnalyticsAndReports from './pages/analytics-and-reports';
import LoginRegistration from './pages/login-registration';
import HelpAndSupport from './pages/help-and-support';
import About from './pages/about';
import Settings from './pages/settings';
import PricingPage from './pages/pricing-page';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ='/homepage' element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/alerts" element={<AlertsAndNotifications />} />
        <Route path="/analytics" element={<AnalyticsAndReports />} />
        <Route path="/Settings" element ={<Settings/>}/>
        <Route path="/login" element={<LoginRegistration />} />
        <Route path="/help" element={<HelpAndSupport />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<PricingPage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
