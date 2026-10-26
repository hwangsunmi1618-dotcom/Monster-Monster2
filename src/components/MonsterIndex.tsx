import React, { useState, useMemo } from 'react';
import { MonsterData, RegionKey, CreatureType, FolkloreTheme, VerificationStatus } from '../data/types';
import { MonsterCard } from './MonsterCard';
import { Search, X, SlidersHorizontal, Bookmark, RotateCcw } from 'lucide-react';

interface MonsterIndexProps {
  monsters: MonsterData[];
  selectedRegion: RegionKey | '전체';
  onSelectRegion: (region: RegionKey | '전체') => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (monster: MonsterData) => void;
}

export const MonsterIndex: React.FC<MonsterIndexProps> = ({
  monsters,
  selectedRegion,
  onSelectRegion,
  bookmarks,
  onToggleBookmark,
  onOpenDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<CreatureType | '전체'>('전체');
  const [selectedTheme, setSelectedTheme] = useState<FolkloreTheme | '전체'>('전체');
  const [selectedStatus, setSelectedStatus] = useState<VerificationStatus | '전체'>('전체');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const regionTabs: (RegionKey | '전체')[] = [
    '전체',
    '서울·경기',
    '강원',
    '충청',
    '전라',
    '경상',
    '제주',
    '북한 및 기타 전승 지역'
  ];

  const typeOptions: (CreatureType | '전체')[] = [
    '전체',
    '인간형',
    '동물형',
    '혼합형',
    '사물/정령형'
  ];

  const themeOptions: (FolkloreTheme | '전체')[] = [
    '전체',
    '밤길과 산길의 존재',
    '물과 바다의 존재',
    '집과 마을에 깃든 존재',
    '사람을 홀리는 존재',
    '변신하는 존재',
    '설명하기 어려운 기이한 사건'
  ];

  const statusOptions: (VerificationStatus | '전체')[] = [
    '전체',
    '출처 확인',
    '일부 확인',
    '자료 확인 필요'
  ];

  // Filtered monsters computation
  const filteredMonsters = useMemo(() => {
    return monsters.filter((m) => {
      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesEnglish = m.englishName.toLowerCase().includes(q);
        const matchesHanja = m.hanjaName?.toLowerCase().includes(q) || false;
        const matchesAliases = m.alternateNames.some(a => a.toLowerCase().includes(q));
        const matchesLocation = m.specificLocation.toLowerCase().includes(q);
        const matchesDesc = m.shortDescription.toLowerCase().includes(q);
        const matchesTags = m.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesEnglish && !matchesHanja && !matchesAliases && !matchesLocation && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Region matching (supports multi-region records)
      if (selectedRegion !== '전체') {
        const inMainRegion = m.region === selectedRegion;
        const inAllRegions = m.allRegions?.includes(selectedRegion) || false;
        if (!inMainRegion && !inAllRegions) return false;
      }

      // Type matching
      if (selectedType !== '전체' && m.creatureType !== selectedType) {
        return false;
      }

      // Theme matching
      if (selectedTheme !== '전체' && m.themeCategory !== selectedTheme) {
        return false;
      }

      // Verification status matching
      if (selectedStatus !== '전체' && m.verificationStatus !== selectedStatus) {
        return false;
      }

      // Bookmarks only matching
      if (onlyBookmarks && !bookmarks.includes(m.id)) {
        return false;
      }

      return true;
    });
  }, [monsters, searchQuery, selectedRegion, selectedType, selectedTheme, selectedStatus, onlyBookmarks, bookmarks]);

  const resetAllFilters = () => {
    setSearchQuery('');
    onSelectRegion('전체');
    setSelectedType('전체');
    setSelectedTheme('전체');
    setSelectedStatus('전체');
    setOnlyBookmarks(false);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedRegion !== '전체' || 
    selectedType !== '전체' || 
    selectedTheme !== '전체' || 
    selectedStatus !== '전체' || 
    onlyBookmarks;

  return (
    <section id="index" className="py-16 md:py-24 bg-[#F6F2EA] border-b-2 border-[#1E1B18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-[#1E1B18] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#1D7874] font-bold tracking-widest uppercase">
              <span>02. 요괴 색인 및 분류</span>
              <span aria-hidden="true">·</span>
              <span>CLASSIFIED MONSTER CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1E1B18] mt-1">
              전체 요괴 도감
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyBookmarks(!onlyBookmarks)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-2 border-[#1E1B18] transition-all ${
                onlyBookmarks 
                  ? 'bg-[#E75A2D] text-white shadow-[2px_2px_0px_#1E1B18]' 
                  : 'bg-[#F6F2EA] text-[#1E1B18] hover:bg-[#EFE8D8]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>내가 찜한 요괴만 ({bookmarks.length})</span>
            </button>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border-2 border-[#1E1B18] transition-all ${
                showAdvancedFilters
                  ? 'bg-[#1E1B18] text-[#F6F2EA]'
                  : 'bg-[#F6F2EA] text-[#1E1B18] hover:bg-[#EFE8D8]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>상세 필터</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Region Tabs */}
        <div className="space-y-4 mb-8">
          
          {/* Main search field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736B5E]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="요괴 이름, 별칭, 전승 장소, 태그 검색 (예: 씨름, 개성, 둔갑, 지리산...)"
              className="w-full pl-10 pr-10 py-3 bg-[#FAF7F0] border-2 border-[#1E1B18] text-sm text-[#1E1B18] placeholder-[#8C8476] font-serif focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1E1B18]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#736B5E] hover:text-[#1E1B18]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs (Interactive Filter Controls, per Frontend Design rules) */}
          <div>
            <div className="text-xs font-serif font-bold text-[#5C5549] mb-1.5">
              전승 지역별 필터
            </div>
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EBE4D3] border-2 border-[#1E1B18]">
              {regionTabs.map((region) => {
                const isActive = selectedRegion === region;
                return (
                  <button
                    key={region}
                    onClick={() => onSelectRegion(region)}
                    className={`px-3 py-1.5 text-xs font-serif font-bold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#1E1B18] text-[#F6F2EA] shadow-sm'
                        : 'text-[#4A453E] hover:text-[#1E1B18] hover:bg-[#F6F2EA]/60'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Collapsible Filters */}
          {showAdvancedFilters && (
            <div className="p-4 bg-[#EFE8D8] border-2 border-[#1E1B18] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Creature Type */}
                <div>
                  <label className="block text-xs font-serif font-bold text-[#1E1B18] mb-1.5">
                    존재 유형
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F2EA] border-2 border-[#1E1B18] text-xs font-serif"
                  >
                    {typeOptions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Folklore Theme */}
                <div>
                  <label className="block text-xs font-serif font-bold text-[#1E1B18] mb-1.5">
                    설화 테마/성격
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F2EA] border-2 border-[#1E1B18] text-xs font-serif"
                  >
                    {themeOptions.map(th => (
                      <option key={th} value={th}>{th}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Verification Status */}
                <div>
                  <label className="block text-xs font-serif font-bold text-[#1E1B18] mb-1.5">
                    학술 검증 상태
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full p-2 bg-[#F6F2EA] border-2 border-[#1E1B18] text-xs font-serif"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

              </div>

              {hasActiveFilters && (
                <div className="flex justify-end pt-2 border-t border-[#D6CEBE]">
                  <button
                    onClick={resetAllFilters}
                    className="flex items-center gap-1 text-xs text-[#E75A2D] hover:underline font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>필터 조건 초기화</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Results metadata bar */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#D6CEBE] text-xs text-[#5C5549] font-serif">
          <div>
            검색 결과: <strong className="text-[#1E1B18] tabular-nums">{filteredMonsters.length}</strong>종의 기묘한 존재
            {selectedRegion !== '전체' && <span> (권역: {selectedRegion})</span>}
            {onlyBookmarks && <span> (보관함 한정)</span>}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#1D7874] hover:underline"
            >
              전체 목록으로 복원
            </button>
          )}
        </div>

        {/* Monsters Grid */}
        {filteredMonsters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMonsters.map((monster) => (
              <MonsterCard
                key={monster.id}
                monster={monster}
                isBookmarked={bookmarks.includes(monster.id)}
                onToggleBookmark={onToggleBookmark}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center border-2 border-dashed border-[#1E1B18] bg-[#EFE8D8] p-8 space-y-4">
            <p className="text-xl font-bold font-serif text-[#1E1B18]">
              해당 조건에 부합하는 요괴를 찾지 못했습니다.
            </p>
            <p className="text-sm text-[#5C5549] max-w-md mx-auto">
              검색어를 변경하시거나, 설정된 지역 및 분류 필터를 해제해 보세요.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-[#1E1B18] text-[#F6F2EA] text-xs font-bold font-serif hover:bg-[#E75A2D] transition-colors"
            >
              모든 필터 초기화
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
