import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Course } from '../services/mockAI';
import { PlayCircle, Clock, BookOpen, ChevronLeft, Award, FileText, CheckCircle2, Zap, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function CourseView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { enrolledCourses } = useUser();

    // Try to get course from state, or find it in context by ID
    const course: Course | undefined = state?.course || enrolledCourses.find(c => c.id === id);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 premium-card space-y-8 max-w-2xl mx-auto mt-20">
                <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center border border-red-500/20 shadow-2xl animate-pulse">
                    <FileText className="text-red-500" size={48} />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-white tracking-widest italic uppercase">Node Not Found</h2>
                    <p className="text-text-muted mt-4 font-bold uppercase italic opacity-60">The requested intelligence module could not be synchronized from the cloud repository.</p>
                </div>
                <button className="btn btn-primary px-12 py-5 rounded-2xl" onClick={() => navigate('/dashboard')}>
                    RETURN TO TERMINAL
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-up space-y-12 pb-24">
            {/* Header Navigation */}
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 text-text-muted hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.4em] group"
            >
                <ChevronLeft size={20} className="group-hover:translate-x-[-6px] transition-transform" />
                BACK TO DATA CLUSTER
            </button>

            {/* Cinematic Course Header */}
            <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[500px]">
                <div className="lg:w-2/3 premium-card p-12 md:p-16 space-y-8 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:rotate-12 transition-transform duration-1000">
                        <Layers size={300} />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20">
                                NEURAL PATHWAY
                            </span>
                            <div className="h-0.5 w-12 bg-white/5" />
                            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                <Award size={16} /> MASTER CLASS LEVEL 4
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest leading-[0.85] italic uppercase">
                            {course.title.split(' ').map((word, i) => (
                                <span key={i} className={i === 0 ? 'text-white' : 'text-gradient'}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xl text-text-muted font-bold max-w-2xl leading-relaxed uppercase italic opacity-60">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap gap-12 pt-8 border-t border-white/5">
                            <StatSpec icon={Clock} label="SYNC DURATION" value={`${course.lessons.length * 20}m`} color="text-indigo-400" />
                            <StatSpec icon={BookOpen} label="INTELLIGENCE NODES" value={course.lessons.length} color="text-pink-400" />
                            <StatSpec icon={Zap} label="COGNITIVE TIER" value="ELITE" color="text-cyan-400" />
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 w-full">
                    <div className="premium-card p-12 border-primary/20 bg-primary/5 h-full flex flex-col justify-between group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <PlayCircle size={200} />
                        </div>
                        <div className="space-y-6 relative z-10">
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Initialize Pathway</h3>
                            <p className="text-text-muted font-bold text-sm uppercase opacity-60 leading-relaxed">Prepare for deep cognitive synchronization directed by Lumina's Adaptive Architect.</p>
                        </div>
                        <div className="space-y-6 relative z-10">
                            <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/5 shadow-inner">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PROGRESSED STATE</p>
                                <p className="text-3xl font-black text-white italic tracking-tighter">0.00%</p>
                            </div>
                            <button
                                onClick={() => navigate(`/course/${id}/lesson/${course.lessons[0].id}`, {
                                    state: { lesson: course.lessons[0], courseTitle: course.title, courseId: id }
                                })}
                                className="w-full btn btn-primary py-6 text-xl rounded-3xl shadow-2xl shadow-primary/30 font-black tracking-widest"
                            >
                                START SESSION
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-12">
                <div className="flex items-center justify-between px-6 border-l-4 border-primary">
                    <h2 className="text-4xl font-black text-white tracking-widest uppercase italic">Node Structure</h2>
                    <div className="px-6 py-2.5 rounded-2xl bg-slate-900 border border-white/5 text-[10px] font-black text-text-muted uppercase tracking-[0.3em] shadow-inner">
                        {course.lessons.length} ACTIVE MODULES
                    </div>
                </div>

                <div className="grid gap-6">
                    {course.lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            onClick={() => navigate(`/course/${id}/lesson/${lesson.id}`, {
                                state: { lesson, courseTitle: course.title, courseId: id }
                            })}
                            className="premium-card p-10 flex flex-col md:flex-row md:items-center gap-12 group hover:border-primary/50 bg-slate-950/20 border-white/5 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="w-24 h-24 rounded-[2rem] bg-slate-900 text-slate-700 flex items-center justify-center text-4xl font-black group-hover:text-primary group-hover:bg-primary/10 border border-white/5 shadow-inner transition-all shrink-0 italic">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="flex-1 space-y-4">
                                <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-primary transition-colors uppercase italic">{lesson.title}</h3>
                                <div className="flex gap-8 items-center">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                                        <Clock size={16} className="text-primary" /> {lesson.duration} Protocol
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                                        <PlayCircle size={16} className="text-secondary" /> {lesson.type} SYNC
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                                        <CheckCircle2 size={16} /> VERIFIED
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-secondary px-10 py-5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all font-black text-[10px] tracking-[0.3em]">
                                INITIALIZE &gt;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface StatSpecProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: string;
}

function StatSpec({ icon: Icon, label, value, color }: StatSpecProps) {
    return (
        <div className="space-y-4">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">{label}</p>
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-slate-900 border border-white/5 ${color} shadow-2xl`}>
                    <Icon size={20} />
                </div>
                <p className="text-2xl font-black text-white tracking-tighter italic uppercase">{value}</p>
            </div>
        </div>
    );
}
