import React from 'react';
import { ShieldCheck, BookCheck, ScrollText, Compass, AlertTriangle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#F6F2EA] border-b-2 border-[#1E1B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b-2 border-[#1E1B18] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#1D7874] font-bold tracking-widest uppercase">
              <span>04. 아카이브 설립 원칙</span>
              <span aria-hidden="true">·</span>
              <span>CURATORIAL MANIFESTO &amp; ETHICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1E1B18] mt-1">
              아카이브 소개 및 검증 원칙
            </h2>
          </div>
          <p className="text-sm text-[#5C5549] max-w-md">
            흥미로운 시각적 연출과 역사적·민속학적 사실을 엄격히 구분하여,
            우리 조상들의 삶과 정서가 깃든 설화를 복원합니다.
          </p>
        </div>

        {/* 3 Core Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="comic-box bg-[#FAF7F0] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#1D7874] text-white flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold font-serif text-[#1E1B18]">
              사실과 창작의 엄격한 분리
            </h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-serif">
              출처가 명확한 전통 설화와 현대적 창작물(도시 전설 및 대중문화 설정)을 임의로 섞지 않습니다. 
              역사적 사료가 부재한 항목은 반드시 ‘자료 확인 필요’ 상태로 투명하게 표시합니다.
            </p>
          </div>

          <div className="comic-box bg-[#FAF7F0] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#E75A2D] text-white flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold font-serif text-[#1E1B18]">
              공공 사료 및 학술 고증 준수
            </h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-serif">
              《삼국유사》, 《조선왕조실록》, 《용재총화》, 《어우야담》, 《한국구비문학대계》 등 
              국립민속박물관과 한국학중앙연구원의 공인된 원문 데이터베이스를 우선적으로 참조합니다.
            </p>
          </div>

          <div className="comic-box bg-[#FAF7F0] p-6 space-y-3">
            <div className="w-10 h-10 bg-[#1E1B18] text-white flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold font-serif text-[#1E1B18]">
              지역 전승의 고유성과 다원성
            </h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-serif">
              전국적으로 알려진 요괴를 근거 없이 특정 고을의 독점적 전승으로 단정하지 않으며,
              지역마다 달라지는 변형 설화는 단일 스토리로 뭉뚱그리지 않고 개별 채록본으로 기록합니다.
            </p>
          </div>

        </div>

        {/* Verification Status Legend Table */}
        <div className="p-6 bg-[#EFE8D8] border-2 border-[#1E1B18] space-y-4">
          <h4 className="text-base font-bold font-serif text-[#1E1B18] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1D7874]" />
            <span>아카이브 3단계 학술 검증 기준</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif">
            
            <div className="p-4 bg-[#F6F2EA] border border-[#1E1B18]">
              <div className="flex items-center gap-2 mb-2 font-bold text-[#1D7874]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D7874]" />
                <span>출처 확인 (Verified)</span>
              </div>
              <p className="text-[#5C5549] leading-relaxed">
                조선왕조실록, 삼국유사, 어우야담, 용재총화 등 역사적 문헌에 전승 문맥이 직접 기록되었거나, 
                공공 학술 채록 사업을 통해 복수의 구전 증언이 일치하는 항목.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EA] border border-[#1E1B18]">
              <div className="flex items-center gap-2 mb-2 font-bold text-[#C4821E]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C4821E]" />
                <span>일부 확인 (Partially Verified)</span>
              </div>
              <p className="text-[#5C5549] leading-relaxed">
                민간에 널리 회자되며 무속이나 탈놀음 등 연희 예술에 등장하나, 
                독립된 고문헌 표기나 구체적 발원지가 다소 모호하여 추가 고증이 진행 중인 항목.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EA] border border-[#1E1B18]">
              <div className="flex items-center gap-2 mb-2 font-bold text-[#C84630]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C84630]" />
                <span>자료 확인 필요 (Needs Verification)</span>
              </div>
              <p className="text-[#5C5549] leading-relaxed">
                2000년대 이후 형성된 현대 도시 전설이거나 인터넷 발 괴담으로, 
                전통 민속 설화와 혼동을 방지하기 위해 엄격히 별도 관리하는 항목 (예: 장산범).
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
