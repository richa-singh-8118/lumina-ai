import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, History, Brain, Target } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { generateCourse } from '../services/mockAI';

import { useUser } from '../contexts/UserContext';
import { useGamification } from '../contexts/GamificationContext';

export function Dashboard() {
    const navigate = useNavigate();
    const { user, enrolledCourses, enrollCourse } = useUser();
    const { xp, streak } = useGamification();
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        (window as any).LUMINA_DEBUG = { user, enrolledCourses };
        console.log('LUMINA: STATE SYNCED', { user: user?.name, cCount: enrolledCourses.length });
    }, [user, enrolledCourses]);

    const handleGenerate = async () => {
        console.log('=== LUMINA: handleGenerate CALLED ===');
        console.log('Topic value:', topic);
        console.log('Topic trimmed:', topic.trim());

        if (!topic.trim()) {
            console.warn('LUMINA: Empty topic, aborting');
            alert('Please enter a topic to architect.');
            return;
        }

        console.log('LUMINA: Setting isGenerating to true');
        setIsGenerating(true);
        console.log('LUMINA AI: STARTING FORGE FOR:', topic);

        try {
            console.log('LUMINA: Calling generateCourse...');
            const course = await generateCourse(topic);
            console.log('LUMINA AI: FORGE SUCCESS!');
            console.log('Generated course:', JSON.stringify(course, null, 2));

            // 1. Update Global State
            console.log('LUMINA: Enrolling course...');
            enrollCourse(course);
            console.log('LUMINA: Course enrolled successfully');

            // 2. Alert User
            console.log('LUMINA: Showing success alert');
            alert(`✅ SUCCESS! Neural Sync established for: ${topic.toUpperCase()}`);

            // 3. Command Navigation
            console.log('LUMINA: Navigating to course page:', `/course/${course.id}`);
            navigate(`/course/${course.id}`, { state: { course } });
            console.log('LUMINA: Navigation command sent');

        } catch (error) {
            console.error('=== LUMINA AI: FORGE FAILURE ===');
            console.error('Error type:', typeof error);
            console.error('Error:', error);
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
            alert('❌ CRITICAL: Neural sync interrupted. Check console for details.');
        } finally {
            console.log('LUMINA: Cleaning up - setting isGenerating to false');
            setIsGenerating(false);
            setTopic('');
            console.log('=== LUMINA: handleGenerate COMPLETE ===');
        }
    };

    return (
        <div className="animate-fade-up space-y-16 pb-24">
            {/* Ultra-Premium Hero Section */}
            <div className="flex flex-col xl:flex-row items-stretch gap-8 min-h-[460px]">
                <div className="flex-1 premium-card p-12 md:p-16 flex flex-col justify-center space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-6 transition-transform duration-1000">
                        <Brain size={300} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-primary/20">
                                NEURAL LINK ESTABLISHED
                            </span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest leading-[0.85] italic uppercase">
                            Hello,<br />
                            <span className="text-gradient underline decoration-primary/20">{user?.name || 'EXPLORER'}</span>
                        </h1>
                        <p className="text-xl text-text-muted font-bold max-w-xl leading-relaxed uppercase italic opacity-60">
                            Current synaptic synchronization: <span className="text-white">OPTIMAL</span>. Ready to architect new knowledge pathways.
                        </p>
                    </div>

                    <div className="flex gap-6 relative z-10 pt-4">
                        <div className="px-8 py-5 bg-black/40 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">INTELLIGENCE XP</p>
                            <p className="text-4xl font-black text-primary italic leading-none">{xp.toLocaleString()}</p>
                        </div>
                        <div className="px-8 py-5 bg-black/40 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">SYSTÉME STREAK</p>
                            <p className="text-4xl font-black text-secondary italic leading-none">{streak} DAYS</p>
                        </div>
                    </div>
                </div>

                <div className="xl:w-[440px] premium-card p-12 flex flex-col justify-between border-primary/20 bg-primary/5 relative group overflow-hidden">
                    <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                    <div className="space-y-4 relative z-10">
                        <div className="p-4 bg-primary rounded-2xl w-fit shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                            <Target size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Daily Objective</h2>
                        <p className="text-text-muted font-medium text-sm leading-relaxed uppercase">Complete <span className="text-white font-black">2 New Nodes</span> today to reach a new synchronized state.</p>
                    </div>
                    <div className="pt-8 relative z-10">
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-primary shadow-[0_0_15px_#6366f1]" style={{ width: '45%' }} />
                        </div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-3">PROGRÉS: 45%</p>
                    </div>
                </div>
            </div>

            {/* AI Architecture Forge */}
            <section className="premium-card p-12 md:p-16 border-white/5 bg-slate-950/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="max-w-xl space-y-6">
                        <div className="flex items-center gap-4 text-primary font-black text-sm tracking-[0.4em] uppercase">
                            <Sparkles size={24} className="animate-pulse" /> Architect New Path
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest leading-[0.9] italic uppercase">
                            What do you seek to <span className="text-gradient">MASTER</span>?
                        </h2>
                        <p className="text-lg text-text-muted font-bold uppercase italic opacity-50">
                            Our neural architect will construct a specialized, high-fidelity curriculum in real-time.
                        </p>
                    </div>

                    <div className="flex-1 w-full max-w-2xl space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="ENTER TOPIC (E.G. QUANTUM COMPUTING)..."
                                className="w-full bg-slate-900 border-2 border-white/10 text-white rounded-[2rem] py-8 pl-18 pr-8 text-2xl font-black italic tracking-widest outline-none transition-all placeholder:text-slate-800 focus:border-primary focus:bg-slate-950"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                disabled={isGenerating}
                            />
                        </div>
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-700 uppercase tracking-widest">
                                <History size={14} /> RECENT: ASTROPHYSICS, REACT ARCHITECTURE
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                {/* TEST BUTTON - Always enabled */}
                                <button
                                    onClick={() => {
                                        console.log('TEST BUTTON CLICKED!');
                                        handleGenerate();
                                    }}
                                    className="btn btn-secondary px-8 py-3 rounded-xl text-sm font-black"
                                >
                                    🧪 TEST GENERATE
                                </button>

                                <button
                                    onClick={() => {
                                        console.log('MAIN BUTTON CLICKED!');
                                        console.log('Button disabled?', !topic.trim() || isGenerating);
                                        console.log('Topic:', topic);
                                        console.log('isGenerating:', isGenerating);
                                        handleGenerate();
                                    }}
                                    disabled={!topic.trim() || isGenerating}
                                    className="btn btn-primary px-16 py-6 rounded-[2rem] text-xl font-black shadow-2xl disabled:opacity-20 flex items-center gap-4"
                                >
                                    {isGenerating ? (
                                        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>INITIALIZE <ArrowRight size={24} /></>
                                    )}
                                </button>
                                {isGenerating && (
                                    <p className="text-[9px] font-black text-primary animate-pulse tracking-[0.4em] uppercase">Architecting Neural Pathway...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Streams Section */}
            <section className="space-y-12">
                <div className="flex items-center justify-between px-4 border-l-4 border-primary">
                    <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2">ACTIVE TRANSMISSIONS</p>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-widest">
                            Continue <span className="text-gradient">Evolution</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => navigate('/my-courses')}
                        className="text-primary hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-all border-b-2 border-primary/20 pb-1"
                    >
                        VIEW DATA REPOSITORY
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {enrolledCourses.length > 0 ? (
                        [...enrolledCourses].reverse().slice(0, 6).map(course => (
                            <CourseCard
                                key={course.id}
                                title={course.title}
                                subject={course.title.includes(':') ? course.title.split(':')[0] : 'KNOWLEDGE'}
                                progress={course.progress}
                                imageColor="#6366f1"
                                onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
                            />
                        ))
                    ) : (
                        <>
                            <CourseCard
                                title="Quantum Mechanics: Synaptic Flow"
                                subject="CORE STEM"
                                progress={65}
                                imageColor="#6366f1"
                            />
                            <CourseCard
                                title="Linguistic Architecture & Flow"
                                subject="LITERATURE"
                                progress={32}
                                imageColor="#ec4899"
                            />
                            <CourseCard
                                title="Modern Physics: The Void Principles"
                                subject="SCIENCE"
                                progress={0}
                                imageColor="#f59e0b"
                            />
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
