import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { generateAdaptiveLesson } from '../services/mockAI';
import type { Lesson } from '../services/mockAI';
import { AlertTriangle, CheckCircle2, Award, ArrowRight, RefreshCw, Sparkles, Brain, Clock, ChevronLeft } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';
import { AITutor } from '../components/AITutor';
import { useUser } from '../contexts/UserContext';

export function LessonView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();
    const { enrolledCourses } = useUser();
    const { addXp } = useGamification();

    const course = enrolledCourses.find(c => c.id === courseId);
    const lesson: Lesson | undefined = state?.lesson || course?.lessons.find(l => l.id === lessonId);
    const courseTitle: string = state?.courseTitle || course?.title || 'Module';

    const [step, setStep] = useState<'content' | 'quiz' | 'complete'>('content');
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCheatDetected, setIsCheatDetected] = useState(false);
    const [score, setScore] = useState(0);
    const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
    const [loadingAdaptive, setLoadingAdaptive] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && step === 'quiz') {
                setIsCheatDetected(true);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [step]);

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] premium-card p-12 text-center space-y-8 max-w-2xl mx-auto mt-20">
                <AlertTriangle className="text-red-500" size={64} />
                <h2 className="text-3xl font-bold text-white tracking-wide">Sync Terminal Error</h2>
                <p className="text-text-muted text-lg opacity-80">The intelligence stream was interrupted. Session cannot be restored.</p>
                <button className="btn btn-primary px-12 py-4 rounded-xl font-bold" onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
            </div>
        );
    }

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;
        const currentQuestion = lesson.quiz?.[quizIndex];
        const correct = selectedOption === currentQuestion?.correctIndex;
        setIsAnswered(true);
        if (correct) setScore(prev => prev + 1);
    };

    const handleNext = async () => {
        if (lesson.quiz && quizIndex < lesson.quiz.length - 1) {
            setQuizIndex(i => i + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setStep('complete');
            addXp(100 + (score * 50));
            setLoadingAdaptive(true);
            const adaptiveLesson = await generateAdaptiveLesson(lesson.id, score, lesson.quiz?.length || 1);
            setNextLesson(adaptiveLesson);
            setLoadingAdaptive(false);
        }
    };

    if (isCheatDetected) {
        return (
            <div className="max-w-2xl mx-auto mt-24 premium-card p-16 text-center border-red-500/30 shadow-[0_60px_100px_rgba(239,68,68,0.2)] relative overflow-hidden bg-slate-950">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-2xl">
                    <AlertTriangle size={40} className="text-red-500 shadow-xl shadow-red-500/20" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Integrity Protocol</h2>
                <p className="text-text-muted text-lg mb-10 leading-relaxed opacity-80">
                    Visual synchronization lost. Assessment security requires a complete session purge and restart to maintain neural integrity.
                </p>
                <button
                    className="btn btn-primary bg-red-600 hover:bg-red-700 w-full py-4 text-lg font-bold tracking-wide rounded-2xl"
                    onClick={() => {
                        setIsCheatDetected(false);
                        setStep('content');
                        setQuizIndex(0);
                        setScore(0);
                        setSelectedOption(null);
                    }}
                >
                    Restart Session
                </button>
            </div>
        );
    }

    if (step === 'complete') {
        const percentage = (score / (lesson.quiz?.length || 1)) * 100;
        const earnedXp = 100 + (score * 50);

        return (
            <div className="max-w-4xl mx-auto mt-12 animate-fade-up space-y-12 pb-24 px-6 text-center">
                <div className="premium-card p-20 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.85)] border-white/5 bg-slate-900/20 relative">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className={`w-32 h-32 rounded-[3.5rem] mx-auto mb-14 flex items-center justify-center shadow-2xl border border-white/10 ${percentage > 60 ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-emerald-500/30' : 'bg-gradient-to-br from-amber-400 to-orange-600 shadow-amber-500/30'
                        }`}>
                        <Award size={64} className="text-white drop-shadow-2xl" />
                    </div>

                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        {percentage > 60 ? 'Lesson Complete' : 'Review Required'}
                    </h2>
                    <p className="text-xl text-text-muted font-medium mb-12 opacity-60 tracking-wider">
                        Score: <span className="text-white">{score} / {lesson.quiz?.length || 0}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="premium-card p-8 bg-white/5 border-white/5 shadow-inner">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">XP Earned</p>
                            <p className="text-5xl font-bold text-primary">+{earnedXp}</p>
                        </div>
                        <div className="premium-card p-8 bg-white/5 border-white/5 shadow-inner">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</p>
                            <p className={`text-3xl font-bold tracking-widest ${percentage > 60 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {percentage > 60 ? 'ELITE' : 'BASIC'}
                            </p>
                        </div>
                    </div>

                    {loadingAdaptive ? (
                        <div className="py-12 flex flex-col items-center gap-8">
                            <div className="relative">
                                <RefreshCw className="animate-spin text-primary" size={56} />
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            </div>
                            <p className="font-bold text-xs text-slate-600 uppercase tracking-widest animate-pulse">Calculating Adaptive Extension...</p>
                        </div>
                    ) : (
                        nextLesson && (
                            <div className="premium-card bg-primary/5 border-primary/20 text-left p-10 mb-10 group hover:bg-primary/10 transition-all border-dashed shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Sparkles size={100} />
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-primary">
                                    <Brain size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Recommended Next Step</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-8 tracking-tight leading-tight">
                                    {nextLesson.title}
                                </h3>
                                <button
                                    className="btn btn-primary w-full py-5 text-lg font-bold tracking-wider rounded-2xl group/btn"
                                    onClick={() => {
                                        setStep('content');
                                        setQuizIndex(0);
                                        setScore(0);
                                        setSelectedOption(null);
                                        setNextLesson(null);
                                        navigate(`/course/${state?.courseId}/lesson/${nextLesson.id}`, {
                                            state: { lesson: nextLesson, courseTitle: courseTitle },
                                            replace: true
                                        });
                                    }}
                                >
                                    Proceed to Next Lesson &gt;&gt;
                                </button>
                            </div>
                        )
                    )}

                    <button className="text-slate-600 hover:text-white font-medium text-xs uppercase tracking-widest transition-all" onClick={() => navigate('/dashboard')}>
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-up relative min-h-screen">
            <AITutor />

            <div className="max-w-5xl mx-auto space-y-12 pb-32 pt-10 px-6">
                {/* Protocol Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-slate-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest group"
                    >
                        <ChevronLeft size={18} className="group-hover:translate-x-[-4px] transition-transform" /> Back
                    </button>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <Clock size={14} className="text-primary" /> {lesson.duration}
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 px-4 py-2 rounded-xl border border-primary/20">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#6366f1]" /> Active
                        </div>
                    </div>
                </div>

                <div className="premium-card p-14 md:p-24 min-h-[85vh] relative shadow-[0_100px_200px_-50px_rgba(0,0,0,0.95)] bg-slate-900/10 border-white/5 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-white/[0.03]">
                        <div
                            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-[2500ms] ease-out shadow-[0_0_30px_rgba(99,102,241,0.7)]"
                            style={{ width: step === 'content' ? '50%' : '100%' }}
                        />
                    </div>

                    {step === 'content' && (
                        <div className="animate-fade-up space-y-12">
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">Lesson Content</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                                    {lesson.title}
                                </h1>
                            </div>

                            <article className="prose prose-invert prose-lg md:prose-xl max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
                                prose-h1:text-4xl prose-h1:mb-8 prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-slate-400 prose-h1:bg-clip-text prose-h1:text-transparent
                                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-6
                                prose-h3:text-xl prose-h3:text-primary prose-h3:mt-8
                                prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-6
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white prose-strong:font-bold 
                                prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-slate-400
                                prose-code:text-accent prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm
                                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-6
                                prose-ul:space-y-2 prose-li:text-slate-300 prose-li:marker:text-primary
                                ">
                                <ReactMarkdown>{lesson.content}</ReactMarkdown>
                            </article>

                            <div className="flex justify-end pt-24 border-t border-white/5">
                                <button
                                    className="btn btn-primary px-12 py-5 text-xl font-bold tracking-widest group/btn shadow-lg rounded-2xl"
                                    onClick={() => setStep('quiz')}
                                >
                                    Start Assessment &gt;&gt;
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'quiz' && lesson.quiz && (
                        <div className="max-w-4xl mx-auto py-10 animate-fade-up">
                            <div className="flex items-center justify-between mb-16">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Assessment</p>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Question {quizIndex + 1} <span className="text-slate-600 mx-3">/</span> {lesson.quiz.length}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Score</p>
                                    <p className="text-4xl font-bold text-emerald-400">{score}</p>
                                </div>
                            </div>

                            <div className="premium-card p-10 mb-12 bg-black/40 border-white/10 relative group shadow-xl">
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                    <div
                                        className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_#6366f1]"
                                        style={{ width: `${((quizIndex + 1) / lesson.quiz.length) * 100}%` }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold text-white leading-tight text-center">
                                    {lesson.quiz[quizIndex].text}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 gap-8 mb-20">
                                {lesson.quiz[quizIndex].options.map((option, idx) => {
                                    const isSelected = selectedOption === idx;
                                    const isCorrectOption = idx === lesson.quiz![quizIndex].correctIndex;

                                    let statusStyle = 'bg-slate-900/40 border-white/5 text-slate-600 hover:border-white/20 hover:bg-slate-900';
                                    if (isAnswered) {
                                        if (isCorrectOption) statusStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)] scale-[1.03] z-10';
                                        else if (isSelected) statusStyle = 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_50px_rgba(239,68,68,0.3)]';
                                        else statusStyle = 'bg-transparent border-white/5 opacity-5 text-slate-900 grayscale blur-[4px] pointer-events-none';
                                    } else if (isSelected) {
                                        statusStyle = 'bg-primary/20 border-primary text-white shadow-[0_0_60px_rgba(99,102,241,0.4)] scale(1.04) z-20';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => !isAnswered && setSelectedOption(idx)}
                                            disabled={isAnswered}
                                            className={`w-full p-6 text-left rounded-2xl border transition-all duration-200 flex items-center justify-between group-btn-option ${statusStyle} relative overflow-hidden`}
                                        >
                                            <div className="relative z-10 space-y-1">
                                                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Option {String.fromCharCode(65 + idx)}</p>
                                                <span className="font-medium text-lg text-slate-200">{option}</span>
                                            </div>
                                            {isAnswered && isCorrectOption && <CheckCircle2 className="text-emerald-400" size={28} />}
                                            {isAnswered && isSelected && !isCorrectOption && <AlertTriangle className="text-red-400" size={28} />}
                                            {!isAnswered && isSelected && <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                className={`btn w-full py-6 text-xl font-bold tracking-widest rounded-2xl shadow-lg transition-all flex items-center justify-center gap-4 ${isAnswered ? 'btn-primary shadow-primary/30' : 'btn-secondary shadow-lg'
                                    } ${selectedOption === null && !isAnswered ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                disabled={selectedOption === null}
                                onClick={isAnswered ? handleNext : handleCheckAnswer}
                            >
                                <span className="flex items-center gap-4">
                                    {isAnswered
                                        ? (quizIndex === lesson.quiz.length - 1 ? 'Finish Lesson' : 'Next Question')
                                        : 'Submit Answer'}
                                    <ArrowRight size={24} className="animate-fade-in group-hover:translate-x-2 transition-transform" />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
