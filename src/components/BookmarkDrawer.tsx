import React from 'react';
import { MonsterData } from '../data/types';
import { YOKAI_DATABASE } from '../data/monsters';
import { X, Bookmark, Trash2, Eye, Printer, MapPin } from 'lucide-react';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onClearBookmarks: () => void;
  onOpenDetails: (monster: MonsterData) => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onToggleBookmark,
  onClearBookmarks,
  onOpenDetails
}) => {
  if (!isOpen) return null;

  const savedMonsters = YOKAI_DATABASE.filter(m => bookmarks.includes(m.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#F6F2EA] border-l-2 border-[#1E1B18] shadow-2xl h-full flex flex-col z-10">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#1E1B18] text-[#F6F2EA] flex items-center justify-between border-b-2 border-[#1E1B18]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#E75A2D] fill-current" />
            <h3 className="text-lg font-bold font-serif">내 요괴 보관함</h3>
            <span className="text-xs bg-[#E75A2D] text-white px-2 py-0.5 font-mono font-bold">
              {bookmarks.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white transition-colors"
            aria-label="보관함 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar if there are saved items */}
        {savedMonsters.length > 0 && (
          <div className="px-4 py-2.5 bg-[#EFE8D8] border-b border-[#D6CEBE] flex items-center justify-between text-xs font-serif">
            <span className="text-[#5C5549]">브라우저(localStorage)에 보관됨</span>
            <button
              onClick={onClearBookmarks}
              className="text-[#C84630] hover:underline flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>전체 비우기</span>
            </button>
          </div>
        )}

        {/* Drawer List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedMonsters.length > 0 ? (
            savedMonsters.map((monster) => (
              <div
                key={monster.id}
                className="p-3 bg-[#FAF7F0] border-2 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18] flex items-center justify-between gap-3 group hover:bg-white transition-all"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1 overflow-hidden"
                  onClick={() => {
                    onOpenDetails(monster);
                    onClose();
                  }}
                >
                  <img
                    src={monster.imageUrl}
                    alt={monster.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover border border-[#1E1B18] shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-sm font-bold font-serif text-[#1E1B18] group-hover:text-[#E75A2D] transition-colors truncate">
                      {monster.name}
                    </h4>
                    <p className="text-[11px] text-[#736B5E] flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#E75A2D]" />
                      <span>{monster.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>{monster.creatureType}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onOpenDetails(monster);
                      onClose();
                    }}
                    className="p-1.5 bg-[#1E1B18] text-white hover:bg-[#E75A2D] transition-colors"
                    title="상세 보기"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleBookmark(monster.id)}
                    className="p-1.5 text-[#736B5E] hover:text-[#C84630] transition-colors"
                    title="보관함에서 제거"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Bookmark className="w-10 h-10 text-[#D6CEBE]" />
              <p className="text-sm font-bold font-serif text-[#1E1B18]">
                보관함에 담긴 요괴가 없습니다.
              </p>
              <p className="text-xs text-[#736B5E] max-w-xs leading-relaxed">
                요괴 카드나 상세 페이지에서 책갈피(★) 아이콘을 눌러 관심 있는 요괴를 저장해 보세요.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#EFE8D8] border-t-2 border-[#1E1B18] flex items-center justify-between">
          <button
            onClick={() => window.print()}
            disabled={savedMonsters.length === 0}
            className="flex items-center gap-1.5 text-xs font-serif text-[#1E1B18] hover:text-[#E75A2D] disabled:opacity-40"
          >
            <Printer className="w-4 h-4" />
            <span>보관함 목록 인쇄</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1E1B18] text-[#F6F2EA] text-xs font-bold font-serif hover:bg-[#E75A2D] transition-colors"
          >
            닫기
          </button>
        </div>

      </div>

    </div>
  );
};
