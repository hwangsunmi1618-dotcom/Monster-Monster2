import { RegionChapter, RegionKey } from './types';

export const REGIONS_DATA: RegionChapter[] = [
  {
    id: '서울·경기',
    title: '서울·경기',
    subtitle: '수도 한양 도성 안팎의 기물과 한강 나루의 원혼',
    shortLandscape: '도성 성곽, 궁궐 처마, 한강 여울목',
    description: '조선의 정치·경제 중심지였던 한양과 경기 일원은 관청의 기록과 민간 세간살이가 교차하는 곳입니다. 밤마다 성곽길에 나타나 씨름을 청하던 도깨비와, 한강 나루터의 깊은 여울에 도사린 물귀신의 전승이 뚜렷합니다.',
    representativeCreatures: ['dokkaebi', 'mulgwishin'],
    mapCoordinates: { x: 42, y: 32 }
  },
  {
    id: '강원',
    title: '강원',
    subtitle: '백두대간 태백산맥 첩첩산중과 안개 낀 암벽',
    shortLandscape: '오대산 원시림, 대관령 고갯길, 험준한 준령',
    description: '한반도의 등줄기인 태백산맥의 험준한 산세는 인간의 발길이 닿지 않는 영역을 품고 있었습니다. 천 년 묵은 구미호의 둔갑설화와, 밤길을 걷는 사람의 공포심을 먹고 하늘만큼 자라나는 어둑시니의 서사가 생생하게 전해집니다.',
    representativeCreatures: ['gumiho', 'eoduksini'],
    mapCoordinates: { x: 62, y: 28 }
  },
  {
    id: '충청',
    title: '충청',
    subtitle: '금강 물길과 내포평야, 계룡산의 비의',
    shortLandscape: '계룡산 기암괴석, 금강 유역, 황금빛 곡창',
    description: '풍수지리의 영산으로 불린 계룡산과 곡창지대 충청은 하늘의 조화와 기후 변화에 민감했습니다. 승천하지 못하고 타오르는 불길로 가뭄을 일으키는 독룡 ‘강철이’처럼, 자연의 위력과 결부된 설화가 두드러집니다.',
    representativeCreatures: ['gangcheoli'],
    mapCoordinates: { x: 44, y: 46 }
  },
  {
    id: '전라',
    title: '전라',
    subtitle: '지리산 심산유곡과 남도 섬·갯벌의 정령',
    shortLandscape: '지리산 운봉, 빽빽한 대나무 숲, 남도 도서',
    description: '드넓은 평야와 지리산의 깊은 품을 지닌 전라도는 무속과 기원의 전승이 풍성합니다. 지리산 대숲의 무시무시한 야차 귀신 두억시니부터, 요괴의 둔갑을 단번에 꿰뚫어 보는 신령한 수호견 삼족구까지 다채로운 존재들이 공존합니다.',
    representativeCreatures: ['duuksini', 'samjokgu'],
    mapCoordinates: { x: 38, y: 64 }
  },
  {
    id: '경상',
    title: '경상',
    subtitle: '동해 용궁의 비의와 가야·신라 천년의 흔적',
    shortLandscape: '울산 개운포 바다, 경주 남산, 낙동강 하구',
    description: '천년고도 신라와 가야의 고토이자 동해를 낀 경상도는 역병을 물리친 처용 설화의 고향입니다. 남부 탈춤에서 부패한 양반을 꾸짖는 영노(비비)와 현대 도시 전설로 회자되는 장산범까지 오랜 시간의 층위가 깃들어 있습니다.',
    representativeCreatures: ['cheoyong', 'yeongno', 'jangsanbeom'],
    mapCoordinates: { x: 68, y: 58 }
  },
  {
    id: '제주',
    title: '제주',
    subtitle: '설문대할망과 1만 8천 신들의 섬에 깃든 이물',
    shortLandscape: '곶자왈 원시림, 한라산 화산암, 바람 부는 오름',
    description: '육지와 격리된 독자적인 신화와 1만 8천 신들의 섬 제주는 요괴 또한 독특합니다. 대낮 들판에서 볏짚 도롱이를 홀로 펄럭이며 길손을 홀리는 그슨새처럼, 제주의 척박한 바람과 자연이 낳은 기묘한 존재들이 살고 있습니다.',
    representativeCreatures: ['geuseonsae'],
    mapCoordinates: { x: 32, y: 88 }
  },
  {
    id: '북한 및 기타 전승 지역',
    title: '북한 및 기타 전승 지역',
    subtitle: '고려 도읍 송도와 백두산맥, 고대 설화의 발원지',
    shortLandscape: '개성 송도 대장간, 묘향산 보현사, 대동강변',
    description: '고려의 옛 수도 개성(송도)에서 쇠를 먹고 자라나 군대의 칼과 창을 삼켜버린 거수 ‘불가사리’의 전설처럼, 고대 국가의 성립과 대륙적 스케일의 전승이 보존되어 있는 북방 문화권입니다.',
    representativeCreatures: ['bulgasari'],
    mapCoordinates: { x: 45, y: 15 }
  }
];
