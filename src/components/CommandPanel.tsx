import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronRight, Activity, Database, Server, Shield, Cpu, Network } from 'lucide-react';
import { NetworkGraph } from './NetworkGraph';

const stats = [
  { label: 'Blocked Threats', value: '13.9K', icon: Shield, color: '#00d4ff' },
  { label: 'Alerted Threats', value: '6', icon: Activity, color: '#ff3366' },
  { label: 'Active Services', value: '344', icon: Server, color: '#d4af37' },
  { label: 'Security Tools', value: '170+', icon: Database, color: '#4a9eff' },
  { label: 'AI Models', value: '12', icon: Cpu, color: '#00d4ff' },
  { label: 'Active Agents', value: '8', icon: Network, color: '#a855f7' },
];

const services = [
  { name: 'MCP Services', count: 42, status: 'active', color: '#ff4d9f' },
  { name: 'Security Tools', count: 170, status: 'active', color: '#4a9eff' },
  { name: 'AI Models', count: 12, status: 'active', color: '#00d4ff' },
  { name: 'Autonomous Agents', count: 8, status: 'active', color: '#a855f7' },
  { name: 'Vulnerabilities', count: 321, status: 'alert', color: '#ff3366' },
  { name: 'Data Sources', count: 0, status: 'pending', color: '#14b8a6' },
];

const recentActivity = [
  { time: '14:32', event: 'Metasploit RPC initialized', type: 'success' },
  { time: '14:31', event: 'Burp Suite scan completed', type: 'success' },
  { time: '14:29', event: 'Critical vulnerability detected', type: 'alert' },
  { time: '14:27', event: 'Nmap scan started on 192.168.1.0/24', type: 'info' },
  { time: '14:25', event: 'AI agent workflow approved', type: 'success' },
  { time: '14:23', event: 'Docker container deployed', type: 'info' },
  { time: '14:21', event: 'SQLMap injection detected', type: 'alert' },
  { time: '14:19', event: 'Gemini AI analysis complete', type: 'success' },
];

export function CommandPanel() {
  return (
    <div className="h-full flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#e8e8ea]">Welcome Back, Admin</span>
            <ChevronRight className="w-4 h-4 text-[#6b6b75]" />
          </div>
        </div>

        {/* Network Graph - Full Size */}
        <div className="flex-1 p-4">
          <NetworkGraph />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-[#0f0f14] border-l border-[#1e1e24] flex flex-col">
        {/* Top Stats */}
        <div className="h-14 px-4 flex items-center gap-8 border-b border-[#1e1e24]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#6b6b75]">Blocked: 13.9K</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff3366] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#6b6b75]">Alerts: 6</span>
          </div>
        </div>

        {/* Threat Chart */}
        <div className="p-4 border-b border-[#1e1e24]">
          <div className="text-xs text-[#6b6b75] mb-3">THREATS OVERVIEW</div>
          <div className="flex items-end gap-2 mb-3" style={{ height: '100px' }}>
            <div className="flex-1 bg-gradient-to-t from-[#00d4ff] to-[#00d4ff]/50 rounded-t" style={{ height: '85%' }}></div>
            <div className="flex-1 bg-gradient-to-t from-[#ff3366] to-[#ff3366]/50 rounded-t" style={{ height: '10%' }}></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00d4ff] rounded-sm"></div>
                <span className="text-xs text-[#e8e8ea]">Blocked</span>
              </div>
              <span className="text-sm text-[#e8e8ea]">13.9K</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff3366] rounded-sm"></div>
                <span className="text-xs text-[#e8e8ea]">Alerts</span>
              </div>
              <span className="text-sm text-[#e8e8ea]">6</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 overflow-auto p-4">
          <div className="text-xs text-[#6b6b75] mb-3">RECENT ACTIVITY</div>
          <div className="space-y-2">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="p-2 rounded bg-[#1a1a20] border border-[#2d2d35]">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-[#6b6b75] shrink-0">{activity.time}</span>
                  <div className="flex-1">
                    <p className="text-xs text-[#e8e8ea] leading-tight">{activity.event}</p>
                  </div>
                  <div 
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
                    style={{ 
                      backgroundColor: activity.type === 'success' ? '#14b8a6' : activity.type === 'alert' ? '#ff3366' : '#6b6b75'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Breakdown */}
        <div className="p-4 border-t border-[#1e1e24]">
          <div className="text-xs text-[#6b6b75] mb-3">SEVERITY</div>
          <div className="h-2 bg-[#1a1a20] rounded-full overflow-hidden flex mb-3">
            <div className="bg-[#ff3366]" style={{ width: '1%' }}></div>
            <div className="bg-[#d4af37]" style={{ width: '95%' }}></div>
            <div className="bg-[#4a9eff]" style={{ width: '4%' }}></div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff3366] rounded-sm"></div>
                <span className="text-xs text-[#e8e8ea]">Critical</span>
              </div>
              <span className="text-xs text-[#e8e8ea]">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#d4af37] rounded-sm"></div>
                <span className="text-xs text-[#e8e8ea]">Medium</span>
              </div>
              <span className="text-xs text-[#e8e8ea]">13.6K</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4a9eff] rounded-sm"></div>
                <span className="text-xs text-[#e8e8ea]">Low</span>
              </div>
              <span className="text-xs text-[#e8e8ea]">249</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}