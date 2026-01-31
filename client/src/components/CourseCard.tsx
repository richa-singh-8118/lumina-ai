import { ArrowRight, Clock, BookOpen, Layers } from 'lucide-react';

interface CourseCardProps {
    title: string;
    subject: string;
    progress: number;
    imageColor: string;
    onClick?: () => void;
}

export function CourseCard({ title, subject, progress, imageColor, onClick }: CourseCardProps) {
    return (
        <div
            onClick={onClick}
            className="premium-card group relative overflow-hidden flex flex-col h-[340px] hover:border-primary/50 transition-all cursor-pointer bg-slate-900/40 p-0"
        >
            {/* Header Element */}
            <div className="h-32 relative overflow-hidden bg-slate-950">
                <div
                    className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-125"
                    style={{
                        background: `linear-gradient(135deg, ${imageColor}22 0%, #000 100%)`,
                        filter: 'blur(20px)'
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="text-white/10" size={80} />
                </div>
                <div className="absolute bottom-4 left-6 flex gap-1">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-8">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                        {subject}
                    </span>
                    {progress > 0 && (
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest">{progress}%</span>
                            <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">SYNCED</span>
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-black text-white italic truncate uppercase tracking-tight mb-6 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-6 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                            <Clock size={14} className="text-primary" /> 4H SESSION
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="flex items-center gap-2">
                            <BookOpen size={14} className="text-secondary" /> 12 NODES
                        </span>
                    </div>

                    <div className="relative overflow-hidden pt-1">
                        {progress > 0 ? (
                            <div className="space-y-4">
                                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden p-[1px]">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 shadow-[0_0_10px_#6366f1]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <button className="btn btn-primary w-full py-4 text-[10px] tracking-[0.2em] rounded-xl shadow-2xl">
                                    RESUME UPLOAD
                                </button>
                            </div>
                        ) : (
                            <div className="group/btn relative">
                                <button className="w-full btn btn-secondary py-4 text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all border-dashed">
                                    INITIALIZE TRANSMISSION <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
