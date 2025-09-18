import React from 'react';

const HomePage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-8">Welcome to My Todo App!</h1>
    <nav className="space-x-4">
      <a href="/todo">Go to Todo Page</a>
    </nav>
  </div>
);

export default HomePage;