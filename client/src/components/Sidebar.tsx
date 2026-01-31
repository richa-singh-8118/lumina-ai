import { LayoutDashboard, Trophy, Settings, LogOut, Compass, Shield, Sparkles } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export function Sidebar() {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Compass, label: 'Explore', path: '/my-courses' },
        { icon: Trophy, label: 'Rankings', path: '/leaderboard' },
        { icon: Shield, label: 'Parental', path: '/guardian' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] bg-bg-sidebar border-r border-white/5 flex flex-col z-[100] p-6 shadow-2xl">
            {/* Logo Section */}
            <div className="p-4 mb-4 flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                        <Sparkles color="white" size={20} />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">LUMINA<span className="text-primary">.</span></h1>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400 tracking-wider">Active</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-200 font-bold text-xs tracking-wide
                            ${isActive
                                ? 'bg-primary/20 text-white border border-primary/30 shadow-lg'
                                : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={18} className={isActive ? 'text-primary' : ''} />
                                <span>{item.label}</span>
                                <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-primary opacity-0 active-dot transition-opacity shadow-[0_0_8px_#6366f1]`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout Section */}
            <div className="p-4 mt-auto border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-text-muted hover:text-white transition-all font-bold text-xs tracking-wide group hover:bg-red-500/10 rounded-xl"
                >
                    <div className="p-1.5 rounded-lg group-hover:bg-red-500/20 transition-colors">
                        <LogOut size={16} />
                    </div>
                    <span>Logout</span>
                </button>
            </div>

            <style>{`
                .active .active-dot {
                    opacity: 1 !important;
                }
            `}</style>
        </aside>
    );
}
