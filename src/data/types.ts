export type CreatureType = '인간형' | '동물형' | '혼합형' | '사물/정령형' | '기타';

export type VerificationStatus = '출처 확인' | '일부 확인' | '자료 확인 필요';

export type FolkloreTheme = 
  | '밤길과 산길의 존재'
  | '물과 바다의 존재'
  | '집과 마을에 깃든 존재'
  | '사람을 홀리는 존재'
  | '변신하는 존재'
  | '설명하기 어려운 기이한 사건';

export type RegionKey = 
  | '서울·경기'
  | '강원'
  | '충청'
  | '전라'
  | '경상'
  | '제주'
  | '북한 및 기타 전승 지역';

export interface MonsterData {
  id: string;
  name: string;
  hanjaName?: string;
  englishName: string;
  alternateNames: string[];
  region: RegionKey;
  allRegions?: RegionKey[]; // For creatures transmitted across multiple regions
  specificLocation: string;
  creatureType: CreatureType;
  shortDescription: string;
  appearance: string;
  folkloreStory: string;
  relationshipWithHumans: string;
  culturalContext: string;
  sourceTitle: string;
  sourceOrganization: string;
  sourceUrl?: string;
  verificationStatus: VerificationStatus;
  verificationNotes: string;
  imageUrl: string;
  imageCredit: string;
  relatedCreatures: string[];
  tags: string[];
  themeCategory: FolkloreTheme;
  dangerLevel: 1 | 2 | 3 | 4 | 5; // 1: 익살/온순, 5: 극도로 불길/치명적
  roleType: '장난형' | '위협형' | '수호/보은형' | '재앙형' | '이물/신비형';
}

export interface RegionChapter {
  id: RegionKey;
  title: string;
  subtitle: string;
  shortLandscape: string;
  description: string;
  representativeCreatures: string[];
  mapCoordinates: { x: number; y: number }; // Relative coordinates for interactive map
}

export interface FolkloreStoryEntry {
  id: string;
  title: string;
  subtitle: string;
  theme: FolkloreTheme;
  region: RegionKey;
  associatedMonsterId: string;
  excerpt: string;
  fullNarrative: string;
  source: string;
}
