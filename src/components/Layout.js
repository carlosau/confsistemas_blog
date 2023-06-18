import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-4">
        {/* Add your header content */}
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="bg-gray-900 text-white p-4">
        {/* Add your footer content */}
      </footer>
    </div>
  );
};

export default Layout;
