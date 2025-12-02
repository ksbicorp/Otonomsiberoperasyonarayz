import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Search, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import midasIcon from 'figma:asset/08254c82b6201befe291f432d77014ac201e4b01.png';

interface Message {
  id: number;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'thinking' | 'complete' | 'error';
  actions?: Array<{ label: string; type: string; }>;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'assistant',
    content: 'Merhaba! 👋\n\nBen MIDAS, siber güvenlik asistanınız. Size yardımcı olmak için buradayım.\n\nBana doğal dilde ne yapmak istediğinizi söyleyin, gerisini ben hallederim. Örneğin:\n\n• "Ağımdaki cihazları göster"\n• "Web sitem güvenli mi kontrol et"\n• "Açık portları tara"\n\nNe yapmamı istersiniz?',
    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    status: 'complete'
  }
];

const suggestionChips = [
  { label: 'Ağımı tara', icon: Search, description: 'Ağınızdaki cihazları keşfedin' },
  { label: 'Güvenlik kontrolü yap', icon: Shield, description: 'Sisteminizdeki açıkları tespit edin' },
  { label: 'Hızlı tarama başlat', icon: Zap, description: 'Temel güvenlik taraması' },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);

    // Düşünme mesajı
    setTimeout(() => {
      const thinkingMsg: Message = {
        id: Date.now(),
        type: 'assistant',
        content: 'Talebinizi analiz ediyorum...',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        status: 'thinking'
      };
      setMessages(prev => [...prev, thinkingMsg]);

      // Cevap oluştur
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.status !== 'thinking'));
        
        let response = '';
        let actions: Array<{ label: string; type: string; }> = [];

        if (userMessage.toLowerCase().includes('tara') || userMessage.toLowerCase().includes('ağ') || userMessage.toLowerCase().includes('scan')) {
          response = '✅ Anladım! Ağınızı taramak istiyorsunuz.\n\n**Tespit Edilen Bilgiler:**\n• 42 aktif cihaz bulundu\n• 156 açık port tespit edildi\n• 3 potansiyel risk belirlendi\n\n**Yapılacaklar:**\n1. Detaylı cihaz listesi hazırlanacak\n2. Açık portlar analiz edilecek\n3. Güvenlik raporu oluşturulacak\n\nDevam etmemi ister misiniz?';
          actions = [
            { label: 'Evet, Devam Et', type: 'start' },
            { label: 'Detaylı Rapor', type: 'report' }
          ];
        } else if (userMessage.toLowerCase().includes('güvenlik') || userMessage.toLowerCase().includes('kontrol') || userMessage.toLowerCase().includes('güvenli')) {
          response = '✅ Güvenlik kontrolü başlatılıyor.\n\n**Yapılacak Kontroller:**\n• Açık port taraması\n• Güncel olmayan yazılım tespiti\n• Şifre güvenliği kontrolü\n• Firewall durumu\n\n**Tahmini Süre:** 2-5 dakika\n\nBaşlatalım mı?';
          actions = [
            { label: 'Kontrolü Başlat', type: 'start' },
            { label: 'Ayarları Değiştir', type: 'edit' }
          ];
        } else if (userMessage.toLowerCase().includes('hızlı') || userMessage.toLowerCase().includes('basit')) {
          response = '✅ Hızlı tarama modu hazır.\n\n**Bu Tarama Şunları İçerir:**\n• Temel port kontrolü\n• Aktif cihaz tespiti\n• Basit güvenlik analizi\n\n**Tahmini Süre:** 1 dakika\n\nBaşlamak için onaylayın.';
          actions = [
            { label: 'Başlat', type: 'start' }
          ];
        } else {
          response = 'Talebinizi aldım! 🎯\n\nSize en iyi şekilde yardımcı olmak istiyorum.\n\nLütfen şunlardan birini seçin veya ne yapmak istediğinizi daha detaylı açıklayın:\n\n• Ağ taraması\n• Güvenlik kontrolü\n• Port analizi\n• Sistem durumu';
        }

        const responseMsg: Message = {
          id: Date.now() + 1,
          type: 'assistant',
          content: response,
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          status: 'complete',
          actions: actions.length > 0 ? actions : undefined
        };

        setMessages(prev => [...prev, responseMsg]);
        setIsTyping(false);
      }, 1500);
    }, 400);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      status: 'complete'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    simulateResponse(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleActionClick = (action: { label: string; type: string; }) => {
    if (action.type === 'start') {
      const systemMsg: Message = {
        id: Date.now(),
        type: 'system',
        content: '⚡ İşlem başlatılıyor...\n\nGerekli araçlar hazırlanıyor. Lütfen bekleyin.',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        status: 'complete'
      };
      setMessages(prev => [...prev, systemMsg]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - Basitleştirilmiş */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src={midasIcon} alt="MIDAS" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#e8e8ea]">MIDAS Asistan</span>
              <Badge variant="outline" className="border-[#28c840] text-[#28c840] text-xs">
                <div className="w-1.5 h-1.5 bg-[#28c840] rounded-full mr-1 animate-pulse"></div>
                Hazır
              </Badge>
            </div>
            <div className="text-xs text-[#6b6b75]">Doğal dilde komut verin</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a20] border border-[#2d2d35]">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span className="text-xs text-[#e8e8ea]">Yapay Zeka Destekli</span>
          </div>
        </div>
      </div>

      {/* Mesaj Alanı */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Mesaj balonu */}
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941e] text-black'
                    : message.type === 'system'
                    ? 'bg-[#1a1a20] border border-[#d4af37]/30'
                    : 'bg-[#1a1a20] border border-[#2d2d35]'
                }`}
              >
                <div className={`whitespace-pre-line ${
                  message.type === 'user' ? 'text-black' : 'text-[#e8e8ea]'
                }`}>
                  {message.content}
                </div>

                {message.status === 'thinking' && (
                  <div className="flex items-center gap-2 mt-2">
                    <Loader2 className="w-4 h-4 text-[#d4af37] animate-spin" />
                    <span className="text-xs text-[#6b6b75]">Düşünüyorum...</span>
                  </div>
                )}

                {/* Aksiyon butonları */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {message.actions.map((action, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        onClick={() => handleActionClick(action)}
                        className={`h-8 ${
                          action.type === 'start'
                            ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941e] hover:from-[#b8941e] hover:to-[#d4af37] text-black'
                            : 'bg-[#2d2d35] hover:bg-[#3d3d45] text-[#e8e8ea]'
                        }`}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Zaman damgası */}
              <div className={`text-xs text-[#6b6b75] mt-1 ${
                message.type === 'user' ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp}
              </div>
            </div>

            {/* Avatar */}
            {message.type !== 'user' && message.type !== 'system' && (
              <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 shrink-0 order-0">
                <img src={midasIcon} alt="MIDAS" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 shrink-0">
              <img src={midasIcon} alt="MIDAS" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 rounded-lg bg-[#1a1a20] border border-[#2d2d35]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Öneri Kartları - Sadece başlangıçta göster */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <div className="text-xs text-[#6b6b75] mb-3">💡 Hızlı Başlangıç</div>
          <div className="grid grid-cols-3 gap-3">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(chip.label)}
                className="p-4 rounded-lg bg-[#1a1a20] border border-[#2d2d35] hover:border-[#d4af37] transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <chip.icon className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-[#e8e8ea]">{chip.label}</span>
                </div>
                <p className="text-xs text-[#6b6b75]">{chip.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Giriş Alanı - Basitleştirilmiş */}
      <div className="p-4 border-t border-[#1e1e24] bg-[#0a0a0f]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ne yapmak istiyorsunuz? (Türkçe yazabilirsiniz)"
            className="flex-1 bg-[#1a1a20] border-[#2d2d35] text-[#e8e8ea] placeholder:text-[#6b6b75]"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8941e] hover:from-[#b8941e] hover:to-[#d4af37] text-black px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-[#6b6b75] mt-2 text-center">
          Sadece yazmak istediğinizi yazın • Teknik bilgi gerekmez
        </div>
      </div>
    </div>
  );
}