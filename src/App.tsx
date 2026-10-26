import React, { useState } from 'react';
import { YOKAI_DATABASE } from './data/monsters';
import { MonsterData, RegionKey } from './data/types';
import { useBookmarks } from './hooks/useBookmarks';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RegionalSection } from './components/RegionalSection';
import { MonsterIndex } from './components/MonsterIndex';
import { MonsterModal } from './components/MonsterModal';
import { FolkloreStoriesSection } from './components/FolkloreStoriesSection';
import { AboutSection } from './components/AboutSection';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | '전체'>('전체');
  const [activeMonster, setActiveMonster] = useState<MonsterData | null>(null);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);

  const { bookmarks, toggleBookmark, isBookmarked, clearBookmarks, count } = useBookmarks();

  const handleOpenMonsterById = (id: string) => {
    const found = YOKAI_DATABASE.find(m => m.id === id);
    if (found) {
      setActiveMonster(found);
    }
  };

  const handleExploreClick = () => {
    setActiveTab('regions');
    const el = document.getElementById('regions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIndexClick = () => {
    setActiveTab('index');
    const el = document.getElementById('index');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectRegion = (region: RegionKey | '전체') => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2EA] text-[#24211E] selection:bg-[#E75A2D] selection:text-white">
      
      {/* 3-Zone Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={count}
        onOpenBookmarks={() => setIsBookmarkOpen(true)}
        onExploreClick={handleExploreClick}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* A. Hero / Intro Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onIndexClick={handleIndexClick}
        />

        {/* B. Regional Chapters & Interactive Illustrated Map */}
        <RegionalSection
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
          onOpenMonster={handleOpenMonsterById}
        />

        {/* C. Classified Monster Index & Search */}
        <MonsterIndex
          monsters={YOKAI_DATABASE}
          selectedRegion={selectedRegion}
          onSelectRegion={handleSelectRegion}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onOpenDetails={(monster) => setActiveMonster(monster)}
        />

        {/* E. Folklore Oral Stories & Archive */}
        <FolkloreStoriesSection
          onOpenMonster={handleOpenMonsterById}
        />

        {/* F. About Archive & Curatorial Standards */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer 
        onNavClick={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      {/* D. Full Monster Profile Modal */}
      <MonsterModal
        monster={activeMonster}
        onClose={() => setActiveMonster(null)}
        isBookmarked={activeMonster ? isBookmarked(activeMonster.id) : false}
        onToggleBookmark={toggleBookmark}
        onSelectRelated={(relatedMonster) => setActiveMonster(relatedMonster)}
      />

      {/* Saved Favorites Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkOpen}
        onClose={() => setIsBookmarkOpen(false)}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
        onClearBookmarks={clearBookmarks}
        onOpenDetails={(monster) => setActiveMonster(monster)}
      />

    </div>
  );
}
