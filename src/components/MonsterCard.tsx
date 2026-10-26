import React, { useState } from 'react';
import { MonsterData } from '../data/types';
import { Bookmark, MapPin, Eye, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

interface MonsterCardProps {
  monster: MonsterData;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (monster: MonsterData) => void;
}

export const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails
}) => {
  const [imgError, setImgError] = useState(false);

  // Verification status stamp design
  const getStatusBadge = () => {
    switch (monster.verificationStatus) {
      case '출처 확인':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D7874] border border-[#1D7874] px-1.5 py-0.5 bg-[#1D7874]/5">
            <CheckCircle2 className="w-3 h-3" /> 출처 확인
          </span>
        );
      case '일부 확인':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C4821E] border border-[#C4821E] px-1.5 py-0.5 bg-[#C4821E]/5">
            <HelpCircle className="w-3 h-3" /> 일부 확인
          </span>
        );
      case '자료 확인 필요':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C84630] border border-[#C84630] px-1.5 py-0.5 bg-[#C84630]/5">
            <AlertCircle className="w-3 h-3" /> 자료 확인 필요
          </span>
        );
    }
  };

  return (
    <article className="comic-box bg-[#F6F2EA] flex flex-col justify-between group overflow-hidden transition-all duration-200">
      
      {/* Visual Slot with Vintage Framing */}
      <div className="relative aspect-[4/3] bg-[#24211E] overflow-hidden border-b-2 border-[#1E1B18]">
        {!imgError ? (
          <img
            src={monster.imageUrl}
            alt={`${monster.name} - ${monster.shortDescription}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 contrast-105"
          />
        ) : (
          /* Styled Fallback Container per Zero-Broken-Image Policy */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2D5D7B] to-[#174A3D] text-[#F6F2EA] p-4 text-center">
            <span className="text-3xl font-black font-serif text-[#E8A838] mb-1">
              {monster.name}
            </span>
            <span className="text-xs text-[#D6CEBE]">{monster.creatureType} · {monster.region}</span>
            <span className="text-[10px] text-[#A69E8D] mt-2">사료 복원 그래픽 준비 중</span>
          </div>
        )}

        {/* Vintage halftone overlay on image */}
        <div className="absolute inset-0 bg-halftone-dots opacity-20 pointer-events-none mix-blend-overlay" />

        {/* Top-Right Favorite Bookmark Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(monster.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-none border border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] transition-all ${
            isBookmarked 
              ? 'bg-[#E75A2D] text-white' 
              : 'bg-[#F6F2EA] text-[#1E1B18] hover:bg-white'
          }`}
          title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          aria-label={`${monster.name} 즐겨찾기`}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Bottom classification banner on card image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2.5 flex items-end justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-sans font-medium text-white/90">
            <MapPin className="w-3.5 h-3.5 text-[#E75A2D] shrink-0" />
            <span className="truncate">{monster.region}</span>
          </div>
          <span className="text-white/80 text-[11px] font-mono">
            {monster.creatureType}
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Header row: Status Stamp & Accession note */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D6CEBE] text-xs">
            {getStatusBadge()}
            <span className="text-[11px] text-[#736B5E] font-mono">
              ID: {monster.id.toUpperCase()}
            </span>
          </div>

          {/* Title & Hanja/Romanized */}
          <div className="space-y-0.5">
            <h3 className="text-xl font-bold font-serif text-[#1E1B18] group-hover:text-[#E75A2D] transition-colors flex items-baseline gap-2">
              <span>{monster.name}</span>
              {monster.hanjaName && (
                <span className="text-xs font-normal text-[#736B5E] font-serif">
                  ({monster.hanjaName})
                </span>
              )}
            </h3>
            <p className="text-xs font-mono tracking-wider text-[#1D7874] uppercase">
              {monster.englishName}
            </p>
          </div>

          {/* 1-Sentence Description */}
          <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed line-clamp-2 mt-2 font-serif">
            {monster.shortDescription}
          </p>

          {/* Tags list (Clean unboxed text metadata per zero-pill rule) */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#736B5E] mt-3">
            {monster.tags.slice(0, 3).map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>#{tag}</span>
                {idx < Math.min(monster.tags.length, 3) - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Card Footer: Detail View Action */}
        <div className="pt-3 border-t border-[#D6CEBE]">
          <button
            onClick={() => onOpenDetails(monster)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1E1B18] text-[#F6F2EA] text-xs font-bold font-serif hover:bg-[#E75A2D] transition-colors border border-[#1E1B18]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>상세 기록 열람</span>
          </button>
        </div>

      </div>

    </article>
  );
};
