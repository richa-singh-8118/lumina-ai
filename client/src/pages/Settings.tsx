import { useState } from 'react';
import {
    Bell, Shield, Monitor, Moon,
    Eye, Camera, LogOut, User, Globe, MessageSquare,
    Lock, Palette, Zap, Cpu, Sparkles
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ToggleElement = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-20 h-10 rounded-full relative transition-all duration-700 focus:outline-none p-1.5 border-2 ${active ? 'bg-primary/20 border-primary shadow-[0_0_20px_#6366f1]' : 'bg-slate-900 border-white/5'
            }`}
    >
        <div className={`w-6 h-6 rounded-xl transition-all duration-700 shadow-2xl ${active ? 'translate-x-10 bg-primary shadow-primary/50 rotate-180' : 'translate-x-0 bg-slate-700 rotate-0'
            }`} />
    </button>
);

export function Settings() {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [settings, setSettings] = useState({
        darkMode: true,
        reducedMotion: false,
        dailyReminders: true,
        progressUpdates: true,
        publicProfile: false,
        cameraAccess: true,
        aiTutoring: true,
        safeSearch: true
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="animate-fade-up pb-32 space-y-20">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-primary/10 border border-primary/20 shadow-lg">
                            <Cpu size={14} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-bold tracking-wide uppercase text-primary">System Config</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                        Settings
                    </h1>
                    <p className="text-lg text-text-muted font-medium max-w-2xl leading-relaxed opacity-70">
                        Manage your account preferences, notifications, and security settings.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary px-6 py-3 rounded-xl border-red-500/10 text-red-500 hover:bg-red-500/5 group font-bold text-sm"
                    >
                        <LogOut size={16} className="group-hover:translate-x-[-2px] transition-transform inline-block mr-2" /> Logout
                    </button>
                    <button className="btn btn-primary px-8 py-3 rounded-xl shadow-lg text-sm font-bold tracking-wide">Sync Changes</button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 items-start">

                {/* Sidebar Nav */}
                <div className="xl:col-span-3 space-y-8">
                    <div className="premium-card p-4 space-y-2 bg-slate-900/20 border-white/5 shadow-xl backdrop-blur-3xl rounded-2xl">
                        <ConfigNav icon={User} label="Profile" active />
                        <ConfigNav icon={Palette} label="Appearance" />
                        <ConfigNav icon={Bell} label="Notifications" />
                        <ConfigNav icon={Lock} label="Security" />
                        <ConfigNav icon={Zap} label="Adaptive AI" />
                    </div>

                    <div className="premium-card p-6 bg-indigo-500/5 border-indigo-500/20 relative overflow-hidden group rounded-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                            <Sparkles size={60} />
                        </div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">System Status</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                                <Cpu size={20} className="text-primary animate-pulse" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-white tracking-wide leading-none mb-1">Stable</p>
                                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider leading-none">v2.0.88-alpha</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Matrix */}
                <div className="xl:col-span-9 space-y-12">

                    {/* Appearance Section */}
                    <ConfigMatrix title="Appearance" icon={Monitor} accent="text-cyan-400">
                        <MatrixRow
                            icon={Moon}
                            title="Dark Mode"
                            desc="High-contrast dark theme optimized for low-light environments."
                            control={<ToggleElement active={settings.darkMode} onClick={() => toggle('darkMode')} />}
                        />
                        <MatrixRow
                            icon={Zap}
                            title="Reduced Motion"
                            desc="Minimize animations and transition effects."
                            control={<ToggleElement active={settings.reducedMotion} onClick={() => toggle('reducedMotion')} />}
                        />
                    </ConfigMatrix>

                    {/* Notification Section */}
                    <ConfigMatrix title="Notifications" icon={Bell} accent="text-amber-400">
                        <MatrixRow
                            icon={MessageSquare}
                            title="Daily Reminders"
                            desc="Receive notifications to maintain your learning streak."
                            control={<ToggleElement active={settings.dailyReminders} onClick={() => toggle('dailyReminders')} />}
                        />
                        <MatrixRow
                            icon={Globe}
                            title="Parental Updates"
                            desc="Automatically share progress summaries with guardians."
                            control={<ToggleElement active={settings.progressUpdates} onClick={() => toggle('progressUpdates')} />}
                        />
                    </ConfigMatrix>

                    {/* Security Section */}
                    <ConfigMatrix title="Security" icon={Shield} accent="text-emerald-400">
                        <MatrixRow
                            icon={Eye}
                            title="Public Profile"
                            desc="Allow your profile to be visible on leaderboards."
                            control={<ToggleElement active={settings.publicProfile} onClick={() => toggle('publicProfile')} />}
                        />
                        <MatrixRow
                            icon={Camera}
                            title="Camera Access"
                            desc="Enable camera for identity verification during exams."
                            control={<ToggleElement active={settings.cameraAccess} onClick={() => toggle('cameraAccess')} />}
                        />
                    </ConfigMatrix>
                </div>
            </div>
        </div>
    );
}

interface ConfigMatrixProps {
    title: string;
    icon: LucideIcon;
    accent: string;
    children: React.ReactNode;
}

function ConfigMatrix({ title, icon: Icon, accent, children }: ConfigMatrixProps) {
    return (
        <div className="premium-card p-0 overflow-hidden bg-slate-900/10 border-white/5 shadow-xl group rounded-3xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.03] flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-4 tracking-tight">
                    <div className={`p-3 rounded-xl bg-slate-950 border border-white/10 ${accent} shadow-lg transform group-hover:rotate-12 transition-transform`}>
                        <Icon size={24} />
                    </div>
                    {title}
                </h2>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-1 bg-white/5 rounded-full" />)}
                </div>
            </div>
            <div className="divide-y divide-white/5 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
}

interface ConfigNavProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
}

function ConfigNav({ icon: Icon, label, active = false }: ConfigNavProps) {
    return (
        <button className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 group relative ${active
            ? 'bg-primary/10 text-white border border-primary/30 shadow-lg z-10'
            : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
            }`}>
            {active && <div className="absolute left-0 top-0 h-full w-1 bg-primary shadow-[0_0_10px_#6366f1] rounded-l-xl" />}
            <div className="flex items-center gap-4">
                <Icon size={20} className={active ? 'text-primary' : 'group-hover:text-primary transition-colors'} />
                <span className="font-bold text-xs uppercase tracking-wider">{label}</span>
            </div>
            {active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#6366f1] animate-pulse" />}
        </button>
    );
}

interface MatrixRowProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    control: React.ReactNode;
}

function MatrixRow({ icon: Icon, title, desc, control }: MatrixRowProps) {
    return (
        <div className="flex items-center justify-between p-12 hover:bg-white/[0.02] transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-10">
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 group-hover:border-primary/30 group-hover:bg-slate-900 transition-all shadow-inner transform group-hover:scale-110">
                    <Icon size={24} className="text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-1">
                    <p className="font-bold text-lg text-white tracking-wide group-hover:text-primary transition-colors">{title}</p>
                    <p className="text-sm text-text-muted font-medium opacity-60 leading-relaxed max-w-lg group-hover:opacity-90 transition-opacity">{desc}</p>
                </div>
            </div>
            <div className="ml-16 scale-125">
                {control}
            </div>
        </div>
    );
}
