import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Bot, User, Loader, X } from 'lucide-react';

const GeminiModal = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const API_BASE_URL = 'https://builderai-backend.onrender.com/api';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      image: imagePreview,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response;
      let data;

      if (selectedImage) {
        // Image analysis
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('question', inputMessage || 'Analyze this image');

        response = await fetch(`${API_BASE_URL}/gemini/analyze-image`, {
          method: 'POST',
          body: formData
        });

        data = await response.json();

        if (data.error) {
          throw new Error(`${data.error}: ${data.details || ''}`);
        }

        const aiMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: data.analysis,
          timestamp: data.timestamp
        };

        setMessages(prev => [...prev, aiMessage]);
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        // Text chat
        response = await fetch(`${API_BASE_URL}/gemini/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: inputMessage,
            conversationId: conversationId
          })
        });

        data = await response.json();

        if (data.error) {
          throw new Error(`${data.error}: ${data.details || ''}`);
        }

        if (!conversationId) {
          setConversationId(data.conversationId);
        }

        const aiMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: data.response,
          timestamp: data.timestamp
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: error.message || 'Sorry, I encountered an error. Please try again.',
        error: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateCode = async (componentType) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/gemini/generate-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentType,
          requirements: 'Modern, responsive design with Tailwind CSS',
          framework: 'React'
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(`${data.error}: ${data.details || ''}`);
      }

      const codeMessage = {
        id: Date.now(),
        type: 'assistant',
        content: `\`\`\`jsx\n${data.code}\n\`\`\``,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, codeMessage]);
    } catch (error) {
      console.error('Error generating code:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'assistant',
        content: error.message,
        error: true,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    if (conversationId) {
      fetch(`${API_BASE_URL}/gemini/conversation/${conversationId}`, {
        method: 'DELETE'
      });
    }
    setConversationId(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gemini AI Assistant</h2>
            <p className="text-sm text-gray-500">Chat and generate images for your website</p>
          </div>
        </div>
        <button
          onClick={clearConversation}
          className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
        >
          Clear Chat
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b px-6 py-3 flex space-x-2 overflow-x-auto">
        <button onClick={() => generateCode('navbar')} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 whitespace-nowrap">Generate Navbar</button>
        <button onClick={() => generateCode('hero')} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 whitespace-nowrap">Generate Hero</button>
        <button onClick={() => generateCode('form')} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 whitespace-nowrap">Generate Form</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Ask me to help build your website, generate code, or analyze images.</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${message.type === 'user' ? 'bg-blue-600 text-white' : message.error ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-white border border-gray-200'}`}>
                    {message.image && <img src={message.image} alt="Uploaded" className="max-w-xs rounded mb-2" />}
                    <div className={message.content && message.content.includes('```') ? 'font-mono text-sm' : ''}>
                      {message.content ?? '[Error: no content]'}
                    </div>
                    <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <Loader className="w-5 h-5 animate-spin text-gray-500" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-6 py-2 bg-gray-50 border-t flex items-center space-x-2">
          <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
          <span className="text-sm text-gray-600">Image ready to analyze</span>
          <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="ml-auto text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex space-x-2 max-w-4xl mx-auto">
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Image className="w-5 h-5" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask Gemini to help build your website..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={(!inputMessage.trim() && !selectedImage) || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiModal;
