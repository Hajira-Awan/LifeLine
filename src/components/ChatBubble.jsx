import { Bot, User } from 'lucide-react';

const ChatBubble = ({ message }) => {
  const isAI = message.role === 'model';

  return (
    <div className={`flex w-full mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isAI ? 'bg-secondary/10 mr-3' : 'bg-primary/10 ml-3'}`}>
          {isAI ? <Bot className="w-5 h-5 text-secondary" /> : <User className="w-5 h-5 text-primary" />}
        </div>
        
        {/* Message Bubble */}
        <div 
          className={`px-5 py-3.5 rounded-2xl shadow-sm ${
            isAI 
              ? 'bg-white border border-gray-100 rounded-tl-none text-gray-800' 
              : 'bg-primary text-white rounded-tr-none'
          }`}
        >
          {/* Format text line breaks */}
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={`${i > 0 ? 'mt-2' : ''} text-[15px] leading-relaxed`}>
              {line}
            </p>
          ))}
          
          <div className={`text-[10px] mt-2 text-right ${isAI ? 'text-gray-400' : 'text-primary-100/70'}`}>
            {message.timestamp}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ChatBubble;
