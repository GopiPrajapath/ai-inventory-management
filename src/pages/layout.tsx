import React from 'react';
import Navigation from './Navigation'; // Import your Navigation component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout; 