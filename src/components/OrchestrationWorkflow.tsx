import { ChevronRight, ChevronDown, Save, Play, Download, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const dataSources = [
  { icon: '📤', label: 'API\nConnector' },
  { icon: '🔄', label: 'Kafka\nStream' },
  { icon: '🗄️', label: 'PostgreSQL' },
];

const processors = [
  { icon: '🔤', label: 'NLP\nProcessor' },
  { icon: '📝', label: 'NLP\nProcessor' },
  { icon: '⚙️', label: 'NLP\nProcessor' },
  { icon: '💻', label: 'NLP\nProcessor' },
  { icon: '🖨️', label: 'Anodom\nProcessor' },
];

const models = [
  { icon: '🌲', label: 'Random\nForest Model' },
  { icon: '🌳', label: 'Random\nForest Model' },
];

const actions = [
  { icon: '🔔', label: 'Notification' },
  { icon: '📧', label: 'Manila\nOutput' },
];

const outputs = [
  { icon: '✉️', label: 'Notification' },
  { icon: '📡', label: 'Remote\nOutput' },
];

export function OrchestrationWorkflow() {
  const [expandedSections, setExpandedSections] = useState({
    dataSources: true,
    processors: true,
    models: true,
    actions: true,
    outputs: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof prev] }));
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f]">
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#e8e8ea]">MIDAS Workflow Editor | Project: Customer Feedback Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[#6b6b75] hover:text-[#e8e8ea]">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="default" size="sm" className="bg-[#4a9eff] hover:bg-[#4a9eff]/90">
            <Play className="w-4 h-4 mr-2" />
            Deploy
          </Button>
          <Button variant="ghost" size="sm" className="text-[#6b6b75] hover:text-[#e8e8ea]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="text-[#6b6b75] hover:text-[#e8e8ea]">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components Panel */}
        <div className="w-72 bg-[#0f0f14] border-r border-[#1e1e24] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#e8e8ea]">MIDAS Components</h3>
              <button className="text-[#6b6b75] hover:text-[#e8e8ea]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Data Sources */}
            <div className="mb-4">
              <button 
                onClick={() => toggleSection('dataSources')}
                className="flex items-center gap-2 text-xs text-[#e8e8ea] mb-2 w-full"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${!expandedSections.dataSources ? '-rotate-90' : ''}`} />
                Data Sources
              </button>
              {expandedSections.dataSources && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {dataSources.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a20] rounded p-2 text-center cursor-pointer hover:bg-[#2a2a30] border border-[#2d2d35]">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-[8px] text-[#e8e8ea] whitespace-pre-line leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Processors */}
            <div className="mb-4">
              <button 
                onClick={() => toggleSection('processors')}
                className="flex items-center gap-2 text-xs text-[#e8e8ea] mb-2 w-full"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${!expandedSections.processors ? '-rotate-90' : ''}`} />
                Processors
              </button>
              {expandedSections.processors && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {processors.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a20] rounded p-2 text-center cursor-pointer hover:bg-[#2a2a30] border border-[#2d2d35]">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-[8px] text-[#e8e8ea] whitespace-pre-line leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Models */}
            <div className="mb-4">
              <button 
                onClick={() => toggleSection('models')}
                className="flex items-center gap-2 text-xs text-[#e8e8ea] mb-2 w-full"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${!expandedSections.models ? '-rotate-90' : ''}`} />
                Models
              </button>
              {expandedSections.models && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {models.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a20] rounded p-2 text-center cursor-pointer hover:bg-[#2a2a30] border border-[#2d2d35]">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-[8px] text-[#e8e8ea] whitespace-pre-line leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mb-4">
              <button 
                onClick={() => toggleSection('actions')}
                className="flex items-center gap-2 text-xs text-[#e8e8ea] mb-2 w-full"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${!expandedSections.actions ? '-rotate-90' : ''}`} />
                Actions
              </button>
              {expandedSections.actions && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {actions.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a20] rounded p-2 text-center cursor-pointer hover:bg-[#2a2a30] border border-[#2d2d35]">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-[8px] text-[#e8e8ea] whitespace-pre-line leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Outputs */}
            <div className="mb-4">
              <button 
                onClick={() => toggleSection('outputs')}
                className="flex items-center gap-2 text-xs text-[#e8e8ea] mb-2 w-full"
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${!expandedSections.outputs ? '-rotate-90' : ''}`} />
                Outputs
              </button>
              {expandedSections.outputs && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {outputs.map((item, idx) => (
                    <div key={idx} className="bg-[#1a1a20] rounded p-2 text-center cursor-pointer hover:bg-[#2a2a30] border border-[#2d2d35]">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-[8px] text-[#e8e8ea] whitespace-pre-line leading-tight">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 bg-[#0a0a0f] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Drag and Drop Hint */}
            <div className="text-center">
              <div className="text-6xl mb-4">👻</div>
              <div className="text-[#e8e8ea] text-lg mb-2">Drag and Drop</div>
              <div className="text-[#6b6b75] text-sm">Drag components from the left panel to build your workflow</div>
            </div>
          </div>
          
          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1a1a20] border border-[#2d2d35] rounded-lg px-3 py-2">
            <button className="text-[#6b6b75] hover:text-[#e8e8ea] p-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <button className="text-[#6b6b75] hover:text-[#e8e8ea] px-2">−</button>
            <span className="text-[#e8e8ea] text-sm min-w-[2rem] text-center">1</span>
            <button className="text-[#6b6b75] hover:text-[#e8e8ea] px-2">+</button>
            <button className="text-[#6b6b75] hover:text-[#e8e8ea] p-1 ml-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 bg-[#0f0f14] border-l border-[#1e1e24] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-[#e8e8ea] mb-4">Node Properties</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#6b6b75] mb-2 block">Sentiment Analysis Model</label>
                <div className="text-sm text-[#e8e8ea] mb-1">Model Version</div>
                <select className="w-full bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-2 text-sm text-[#e8e8ea]">
                  <option>v2.1</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6b6b75] mb-2 block">Threshold</label>
                <input 
                  type="number" 
                  value="0.75"
                  className="w-full bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-2 text-sm text-[#e8e8ea]"
                />
              </div>

              <div>
                <label className="text-xs text-[#6b6b75] mb-2 block">Language</label>
                <select className="w-full bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-2 text-sm text-[#e8e8ea]">
                  <option>English</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6b6b75] mb-2 block">Status</label>
                <select className="w-full bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-2 text-sm text-[#6b6b75]">
                  <option>Select operation...</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button className="text-xs text-[#e8e8ea] flex items-center gap-2 mb-3">
                Workflow Status
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6b6b75]">Last Run</span>
                  <span className="text-[#e8e8ea]">12 mins ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6b75]">Status</span>
                  <span className="text-[#14b8a6] flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#14b8a6] rounded-full"></span>
                    Success
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-[#6b6b75] mb-2">Performance Metrics</div>
                <div className="text-xs text-[#6b6b75] mb-1">CPU</div>
                <div className="text-[8px] text-[#6b6b75] mb-1">100</div>
                <div className="h-12 bg-[#1a1a20] rounded relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                    <polyline
                      points="0,40 20,38 40,35 60,25 80,20 100,15 120,22 140,30 160,25 180,20 200,18"
                      fill="none"
                      stroke="#4a9eff"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-[#6b6b75] mb-1">Memory Usage</div>
                  <div className="text-[8px] text-[#6b6b75] mb-1">1000x</div>
                  <div className="h-12 bg-[#1a1a20] rounded relative overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                      <polyline
                        points="0,45 20,43 40,40 60,38 80,35 100,30 120,28 140,25 160,28 180,30 200,32"
                        fill="none"
                        stroke="#4a9eff"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
