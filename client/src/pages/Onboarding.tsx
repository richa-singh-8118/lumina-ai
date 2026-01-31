import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, User, Globe, ChevronLeft, Check, Sparkles, Brain, Cpu } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface OnboardingData {
    name: string;
    age: string;
    language: string;
    interests: string[];
    level: string;
}

export function Onboarding() {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<OnboardingData>({
        name: '',
        age: '',
        language: 'English',
        interests: [],
        level: 'Intermediate'
    });

    const handleNext = () => {
        if (step < 4) {
            setStep(prev => prev + 1);
        } else {
            setUser(data);
            navigate('/dashboard');
        }
    };

    const toggleInterest = (interest: string) => {
        setData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    return (
        <div className="login-card-container min-h-screen py-20 px-6">
            <div className="w-full max-w-4xl space-y-16">

                {/* Brand Identity */}
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                            <BookOpen className="text-white" size={48} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-6xl font-black text-white tracking-widest italic uppercase leading-none">Initialize <span className="text-primary">Entity</span></h1>
                        <p className="text-text-muted text-xl font-bold uppercase italic opacity-40 mt-4 tracking-widest leading-relaxed">Neural Pathway Architecture Protocol v2.0</p>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between px-10 relative">
                    <div className="absolute top-1/2 left-20 right-20 h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-4 group">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all duration-700 border-2 relative ${step === s ? 'bg-primary border-primary text-white shadow-[0_0_30px_#6366f1] scale-125' :
                                step > s ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_20px_#10b981]' : 'bg-slate-900 border-white/10 text-slate-700 scale-90'
                                }`}>
                                <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity blur-xl rounded-full" />
                                {step > s ? <Check size={28} /> : s}
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.4em] italic transition-colors ${step === s ? 'text-primary' : 'text-slate-700'}`}>
                                STEP {s}
                            </span>
                        </div>
                    ))}
                    {/* Active Track Overlay */}
                    <div
                        className="absolute top-1/2 left-20 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 origin-left shadow-[0_0_15px_#6366f1]"
                        style={{ width: `${((step - 1) / 3) * (100 - (40 / data.interests.length || 1))}%` }}
                    />
                </div>

                {/* Main Architecture Panel */}
                <div className="premium-card p-16 md:p-24 bg-slate-900/30 border-white/5 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.95)] backdrop-blur-3xl relative overflow-hidden flex flex-col justify-between min-h-[700px]">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                        <Cpu size={300} />
                    </div>

                    <div className="relative z-10 mb-20 text-center space-y-8">
                        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] italic">
                            <Sparkles size={16} className="text-primary animate-pulse" /> CONFIGURATION BROADCAST
                        </div>
                        <h2 className="text-7xl font-black text-white tracking-widest leading-[0.85] italic uppercase">
                            {step === 1 && "Identity Sync"}
                            {step === 2 && "Curiosity Filter"}
                            {step === 3 && "Neural Baseline"}
                            {step === 4 && "Final Protocol"}
                        </h2>
                        <div className="h-1.5 w-40 bg-primary/20 mx-auto rounded-full overflow-hidden">
                            <div className="h-full bg-primary shadow-[0_0_15px_#6366f1] animate-pulse" style={{ width: `${step * 25}%` }} />
                        </div>
                    </div>

                    <div className="animate-fade-up flex-1 flex flex-col justify-center relative z-10">
                        {step === 1 && (
                            <div className="max-w-xl mx-auto w-full space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] ml-1 italic">ENTITY FULL IDENTIFIER</label>
                                    <div className="relative group">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-primary transition-colors" size={24} />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            className="form-input pl-18 py-8 text-2xl font-black italic tracking-widest bg-slate-950/60 border-white/5 focus:bg-slate-950 focus:border-primary"
                                            placeholder="E.G. RICHA SINGH"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] ml-1 italic">SYNAPTIC AGE (CYCLES)</label>
                                    <input
                                        type="number"
                                        value={data.age}
                                        onChange={(e) => setData({ ...data, age: e.target.value })}
                                        className="form-input py-8 text-2xl font-black italic tracking-widest bg-slate-950/60 border-white/5 focus:bg-slate-950 focus:border-primary"
                                        placeholder="TARGET: 6 - 17"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
                                {['MATHEMATICS', 'ASTROPHYSICS', 'NEURAL CODE', 'ANCIENT HISTORY', 'QUANTUM DESIGN', 'LITERATURE', 'ETHICS', 'GEO-POLITICS', 'BIO-SYNTHESIS'].map((subject) => (
                                    <button
                                        key={subject}
                                        onClick={() => toggleInterest(subject)}
                                        className={`p-10 rounded-[2.5rem] border-2 transition-all font-black text-xl italic tracking-widest text-left relative overflow-hidden group ${data.interests.includes(subject)
                                            ? 'bg-primary/20 border-primary text-white shadow-2xl shadow-primary/20 scale-105'
                                            : 'bg-slate-950/40 border-white/5 text-slate-700 hover:border-white/20 hover:text-white'
                                            }`}
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {subject}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 max-w-2xl mx-auto w-full">
                                {[
                                    { id: 'Beginner', title: 'NEW EXPLORER', desc: 'FOUNDATIONAL ARCHITECTURE SYNC.' },
                                    { id: 'Intermediate', title: 'SCHOLAR ENTITY', desc: 'CROSS-DISCIPLINARY DATA LINKAGE.' },
                                    { id: 'Advanced', title: 'MASTER SPECIALIST', desc: 'COMPLEX SYSTEM SYNTHESIS & MASTERY.' }
                                ].map((lvl) => (
                                    <button
                                        key={lvl.id}
                                        onClick={() => setData({ ...data, level: lvl.id })}
                                        className={`w-full p-10 rounded-[3rem] border-2 transition-all text-left flex items-start gap-8 group relative overflow-hidden ${data.level === lvl.id
                                            ? 'bg-primary/10 border-primary shadow-2xl shadow-primary/20 scale-105'
                                            : 'bg-slate-950/40 border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
                                            <Brain size={100} />
                                        </div>
                                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 font-black text-2xl italic ${data.level === lvl.id ? 'bg-primary text-white shadow-2xl' : 'bg-slate-900 text-slate-700'
                                            }`}>
                                            {lvl.id[0]}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-3xl text-white italic tracking-widest leading-none">{lvl.title}</p>
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] italic mt-2 opacity-60">{lvl.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="max-w-xl mx-auto w-full space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] ml-1 italic flex items-center gap-3">
                                        <Globe size={18} className="text-primary" /> NEURAL LINGUISTIC SYNC
                                    </label>
                                    <select
                                        value={data.language}
                                        onChange={(e) => setData({ ...data, language: e.target.value })}
                                        className="form-input py-8 text-2xl font-black italic tracking-widest bg-slate-950/60 border-white/5 focus:bg-slate-950 focus:border-primary cursor-pointer appearance-none text-center"
                                    >
                                        {['ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN', 'MANDARIN', 'HINDI', 'JAPANESE'].map(lang => (
                                            <option key={lang} value={lang} className="bg-slate-950">{lang} CORE</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="premium-card p-10 bg-white/5 border-white/10 space-y-6 relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                                    <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.6em] italic scale-90 origin-left">PROPOSED CONFIGURATION: READY</h3>
                                    <p className="text-xl font-black text-slate-500 uppercase italic leading-none">AGENT: <span className="text-white">{data.name}</span></p>
                                    <p className="text-xl font-black text-slate-500 uppercase italic leading-none">PATHWAY: <span className="text-white">{data.interests.slice(0, 3).join(', ')}{data.interests.length > 3 ? '...' : ''}</span></p>
                                    <p className="text-xl font-black text-slate-500 uppercase italic leading-none">BASELINE: <span className="text-white">{data.level?.toUpperCase()}</span></p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-20 flex items-center justify-between border-t border-white/5 mt-16 relative z-10">
                        <button
                            onClick={() => step > 1 && setStep(prev => prev - 1)}
                            className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.5em] italic text-slate-700 hover:text-white transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <ChevronLeft size={24} /> PREVIOUS_PHASE
                        </button>
                        <button
                            onClick={handleNext}
                            className="btn btn-primary px-20 py-7 rounded-[2.5rem] shadow-[0_30px_80px_-15px_rgba(99,102,241,0.6)] group/next"
                        >
                            <span className="flex items-center gap-6 text-2xl font-black tracking-widest italic uppercase">
                                {step === 4 ? "COMPLETE_SYNC" : "NEXT_PHASE"} <ArrowRight size={32} className="group-hover/next:translate-x-4 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 opacity-10">
                    <p className="text-[10px] font-black text-white uppercase tracking-[1em] italic">LUMINA.AI NEURAL SYSTEMS &copy; 2026</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-10 h-1 bg-white" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
