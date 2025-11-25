import { ChevronRight, Calendar, Filter, SortAsc, Eye, Download } from 'lucide-react';
import { Button } from './ui/button';

const findings = [
  { id: '101000.000000', type: 'Prompt-Injection', severity: 'Critical', asset: 'AIPIblosses', date: '1/23/2021 02:09:28', status: 'Download' },
  { id: '103000.000090', type: 'Prompt-Injection', severity: 'High', asset: 'Computer Security', date: '1/23/2021 01:30:48', status: 'Download' },
  { id: '113000.000093', type: 'Application Report', severity: 'Medium', asset: 'Computer Security', date: '1/23/2021 07:18:51', status: 'Download' },
  { id: '131000.000005', type: 'Recent Findings', severity: 'Low', asset: 'Finezie.bireman', date: '3/23/2021 22:28:37', status: 'Downloand' },
  { id: '133000.000005', type: 'Prompt-Injection', severity: 'High', asset: 'Computer Security', date: '1/23/2021 07:18:53', status: 'Download' },
  { id: '145000.000088', type: 'Application Report', severity: 'Medium', asset: 'Computer Security', date: '3/23/2021 21:38:57', status: 'Download' },
  { id: '150000.000505', type: 'Recent Findings', severity: 'Low', asset: 'Webin apps', date: '3/23/2021 10:36:06', status: 'Download' },
  { id: '163000.000215', type: 'Recent Findings', severity: 'Low', asset: 'Hurrtareled', date: '1/23/2021 10:50:12', status: 'Download' },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'bg-[#ff3366] text-white';
    case 'High': return 'bg-[#ff9500] text-white';
    case 'Medium': return 'bg-[#febc2e] text-black';
    case 'Low': return 'bg-[#4a9eff] text-white';
    default: return 'bg-[#6b6b75] text-white';
  }
};

export function ExpertIntelligence() {
  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#e8e8ea]">Amidas Framework - Reports & Findings</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* Findings Trend Chart */}
          <div className="bg-[#0f0f14] rounded-lg border border-[#1e1e24] p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm text-[#e8e8ea] font-semibold">Findings Trend (Last 24 Hours)</h3>
              <div className="flex items-center gap-2 bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-1.5">
                <Calendar className="w-4 h-4 text-[#6b6b75]" />
                <span className="text-xs text-[#e8e8ea]">Date Range</span>
                <span className="text-xs text-[#6b6b75]">—</span>
                <span className="text-xs text-[#e8e8ea]">Past 24 Hours</span>
                <ChevronRight className="w-3 h-3 text-[#6b6b75] rotate-90" />
              </div>
            </div>

            {/* Chart */}
            <div className="h-48 relative">
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
                {[10, 10, 10, 10, 10, 10, 10, 45, 10, 30, 10, 10, 10, 30, 10, 50, 10, 20, 10, 10].map((height, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="w-1.5 bg-[#d4af37] rounded-t" style={{ height: `${height}%` }}></div>
                    <div className="w-1.5 h-1.5 bg-[#e8e8ea] rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-[#6b6b75] px-4">
                <span>12 AM</span>
                <span>20 AM</span>
                <span>24 AM</span>
                <span>18 AM</span>
                <span>12 AM</span>
                <span>28 AM</span>
                <span>28 AM</span>
                <span>30 AM</span>
                <span>1 AM</span>
                <span>3 AM</span>
                <span>6 AM</span>
                <span>9 AM</span>
                <span>12 PM</span>
                <span>2 PM</span>
                <span>4 PM</span>
                <span>8 PM</span>
              </div>
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[9px] text-[#6b6b75]">
                <span>100</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
            </div>
          </div>

          {/* Recent Findings Table */}
          <div className="bg-[#0f0f14] rounded-lg border border-[#1e1e24]">
            <div className="p-6 border-b border-[#1e1e24]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-[#e8e8ea] font-semibold">Recent Findings & Reports</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-[#6b6b75] hover:text-[#e8e8ea] h-8">
                    <SortAsc className="w-4 h-4 mr-1" />
                    Sort by
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#6b6b75] hover:text-[#e8e8ea] h-8">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter by
                  </Button>
                  <input 
                    type="text" 
                    placeholder="Filter" 
                    className="bg-[#1a1a20] border border-[#2d2d35] rounded px-3 py-1.5 text-xs text-[#e8e8ea] w-32"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e1e24]">
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">ID</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Type</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Severity</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Asset/Source</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Date</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-[#6b6b75] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {findings.map((finding, idx) => (
                    <tr key={idx} className="border-b border-[#1e1e24] hover:bg-[#1a1a20]">
                      <td className="px-6 py-4 text-xs text-[#e8e8ea]">{finding.id}</td>
                      <td className="px-6 py-4 text-xs text-[#e8e8ea]">{finding.type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-medium ${getSeverityColor(finding.severity)}`}>
                          {finding.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#e8e8ea]">{finding.asset}</td>
                      <td className="px-6 py-4 text-xs text-[#6b6b75]">{finding.date}</td>
                      <td className="px-6 py-4 text-xs text-[#e8e8ea]">{finding.status}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-[#6b6b75] hover:text-[#e8e8ea]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-[#6b6b75] hover:text-[#e8e8ea]">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Overview */}
      <div className="w-80 bg-[#0f0f14] border-l border-[#1e1e24] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-sm font-semibold text-[#e8e8ea] mb-6">Overview</h3>

          {/* Critical Findings */}
          <div className="bg-[#1a1a20] rounded-lg p-4 mb-4 border border-[#2d2d35]">
            <div className="text-xs text-[#6b6b75] mb-2">Critical Findings</div>
            <div className="text-3xl font-bold text-[#e8e8ea]">25</div>
          </div>

          {/* High Risk Assets */}
          <div className="bg-[#1a1a20] rounded-lg p-4 mb-4 border border-[#2d2d35]">
            <div className="text-xs text-[#6b6b75] mb-2">High Risk Assets</div>
            <div className="text-3xl font-bold text-[#e8e8ea]">7</div>
          </div>

          {/* Generated Reports */}
          <div className="bg-[#1a1a20] rounded-lg p-4 mb-6 border border-[#2d2d35]">
            <div className="text-xs text-[#6b6b75] mb-2">Generated Reports</div>
            <div className="text-3xl font-bold text-[#e8e8ea]">48</div>
          </div>

          {/* Risk Distribution */}
          <div className="mb-6">
            <div className="text-xs text-[#e8e8ea] mb-4">Risk Distribution</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6b6b75]">Critical Findings</span>
                  <span className="text-[#e8e8ea]">25</span>
                </div>
                <div className="h-20 bg-[#ff3366] rounded"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6b6b75]">High Risk Assets</span>
                  <span className="text-[#e8e8ea]">7</span>
                </div>
                <div className="h-16 bg-[#ff9500] rounded"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6b6b75]">Medium</span>
                  <span className="text-[#e8e8ea]">10</span>
                </div>
                <div className="h-24 bg-[#febc2e] rounded"></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6b6b75]">Low</span>
                  <span className="text-[#e8e8ea]">3</span>
                </div>
                <div className="h-10 bg-[#4a9eff] rounded"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-[#6b6b75]">
              <span>0</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
