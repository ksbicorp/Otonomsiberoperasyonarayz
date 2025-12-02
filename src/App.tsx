import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { ChatInterface } from './components/ChatInterface';
import { MessageSquare, HelpCircle, Info } from 'lucide-react';
import midasIcon from 'figma:asset/08254c82b6201befe291f432d77014ac201e4b01.png';

const Sidebar = ({ showHelp, setShowHelp }: { showHelp: boolean; setShowHelp: (show: boolean) => void }) => {
  return (
    <div className="w-14 bg-[#0a0a0f] border-r border-[#1e1e24] flex flex-col items-center py-4 gap-3">
      {/* Logo - Midas King Icon */}
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        <img 
          src={midasIcon} 
          alt="MIDAS" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ana Sayfa */}
      <button
        className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#1e1e24] text-[#d4af37]"
        title="Ana Sayfa"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Bottom Items */}
      <div className="mt-auto space-y-3">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            showHelp 
              ? 'bg-[#1e1e24] text-[#d4af37]' 
              : 'text-[#6b6b75] hover:text-[#e8e8ea] hover:bg-[#1e1e24]'
          }`}
          title="Yardım"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Yardım paneli bileşeni
const HelpPanel = () => {
  return (
    <div className="w-80 bg-[#0f0f14] border-l border-[#1e1e24] p-4 overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-[#d4af37]" />
        <h2 className="text-sm text-[#e8e8ea] font-medium">Nasıl Kullanılır?</h2>
      </div>
      
      <div className="space-y-4 text-xs text-[#6b6b75]">
        <div className="p-3 bg-[#1a1a20] rounded-lg border border-[#2d2d35]">
          <h3 className="text-[#e8e8ea] mb-2">🎯 Basit Komutlar</h3>
          <p className="leading-relaxed">
            Doğal dilde ne yapmak istediğinizi yazın. Örneğin:
          </p>
          <ul className="mt-2 space-y-1">
            <li>• "Ağımı tara"</li>
            <li>• "Güvenlik açığı ara"</li>
            <li>• "Sistemi kontrol et"</li>
          </ul>
        </div>

        <div className="p-3 bg-[#1a1a20] rounded-lg border border-[#2d2d35]">
          <h3 className="text-[#e8e8ea] mb-2">💡 İpuçları</h3>
          <ul className="space-y-1 leading-relaxed">
            <li>• Önerilen komutlara tıklayarak hızlıca başlayın</li>
            <li>• Türkçe yazabilirsiniz</li>
            <li>• Teknik terim bilmenize gerek yok</li>
          </ul>
        </div>

        <div className="p-3 bg-[#1a1a20] rounded-lg border border-[#2d2d35]">
          <h3 className="text-[#e8e8ea] mb-2">🔐 Güvenlik</h3>
          <p className="leading-relaxed">
            Tüm işlemler onayınızla gerçekleştirilir. 
            Yapay zeka size adım adım rehberlik eder.
          </p>
        </div>

        <div className="p-3 bg-[#1a1a20] rounded-lg border border-[#2d2d35]">
          <h3 className="text-[#e8e8ea] mb-2">📊 Örnek Kullanım</h3>
          <p className="leading-relaxed">
            "192.168.1.0 ağındaki cihazları listele" yazın, 
            sistem otomatik olarak gerekli araçları seçip işlemi başlatır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

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
              <span className="text-xs text-[#6b6b75]">Otonom Siber Operasyon Platformu</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#28c840] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#6b6b75]">Sistem Aktif</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar showHelp={showHelp} setShowHelp={setShowHelp} />
          
          <div className="flex-1 bg-[#121218] overflow-hidden">
            <ChatInterface />
          </div>

          {showHelp && <HelpPanel />}
        </div>
      </div>
    </div>
  );
}