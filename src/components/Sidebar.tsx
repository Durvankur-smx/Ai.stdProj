import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map, 
  FileText, 
  Settings, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
  { icon: Map, label: 'Roadmap', path: '/roadmap' },
  { icon: FileText, label: 'Resume Analysis', path: '/resume' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="text-lg font-bold text-slate-900">Skill Nexus</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
