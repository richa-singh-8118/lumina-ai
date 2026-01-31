import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, MessageSquare } from 'lucide-react';

export function AITutor() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
        { role: 'ai', text: "Hello! I'm your Lumina learning assistant. Need help with this section?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let response = "That's an interesting question. Let's look at the core concept again. Would you like a simpler explanation?";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes('answer') || lowerMsg.includes('solution')) {
                response = "I can't give you the direct answer, but I can guide you! Try focusing on the first paragraph of the lesson.";
            } else if (lowerMsg.includes('explain') || lowerMsg.includes('help')) {
                response = "I'd be happy to. Which part is most confusing for you right now?";
            }

            setMessages(prev => [...prev, { role: 'ai', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Minimalist FAB */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl z-[100] transition-all hover:scale-105 active:scale-95"
                >
                    <MessageSquare size={24} />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                </button>
            )}

            {/* Chat Widget */}
            {isOpen && (
                <div className="fixed bottom-8 right-8 w-[380px] h-[550px] flex flex-col z-[1001] bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col animate-fade-in">
                    {/* Header */}
                    <div className="px-6 py-4 bg-primary text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Lumina AI Tutor</h4>
                                <p className="text-[10px] opacity-80 font-semibold tracking-widest uppercase">Always Available</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-400'
                                        }`}>
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white border border-slate-200 text-slate-600 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start pl-9">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-100">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="How can I help you learn?"
                                className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-4 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
