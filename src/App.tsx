import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mail, Linkedin } from 'lucide-react';
import { Header } from './components/layout/Header';
import { InitialSetupModal } from './components/layout/InitialSetupModal';
import { Dashboard } from './routes/Dashboard';
import { CategoryDetail } from './routes/CategoryDetail';
import { PrintView } from './routes/PrintView';

export function App() {
  const [isInitialSetupOpen, setIsInitialSetupOpen] = useState(true);

  return (
    <BrowserRouter>
      {/* Initial Loader & Tournament Setup Modal */}
      <InitialSetupModal
        isOpen={isInitialSetupOpen}
        onClose={() => setIsInitialSetupOpen(false)}
      />

      <Routes>
        {/* Clean Print Routes */}
        <Route path="/print/:id" element={<PrintView />} />
        <Route path="/print-all" element={<PrintView />} />

        {/* Main Application Routes */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/category/:id" element={<CategoryDetail />} />
                </Routes>
              </main>

              <footer className="border-t border-slate-200 bg-white py-5 text-xs text-slate-500 print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span>&copy; 2026 TournaX.</span>
                    <span>Tournament Knockout Fixture Planner & Scoring System</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 hidden md:inline">
                      Supports 2 to 128 Players • Automatic Bye Distribution
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href="mailto:mohank12092003@gmail.com"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                        title="Send email to mohank12092003@gmail.com"
                      >
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>Email</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/mohank17/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
