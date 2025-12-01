import React from 'react';

const LandingPage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
        <div className="text-2xl font-bold text-pink-600 flex items-center gap-2">
          <span>🐦</span> Chirper
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => setCurrentView('login')}
            className="text-gray-600 hover:text-pink-600 font-medium transition cursor-pointer"
          >
            Log in
          </button>
          <button 
            onClick={() => setCurrentView('register')}
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition shadow-md cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              See what's happening <span className="text-pink-500">right now</span>
            </h1>
            <p className="text-xl text-gray-600">
              Join Chirper today to stay in the loop with the latest trends, news, and conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setCurrentView('register')}
                className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition shadow-lg text-center cursor-pointer"
              >
                Get Started
              </button>
              <button 
                onClick={() => setCurrentView('login')}
                className="bg-white text-pink-500 border-2 border-pink-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-50 transition text-center cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
          
          {/* Hero Image / Illustration Placeholder */}
          <div className="hidden md:block relative">
            <div className="absolute -inset-4 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform rotate-3 hover:rotate-0 transition duration-500">
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                 <div className="flex-1 space-y-2">
                   <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                   <div className="h-4 bg-gray-100 rounded w-full"></div>
                   <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                 </div>
               </div>
               <div className="mt-4 flex gap-4 text-gray-400 text-sm">
                 <span>❤️ 1.2k</span>
                 <span>🔁 450</span>
               </div>
            </div>
            <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform -rotate-3 translate-y-4 hover:rotate-0 transition duration-500 z-10">
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-pink-100"></div>
                 <div className="flex-1 space-y-2">
                   <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                   <div className="h-4 bg-gray-100 rounded w-full"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        &copy; 2025 Chirper. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
