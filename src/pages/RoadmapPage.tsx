import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Map, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Lock,
  Search,
  Filter
} from 'lucide-react';
import { InputField } from '../components/InputField';

const roadmaps = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'Master HTML, CSS, JavaScript, and React to build modern web applications.',
    steps: 12,
    completed: 4,
    level: 'Beginner',
    trending: true
  },
  {
    id: 2,
    title: 'Backend Developer',
    description: 'Learn Node.js, databases, and API design to build scalable server-side systems.',
    steps: 15,
    completed: 0,
    level: 'Intermediate',
    trending: false
  },
  {
    id: 3,
    title: 'Data Scientist',
    description: 'Explore Python, statistics, and machine learning to extract insights from data.',
    steps: 18,
    completed: 0,
    level: 'Advanced',
    trending: true
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    description: 'Master design principles, Figma, and user research to create beautiful interfaces.',
    steps: 10,
    completed: 0,
    level: 'Beginner',
    trending: false
  }
];

export const RoadmapPage = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Career Roadmaps</h1>
          <p className="text-slate-500">Structured paths to master your dream career.</p>
        </div>
        <Button className="gap-2">
          <Map size={18} /> Generate Custom Roadmap
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <InputField 
            placeholder="Search roadmaps (e.g. Fullstack, DevOps...)" 
            icon={<Search size={18} />}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={18} /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => (
          <Card key={roadmap.id} className="hover:border-indigo-200 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {roadmap.title}
                  </h3>
                  {roadmap.trending && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{roadmap.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Steps</p>
                <p className="text-sm font-bold text-slate-700">{roadmap.steps}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Level</p>
                <p className="text-sm font-bold text-slate-700">{roadmap.level}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Progress</p>
                <p className="text-sm font-bold text-slate-700">{Math.round((roadmap.completed / roadmap.steps) * 100)}%</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {i <= roadmap.completed ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : i === roadmap.completed + 1 ? (
                    <Circle size={16} className="text-indigo-500" />
                  ) : (
                    <Lock size={16} className="text-slate-300" />
                  )}
                  <span className={i <= roadmap.completed ? 'text-slate-400 line-through' : 'text-slate-600'}>
                    Module {i}: {i === 1 ? 'Introduction' : i === 2 ? 'Core Concepts' : 'Advanced Tools'}
                  </span>
                </div>
              ))}
              {roadmap.steps > 3 && (
                <p className="text-xs text-slate-400 pl-7">+{roadmap.steps - 3} more modules</p>
              )}
            </div>

            <Button variant={roadmap.completed > 0 ? 'primary' : 'outline'} className="w-full gap-2">
              {roadmap.completed > 0 ? 'Continue Learning' : 'Start Roadmap'} <ChevronRight size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
