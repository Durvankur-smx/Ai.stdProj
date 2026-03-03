import { Link } from 'react-router-dom';
import { Button } from './Button';
import { GraduationCap } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Skill Nexus
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
