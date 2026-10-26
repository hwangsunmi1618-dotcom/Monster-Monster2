import React, { useState } from 'react';
import { Bookmark, Menu, X, Compass } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onExploreClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  onOpenBookmarks,
  onExploreClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: '홈' },
    { id: 'regions', label: '지역별 요괴' },
    { id: 'index', label: '요괴 도감' },
    { id: 'stories', label: '이야기와 기록' },
    { id: 'about', label: '아카이브 소개' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F2EA]/95 backdrop-blur-md border-b-2 border-[#1E1B18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E1B18] font-serif hover:text-[#E75A2D] transition-colors">
              한국 요괴 도감
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A453E]">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive 
                      ? 'text-[#E75A2D] font-bold border-b-2 border-[#E75A2D]' 
                      : 'hover:text-[#1E1B18]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-[#1D7874] text-[#F6F2EA] rounded-none comic-box-sm hover:bg-[#165E5B] active:translate-y-0.5 transition-all whitespace-nowrap shrink-0"
              aria-label="즐겨찾기 보관함 보기"
            >
              <Bookmark className="w-4 h-4" />
              <span>내 보관함</span>
              {bookmarkCount > 0 && (
                <span className="bg-[#E75A2D] text-white px-1.5 py-0.2 text-xs font-mono font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1E1B18] hover:bg-[#EFE8D8] border border-[#1E1B18]"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#1E1B18] bg-[#F6F2EA] px-4 py-3 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 px-3 text-sm font-medium ${
                activeTab === link.id 
                  ? 'bg-[#1E1B18] text-[#F6F2EA]' 
                  : 'text-[#1E1B18] hover:bg-[#EFE8D8]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#D6CEBE]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick();
              }}
              className="flex items-center gap-2 w-full text-center justify-center py-2 text-sm bg-[#E75A2D] text-white font-bold"
            >
              <Compass className="w-4 h-4" />
              <span>요괴 탐험 시작하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
