import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, MessageCircle, Sprout } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

const FAQ_DATABASE = [
  {
    trigger: 'crops',
    label: 'Crops Supported',
    answer: 'We provide specialized agronomic guidance for 4 primary crops: Sugarcane, Banana, Papaya, and Watermelon. Which crop are you currently cultivating?'
  },
  {
    trigger: 'sugarcane',
    label: 'Sugarcane Guidance',
    answer: 'For Sugarcane, we assist with sett selection & treatment, organic basal fertilization, tillering management, early shoot borer control, and harvest timing.'
  },
  {
    trigger: 'banana',
    label: 'Banana Guidance',
    answer: 'For Banana, we guide tissue culture planting, pit preparation, precise potassium-nitrogen feeding schedules, de-naveling, and bunch protection.'
  },
  {
    trigger: 'papaya',
    label: 'Papaya Guidance',
    answer: 'For Papaya (Red Lady 786), we provide raised-bed layout guidance, drainage solutions to prevent root rot, and organic aphid/virus suppression.'
  },
  {
    trigger: 'watermelon',
    label: 'Watermelon Guidance',
    answer: 'For Watermelon, we guide drip irrigation scheduling, plastic mulching, vine spacing, pollinator management, and Brix (sweetness) optimization.'
  },
  {
    trigger: 'booking',
    label: 'How to Book Consultation',
    answer: 'You can book a consultation directly through our website consultation form or click the WhatsApp button to chat instantly with our team.'
  }
];

export default function Chatbot({ whatsappNumber }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaskara! 🌱 Welcome to Sri Nandi Krishi Organic Enterprise. How can we help you with your farm today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-krishi-chat', handleOpen);
    return () => window.removeEventListener('open-krishi-chat', handleOpen);
  }, []);

  const handleSelectTopic = (item) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: item.label },
      { sender: 'bot', text: item.answer }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim().toLowerCase();
    const userMsg = inputText.trim();
    setInputText('');

    let botResponse = 'Thank you for your enquiry. For specific guidance tailored to your farm condition, our agronomy team can assist you directly on WhatsApp.';

    if (query.includes('sugar') || query.includes('cane')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'sugarcane').answer;
    } else if (query.includes('banana')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'banana').answer;
    } else if (query.includes('papaya')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'papaya').answer;
    } else if (query.includes('melon') || query.includes('watermelon')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'watermelon').answer;
    } else if (query.includes('book') || query.includes('consult') || query.includes('fee')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'booking').answer;
    } else if (query.includes('crop') || query.includes('service')) {
      botResponse = FAQ_DATABASE.find(x => x.trigger === 'crops').answer;
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg },
      { sender: 'bot', text: botResponse }
    ]);
  };

  const handleEscalateWhatsApp = () => {
    openWhatsApp('', 'Hello Sri Nandi Krishi, I was chatting with Ask Krishi assistant and would like direct consultation.', whatsappNumber);
  };

  return (
    <div className="floating-chatbot-left">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <span className="chat-online-indicator"></span>
                <div>
                  <h4>Ask Krishi Assistant</h4>
                  <small>Agricultural Support</small>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: '#FAF9F2', background: 'none' }}
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="chatbot-body">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-msg ${m.sender}`}>
                  {m.text}
                </div>
              ))}

              {/* Quick Topic Chips */}
              <div className="chat-quick-options">
                {FAQ_DATABASE.map((item, idx) => (
                  <button
                    key={idx}
                    className="chat-quick-btn"
                    onClick={() => handleSelectTopic(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Escalation Button */}
              <button
                onClick={handleEscalateWhatsApp}
                className="btn btn-gold"
                style={{ fontSize: '11px', padding: '8px 12px', marginTop: '6px' }}
              >
                <MessageCircle size={14} />
                <span>Continue on WhatsApp</span>
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="chatbot-footer-input">
              <input
                type="text"
                placeholder="Ask about sugarcane, banana..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chatbot-input"
              />
              <button type="submit" className="chatbot-send-btn" aria-label="Send">
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chatbot Launcher on the Left */}
      <button
        className="chatbot-launch-btn-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Ask Krishi Assistant"
        title="Ask Krishi Assistant"
      >
        <MessageSquareText size={18} />
        <span>Ask Krishi</span>
      </button>
    </div>
  );
}
