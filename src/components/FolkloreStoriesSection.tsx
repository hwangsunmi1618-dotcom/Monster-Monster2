import React, { useState } from 'react';
import { FOLKLORE_STORIES } from '../data/stories';
import { FolkloreTheme, MonsterData } from '../data/types';
import { YOKAI_DATABASE } from '../data/monsters';
import { BookOpen, MapPin, Sparkles, Eye } from 'lucide-react';

interface FolkloreStoriesSectionProps {
  onOpenMonster: (id: string) => void;
}

export const FolkloreStoriesSection: React.FC<FolkloreStoriesSectionProps> = ({ onOpenMonster }) => {
  const [selectedTheme, setSelectedTheme] = useState<FolkloreTheme | '전체'>('전체');
  const [activeStoryId, setActiveStoryId] = useState<string>(FOLKLORE_STORIES[0].id);

  const themeList: (FolkloreTheme | '전체')[] = [
    '전체',
    '밤길과 산길의 존재',
    '물과 바다의 존재',
    '집과 마을에 깃든 존재',
    '사람을 홀리는 존재',
    '변신하는 존재',
    '설명하기 어려운 기이한 사건'
  ];

  const filteredStories = selectedTheme === '전체' 
    ? FOLKLORE_STORIES 
    : FOLKLORE_STORIES.filter(s => s.theme === selectedTheme);

  const activeStory = FOLKLORE_STORIES.find(s => s.id === activeStoryId) || filteredStories[0] || FOLKLORE_STORIES[0];
  const linkedMonster = YOKAI_DATABASE.find(m => m.id === activeStory.associatedMonsterId);

  return (
    <section id="stories" className="py-16 md:py-24 bg-[#EFE8D8] border-b-2 border-[#1E1B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-[#1E1B18] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#E75A2D] font-bold tracking-widest uppercase">
              <span>03. 설화와 옛 기록</span>
              <span aria-hidden="true">·</span>
              <span>ORAL TRADITION &amp; CHRONICLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1E1B18] mt-1">
              기이한 사건과 전승 기록
            </h2>
          </div>
          <p className="text-sm text-[#5C5549] max-w-md">
            구전으로 전해지던 민간의 목소리와 고문헌에 남겨진 생생한 서사를 주제별로 감상해 보세요.
          </p>
        </div>

        {/* Theme tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EBE4D3] border-2 border-[#1E1B18]">
            {themeList.map((theme) => {
              const isActive = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-3 py-1.5 text-xs font-serif font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#1E1B18] text-[#F6F2EA]'
                      : 'text-[#4A453E] hover:text-[#1E1B18] hover:bg-[#F6F2EA]/60'
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Story Selection Rail (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-serif font-bold text-[#5C5549] pb-1 border-b border-[#D6CEBE]">
              설화 편목 ({filteredStories.length}편)
            </div>

            <div className="space-y-2">
              {filteredStories.map((story) => {
                const isSelected = activeStory.id === story.id;
                return (
                  <button
                    key={story.id}
                    onClick={() => setActiveStoryId(story.id)}
                    className={`w-full text-left p-3.5 border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1E1B18] text-[#F6F2EA] border-[#1E1B18] shadow-[3px_3px_0px_#E75A2D]'
                        : 'bg-[#F6F2EA] text-[#1E1B18] border-[#1E1B18] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono opacity-80 mb-1">
                        <span>{story.region}</span>
                        <span>{story.theme}</span>
                      </div>
                      <h4 className="text-sm font-bold font-serif leading-snug">
                        {story.title}
                      </h4>
                      <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-[#D6CEBE]' : 'text-[#736B5E]'}`}>
                        {story.excerpt}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story Full Narrative Reader (Right 8 cols) */}
          <div className="lg:col-span-8 comic-box bg-[#FAF7F0] p-6 sm:p-8 space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 border-b-2 border-[#1E1B18] pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-serif text-[#1D7874] font-bold">
                <span>권역: {activeStory.region}</span>
                <span aria-hidden="true">·</span>
                <span>주제: {activeStory.theme}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#1E1B18]">
                {activeStory.title}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-[#736B5E]">
                {activeStory.subtitle}
              </p>
            </div>

            {/* Associated creature badge */}
            {linkedMonster && (
              <div className="p-3 bg-[#EBE4D3] border border-[#1E1B18] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={linkedMonster.imageUrl}
                    alt={linkedMonster.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover border border-[#1E1B18]"
                  />
                  <div>
                    <span className="text-[11px] text-[#736B5E] block font-serif">연관 등장 요괴</span>
                    <span className="text-sm font-bold font-serif text-[#1E1B18]">
                      {linkedMonster.name} ({linkedMonster.englishName})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenMonster(linkedMonster.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E1B18] text-[#F6F2EA] text-xs font-bold font-serif hover:bg-[#E75A2D] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>요괴 도감 열기</span>
                </button>
              </div>
            )}

            {/* Narrative Prose with Drop Cap */}
            <div className="text-sm sm:text-base text-[#24211E] font-serif leading-loose whitespace-pre-line drop-cap space-y-4">
              {activeStory.fullNarrative}
            </div>

            {/* Citation footnote */}
            <div className="pt-4 border-t border-[#D6CEBE] text-xs text-[#736B5E] font-serif flex items-center justify-between">
              <span>사료 출처: <strong>{activeStory.source}</strong></span>
              <span className="italic">국립민속 아카이브 채록본</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
