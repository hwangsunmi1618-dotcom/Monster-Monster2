import React, { useState } from 'react';
import { REGIONS_DATA } from '../data/regions';
import { YOKAI_DATABASE } from '../data/monsters';
import { RegionKey } from '../data/types';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

interface RegionalSectionProps {
  selectedRegion: RegionKey | '전체';
  onSelectRegion: (region: RegionKey | '전체') => void;
  onOpenMonster: (id: string) => void;
}

export const RegionalSection: React.FC<RegionalSectionProps> = ({
  selectedRegion,
  onSelectRegion,
  onOpenMonster
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null);

  // Map region node data
  const mapNodes: {
    region: RegionKey;
    x: number;
    y: number;
    label: string;
    creatureCount: number;
  }[] = [
    {
      region: '북한 및 기타 전승 지역',
      x: 130,
      y: 70,
      label: '송도·평양',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '북한 및 기타 전승 지역' || m.allRegions?.includes('북한 및 기타 전승 지역')).length
    },
    {
      region: '서울·경기',
      x: 110,
      y: 145,
      label: '한양·경기',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '서울·경기' || m.allRegions?.includes('서울·경기')).length
    },
    {
      region: '강원',
      x: 180,
      y: 130,
      label: '태백·영서',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '강원' || m.allRegions?.includes('강원')).length
    },
    {
      region: '충청',
      x: 120,
      y: 205,
      label: '금강·계룡',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '충청' || m.allRegions?.includes('충청')).length
    },
    {
      region: '전라',
      x: 100,
      y: 285,
      label: '지리산·남도',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '전라' || m.allRegions?.includes('전라')).length
    },
    {
      region: '경상',
      x: 190,
      y: 250,
      label: '낙동·서라벌',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '경상' || m.allRegions?.includes('경상')).length
    },
    {
      region: '제주',
      x: 85,
      y: 380,
      label: '탐라·곶자왈',
      creatureCount: YOKAI_DATABASE.filter(m => m.region === '제주' || m.allRegions?.includes('제주')).length
    }
  ];

  const handleRegionClick = (region: RegionKey) => {
    onSelectRegion(region);
    const indexElement = document.getElementById('index');
    if (indexElement) {
      indexElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="regions" className="py-16 md:py-24 bg-[#EFE8D8] border-b-2 border-[#1E1B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b-2 border-[#1E1B18] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#E75A2D] font-bold tracking-widest uppercase">
              <span>01. 지역별 전승 챕터</span>
              <span aria-hidden="true">·</span>
              <span>REGIONAL FOLKLORE ATLAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1E1B18] mt-1">
              팔도에 깃든 기묘한 존재들
            </h2>
          </div>
          <p className="text-sm text-[#5C5549] max-w-md">
            한반도의 험준한 산맥, 휘감아 도는 강줄기, 외딴 섬의 자연과 생활사가 낳은
            7대 전승 권역별 기이한 설화를 탐색해 보세요.
          </p>
        </div>

        {/* Layout: Interactive Map + Regional Chapter Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Vintage Illustrated Map Panel */}
          <div className="lg:col-span-5 comic-box bg-[#F6F2EA] p-5 relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E1B18] text-xs font-serif font-bold">
              <span className="flex items-center gap-1.5 text-[#1E1B18]">
                <Compass className="w-4 h-4 text-[#E75A2D]" />
                조선 팔도 요괴 출현도
              </span>
              <span className="text-[#1D7874]">지도를 클릭해 지역 선택</span>
            </div>

            {/* Custom Vintage Map Illustration SVG */}
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto flex items-center justify-center bg-[#EBE4D3] border-2 border-[#1E1B18] p-2 overflow-hidden">
              
              {/* Halftone texture inside map */}
              <div className="absolute inset-0 bg-halftone-dots opacity-30 pointer-events-none" />

              <svg 
                viewBox="0 0 280 420" 
                className="w-full h-full drop-shadow-sm select-none"
                style={{ filter: 'contrast(1.05)' }}
              >
                {/* Coastal silhouette of Korean Peninsula */}
                <path
                  d="M 90 25 
                     C 120 15, 170 30, 195 50 
                     C 220 70, 240 100, 220 130 
                     C 210 160, 230 190, 245 230 
                     C 255 270, 230 300, 205 310 
                     C 180 320, 160 330, 130 330 
                     C 110 330, 85 300, 80 270 
                     C 75 240, 95 210, 85 180 
                     C 75 150, 90 120, 75 90 
                     C 65 60, 75 35, 90 25 Z"
                  fill="#F7F3E9"
                  stroke="#1E1B18"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Sub-path for Jeju Island */}
                <ellipse 
                  cx="85" 
                  cy="380" 
                  rx="30" 
                  ry="16" 
                  fill="#F7F3E9" 
                  stroke="#1E1B18" 
                  strokeWidth="2.5" 
                />

                {/* Mountain ridges styling (Taebaek & Sobaek) */}
                <path 
                  d="M 180 80 Q 195 120 190 160 T 175 230 T 150 280" 
                  fill="none" 
                  stroke="#D6CEBE" 
                  strokeWidth="4" 
                  strokeDasharray="2,3" 
                />

                {/* Regional Clickable Nodes */}
                {mapNodes.map((node) => {
                  const isSelected = selectedRegion === node.region;
                  const isHovered = hoveredRegion === node.region;
                  return (
                    <g 
                      key={node.region}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => handleRegionClick(node.region)}
                      onMouseEnter={() => setHoveredRegion(node.region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      {/* Outer pulse circle when hovered or selected */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          fill={isSelected ? '#E75A2D' : '#1D7874'}
                          opacity="0.25"
                        />
                      )}

                      {/* Main node pin circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? '9' : '7'}
                        fill={isSelected ? '#E75A2D' : isHovered ? '#1D7874' : '#1E1B18'}
                        stroke="#F6F2EA"
                        strokeWidth="2"
                      />

                      {/* Node label box */}
                      <rect
                        x={node.x - 32}
                        y={node.y + 11}
                        width="64"
                        height="16"
                        fill="#1E1B18"
                        stroke="#F6F2EA"
                        strokeWidth="1"
                        rx="1"
                      />
                      <text
                        x={node.x}
                        y={node.y + 22}
                        textAnchor="middle"
                        fill="#F6F2EA"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="serif"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Active selection badge */}
              <div className="absolute bottom-2 left-2 right-2 bg-[#1E1B18] text-[#F6F2EA] px-2.5 py-1.5 text-xs font-serif flex items-center justify-between">
                <span>선택된 권역: <strong>{selectedRegion}</strong></span>
                {selectedRegion !== '전체' && (
                  <button 
                    onClick={() => onSelectRegion('전체')}
                    className="text-[#E75A2D] hover:underline text-[11px]"
                  >
                    전체 보기
                  </button>
                )}
              </div>
            </div>

            <p className="text-[12px] text-[#736B5E] text-center mt-3 font-serif">
              각 지점을 클릭하면 해당 지역의 고유 설화와 요괴 카드로 즉시 필터링됩니다.
            </p>
          </div>

          {/* Regional Chapter Cards List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REGIONS_DATA.map((chapter) => {
              const isSelected = selectedRegion === chapter.id;
              const creatureCount = YOKAI_DATABASE.filter(m => 
                m.region === chapter.id || m.allRegions?.includes(chapter.id)
              ).length;

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleRegionClick(chapter.id)}
                  className={`p-4 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1E1B18] text-[#F6F2EA] border-[#1E1B18] shadow-[4px_4px_0px_#E75A2D]'
                      : 'bg-[#F6F2EA] text-[#1E1B18] border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18] hover:bg-[#FAF7F0] hover:-translate-y-0.5'
                  }`}
                >
                  <div>
                    {/* Header line: Region name + Count */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/20">
                      <span className="text-base font-bold font-serif">
                        {chapter.title}
                      </span>
                      <span className={`text-xs px-2 py-0.5 font-mono font-bold ${
                        isSelected ? 'bg-[#E75A2D] text-white' : 'bg-[#EBE4D3] text-[#1E1B18]'
                      }`}>
                        전승 {creatureCount}종
                      </span>
                    </div>

                    <p className={`text-xs font-serif italic mb-2 ${isSelected ? 'text-[#D6CEBE]' : 'text-[#736B5E]'}`}>
                      {chapter.subtitle}
                    </p>

                    <p className={`text-xs leading-relaxed line-clamp-3 mb-3 ${isSelected ? 'text-[#EFE8D8]' : 'text-[#4A453E]'}`}>
                      {chapter.description}
                    </p>
                  </div>

                  {/* Representative creatures & Action */}
                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="opacity-70 shrink-0">대표 요괴:</span>
                      <div className="flex items-center gap-1 truncate font-medium">
                        {chapter.representativeCreatures.map((cId) => {
                          const creature = YOKAI_DATABASE.find(m => m.id === cId);
                          if (!creature) return null;
                          return (
                            <button
                              key={cId}
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenMonster(cId);
                              }}
                              className={`underline hover:opacity-80 shrink-0 ${isSelected ? 'text-[#E75A2D]' : 'text-[#1D7874]'}`}
                            >
                              {creature.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
