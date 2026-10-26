import React from 'react';
import { ArrowUp, BookOpen, Compass, Shield } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1B18] text-[#F6F2EA] border-t-2 border-[#1E1B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              한국 요괴 도감
            </h3>
            <p className="text-xs font-mono tracking-widest text-[#E75A2D] uppercase">
              KOREAN YOKAI ARCHIVE · FOLKLORE ATLAS
            </p>
            <p className="text-xs text-stone-400 font-serif leading-relaxed max-w-sm pt-1">
              산 너머, 물 아래, 오래된 마을의 어둠 속 우리 땅에 전해 내려오는
              기묘한 존재들과 설화를 엄정한 사료 비판과 함께 기록하는 독립형 디지털 아카이브입니다.
            </p>
          </div>

          {/* Direct Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider font-mono">
              아카이브 편목
            </h4>
            <ul className="space-y-1.5 text-xs font-serif text-stone-400">
              <li>
                <button 
                  onClick={() => onNavClick('home')} 
                  className="hover:text-white transition-colors"
                >
                  홈 (전시 첫머리)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('regions')} 
                  className="hover:text-white transition-colors"
                >
                  지역별 요괴 챕터 (팔도 지도)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('index')} 
                  className="hover:text-white transition-colors"
                >
                  요괴 종합 도감 (색인 및 검색)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('stories')} 
                  className="hover:text-white transition-colors"
                >
                  이야기와 기록 (구비설화 전집)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('about')} 
                  className="hover:text-white transition-colors"
                >
                  아카이브 소개 및 검증 원칙
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Source Credits */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider font-mono">
              협력 및 사료 참조 기관
            </h4>
            <div className="text-xs font-serif text-stone-400 space-y-1 leading-relaxed">
              <p>· 국립민속박물관 한국민속대백과사전</p>
              <p>· 한국학중앙연구원 한국구비문학대계</p>
              <p>· 한국고전번역원 한국고전종합DB</p>
              <p>· 국립국악원 및 국립무형유산원 연희 기록</p>
              <p>· 조선왕조실록 및 승정원일기 국사편찬위원회</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-serif gap-4">
          <p>
            © {new Date().getFullYear()} 한국 요괴 도감 (KOREAN YOKAI ARCHIVE). 모든 전통 설화 원전의 저작권은 공공 민속 유산에 속합니다.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-xs font-mono"
          >
            <span>상단으로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
