import { useState } from 'react';
import { ChevronRight, Play, Pause, Square, Cpu, Zap, AlertTriangle, CheckCircle2, Clock, Target, GitBranch, Workflow } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const activeJobs = [
  { 
    id: 1, 
    name: 'Network Reconnaissance', 
    status: 'running', 
    progress: 68, 
    stage: 'Port Scanning',
    tool: 'Nmap',
    started: '14:23',
    eta: '3m 15s'
  },
  { 
    id: 2, 
    name: 'Web Application Scan', 
    status: 'running', 
    progress: 42, 
    stage: 'Vulnerability Detection',
    tool: 'Burp Suite Pro',
    started: '14:18',
    eta: '8m 42s'
  },
  { 
    id: 3, 
    name: 'SQL Injection Test', 
    status: 'paused', 
    progress: 25, 
    stage: 'Database Enumeration',
    tool: 'SQLMap',
    started: '14:05',
    eta: 'Paused'
  },
  { 
    id: 4, 
    name: 'AI-Driven Exploit Chain', 
    status: 'queued', 
    progress: 0, 
    stage: 'Waiting for Approval',
    tool: 'Gemini AI + Metasploit',
    started: '-',
    eta: 'Pending'
  },
];

const orchestrationNodes = [
  { id: 1, type: 'trigger', label: 'Scan Complete', x: 50, y: 100, color: '#4a9eff' },
  { id: 2, type: 'ai', label: 'Gemini Analysis', x: 180, y: 80, color: '#a855f7' },
  { id: 3, type: 'decision', label: 'Vuln Found?', x: 180, y: 140, color: '#d4af37' },
  { id: 4, type: 'action', label: 'Exploit', x: 310, y: 60, color: '#ff3366' },
  { id: 5, type: 'action', label: 'Report', x: 310, y: 120, color: '#14b8a6' },
  { id: 6, type: 'end', label: 'Complete', x: 440, y: 90, color: '#00d4ff' },
];

const aiPlannerTasks = [
  { task: 'Analyze scan results from 192.168.1.0/24', status: 'complete', confidence: 95 },
  { task: 'Identify high-value targets (web servers, databases)', status: 'complete', confidence: 88 },
  { task: 'Generate exploit chain for CVE-2023-12345', status: 'active', confidence: 72 },
  { task: 'Plan post-exploitation data exfiltration', status: 'pending', confidence: 0 },
];

export function OrchestrationWorkflow() {
  const [selectedJob, setSelectedJob] = useState(activeJobs[0]);

  return (
    <div className="h-full flex">
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#e8e8ea]">Workflow Orchestration</span>
            <ChevronRight className="w-4 h-4 text-[#6b6b75]" />
            <span className="text-xs text-[#6b6b75]">Yapay Zeka Odaklı Orkestrasyon</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 bg-[#1a1a20] border-[#2d2d35] text-[#e8e8ea] hover:bg-[#2d2d35]">
              <Play className="w-3 h-3 mr-1" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* Visual Workflow Builder */}
        <div className="flex-1 p-6">
          <div className="h-full bg-[#0f0f14] border border-[#1e1e24] rounded-lg p-6 relative overflow-hidden">
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Workflow Title */}
            <div className="relative mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#6b6b75] mb-1">ACTIVE WORKFLOW</div>
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-sm text-[#e8e8ea]">Automated Penetration Test</span>
                  <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
                    <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full mr-1 animate-pulse"></div>
                    Running
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35]">
                  <Play className="w-3.5 h-3.5 text-[#00d4ff]" />
                </button>
                <button className="p-1.5 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35]">
                  <Pause className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
                <button className="p-1.5 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35]">
                  <Square className="w-3.5 h-3.5 text-[#ff3366]" />
                </button>
              </div>
            </div>

            {/* Workflow Nodes */}
            <div className="relative h-64">
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {/* Connections */}
                <path d="M 80 100 Q 130 90, 180 80" stroke="#4a9eff" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 80 100 Q 130 120, 180 140" stroke="#4a9eff" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 240 80 L 310 60" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 240 140 L 310 120" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 370 60 Q 405 75, 440 90" stroke="#ff3366" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M 370 120 Q 405 105, 440 90" stroke="#14b8a6" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>

              {/* Nodes */}
              {orchestrationNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-110"
                    style={{ 
                      backgroundColor: '#1a1a20',
                      borderColor: node.color,
                      boxShadow: `0 0 20px ${node.color}40`
                    }}
                  >
                    {node.type === 'trigger' && <Zap className="w-5 h-5 mb-1" style={{ color: node.color }} />}
                    {node.type === 'ai' && <Cpu className="w-5 h-5 mb-1" style={{ color: node.color }} />}
                    {node.type === 'decision' && <GitBranch className="w-5 h-5 mb-1" style={{ color: node.color }} />}
                    {node.type === 'action' && <Target className="w-5 h-5 mb-1" style={{ color: node.color }} />}
                    {node.type === 'end' && <CheckCircle2 className="w-5 h-5 mb-1" style={{ color: node.color }} />}
                  </div>
                  <div className="text-xs text-center mt-2 text-[#e8e8ea] whitespace-nowrap">{node.label}</div>
                </div>
              ))}
            </div>

            {/* AI Planner Section */}
            <div className="mt-8 pt-6 border-t border-[#1e1e24]">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-[#a855f7]" />
                <span className="text-xs text-[#6b6b75]">GEMINI AI PLANNER - Proje Kimera (Otonom Operatör)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {aiPlannerTasks.map((task, idx) => (
                  <div key={idx} className="p-3 bg-[#1a1a20] border border-[#2d2d35] rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs text-[#e8e8ea] flex-1">{task.task}</p>
                      <div 
                        className="w-1.5 h-1.5 rounded-full shrink-0 ml-2 mt-1"
                        style={{ 
                          backgroundColor: task.status === 'complete' ? '#14b8a6' : task.status === 'active' ? '#d4af37' : '#6b6b75'
                        }}
                      />
                    </div>
                    {task.status !== 'pending' && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6b6b75]">Confidence:</span>
                        <span className="text-xs text-[#e8e8ea]">{task.confidence}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Active Jobs */}
      <div className="w-96 bg-[#0f0f14] border-l border-[#1e1e24] flex flex-col">
        <div className="h-14 px-4 flex items-center border-b border-[#1e1e24]">
          <span className="text-xs text-[#6b6b75]">ACTIVE JOBS</span>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {activeJobs.map((job) => (
            <div 
              key={job.id} 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedJob.id === job.id 
                  ? 'bg-[#1a1a20] border-[#d4af37]' 
                  : 'bg-[#1a1a20] border-[#2d2d35] hover:border-[#6b6b75]'
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-sm text-[#e8e8ea] mb-1">{job.name}</div>
                  <div className="text-xs text-[#6b6b75]">{job.stage}</div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    job.status === 'running' 
                      ? 'border-[#00d4ff] text-[#00d4ff]' 
                      : job.status === 'paused'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-[#6b6b75] text-[#6b6b75]'
                  }`}
                >
                  {job.status === 'running' && <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full mr-1 animate-pulse"></div>}
                  {job.status}
                </Badge>
              </div>

              <div className="mb-2">
                <div className="h-1.5 bg-[#0f0f14] rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${job.progress}%`,
                      backgroundColor: job.status === 'running' ? '#00d4ff' : job.status === 'paused' ? '#d4af37' : '#6b6b75'
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-[#6b6b75]">{job.progress}%</span>
                  <span className="text-xs text-[#6b6b75]">ETA: {job.eta}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#6b6b75]">
                  <Clock className="w-3 h-3" />
                  {job.started}
                </div>
                <div className="text-[#a855f7]">{job.tool}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Controls */}
        <div className="p-4 border-t border-[#1e1e24]">
          <div className="text-xs text-[#6b6b75] mb-2">SELECTED JOB CONTROLS</div>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35] flex flex-col items-center gap-1">
              <Play className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-xs text-[#e8e8ea]">Start</span>
            </button>
            <button className="p-2 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35] flex flex-col items-center gap-1">
              <Pause className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs text-[#e8e8ea]">Pause</span>
            </button>
            <button className="p-2 rounded bg-[#1a1a20] border border-[#2d2d35] hover:bg-[#2d2d35] flex flex-col items-center gap-1">
              <Square className="w-4 h-4 text-[#ff3366]" />
              <span className="text-xs text-[#e8e8ea]">Stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
