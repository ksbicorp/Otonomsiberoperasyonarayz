import { ChevronRight } from 'lucide-react';

export function ExpertIntelligence() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-[#1e1e24]">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#e8e8ea]">Pen-İş Intelligence</span>
          <ChevronRight className="w-4 h-4 text-[#6b6b75]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#1e1e24] flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-[#d4af37]">🧠</span>
          </div>
          <p className="text-sm text-[#6b6b75]">Intelligence dashboard coming soon</p>
        </div>
      </div>
    </div>
  );
}
