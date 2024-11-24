import { useState } from 'react'
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Bell, ChevronDown, FileText, Home, Package, Settings, ShoppingCart, ChevronRight, LogOut, User, Mail, Phone, Building } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'

// Profile Dialog Component
interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/avatar-placeholder.png" />
              <AvatarFallback>Gopi</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-base">Gopi Prajapth</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">gopiprajapathh@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-base">+91 63031 18648</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Building className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-base">Inventory Management</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Inventory', icon: Package, path: '/inventory' },
    { title: 'Orders', icon: ShoppingCart, path: '/orders' },
    { title: 'Reports', icon: FileText, path: '/reports' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo/Toggle Section */}
        <div className="flex items-center p-4 border-b">
          <Button 
            variant="ghost" 
            className="p-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Package className="h-6 w-6 text-blue-600" />
          </Button>
          {!isCollapsed && (
            <span className="text-xl font-bold ml-2">InventoryAI</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <Button
                variant="ghost"
                className={`w-full justify-start mb-2 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}
              >
                <item.icon className={`h-4 w-4 ${
                  isCollapsed ? 'mr-0' : 'mr-2'
                }`} />
                {!isCollapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="h-16 px-4 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronRight className="h-6 w-6 rotate-180" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/avatar-placeholder.png" />
                      <AvatarFallback>GP</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                      <>
                        <span>Gopi Prajapath</span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Profile Dialog */}
        <ProfileDialog 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </div>
  );
};

export default Sidebar;