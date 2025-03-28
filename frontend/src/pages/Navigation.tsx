import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"
import {
  LayoutDashboard,
  Package,
  Brain,
  Bell,
  BarChart2,
  Settings,
  HelpCircle,
  Info
} from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-background border-r h-screen w-64 fixed left-0 top-0 p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-6">Inventory Pro</h2>
        
        <div className="space-y-2">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          
          <Link to="/inventory">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Inventory
            </Button>
          </Link>
          
          <Link to="/ai-insights">
            <Button variant="ghost" className="w-full justify-start">
              <Brain className="mr-2 h-4 w-4" />
              AI Insights
            </Button>
          </Link>
          
          <Link to="/alerts">
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </Link>
          
          <Link to="/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          
          <Link to="/help">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </Link>
          
          <Link to="/about">
            <Button variant="ghost" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
} 