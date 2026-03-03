import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { GraduationCap, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join Skill Nexus and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={18} />}
            required
          />
          <InputField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={18} />}
            required
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock size={18} />}
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
