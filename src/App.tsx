import { useState } from 'react';
import { CommandPanel } from './components/CommandPanel';
import { OrchestrationWorkflow } from './components/OrchestrationWorkflow';
import { ExpertIntelligence } from './components/ExpertIntelligence';
import { ExploitBuilder } from './components/ExploitBuilder';
import { SplashScreen } from './components/SplashScreen';
import { Shield, Cpu, Brain, Settings, Bell, Users, ChevronRight, Code } from 'lucide-react';
import { Button } from './components/ui/button';

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'command', icon: Shield, label: 'Dashboard' },
    { id: 'orchestration', icon: Cpu, label: 'Workflow' },
    { id: 'exploit', icon: Code, label: 'Exploit Builder' },
    { id: 'intelligence', icon: Brain, label: 'Reports' },
  ];

  return (
    <div className="w-14 bg-[#0a0a0f] border-r border-[#1e1e24] flex flex-col items-center py-4 gap-3">
      {/* Logo - M instead of Shield */}
      <div className="w-9 h-9 bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#b8941e] rounded-lg flex items-center justify-center mb-4">
        <span 
          className="text-xl text-black tracking-tighter"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}
        >
          M
        </span>
      </div>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === item.id
              ? 'bg-[#1e1e24] text-[#d4af37]'
              : 'text-[#6b6b75] hover:text-[#e8e8ea] hover:bg-[#1e1e24]'
          }`}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}

      {/* Bottom Items */}
      <div className="mt-auto space-y-3">
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6b6b75] hover:text-[#e8e8ea] hover:bg-[#1e1e24]">
          <Users className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6b6b75] hover:text-[#e8e8ea] hover:bg-[#1e1e24]">
          <Settings className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6b6b75] hover:text-[#e8e8ea] hover:bg-[#1e1e24] relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff3366] rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('command');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8">
      {/* Desktop Application Window */}
      <div className="w-[1400px] h-[850px] bg-[#0f0f14] rounded-[20px] shadow-2xl border border-[#1e1e24] overflow-hidden flex flex-col">
        {/* Title Bar */}
        <div className="h-11 bg-[#0a0a0f] border-b border-[#1e1e24] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Window Controls */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-[#e8e8ea] tracking-wide">MIDAS PRO</span>
              <span className="text-xs text-[#6b6b75]">Network</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-2 py-1 text-xs text-[#6b6b75] hover:text-[#e8e8ea]">Operational</button>
            <button className="px-2 py-1 text-xs text-[#6b6b75] hover:text-[#e8e8ea]">Security</button>
            <span className="text-xs text-[#6b6b75]">Past 24 Hours</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex-1 bg-[#121218] overflow-hidden">
            {activeTab === 'command' && <CommandPanel />}
            {activeTab === 'orchestration' && <OrchestrationWorkflow />}
            {activeTab === 'exploit' && <ExploitBuilder />}
            {activeTab === 'intelligence' && <ExpertIntelligence />}
          </div>
        </div>
      </div>
    </div>
  );
}