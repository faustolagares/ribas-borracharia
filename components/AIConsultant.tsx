
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o assistente virtual da Ribas. Como posso ajudar com seus pneus hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: userMsg }]
          }
        ],
        config: {
          systemInstruction: `Você é um especialista em pneus e mecânica da "Ribas Borracharia". 
          Sua marca é azul e amarela. Você é prestativo, técnico mas acessível.
          Responda dúvidas sobre calibragem, troca de pneus, vulcanização e balanceamento.
          Se perguntarem preço, diga que varia e sugira visitar a loja ou ligar.
          Mantenha as respostas curtas (máximo 50 palavras) e em Português do Brasil.`
        }
      });

      const text = response.text || "Desculpe, tive um problema técnico. Pode ligar para nós?";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar com o servidor. Tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white border-4 border-ribas-blue flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300 shadow-2xl">
          <div className="bg-ribas-blue p-3 md:p-4 flex justify-between items-center border-b-4 border-ribas-yellow">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-ribas-yellow p-1">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-ribas-blue" />
              </div>
              <div>
                <h3 className="font-sport font-bold text-lg md:text-xl uppercase italic">Ribas Bot</h3>
                <p className="text-[10px] md:text-xs text-ribas-yellow font-bold uppercase tracking-wider">Especialista Virtual</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-ribas-yellow transition-colors p-1">
              <X size={20} className="md:w-6 md:h-6" strokeWidth={3} />
            </button>
          </div>

          <div className="h-64 md:h-80 overflow-y-auto p-3 md:p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 md:p-4 text-xs md:text-sm font-medium border-2 ${
                    msg.role === 'user' 
                      ? 'bg-ribas-blue text-white border-ribas-blue' 
                      : 'bg-white text-gray-900 border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 md:p-4 border-2 border-gray-200">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-ribas-blue animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 md:p-3 bg-white border-t-2 border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Pergunte sobre pneus..."
              className="flex-1 bg-gray-100 border-2 border-transparent focus:border-ribas-blue px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-bold transition-colors outline-none placeholder:text-gray-400 text-gray-900"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-ribas-yellow text-ribas-blue p-2 md:p-3 hover:bg-ribas-yellowHover transition-colors disabled:opacity-50 border-2 border-ribas-yellow"
            >
              <Send size={18} className="md:w-5 md:h-5 ml-0.5" strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 bg-ribas-blue text-white p-4 md:p-5 border-4 border-ribas-yellow hover:bg-blue-900 shadow-xl`}
      >
        <MessageCircle size={28} className="md:w-9 md:h-9" strokeWidth={2.5} />
      </button>
    </div>
  );
};
