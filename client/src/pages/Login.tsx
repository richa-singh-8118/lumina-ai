import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Mail, Lock, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignUp) {
            if (name.trim() && email.trim() && password.trim()) {
                setUser({
                    name: name,
                    age: '12',
                    interests: [],
                    level: 'Intermediate'
                });
                navigate('/onboarding');
            }
        } else {
            if (email.trim() && password.trim()) {
                setUser({
                    name: email.split('@')[0], // Mock name from email
                    age: '12',
                    interests: [],
                    level: 'Intermediate'
                });
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-bg-main relative overflow-hidden p-6 text-white font-sans">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full" />

            <div className="w-full max-w-xl animate-slide-up">
                <div className="premium-card p-10 md:p-12 space-y-8 relative overflow-hidden backdrop-blur-3xl border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="space-y-4 text-center">
                        <div className="flex justify-center">
                            <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-lg shadow-primary/10 animate-pulse">
                                <Sparkles className="text-primary" size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Lumina<span className="text-primary">.</span>AI
                        </h1>
                        <p className="text-slate-400 font-medium text-sm tracking-wide">
                            {isSignUp ? 'Create your neural learning profile' : 'Reconnect to your learning node'}
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setIsSignUp(false)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${!isSignUp ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsSignUp(true)}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${isSignUp ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isSignUp && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Enter your name..."
                                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white font-medium tracking-wide outline-none transition-all placeholder:text-slate-600 focus:bg-slate-950 focus:border-primary/50"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white font-medium tracking-wide outline-none transition-all placeholder:text-slate-600 focus:bg-slate-950 focus:border-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex justify-between">
                                Password
                                {!isSignUp && <span className="text-primary hover:underline cursor-pointer normal-case font-normal">Forgot?</span>}
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white font-medium tracking-wide outline-none transition-all placeholder:text-slate-600 focus:bg-slate-950 focus:border-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary hover:bg-primary-dark"
                        >
                            {isSignUp ? 'Initialize Profile' : 'Access Node'}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0f172a] px-4 text-slate-500 font-bold tracking-widest">Or Continue With</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-sm">
                            Apple
                        </button>
                    </div>

                    {/* Footer Stats */}
                    <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3 group cursor-help">
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <Shield size={16} className="text-emerald-500" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Status</p>
                                <p className="text-xs font-bold text-emerald-400">Secure</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group cursor-help">
                            <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                <Zap size={16} className="text-amber-500" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Sync</p>
                                <p className="text-xs font-bold text-amber-400">Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-[10px] font-medium text-slate-500 tracking-wider">
                    {isSignUp
                        ? "By registering, you agree to Lumina's Adaptive Learning Terms & Conditions."
                        : "All sessions are monitored for quality and academic integrity."}
                </p>
            </div>
        </div>
    );
}

