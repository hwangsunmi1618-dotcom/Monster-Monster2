import React from 'react';
import { Compass, BookOpen, Scroll, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onIndexClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onIndexClick }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b-2 border-[#1E1B18] bg-[#F6F2EA]">
      {/* Background subtle retro halftone texture */}
      <div className="absolute inset-0 bg-halftone-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Title, Subtitle, Editorial Lead */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Curatorial Classification kicker (Unboxed clean typography) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-serif text-[#1D7874] font-semibold tracking-wider uppercase">
              <span>디지털 민속 아카이브</span>
              <span aria-hidden="true">·</span>
              <span>한국향토대계 채록</span>
              <span aria-hidden="true">·</span>
              <span>1970년대 빈티지 판화풍</span>
            </div>

            {/* Main Title Group */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1B18] tracking-tight font-serif leading-[1.15]">
                한국 요괴 도감
              </h1>
              <p className="text-sm sm:text-base font-bold tracking-widest text-[#E75A2D] uppercase font-sans">
                AN ATLAS OF KOREAN MONSTERS &amp; FOLKLORE
              </p>
            </div>

            {/* Curatorial Quote & Prose */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-[#E75A2D]/80 py-1 space-y-3">
              <p className="text-lg sm:text-xl font-medium text-[#2E2A25] font-serif leading-relaxed italic">
                “산 너머, 물 아래, 오래된 마을의 어둠 속.<br />
                우리 땅에는 오래전부터 설명할 수 없는 존재들이 살아왔다.”
              </p>
              <p className="text-sm sm:text-base text-[#4A453E] leading-relaxed">
                단순한 흥미성 괴담을 넘어, 《삼국유사》, 《조선왕조실록》, 《용재총화》, 《한국구비문학대계》에 실제로 기록된 
                한국 각 지역의 기묘한 존재(요괴·귀물·괴수·이물)를 엄정한 출처 검증과 함께 탐색하는 독립형 디지털 도감입니다.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-[#E75A2D] text-white font-bold text-base comic-box comic-box-pressed hover:bg-[#D34E24] transition-colors whitespace-nowrap"
              >
                <Compass className="w-5 h-5" />
                <span>요괴 탐험 시작하기</span>
              </button>

              <button
                onClick={onIndexClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#F6F2EA] text-[#1E1B18] font-bold text-base border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18] hover:bg-[#EFE8D8] transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-5 h-5" />
                <span>전체 도감 열람</span>
              </button>
            </div>

            {/* Credential strip */}
            <div className="pt-6 border-t border-[#D6CEBE]/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs text-[#736B5E] font-medium">전승 지역권</p>
                <p className="text-lg sm:text-xl font-bold font-serif text-[#1E1B18] tabular-nums">7개 권역</p>
              </div>
              <div>
                <p className="text-xs text-[#736B5E] font-medium">검증 고문헌</p>
                <p className="text-lg sm:text-xl font-bold font-serif text-[#1E1B18]">삼국유사 外 12종</p>
              </div>
              <div>
                <p className="text-xs text-[#736B5E] font-medium">고증 투명도</p>
                <p className="text-lg sm:text-xl font-bold font-serif text-[#1D7874] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> 100% 표기
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Vintage Comic Monster Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Vintage retro frame container */}
              <div className="relative comic-box bg-[#EFE8D8] p-3 sm:p-4 rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#1E1B18] text-xs font-bold text-[#1E1B18]">
                  <span className="font-serif">국립민속 아카이브 제7집</span>
                  <span className="text-[#E75A2D] font-mono">ARCHIVE #1970</span>
                </div>

                {/* Hero Artwork Image (Using user's provided asset) */}
                <div className="relative aspect-[9/14] overflow-hidden border-2 border-[#1E1B18] bg-[#1E1B18]">
                  <img
                    src="/public/assets/aistudio/________________72f422b6.png"
                    alt="한국 민속 괴물과 소녀들이 묘사된 1970년대 빈티지 만화풍 일러스트"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-105"
                  />
                  
                  {/* Subtle grain overlay */}
                  <div className="absolute inset-0 bg-halftone-teal opacity-20 pointer-events-none mix-blend-multiply" />
                  
                  {/* Floating stamp tag in bottom corner */}
                  <div className="absolute bottom-3 left-3 bg-[#1E1B18] text-[#F6F2EA] px-2.5 py-1 text-xs font-serif font-bold tracking-wider border border-[#F6F2EA]/40">
                    전통 설화의 현대적 귀환
                  </div>
                </div>

                {/* Illustration caption */}
                <div className="pt-3 text-xs text-[#5C5549] space-y-1 font-serif">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1E1B18]">영노와 서라벌의 기물들</span>
                    <span className="italic">1970년대 목판화·스크린톤 채색</span>
                  </div>
                  <p className="text-[11px] leading-tight text-[#736B5E]">
                    기괴함과 익살스러움이 공존하는 한국 괴담 특유의 정취를 담은 원화
                  </p>
                </div>

              </div>

              {/* Decorative accent stamp offset behind */}
              <div className="absolute -top-3 -right-3 -z-10 w-24 h-24 bg-[#E75A2D]/20 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 -z-10 w-32 h-32 bg-[#1D7874]/20 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
