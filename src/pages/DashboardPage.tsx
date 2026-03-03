import { Card } from '../components/Card';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from '../components/Button';

export const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, John! 👋</h1>
        <p className="text-slate-500">Here's what's happening with your career development.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Skills Mastered', value: '12', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Courses in Progress', value: '3', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Roadmap Progress', value: '65%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Study Hours', value: '24h', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-0">
            <div className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Current Roadmap: Frontend Developer" description="Your path to becoming a professional frontend engineer.">
            <div className="space-y-6">
              {[
                { title: 'HTML & CSS Fundamentals', status: 'completed', progress: 100 },
                { title: 'JavaScript Advanced Concepts', status: 'in-progress', progress: 75 },
                { title: 'React & State Management', status: 'in-progress', progress: 30 },
                { title: 'Next.js & Server Side Rendering', status: 'locked', progress: 0 },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    step.status === 'completed' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' :
                    step.status === 'in-progress' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' :
                    'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                      <span className="text-xs font-medium text-slate-500">{step.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          step.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2">
                View Full Roadmap <ChevronRight size={16} />
              </Button>
            </div>
          </Card>
        </div>

        {/* Recommended Skills */}
        <div className="space-y-6">
          <Card title="Recommended Skills" description="Based on your interests and goals.">
            <div className="space-y-4">
              {[
                { name: 'TypeScript', level: 'Intermediate', demand: 'High' },
                { name: 'Tailwind CSS', level: 'Beginner', demand: 'Very High' },
                { name: 'GraphQL', level: 'Advanced', demand: 'Medium' },
                { name: 'Docker', level: 'Beginner', demand: 'High' },
              ].map((skill, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{skill.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600">
                      {skill.demand}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{skill.level} Level</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-indigo-600 gap-2">
                <Plus size={16} /> Add New Skill
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none">
            <h3 className="text-lg font-bold mb-2">Resume Score: 85/100</h3>
            <p className="text-sm text-indigo-100 mb-4">Your resume is looking great! We found 3 small improvements to reach 90+.</p>
            <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-none">
              Analyze Again
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
