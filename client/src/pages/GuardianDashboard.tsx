import { useUser } from '../contexts/UserContext';
import { useGamification } from '../contexts/GamificationContext';
import {
    Shield, Activity, Clock,
    Zap, Brain, Target, ShieldCheck, History, TrendingUp,
    HardDrive, Layers, Cpu
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function GuardianDashboard() {
    const { user } = useUser();
    const { xp } = useGamification();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] premium-card p-20 text-center space-y-12 max-w-4xl mx-auto mt-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                    <Shield size={300} />
                </div>
                <div className="w-32 h-32 bg-primary/10 rounded-[3rem] flex items-center justify-center border border-primary/20 shadow-2xl relative">
                    <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
                    <Shield className="w-16 h-16 text-primary relative z-10" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Access Restricted</h2>
                    <p className="text-text-muted max-w-xl mx-auto text-lg font-medium leading-relaxed opacity-80">
                        Parental oversight requires an active student session. Please log in to view student progress and telemetry.
                    </p>
                </div>
                <div className="flex gap-4">
                    <a href="/login" className="btn btn-primary px-8 py-3 rounded-xl font-bold tracking-wide">Login Now</a>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-up space-y-16 pb-32">

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                        <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide border border-emerald-500/20 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" /> Oversight Active
                        </span>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-slate-500 text-xs font-bold tracking-wide">ID: #AX-992</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Mission <span className="text-gradient">Control</span>
                    </h1>
                    <p className="text-xl text-text-muted font-medium max-w-3xl leading-relaxed opacity-70">
                        Synchronized oversight for student: <span className="text-white font-bold">{user.name}</span>
                    </p>
                </div>

                <div className="flex gap-4">
                    <button className="btn btn-secondary px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold tracking-wide">
                        <History size={18} className="text-primary" /> Audit History
                    </button>
                    <button className="btn btn-primary px-6 py-3 rounded-xl shadow-lg text-sm font-bold tracking-wide">Generate Report</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <IntelWidget
                    label="Synced Intelligence"
                    value={xp.toLocaleString()}
                    icon={Zap}
                    color="text-indigo-400"
                    bg="bg-indigo-400/10"
                    sub="XP Acquired"
                />
                <IntelWidget
                    label="Focus Integrity"
                    value="92%"
                    icon={ShieldCheck}
                    color="text-emerald-400"
                    bg="bg-emerald-400/10"
                    sub="Safe Boundary"
                />
                <IntelWidget
                    label="Daily Exposure"
                    value="2.5h"
                    icon={Clock}
                    color="text-pink-400"
                    bg="bg-pink-400/10"
                    sub="Network Uptime"
                />
                <IntelWidget
                    label="Global Standing"
                    value="#4"
                    icon={TrendingUp}
                    color="text-cyan-400"
                    bg="bg-cyan-400/10"
                    sub="Elite Percentile"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

                {/* Cognitive Velocity Section */}
                <div className="xl:col-span-8 space-y-12">
                    <div className="premium-card p-14 bg-slate-900/10 border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-6 transition-transform duration-1000">
                            <Brain size={300} />
                        </div>
                        <div className="flex items-center justify-between mb-12 relative z-10">
                            <div className="space-y-3">
                                <h3 className="text-3xl font-bold text-white flex items-center gap-4 tracking-tight leading-none">
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                        <Cpu size={24} />
                                    </div>
                                    Cognitive Velocity
                                </h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-16 opacity-80">Cross-Disciplinary Intelligence Expansion Rate</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
                            <VelocityBar label="Algorithmic Logic" value={85} color="bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
                            <VelocityBar label="Quantum Mechanics" value={62} color="bg-pink-500 shadow-[0_0_15px_#ec4899]" />
                            <VelocityBar label="Socio-Archaeology" value={94} color="bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
                            <VelocityBar label="Biological Synthesis" value={78} color="bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="premium-card p-8 flex items-center gap-6 border-amber-500/10 bg-amber-500/5 group">
                            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-lg transform group-hover:scale-105 transition-transform">
                                <Target className="text-amber-500" size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-white tracking-tight">Goal Sync</h4>
                                <p className="text-amber-500/70 font-bold uppercase text-[10px] tracking-wider opacity-80">80% Objective Hit</p>
                            </div>
                        </div>
                        <div className="premium-card p-8 flex items-center gap-6 border-indigo-500/10 bg-indigo-500/5 group">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-lg transform group-hover:scale-105 transition-transform">
                                <HardDrive className="text-indigo-400" size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-white tracking-tight">Link Integrity</h4>
                                <p className="text-indigo-400/70 font-bold uppercase text-[10px] tracking-wider opacity-80">Core Status: Elite</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real-time Telemetry Section */}
                <div className="xl:col-span-4 h-full">
                    <div className="premium-card h-full bg-slate-950/60 border-white/5 p-10 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 group-hover:rotate-[-12px] transition-transform duration-1000">
                            <Layers size={300} />
                        </div>
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-4 tracking-tight">
                                <Activity className="text-pink-500 animate-pulse" size={24} /> Telemetry
                            </h3>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-6 bg-pink-500/20 rounded-full" />)}
                            </div>
                        </div>

                        <div className="space-y-6 flex-1 relative z-10">
                            <AuditRow type="success" title="Module Sync Complete" time="2h Ago" desc="Quantic Structures III finalized with 98% accuracy." />
                            <AuditRow type="warning" title="Attention Drift" time="6h Ago" desc="Visual synchronization interrupted during assessment." />
                            <AuditRow type="info" title="Pathway Adapted" time="Yest." desc="Intensity adjustment for biological synthesis." />
                            <AuditRow type="success" title="Rank Escalation" time="2d Ago" desc="System upgrade to 'Elite' synchronization tier." />
                        </div>

                        <button className="w-full mt-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] tracking-widest hover:bg-white/10 hover:border-white/20 transition-all uppercase shadow-lg relative z-10">
                            Download Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface IntelWidgetProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    bg: string;
    sub: string;
}

function IntelWidget({ label, value, icon: Icon, color, bg, sub }: IntelWidgetProps) {
    return (
        <div className="premium-card border-white/5 hover:border-primary/40 p-8 flex flex-col justify-between h-[180px] bg-slate-900/20 shadow-xl group">
            <div className="flex justify-between items-start">
                <div className={`${bg} ${color} p-3 rounded-xl border border-white/5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase opacity-80">{label}</p>
                    <h3 className={`text-3xl md:text-4xl font-bold text-white mt-2 leading-none tracking-tight ${color}`}>{value}</h3>
                </div>
            </div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest border-t border-white/5 pt-4 opacity-70">{sub}</p>
        </div>
    );
}

interface VelocityBarProps {
    label: string;
    value: number;
    color: string;
}

function VelocityBar({ label, value, color }: VelocityBarProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-white font-bold text-xs uppercase tracking-widest opacity-60">{label}</span>
                <span className="text-xl font-bold text-white tracking-tight">{value}%</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden flex items-stretch border border-white/5">
                <div className={`h-full ${color} rounded-full transition-all duration-1500`} style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

interface AuditRowProps {
    type: 'success' | 'warning' | 'info';
    title: string;
    time: string;
    desc: string;
}

function AuditRow({ type, title, time, desc }: AuditRowProps) {
    const themes = {
        success: 'border-emerald-500/20 text-emerald-400',
        warning: 'border-amber-500/20 text-amber-500',
        info: 'border-indigo-500/20 text-indigo-400'
    };

    return (
        <div className={`p-6 rounded-2xl border ${themes[type as keyof typeof themes].split(' ')[0]} bg-white/[0.01] hover:bg-white/[0.04] transition-all group cursor-default relative overflow-hidden`}>
            <div className="absolute top-0 left-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity bg-current" />
            <div className="flex justify-between items-center mb-2">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${themes[type as keyof typeof themes].split(' ')[1]}`}>{title}</p>
                <span className="text-[10px] font-bold text-slate-600 tracking-wider uppercase">{time}</span>
            </div>
            <p className="text-sm text-text-muted font-medium leading-relaxed group-hover:text-white transition-colors opacity-80">{desc}</p>
        </div>
    );
}
