import { Bell, Search, Flame, Zap, User, LogOut } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { generateCourse } from '../services/mockAI';

export function TopBar() {
    const { xp, streak } = useGamification();
    const { user, logout, enrollCourse } = useUser();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = async () => {
        console.log('🔍 TopBar: handleSearch called');
        console.log('🔍 TopBar: searchQuery =', searchQuery);
        console.log('🔍 TopBar: searchQuery.trim() =', searchQuery.trim());
        console.log('🔍 TopBar: isSearching =', isSearching);

        if (!searchQuery.trim()) {
            console.warn('⚠️ TopBar: Empty search query, aborting');
            alert('Please enter a topic to generate a course!');
            return;
        }

        if (isSearching) {
            console.warn('⚠️ TopBar: Already searching, aborting');
            return;
        }

        console.log('✅ TopBar: Initiating course generation for:', searchQuery);
        setIsSearching(true);

        try {
            console.log('📡 TopBar: Calling generateCourse API...');
            const course = await generateCourse(searchQuery);
            console.log('✅ TopBar: Course generated successfully:', course);

            console.log('📝 TopBar: Enrolling course...');
            enrollCourse(course);
            console.log('✅ TopBar: Course enrolled');

            console.log('🧹 TopBar: Clearing search query');
            setSearchQuery('');

            console.log('🚀 TopBar: Navigating to course page:', `/course/${course.id}`);
            navigate(`/course/${course.id}`, { state: { course } });
        } catch (error) {
            console.error('❌ TopBar: Course generation failed:', error);
            alert('Failed to generate course. Please try again.');
        } finally {
            console.log('🏁 TopBar: Cleaning up, setting isSearching to false');
            setIsSearching(false);
        }
    };

    return (
        <header className="h-24 border-b border-white/5 bg-bg-main/60 backdrop-blur-3xl flex items-center justify-between px-10 sticky top-0 z-50">
            {/* Command Area */}
            <div className="flex-1 max-w-xl relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                    type="text"
                    placeholder={isSearching ? "GENERATING..." : "QUERY DATA REPOSITORY..."}
                    className="w-full pl-14 pr-6 py-4 bg-slate-900/40 border border-white/10 rounded-2xl text-xs font-black tracking-widest focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-700"
                    value={searchQuery}
                    onChange={(e) => {
                        console.log('⌨️ TopBar: User typing, new value:', e.target.value);
                        setSearchQuery(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        console.log('🔑 TopBar: Key pressed:', e.key);
                        if (e.key === 'Enter') {
                            console.log('↩️ TopBar: Enter key detected, calling handleSearch');
                            handleSearch();
                        }
                    }}
                    disabled={isSearching}
                />
            </div>

            {/* Metrics Cluster */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 px-6 py-2.5 bg-slate-900/60 rounded-2xl border border-white/5 shadow-inner">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <Flame size={18} className="text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]" fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">STREAK</span>
                            <span className="text-sm font-black text-white leading-none">{streak} DAYS</span>
                        </div>
                    </div>

                    <div className="w-px h-8 bg-white/5" />

                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                            <Zap size={18} className="text-primary shadow-[0_0_10px_rgba(99,102,241,0.4)]" fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">XP NUCLEI</span>
                            <span className="text-sm font-black text-white leading-none">{xp.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3 bg-slate-900/60 text-text-muted hover:text-white transition-all rounded-xl border border-white/5 hover:border-white/20 relative group">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-bg-main animate-pulse shadow-[0_0_8px_#6366f1]" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="p-3 bg-slate-900/60 text-text-muted hover:text-red-500 transition-all rounded-xl border border-white/5 hover:border-red-500/20 group"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>

                    <div className="h-10 w-px bg-white/5 mx-2" />

                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="text-right">
                            <p className="text-xs font-black text-white leading-none mb-1 group-hover:text-primary transition-colors">{user?.name || 'Explorer'}</p>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">RANK: ADEPTE</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary blur-md opacity-20 group-hover:opacity-60 transition-opacity" />
                            <div className="w-11 h-11 bg-slate-900 border-2 border-primary/50 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
