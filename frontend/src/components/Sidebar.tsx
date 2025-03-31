import React, { useState } from 'react';
import { VolumeX, Volume2, Settings, RefreshCw, Trash2 } from 'lucide-react';
import PreferencesModal from './PreferencesModal';

interface SidebarProps {
  onClose: () => void;
  isConnected: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  onReconnect: () => void;
  onClearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onClose, 
  isConnected,
  isMuted,
  onMuteToggle,
  onReconnect, 
  onClearHistory 
}) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [reconnectSuccess, setReconnectSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  
  const handleReconnect = () => {
    setIsReconnecting(true);
    setReconnectSuccess(false);
    
    // Call the actual reconnect handler
    onReconnect();
    
    // Show animation for 1 second
    setTimeout(() => {
      setIsReconnecting(false);
      setReconnectSuccess(true);
      
      // Hide success indicator after 2 seconds
      setTimeout(() => {
        setReconnectSuccess(false);
      }, 2000);
    }, 1000);
  };
  
  const handleClearHistory = () => {
    setIsClearing(true);
    setClearSuccess(false);
    
    // Call the actual clear history handler
    onClearHistory();
    
    // Show animation for 1 second
    setTimeout(() => {
      setIsClearing(false);
      setClearSuccess(true);
      
      // Hide success indicator after 2 seconds
      setTimeout(() => {
        setClearSuccess(false);
      }, 2000);
    }, 1000);
  };
  
  return (
    <div className="w-64 h-screen bg-slate-900/20 backdrop-blur-sm flex flex-col pt-16 border-r border-slate-800/50">
      <div className="p-4 text-slate-300 flex-1">
        <h2 className="text-lg font-semibold mb-6 text-emerald-400/90">Vocalis</h2>
        
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Connection</h3>
            <div className="flex items-center space-x-2 p-2 w-full rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
              <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Controls</h3>
            <div className="space-y-2">
              <button 
                onClick={onMuteToggle}
                className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-slate-800/30 transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span className="text-sm">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">Mute</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={handleReconnect}
                disabled={isReconnecting}
                className="flex items-center justify-between space-x-2 p-2 w-full rounded-lg hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <RefreshCw className={`w-4 h-4 text-sky-400 ${isReconnecting ? 'animate-spin' : ''}`} />
                  <span className="text-sm">{isReconnecting ? 'Reconnecting...' : 'Reconnect'}</span>
                </div>
                {reconnectSuccess && (
                  <span className="text-xs text-emerald-400 animate-fadeIn">Done!</span>
                )}
              </button>
              
              <button 
                onClick={handleClearHistory}
                disabled={isClearing}
                className="flex items-center justify-between space-x-2 p-2 w-full rounded-lg hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Trash2 className={`w-4 h-4 text-slate-400 ${isClearing ? 'opacity-70' : ''}`} />
                  <span className="text-sm">{isClearing ? 'Clearing...' : 'Clear History'}</span>
                </div>
                {clearSuccess && (
                  <span className="text-xs text-emerald-400 animate-fadeIn">Done!</span>
                )}
              </button>
            </div>
          </div>
          
          {/* Settings */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Settings</h3>
            <button 
              onClick={() => setIsPreferencesOpen(true)}
              className="flex items-center space-x-2 p-2 w-full rounded-lg hover:bg-slate-800/30 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span className="text-sm">Preferences</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 text-xs text-slate-500 border-t border-slate-800/50">
        <p>Vocalis v0.1.0</p>
        <a 
          href="https://github.com/lex-au" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-emerald-400 transition-colors"
        >
          github.com/lex-au
        </a>
      </div>
      
      {/* Preferences Modal */}
      <PreferencesModal 
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
