import { useGamification } from '../contexts/GamificationContext';
import { useUser } from '../contexts/UserContext';
import { Trophy, User as UserIcon, Crown, Medal, Globe, TrendingUp } from 'lucide-react';

export function Leaderboard() {
    const { xp, level } = useGamification();
    const { user } = useUser();

    const leaderboardData = [
        { name: 'Sarah J.', xp: 4200, level: 5, stats: '98% Accuracy' },
        { name: 'Mike T.', xp: 3950, level: 4, stats: '15 Day Streak' },
        { name: 'Emma W.', xp: 3800, level: 4, stats: '8 Modules Done' },
        { name: user?.name || 'Guest', xp: xp, level: level, isUser: true, stats: 'Active' },
        { name: 'David L.', xp: 3100, level: 3, stats: 'Recent Gain' },
        { name: 'Chen X.', xp: 2950, level: 3, stats: 'Consistent' },
        { name: 'Maria G.', xp: 2800, level: 3, stats: 'Rapid Growth' },
    ].sort((a, b) => b.xp - a.xp).map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    return (
        <div className="animate-fade-up space-y-20 pb-32">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-lg">
                            <Globe size={14} className="text-amber-500 animate-pulse" />
                            <span className="text-[10px] font-bold tracking-wide uppercase text-amber-500">Global Ranking</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                        Leaderboard
                    </h1>
                    <p className="text-lg text-text-muted font-medium max-w-2xl leading-relaxed opacity-70">
                        Top performing students across the global network using the platform.
                    </p>
                </div>

                <div className="premium-card py-6 px-10 bg-amber-500/5 border-amber-500/20 flex items-center gap-6 shadow-xl relative overflow-hidden group rounded-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5 scale-125 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Trophy size={100} />
                    </div>
                    <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 shadow-lg relative z-10">
                        <Trophy className="text-amber-500" size={28} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest mb-1">Your Rank</p>
                        <p className="text-4xl font-bold text-white tracking-tight">#4</p>
                    </div>
                </div>
            </div>

            {/* Rankings List */}
            <div className="premium-card p-0 overflow-hidden border-white/5 bg-slate-950/20 backdrop-blur-3xl shadow-2xl rounded-3xl">
                <div className="grid grid-cols-12 gap-6 px-10 py-6 bg-white/[0.04] border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-8">Student</div>
                    <div className="col-span-3 text-right">XP</div>
                </div>

                <div className="divide-y divide-white/5">
                    {leaderboardData.map((entry, index) => {
                        const isTop3 = index < 3;
                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-12 gap-6 items-center px-10 py-4 transition-all duration-300 hover:bg-white/[0.02] relative group ${entry.isUser ? 'bg-primary/5' : ''}`}
                            >
                                {entry.isUser && (
                                    <div className="w-1 absolute left-0 top-0 bottom-0 bg-primary shadow-[0_0_15px_#6366f1]" />
                                )}

                                <div className="col-span-1 flex justify-center">
                                    {isTop3 ? (
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg shadow-lg ${index === 0 ? 'bg-amber-500 text-white' : ''} ${index === 1 ? 'bg-slate-400 text-white' : ''} ${index === 2 ? 'bg-orange-500 text-white' : ''}`}>
                                            {index === 0 ? <Crown size={18} /> : <span className="font-bold">{index + 1}</span>}
                                        </div>
                                    ) : (
                                        <span className="text-slate-600 font-medium">{entry.rank}</span>
                                    )}
                                </div>

                                <div className="col-span-8 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                        <UserIcon size={18} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-white text-base">{entry.name}</span>
                                            {entry.isUser && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-wide">You</span>}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                            <span>Level {entry.level}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                                            <span className="flex items-center gap-1 text-primary"><TrendingUp size={10} /> {entry.stats}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 text-right">
                                    <span className="font-bold text-white text-xl">{entry.xp.toLocaleString()}</span>
                                    <span className="text-xs text-slate-600 font-medium ml-2">XP</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center flex-col items-center gap-6 pb-20">
                <button className="btn btn-secondary px-8 py-4 font-bold uppercase text-xs tracking-widest border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 shadow-lg transition-all rounded-xl">
                    Load More Rankings
                </button>
            </div>
        </div >
    );
}
