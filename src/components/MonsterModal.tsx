import React, { useEffect, useState } from 'react';
import { MonsterData } from '../data/types';
import { YOKAI_DATABASE } from '../data/monsters';
import { 
  X, Bookmark, MapPin, CheckCircle2, AlertCircle, HelpCircle, 
  ExternalLink, Printer, Share2, Sparkles, ArrowRight 
} from 'lucide-react';

interface MonsterModalProps {
  monster: MonsterData | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectRelated: (monster: MonsterData) => void;
}

export const MonsterModal: React.FC<MonsterModalProps> = ({
  monster,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (monster) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [monster]);

  if (!monster) return null;

  const relatedList = YOKAI_DATABASE.filter(m => monster.relatedCreatures.includes(m.id));

  const handleShare = () => {
    const text = `[한국 요괴 도감] ${monster.name} (${monster.englishName}) - ${monster.shortDescription}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Dialog Frame */}
      <div 
        className="relative w-full max-w-4xl bg-[#F6F2EA] border-2 border-[#1E1B18] shadow-[8px_8px_0px_#1E1B18] my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Operational Utility Bar */}
        <div className="bg-[#1E1B18] text-[#F6F2EA] px-4 sm:px-6 py-3 flex items-center justify-between border-b-2 border-[#1E1B18]">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#E75A2D] font-bold">ACCESSION NO:</span>
            <span>KR-YOKAI-{monster.id.toUpperCase()}</span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-300 font-serif">{monster.creatureType}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(monster.id)}
              className={`p-1.5 transition-colors ${
                isBookmarked ? 'text-[#E75A2D]' : 'text-stone-300 hover:text-white'
              }`}
              title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 저장'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-300 hover:text-white transition-colors"
              title="정보 복사하기"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-block p-1.5 text-stone-300 hover:text-white transition-colors"
              title="아카이브 카드 인쇄"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white border border-stone-600 transition-colors ml-2"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copyFeedback && (
          <div className="bg-[#1D7874] text-white text-xs text-center py-1 font-serif">
            요괴 정보 요약이 클립보드에 복사되었습니다.
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-8 space-y-8 print:max-h-none print:overflow-visible">
          
          {/* Header & Visual Slot Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Visual Frame */}
            <div className="md:col-span-5">
              <div className="comic-box bg-[#EFE8D8] p-2 sm:p-3 relative">
                <div className="relative aspect-[3/4] bg-[#24211E] overflow-hidden border-2 border-[#1E1B18]">
                  <img
                    src={monster.imageUrl}
                    alt={monster.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-105"
                  />
                  <div className="absolute inset-0 bg-halftone-dots opacity-20 pointer-events-none mix-blend-overlay" />
                </div>
                <div className="pt-2 text-[11px] text-[#736B5E] text-center font-serif">
                  {monster.imageCredit}
                </div>
              </div>

              {/* Quick Spec Box */}
              <div className="mt-4 p-3 bg-[#EFE8D8] border border-[#1E1B18] space-y-2 text-xs font-serif">
                <div className="flex justify-between border-b border-[#D6CEBE] pb-1">
                  <span className="text-[#736B5E]">존재 분류</span>
                  <span className="font-bold text-[#1E1B18]">{monster.creatureType}</span>
                </div>
                <div className="flex justify-between border-b border-[#D6CEBE] pb-1">
                  <span className="text-[#736B5E]">성향/역할</span>
                  <span className="font-bold text-[#E75A2D]">{monster.roleType}</span>
                </div>
                <div className="flex justify-between border-b border-[#D6CEBE] pb-1">
                  <span className="text-[#736B5E]">불길·위험도</span>
                  <span className="font-mono font-bold text-[#1E1B18]">
                    {'★'.repeat(monster.dangerLevel)}{'☆'.repeat(5 - monster.dangerLevel)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736B5E]">설화 테마</span>
                  <span className="font-medium text-[#1D7874]">{monster.themeCategory}</span>
                </div>
              </div>
            </div>

            {/* Title & Core Overview */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Verification Status Banner */}
              <div className="p-3 border-2 border-[#1E1B18] bg-[#FAF7F0] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-serif">
                    {monster.verificationStatus === '출처 확인' && (
                      <span className="text-[#1D7874] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> 고문헌 및 관변기록 출처 확인 완료
                      </span>
                    )}
                    {monster.verificationStatus === '일부 확인' && (
                      <span className="text-[#C4821E] flex items-center gap-1">
                        <HelpCircle className="w-4 h-4" /> 구비전승 중심 (고증 일부 확인)
                      </span>
                    )}
                    {monster.verificationStatus === '자료 확인 필요' && (
                      <span className="text-[#C84630] flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> 현대 도시 전설 / 추가 자료 고증 필요
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 bg-[#1E1B18] text-white">
                    {monster.verificationStatus}
                  </span>
                </div>
                <p className="text-[11px] text-[#5C5549] leading-tight font-serif pt-1">
                  {monster.verificationNotes}
                </p>
              </div>

              {/* Monster Name and Aliases */}
              <div>
                <h2 id="modal-title" className="text-3xl sm:text-4xl font-black font-serif text-[#1E1B18] flex items-baseline gap-3">
                  <span>{monster.name}</span>
                  {monster.hanjaName && (
                    <span className="text-lg font-normal text-[#736B5E]">
                      ({monster.hanjaName})
                    </span>
                  )}
                </h2>
                <p className="text-xs font-mono tracking-widest text-[#1D7874] uppercase mt-0.5">
                  {monster.englishName}
                </p>
                {monster.alternateNames.length > 0 && (
                  <p className="text-xs text-[#736B5E] mt-1 font-serif">
                    이칭(異稱): {monster.alternateNames.join(', ')}
                  </p>
                )}
              </div>

              {/* 1-Sentence Summary */}
              <div className="p-3 bg-[#EBE4D3] border-l-4 border-[#E75A2D]">
                <p className="text-sm font-medium font-serif text-[#24211E] leading-relaxed">
                  {monster.shortDescription}
                </p>
              </div>

              {/* Transmission Location */}
              <div className="space-y-1 text-xs font-serif">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E75A2D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1E1B18]">전승 권역: </span>
                    <span>{monster.region}</span>
                    {monster.allRegions && monster.allRegions.length > 1 && (
                      <span className="text-[#736B5E] ml-1">
                        (유사 전승 분포: {monster.allRegions.join(', ')})
                      </span>
                    )}
                    <p className="text-[#5C5549] mt-0.5">
                      <strong>구체적 채록지:</strong> {monster.specificLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Physical Appearance */}
              <div className="space-y-1 text-xs sm:text-sm font-serif">
                <h4 className="font-bold text-[#1E1B18] border-b border-[#D6CEBE] pb-1">
                  외형과 형상적 특징
                </h4>
                <p className="text-[#4A453E] leading-relaxed">
                  {monster.appearance}
                </p>
              </div>

            </div>

          </div>

          {/* Section 5: Folklore Narrative Story with Vintage Drop Cap */}
          <div className="space-y-3 pt-4 border-t-2 border-[#1E1B18]">
            <div className="flex items-center gap-2 text-xs font-serif text-[#E75A2D] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>전해지는 이야기와 전승 구술</span>
            </div>
            <div className="p-5 bg-[#FAF7F0] border border-[#1E1B18]">
              <p className="text-sm sm:text-base text-[#2E2A25] font-serif leading-loose whitespace-pre-line drop-cap">
                {monster.folkloreStory}
              </p>
            </div>
          </div>

          {/* Section 6 & 7: Relationship with humans & Cultural context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-4 bg-[#EFE8D8] border border-[#1E1B18] space-y-2">
              <h4 className="text-xs font-bold font-serif text-[#1E1B18] uppercase tracking-wider border-b border-[#D6CEBE] pb-1">
                인간과의 관계 및 설화 속 역할
              </h4>
              <p className="text-xs leading-relaxed text-[#4A453E] font-serif">
                {monster.relationshipWithHumans}
              </p>
            </div>

            <div className="p-4 bg-[#EFE8D8] border border-[#1E1B18] space-y-2">
              <h4 className="text-xs font-bold font-serif text-[#1E1B18] uppercase tracking-wider border-b border-[#D6CEBE] pb-1">
                유래와 민속학적 의미
              </h4>
              <p className="text-xs leading-relaxed text-[#4A453E] font-serif">
                {monster.culturalContext}
              </p>
            </div>

          </div>

          {/* Section 8: Primary Sources & Academic Citation */}
          <div className="p-4 bg-[#EBE4D3] border-2 border-[#1E1B18] space-y-2">
            <h4 className="text-xs font-bold font-serif text-[#1E1B18] uppercase tracking-wider">
              사료 출처 및 참고 문헌
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-serif">
              <div>
                <span className="text-[#736B5E] block text-[11px]">수록 문헌 / 채록집</span>
                <strong className="text-[#1E1B18]">{monster.sourceTitle}</strong>
              </div>
              <div>
                <span className="text-[#736B5E] block text-[11px]">소장 및 연구 기관</span>
                <span className="text-[#1E1B18] font-medium">{monster.sourceOrganization}</span>
              </div>
              <div>
                <span className="text-[#736B5E] block text-[11px]">공공 사료 접근</span>
                {monster.sourceUrl ? (
                  <a 
                    href={monster.sourceUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#1D7874] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>기관 디지털 아카이브</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[#736B5E]">비공개 고문헌 실물 보관</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 9: Related Creatures */}
          {relatedList.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold font-serif text-[#1E1B18] uppercase tracking-wider">
                관련 요괴 및 연관 전승
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedList.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-[#FAF7F0] border border-[#1E1B18] hover:bg-white text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={rel.imageUrl} 
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover border border-[#1E1B18]" 
                      />
                      <div>
                        <p className="text-xs font-bold font-serif text-[#1E1B18] group-hover:text-[#E75A2D]">
                          {rel.name} ({rel.englishName})
                        </p>
                        <p className="text-[11px] text-[#736B5E] truncate max-w-[200px]">
                          {rel.region} · {rel.creatureType}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#736B5E] group-hover:text-[#E75A2D] transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="bg-[#EFE8D8] px-4 sm:px-6 py-3 border-t-2 border-[#1E1B18] flex items-center justify-between">
          <span className="text-xs text-[#736B5E] font-serif">
            한국 요괴 도감 연구 아카이브 · 국립민속학 고증
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1E1B18] text-[#F6F2EA] text-xs font-bold font-serif hover:bg-[#E75A2D] transition-colors"
          >
            닫기
          </button>
        </div>

      </div>

    </div>
  );
};
