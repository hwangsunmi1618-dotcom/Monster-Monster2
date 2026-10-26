import { useState, useEffect } from 'react';

const STORAGE_KEY = 'korean_yokai_favorites_v1';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const clearBookmarks = () => setBookmarks([]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
    count: bookmarks.length
  };
}
