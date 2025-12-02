import { useState } from 'react';
import { ChevronRight, Search, Terminal, Database, TrendingUp, Brain, FileText, AlertTriangle, Shield, Zap, CheckCircle2, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

const queryHistory = [
  { query: 'List all critical vulnerabilities in web servers', results: 23, timestamp: '14:32' },
  { query: 'Show exploits for Apache 2.4.49', results: 7, timestamp: '14:28' },
  { query: 'Find lateral movement paths from DMZ', results: 12, timestamp: '14:21' },
  { query: 'CVE-2023-* affecting Windows Server 2019', results: 45, timestamp: '14:15' },
];

const ragSources = [
  { name: 'CVE Database', documents: 184523, lastUpdate: '2 hours ago', status: 'active', color: '#4a9eff' },
  { name: 'Exploit-DB', documents: 48932, lastUpdate: '5 hours ago', status: 'active', color: '#ff4d9f' },
  { name: 'MITRE ATT&CK', documents: 14256, lastUpdate: '1 day ago', status: 'active', color: '#00d4ff' },
  { name: 'Security Advisories', documents: 9847, lastUpdate: '3 hours ago', status: 'active', color: '#14b8a6' },
  { name: 'Threat Intelligence Feeds', documents: 125689, lastUpdate: '30 min ago', status: 'active', color: '#a855f7' },
  { name: 'Tool Documentation', documents: 3421, lastUpdate: '1 week ago', status: 'active', color: '#d4af37' },
];

const desktopAgents = [
  { 
    id: 1, 
    name: 'Recon Agent Alpha', 
    type: 'Autonomous', 
    status: 'active', 
    task: 'Subdomain enumeration on target.com',
    progress: 67,
    cpu: 34,
    memory: 512,
    uptime: '2h 15m'
  },
  { 
    id: 2, 
    name: 'Exploit Agent Beta', 
    type: 'Semi-Autonomous', 
    status: 'waiting', 
    task: 'Waiting for approval: RCE attempt on 192.168.1.50',
    progress: 0,
    cpu: 5,
    memory: 128,
    uptime: '45m'
  },
  { 
    id: 3, 
    name: 'Persistence Agent Gamma', 
    type: 'Manual', 
    status: 'idle', 
    task: 'Standing by for post-exploitation tasks',
    progress: 0,
    cpu: 2,
    memory: 64,
    uptime: '5h 32m'
  },
  { 
    id: 4, 
    name: 'Exfil Agent Delta', 
    type: 'Autonomous', 
    status: 'active', 
    task: 'Monitoring data exfiltration channels',
    progress: 100,
    cpu: 12,
    memory: 256,
    uptime: '12h 8m'
  },
];

const intelligenceInsights = [
  { 
    title: 'High-Value Target Identified', 
    severity: 'critical', 
    description: 'Database server with weak credentials detected',
    confidence: 94,
    cve: 'N/A'
  },
  { 
    title: 'Privilege Escalation Path Found', 
    severity: 'high', 
    description: 'Misconfigured sudo permissions on webserver',
    confidence: 87,
    cve: 'CVE-2021-3156'
  },
  { 
    title: 'Lateral Movement Opportunity', 
    severity: 'medium', 
    description: 'SMB shares accessible from compromised host',
    confidence: 76,
    cve: 'N/A'
  },
  { 
    title: 'Data Leakage Risk', 
    severity: 'high', 
    description: 'Sensitive files in public web directory',
    confidence: 91,
    cve: 'N/A'
  },
];

export function ExpertIntelligence() {
  const [query, setQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(desktopAgents[0]);

  return (
    <div className="h-full flex">
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#e8e8ea]">Pen-İş Intelligence</span>
            <ChevronRight className="w-4 h-4 text-[#6b6b75]" />
            <span className="text-xs text-[#6b6b75]">Sentezlenmiş İstihbarat Çekirdeği</span>
          </div>
        </div>

        {/* Query Console */}
        <div className="p-6 border-b border-[#1e1e24]">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-[#6b6b75]">PEN-İŞ QUERY CONSOLE</span>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b6b75]" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about vulnerabilities, exploits, or attack paths..."
              className="pl-10 bg-[#1a1a20] border-[#2d2d35] text-[#e8e8ea] placeholder:text-[#6b6b75] h-10"
            />
            <Button 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 bg-gradient-to-r from-[#d4af37] to-[#b8941e] hover:from-[#b8941e] hover:to-[#d4af37] text-black"
            >
              <Brain className="w-3 h-3 mr-1" />
              Query RAG
            </Button>
          </div>

          {/* Query History */}
          <div className="mt-3 space-y-2">
            <div className="text-xs text-[#6b6b75]">RECENT QUERIES</div>
            {queryHistory.slice(0, 3).map((item, idx) => (
              <div 
                key={idx} 
                className="p-2 bg-[#1a1a20] border border-[#2d2d35] rounded flex items-center justify-between cursor-pointer hover:border-[#6b6b75]"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-3 h-3 text-[#6b6b75] shrink-0" />
                  <span className="text-xs text-[#e8e8ea] truncate">{item.query}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-[#a855f7]">{item.results} results</span>
                  <span className="text-xs text-[#6b6b75]">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Insights */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs text-[#6b6b75]">AI-GENERATED INSIGHTS</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {intelligenceInsights.map((insight, idx) => (
              <div key={idx} className="p-4 bg-[#1a1a20] border border-[#2d2d35] rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {insight.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-[#ff3366]" />}
                      {insight.severity === 'high' && <TrendingUp className="w-4 h-4 text-[#d4af37]" />}
                      {insight.severity === 'medium' && <Shield className="w-4 h-4 text-[#4a9eff]" />}
                      <span className="text-sm text-[#e8e8ea]">{insight.title}</span>
                    </div>
                    <p className="text-xs text-[#6b6b75] leading-relaxed">{insight.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2d2d35]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6b6b75]">Confidence:</span>
                    <span className="text-xs text-[#e8e8ea]">{insight.confidence}%</span>
                  </div>
                  {insight.cve !== 'N/A' && (
                    <Badge variant="outline" className="border-[#ff4d9f] text-[#ff4d9f] text-xs">
                      {insight.cve}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RAG Sources */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-xs text-[#6b6b75]">RAG KNOWLEDGE SOURCES</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {ragSources.map((source, idx) => (
                <div key={idx} className="p-3 bg-[#1a1a20] border border-[#2d2d35] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-xs text-[#e8e8ea]">{source.name}</span>
                    </div>
                    <CheckCircle2 className="w-3 h-3 text-[#14b8a6]" />
                  </div>
                  <div className="text-xs text-[#6b6b75] mb-1">
                    {source.documents.toLocaleString()} docs
                  </div>
                  <div className="text-xs text-[#6b6b75]">
                    Updated: {source.lastUpdate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Agents */}
      <div className="w-96 bg-[#0f0f14] border-l border-[#1e1e24] flex flex-col">
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#1e1e24]">
          <span className="text-xs text-[#6b6b75]">HYBRID DESKTOP AGENTS</span>
          <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
            <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full mr-1 animate-pulse"></div>
            {desktopAgents.filter(a => a.status === 'active').length} Active
          </Badge>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {desktopAgents.map((agent) => (
            <div 
              key={agent.id} 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedAgent.id === agent.id 
                  ? 'bg-[#1a1a20] border-[#d4af37]' 
                  : 'bg-[#1a1a20] border-[#2d2d35] hover:border-[#6b6b75]'
              }`}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-sm text-[#e8e8ea] mb-1">{agent.name}</div>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-[#a855f7] text-[#a855f7]"
                  >
                    {agent.type}
                  </Badge>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    agent.status === 'active' 
                      ? 'border-[#00d4ff] text-[#00d4ff]' 
                      : agent.status === 'waiting'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-[#6b6b75] text-[#6b6b75]'
                  }`}
                >
                  {agent.status === 'active' && <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full mr-1 animate-pulse"></div>}
                  {agent.status}
                </Badge>
              </div>

              <div className="text-xs text-[#6b6b75] mb-3 leading-relaxed">
                {agent.task}
              </div>

              {agent.progress > 0 && (
                <div className="mb-3">
                  <div className="h-1 bg-[#0f0f14] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00d4ff] transition-all duration-300"
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-[#6b6b75] mt-1">{agent.progress}%</div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-[#6b6b75]">CPU</div>
                  <div className="text-[#e8e8ea]">{agent.cpu}%</div>
                </div>
                <div>
                  <div className="text-[#6b6b75]">Memory</div>
                  <div className="text-[#e8e8ea]">{agent.memory}MB</div>
                </div>
                <div>
                  <div className="text-[#6b6b75]">Uptime</div>
                  <div className="text-[#e8e8ea]">{agent.uptime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Stats */}
        <div className="p-4 border-t border-[#1e1e24]">
          <div className="text-xs text-[#6b6b75] mb-3">AGENT STATISTICS</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#e8e8ea]">Total Agents</span>
              <span className="text-sm text-[#e8e8ea]">{desktopAgents.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00d4ff] rounded-full"></div>
                <span className="text-xs text-[#e8e8ea]">Active</span>
              </div>
              <span className="text-sm text-[#e8e8ea]">
                {desktopAgents.filter(a => a.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#d4af37] rounded-full"></div>
                <span className="text-xs text-[#e8e8ea]">Waiting Approval</span>
              </div>
              <span className="text-sm text-[#e8e8ea]">
                {desktopAgents.filter(a => a.status === 'waiting').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6b6b75] rounded-full"></div>
                <span className="text-xs text-[#e8e8ea]">Idle</span>
              </div>
              <span className="text-sm text-[#e8e8ea]">
                {desktopAgents.filter(a => a.status === 'idle').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
