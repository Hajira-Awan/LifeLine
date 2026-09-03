import { useState, useRef, useEffect } from 'react';
import { Send, Bot, AlertCircle, Loader2 } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { GEMINI_API_KEY, GEMINI_API_URL, SYSTEM_PROMPT } from '../config';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Hello! I'm your AI health assistant. To get started, what are your primary symptoms and where are you located?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsLoading(true);

    try {
      // Build conversation history for context
      const contents = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I will act as a helpful medical AI assistant and collect patient data accurately." }] },
      ];

      // Add actual chat history
      messages.forEach(msg => {
        contents.push({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });

      // Add current user message
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      setMessages(prev => [...prev, {
        role: 'model',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or consult a doctor directly if it's urgent.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-16 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary/10 p-2 rounded-xl">
            <Bot className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Health Assistant</h1>
            <p className="text-xs text-green-600 font-medium flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Online • Powered by Gemini
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Not for emergencies</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-4xl mx-auto flex flex-col">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-xl mb-6 shadow-sm flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> This AI provides preliminary information only and is not a substitute for professional medical advice, diagnosis, or treatment. 
            <strong> If you think you may have a medical emergency, call your local emergency number immediately.</strong>
          </p>
        </div>

        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-6">
            <div className="flex flex-row">
              <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-secondary/10 mr-3">
                <Bot className="w-5 h-5 text-secondary" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                <span className="text-sm text-gray-500 font-medium">Analyzing symptoms & location...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms and location..."
              className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`absolute right-2 p-2.5 rounded-full flex items-center justify-center transition-all ${
                input.trim() && !isLoading 
                  ? 'bg-secondary text-white hover:bg-secondary/90 shadow-md' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
