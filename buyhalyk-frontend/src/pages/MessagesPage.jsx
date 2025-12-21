import { useState } from 'react';
import { MessageCircle, Bookmark, Flag, Trash2, ImageIcon, Paperclip, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockChats } from '../utils/mockData';

const MessagesPage = () => {
  const { t, themeClasses, darkMode } = useApp();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      setMessageText('');
    }
  };

  return (
    <section className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className={`${themeClasses.card} rounded-2xl p-4 overflow-y-auto`}>
          <h3 className={`text-lg font-bold ${themeClasses.text} mb-4`}>{t.chats}</h3>
          <div className="space-y-2">
            {mockChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 rounded-xl transition-all ${
                  selectedChat?.id === chat.id
                    ? 'bg-purple-100 dark:bg-purple-900'
                    : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={chat.avatar} alt={chat.fullName} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${themeClasses.text}`}>{chat.username}</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{chat.fullName}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-2 ${themeClasses.card} rounded-2xl flex flex-col`}>
          {selectedChat ? (
            <>
              <div className={`p-4 border-b ${themeClasses.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <img src={selectedChat.avatar} alt={selectedChat.fullName} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className={`font-semibold ${themeClasses.text}`}>{selectedChat.username}</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{selectedChat.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}>
                    <Bookmark className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  </button>
                  <button className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}>
                    <Flag className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  </button>
                  <button className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}>
                    <Trash2 className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {selectedChat.messages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${themeClasses.text}`
                      }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-purple-200' : themeClasses.textSecondary}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 border-t ${themeClasses.border}`}>
                <div className="flex items-center gap-2">
                  <button className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}>
                    <ImageIcon className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  </button>
                  <button className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}>
                    <Paperclip className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t.typeMessage}
                    className={`flex-1 px-4 py-2 ${themeClasses.input} rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className={`w-20 h-20 ${themeClasses.textSecondary} mx-auto mb-4`} />
                <p className={`text-lg ${themeClasses.textSecondary}`}>{t.startChat}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
