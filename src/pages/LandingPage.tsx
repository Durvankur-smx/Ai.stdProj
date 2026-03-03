import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { 
  Rocket, 
  Target, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
              <Rocket size={16} />
              Empowering the next generation of talent
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Master Your Career with <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Guidance
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Skill Nexus helps students bridge the gap between education and industry with personalized roadmaps, resume analysis, and 24/7 AI career coaching.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Get Started for Free <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Features
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/dashboard/1200/600" 
              alt="Dashboard Preview" 
              className="rounded-2xl shadow-2xl border border-slate-100"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with industry best practices to give you a competitive edge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Personalized Roadmaps',
                description: 'Get step-by-step guides tailored to your career goals and current skill level.'
              },
              {
                icon: Zap,
                title: 'AI Career Coach',
                description: 'Chat with our AI to get instant answers to your career questions and interview prep.'
              },
              {
                icon: Shield,
                title: 'Resume Analysis',
                description: 'Upload your resume and get detailed feedback on how to improve it for ATS systems.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to accelerate your career?</h2>
            <p className="text-indigo-100 mb-10 text-lg max-w-xl mx-auto relative z-10">
              Join thousands of students who are already using Skill Nexus to build their future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/register">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-indigo-100">
                <CheckCircle2 size={16} /> No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Skill Nexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
