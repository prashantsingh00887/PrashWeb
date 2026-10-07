import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { queryPrashWebAI } from '../utils/aiKnowledgeEngine';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Trash2, 
  ArrowUpRight,
  User,
  ShieldCheck,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Square
} from 'lucide-react';

export const PrashWebAI = () => {
  const { data, isAiOpen, setIsAiOpen, setSelectedProject } = usePortfolio();
  
  // Voice synthesis & recognition states
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const welcomeSpokenRef = useRef(false);

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: `Welcome to Prashant AI! What can I help you with? I can answer questions about Prashant's BCA education, programming skills (Java, Web, SQL, Python), projects, certificates, achievements, CV, or how to contact him.`,
      actions: [
        { label: "Who is Prashant?", type: "quick", question: "Who is Prashant Singh?" },
        { label: "What projects has he made?", type: "quick", question: "What projects has Prashant made?" },
        { label: "What skills does he know?", type: "quick", question: "What programming languages does he know?" },
        { label: "How to contact him?", type: "quick", question: "How can I contact Prashant?" }
      ]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper: Strip markdown tokens and URLs for clean human-sounding speech
  const cleanTextForSpeech = (rawText) => {
    if (!rawText) return '';
    return rawText
      .replace(/https?:\/\/\S+/g, '') // remove urls
      .replace(/[*_#`~>]/g, '') // remove markdown symbols
      .replace(/•/g, '') // remove bullet dots
      .replace(/📌/g, '')
      .replace(/\n+/g, '. ') // replace newlines with natural pauses
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Helper to select an Indian Female voice
  const getIndianFemaleVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const availableVoices = window.speechSynthesis.getVoices();
    if (!availableVoices || availableVoices.length === 0) return null;

    // Female names commonly associated with Indian English / Hindi voices:
    // Windows: "Microsoft Heera", "Microsoft Neerja", "Microsoft Swara", "Microsoft Kalpana"
    // macOS / iOS: "Veena", "Lekha", "Aditi", "Kiran"
    // Android / Chrome: "Google हिन्दी", "Google English (India)"
    const indianFemaleKeywords = ['heera', 'neerja', 'swara', 'veena', 'aditi', 'lekha', 'kalpana', 'kiran', 'pooja'];

    // 1. Look for an en-IN / India voice that explicitly matches a female name
    const matchedIndianFemale = availableVoices.find(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase().replace('_', '-');
      const isIndian = lang.includes('en-in') || lang.includes('hi') || name.includes('india');
      const isFemale = indianFemaleKeywords.some(keyword => name.includes(keyword)) || name.includes('female');
      return isIndian && isFemale;
    });
    if (matchedIndianFemale) return matchedIndianFemale;

    // 2. Look for any Indian English voice (not explicitly male like Ravi/Rishi)
    const anyIndianVoice = availableVoices.find(v => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase().replace('_', '-');
      const isIndian = lang.includes('en-in') || name.includes('india');
      const isMale = name.includes('male') || name.includes('ravi') || name.includes('rishi') || name.includes('prabhat');
      return isIndian && !isMale;
    });
    if (anyIndianVoice) return anyIndianVoice;

    // 3. Any en-IN voice
    const anyEnIn = availableVoices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith('en-in'));
    if (anyEnIn) return anyEnIn;

    // 4. Any Hindi / Indian language voice
    const anyHindi = availableVoices.find(v => v.lang.toLowerCase().startsWith('hi'));
    if (anyHindi) return anyHindi;

    // 5. Fallback: Any gentle natural female voice
    const fallbackFemale = availableVoices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('victoria') || name.includes('karen');
    });
    if (fallbackFemale) return fallbackFemale;

    return availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
  };

  // Function to speak any text aloud with Indian Female voice
  const speakText = (text) => {
    if (!('speechSynthesis' in window) || !voiceEnabled) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      
      const indianVoice = getIndianFemaleVoice();
      if (indianVoice) {
        utterance.voice = indianVoice;
        utterance.lang = indianVoice.lang || 'en-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      // Slightly elevated pitch and smooth rate for a warm, clear Indian female tone
      utterance.pitch = 1.15;
      utterance.rate = 0.98;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Welcome Voice Greeting: "Welcome to Prashant AI, what can I help you with?"
  useEffect(() => {
    if (isAiOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);

      // Speak welcome greeting when chat is opened
      if (voiceEnabled) {
        const welcomeTimer = setTimeout(() => {
          speakText("Welcome to Prashant AI, what can I help you with?");
        }, 350);
        return () => clearTimeout(welcomeTimer);
      }
    } else {
      // Stop speech when chat modal is closed
      stopSpeaking();
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isAiOpen]);

  // Clean speech when unmounting
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const toggleVoice = () => {
    if (voiceEnabled) {
      stopSpeaking();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);
      speakText("Voice enabled. Welcome to Prashant AI, what can I help you with?");
    }
  };

  // Speech Recognition (Microphone input)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuestion(transcript);
          handleSend(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const handleSend = (textToSend) => {
    const question = (textToSend || inputQuestion).trim();
    if (!question) return;

    // Stop speaking previous response
    stopSpeaking();

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      // Query knowledge engine with live portfolio data!
      const aiResponse = queryPrashWebAI(question, data);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: aiResponse.text,
        actions: aiResponse.actions || []
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // Speak answer in voice!
      if (voiceEnabled) {
        speakText(aiResponse.text);
      }
    }, 400);
  };

  const handleActionClick = (action) => {
    stopSpeaking();
    if (action.type === 'quick') {
      handleSend(action.question);
    } else if (action.type === 'scroll') {
      setIsAiOpen(false);
      const targetEl = document.querySelector(action.target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      if (action.projectId) {
        const foundProj = data.projects.find(p => p.id === action.projectId);
        if (foundProj) {
          setSelectedProject(foundProj);
        }
      }
    } else if (action.type === 'link') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: "Chat cleared! Ask me anything about Prashant's portfolio.",
        actions: []
      }
    ]);
  };

  const starterQuestions = [
    "Who is Prashant Singh?",
    "What is Prashant studying?",
    "Which college does he attend?",
    "Tell me about Event Booking System",
    "What programming languages does he know?",
    "Show me his certificates",
    "What are his achievements?",
    "What is his GitHub account?",
    "Can I see his CV?",
    "How can I contact Prashant?",
    "What internships has he done?"
  ];

  return (
    <>
      {/* Floating AI Button at Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-full font-bold text-sm shadow-2xl transition-all duration-300 ${
            isAiOpen
              ? 'bg-slate-900 text-white dark:bg-slate-800'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-indigo-600/35 hover:scale-105'
          }`}
          aria-label="Toggle PrashWeb AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-600"></span>
          </div>
          <span className="hidden sm:inline">PrashWeb AI</span>
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isAiOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[95vw] sm:w-[440px] max-h-[640px] h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-heading">PrashWeb AI</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold">
                    Voice Assistant
                  </span>
                </div>
                <p className="text-[11px] text-indigo-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Grounded on {data.profile.name}'s Portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice Mute / Unmute Button */}
              <button
                onClick={toggleVoice}
                className={`p-1.5 rounded-lg transition-colors ${
                  voiceEnabled 
                    ? 'text-white bg-white/20 hover:bg-white/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
                aria-label="Toggle AI Voice"
              >
                {voiceEnabled ? (
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-emerald-300 animate-pulse' : ''}`} />
                ) : (
                  <VolumeX className="w-4 h-4 text-rose-300" />
                )}
              </button>

              {/* Stop audio button if currently speaking */}
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-1.5 rounded-lg text-white bg-rose-500/80 hover:bg-rose-500 transition-colors animate-pulse"
                  title="Stop Speaking"
                  aria-label="Stop Speaking"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>
              )}

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close Chat */}
              <button
                onClick={() => setIsAiOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Speaking Indicator Status Bar */}
          {isSpeaking && (
            <div className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/80 border-b border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-between text-[11px] text-indigo-700 dark:text-indigo-300 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-indigo-600" />
                <span>Speaking in Indian Female voice...</span>
              </div>
              <button
                onClick={stopSpeaking}
                className="font-bold text-rose-500 hover:underline text-[10px]"
              >
                Stop Audio
              </button>
            </div>
          )}

          {/* Quick Questions Carousel */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-400 font-semibold shrink-0 pl-1">Ask:</span>
            {starterQuestions.slice(0, 5).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                      isBot
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                        : 'bg-indigo-600 text-white rounded-br-none'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-normal">
                      {msg.text}
                    </div>

                    {/* Action buttons attached to message */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-800 shadow-2xs transition-colors"
                          >
                            <span>{act.label}</span>
                            {act.type === 'link' ? (
                              <ExternalLink className="w-2.5 h-2.5" />
                            ) : (
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 animate-spin text-indigo-500" />
                <span>PrashWeb AI is analyzing portfolio data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder={isListening ? "Listening... Speak now!" : "Ask about education, skills, projects, CV..."}
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  isListening ? 'border-2 border-rose-500 animate-pulse' : ''
                }`}
              />

              {/* Microphone voice input button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2.5 rounded-xl transition-colors ${
                  isListening 
                    ? 'bg-rose-500 text-white animate-bounce shadow-md shadow-rose-500/30' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-200'
                }`}
                title={isListening ? 'Listening (Click to stop)' : 'Speak your question'}
                aria-label="Voice input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors shadow-md"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[10px] text-center text-slate-400 mt-1.5 flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Authentic portfolio answers</span>
              </div>
              <div className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-indigo-400" />
                <span>Indian Female Voice Active</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
