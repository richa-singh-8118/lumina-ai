import { useUser } from '../contexts/UserContext';
import { CourseCard } from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Database, Plus } from 'lucide-react';

export function MyCourses() {
    const { enrolledCourses } = useUser();
    const navigate = useNavigate();

    return (
        <div className="animate-fade-up space-y-14 pb-24">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Database size={14} className="text-indigo-400" />
                            <span className="text-[10px] font-black tracking-widest uppercase text-indigo-400">Library Index #L-02</span>
                        </div>
                    </div>
                    <h1 className="text-h1 text-white tracking-tighter leading-none">
                        My Neural <span className="text-gradient underline decoration-indigo-500/30">Library</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-medium max-w-2xl leading-relaxed">
                        Access and manage all established intelligence pathways. Your specialized adaptive curriculum repository.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Find Intelligence Node..."
                            className="bg-slate-900/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:border-indigo-500/40 focus:outline-none transition-all w-80 shadow-2xl"
                        />
                    </div>
                    <button className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 text-slate-500 hover:text-white hover:border-white/20 transition-all shadow-xl">
                        <Filter size={24} />
                    </button>
                </div>
            </div>

            {enrolledCourses.length === 0 ? (
                <div className="premium-card py-32 text-center flex flex-col items-center justify-center space-y-8 border-dashed border-white/10 bg-transparent">
                    <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center relative group">
                        <BookOpen size={48} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
                        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white tracking-tight">The Library is Offline</h2>
                        <p className="text-text-secondary text-lg font-medium max-w-sm mx-auto leading-relaxed">
                            No knowledge transfers have been initiated. Please use the AI Forge to architect your first pathway.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary px-12 py-5 rounded-2xl shadow-indigo-500/20 shadow-2xl animate-bounce-slow"
                    >
                        INITIALIZE AI FORGE
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {enrolledCourses.map((course) => (
                        <div key={course.id} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-1000 group-hover:duration-200" />
                            <CourseCard
                                key={course.id}
                                title={course.title}
                                subject={course.title.includes(':') ? course.title.split(':')[0] : 'Intelligence'}
                                progress={course.progress}
                                imageColor="var(--primary)"
                                onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
                            />
                        </div>
                    ))}

                    {/* Add More card placeholder */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="premium-card flex flex-col items-center justify-center gap-6 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-10 min-h-[320px] group transition-all"
                    >
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                            <Plus size={32} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <h3 className="text-xl font-black text-slate-500 group-hover:text-white transition-colors tracking-tight uppercase">Forge New Pathway</h3>
                    </button>
                </div>
            )}
        </div>
    );
}
