import { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Zap, CheckCircle2, AlertCircle, Loader2, Terminal, Brain, Shield } from 'lucide-react';
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
    type: 'system',
    content: 'MIDAS PRO Otonom Siber Operasyon Platformu',
    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    status: 'complete'
  },
  {
    id: 2,
    type: 'assistant',
    content: 'Merhaba! Ben MIDAS Web-IO. Size nasıl yardımcı olabilirim?\n\nŞunları yapabilirim:\n• Hedef sistemleri tarayıp zafiyet tespiti\n• Otomatik exploit geliştirme\n• Penetrasyon testi senaryoları oluşturma\n• Güvenlik açığı raporları hazırlama\n\nNe yapmamı istersiniz?',
    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    status: 'complete'
  }
];

const suggestionChips = [
  { label: '192.168.1.0/24 ağını tara', icon: Terminal },
  { label: 'Web uygulaması zafiyet analizi', icon: Shield },
  { label: 'SQL injection testi yap', icon: Zap },
  { label: 'Otomatik exploit geliştir', icon: Brain },
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

    // Thinking message
    setTimeout(() => {
      const thinkingMsg: Message = {
        id: Date.now(),
        type: 'assistant',
        content: 'Talebinizi analiz ediyorum...',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        status: 'thinking'
      };
      setMessages(prev => [...prev, thinkingMsg]);

      // Response after thinking
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.status !== 'thinking'));
        
        let response = '';
        let actions: Array<{ label: string; type: string; }> = [];

        if (userMessage.toLowerCase().includes('tara') || userMessage.toLowerCase().includes('scan')) {
          response = '✓ Hedef sistem analiz edildi.\n\n**Tespit Edilen Bilgiler:**\n• 42 aktif host\n• 156 açık port\n• 8 web servisi\n• 3 kritik zafiyet\n\n**Önerilen Araçlar:**\n• Nmap (port tarama)\n• Nikto (web sunucu analizi)\n• Metasploit (exploit geliştirme)\n\n**İşlem Planı Oluşturuldu:**\n1. Port tarama (Nmap)\n2. Servis tespiti\n3. Zafiyet analizi\n4. Exploit geliştirme\n\nOperasyonu başlatmamı ister misiniz?';
          actions = [
            { label: 'Operasyonu Başlat', type: 'start' },
            { label: 'Detaylı Rapor', type: 'report' }
          ];
        } else if (userMessage.toLowerCase().includes('web') || userMessage.toLowerCase().includes('zafiyet')) {
          response = '✓ Web uygulama analizi planı oluşturuldu.\n\n**Hedef:** target-app.com\n**Planlanan Testler:**\n• SQL Injection (SQLMap)\n• XSS (Burp Suite)\n• CSRF token analizi\n• Authentication bypass\n• Directory traversal\n\n**Kullanılacak Araçlar:**\n• Burp Suite Professional\n• OWASP ZAP\n• SQLMap\n• Nikto\n\n**Tahmini Süre:** 2-4 saat\n\nOperasyonu onaylıyor musunuz?';
          actions = [
            { label: 'Operasyonu Onayla', type: 'start' },
            { label: 'Planı Düzenle', type: 'edit' }
          ];
        } else if (userMessage.toLowerCase().includes('sql') || userMessage.toLowerCase().includes('injection')) {
          response = '✓ SQL Injection testi hazırlandı.\n\n**Hedef Parametreler:**\n• Login formu\n• Search query\n• Product ID\n\n**Test Stratejisi:**\n• Union-based injection\n• Boolean-based blind\n• Time-based blind\n• Error-based\n\n**Araçlar:**\n• SQLMap (otomatik)\n• Manuel payload testleri\n\nTest başlatılsın mı?';
          actions = [
            { label: 'Testi Başlat', type: 'start' },
            { label: 'Parametreleri Özelleştir', type: 'edit' }
          ];
        } else {
          response = 'Talebinizi aldım. Size en uygun operasyon planını oluşturuyorum.\n\nBu işlem için şu araçları kullanabilirim:\n• Nmap, Masscan (keşif)\n• Burp Suite, ZAP (web testi)\n• Metasploit (exploit)\n• SQLMap (veritabanı)\n\nDaha fazla detay verebilir misiniz?';
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
      }, 2000);
    }, 500);
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
      // Add system message
      const systemMsg: Message = {
        id: Date.now(),
        type: 'system',
        content: '⚡ Operasyon başlatılıyor...\n\n• Araçlar yükleniyor\n• Workflow oluşturuluyor\n• Gemini AI aktif\n\nDashboard\'a yönlendiriliyorsunuz.',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        status: 'complete'
      };
      setMessages(prev => [...prev, systemMsg]);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        // Add your redirection logic here
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <img src={midasIcon} alt="MIDAS" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#e8e8ea]">MIDAS Web-IO</span>
              <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
                <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full mr-1 animate-pulse"></div>
                Online
              </Badge>
            </div>
            <div className="text-xs text-[#6b6b75]">Otonom Siber Operasyon Asistanı</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a20] border border-[#2d2d35]">
            <Cpu className="w-3 h-3 text-[#a855f7]" />
            <span className="text-xs text-[#e8e8ea]">Gemini AI</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a20] border border-[#2d2d35]">
            <Shield className="w-3 h-3 text-[#4a9eff]" />
            <span className="text-xs text-[#e8e8ea]">344 Services</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Message bubble */}
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941e] text-black'
                    : message.type === 'system'
                    ? 'bg-[#1a1a20] border border-[#2d2d35]'
                    : 'bg-[#1a1a20] border border-[#2d2d35]'
                }`}
              >
                {message.type !== 'user' && (
                  <div className="flex items-center gap-2 mb-2">
                    {message.type === 'system' ? (
                      <Terminal className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <Brain className="w-4 h-4 text-[#a855f7]" />
                    )}
                    <span className="text-xs text-[#6b6b75]">
                      {message.type === 'system' ? 'SYSTEM' : 'MIDAS Web-IO'}
                    </span>
                  </div>
                )}
                
                <div className={`whitespace-pre-line ${
                  message.type === 'user' ? 'text-black' : 'text-[#e8e8ea]'
                }`}>
                  {message.content}
                </div>

                {message.status === 'thinking' && (
                  <div className="flex items-center gap-2 mt-2">
                    <Loader2 className="w-4 h-4 text-[#a855f7] animate-spin" />
                    <span className="text-xs text-[#6b6b75]">Analiz ediliyor...</span>
                  </div>
                )}

                {/* Action buttons */}
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
                        {action.type === 'start' && <Zap className="w-3 h-3 mr-1" />}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp */}
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
                  <div className="w-2 h-2 bg-[#a855f7] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#a855f7] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#a855f7] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 2 && (
        <div className="px-6 pb-3">
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(chip.label)}
                className="px-3 py-2 rounded-lg bg-[#1a1a20] border border-[#2d2d35] hover:border-[#d4af37] transition-all flex items-center gap-2"
              >
                <chip.icon className="w-3 h-3 text-[#d4af37]" />
                <span className="text-xs text-[#e8e8ea]">{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-[#1e1e24] bg-[#0a0a0f]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Operasyon talebi yazın... (örn: 192.168.1.0/24 ağını tara)"
            className="flex-1 bg-[#1a1a20] border-[#2d2d35] text-[#e8e8ea] placeholder:text-[#6b6b75]"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8941e] hover:from-[#b8941e] hover:to-[#d4af37] text-black"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-[#6b6b75] mt-2">
          💡 Doğal dilde talimat verebilirsiniz. MIDAS Web-IO talebinizi analiz edip uygun operasyonu başlatacak.
        </div>
      </div>
    </div>
  );
}