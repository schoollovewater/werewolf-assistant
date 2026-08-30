export const TEAM_COLORS = {
  VILLAGER: { bg: 'bg-cyan-600', border: 'border-cyan-600', text: 'text-cyan-600', whiteText: 'text-white' },
  WEREWOLF: { bg: 'bg-red-600', border: 'border-red-600', text: 'text-red-600', whiteText: 'text-white' },
  MUTANT: { bg: 'bg-fuchsia-600', border: 'border-fuchsia-600', text: 'text-fuchsia-600', whiteText: 'text-white' }
};

export const ROLE_COLORS = {
  'phu_thuy': { bg: 'bg-purple-700', border: 'border-purple-700', text: 'text-purple-700', whiteText: 'text-white' },
  'bao_ve': { bg: 'bg-green-600', border: 'border-green-600', text: 'text-green-600', whiteText: 'text-white' },
  'tien_tri': { bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-blue-600', whiteText: 'text-white' },
  'than_tinh_yeu': { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-pink-500', whiteText: 'text-white' },
  'tho_san': { bg: 'bg-amber-600', border: 'border-amber-600', text: 'text-amber-600', whiteText: 'text-white' },
  'soi_thuong': { bg: 'bg-red-700', border: 'border-red-700', text: 'text-red-700', whiteText: 'text-white' },
  'soi_an': { bg: 'bg-red-900', border: 'border-red-900', text: 'text-red-900', whiteText: 'text-white' }
};

export const DEFAULT_ROLES = [
  { id: 'dan_lang', name: 'Dân Làng', team: 'VILLAGER' },
  { id: 'bao_ve', name: 'Bảo Vệ', team: 'VILLAGER' },
  { id: 'phu_thuy', name: 'Phù Thủy', team: 'VILLAGER' },
  { id: 'tien_tri', name: 'Tiên Tri', team: 'VILLAGER' },
  { id: 'tham_tu', name: 'Thám Tử', team: 'VILLAGER' },
  { id: 'truong_toc_gau', name: 'Trưởng Tộc Gấu', team: 'VILLAGER' },
  { id: 'nguyet_nu', name: 'Nguyệt Nữ', team: 'VILLAGER' },
  { id: 'tho_san', name: 'Thợ Săn', team: 'VILLAGER' },
  { id: 'nhan_ban', name: 'Nhân Bản', team: 'VILLAGER' },
  { id: 'soi_thuong', name: 'Sói Thường', team: 'WEREWOLF' },
  { id: 'soi_an', name: 'Sói Ẩn', team: 'WEREWOLF' },
  { id: 'soi_phap_su', name: 'Sói Pháp Sư', team: 'WEREWOLF' },
  { id: 'soi_cuong_no', name: 'Sói Cuồng Nộ', team: 'WEREWOLF' },
  { id: 'soi_dau_dan', name: 'Sói Đầu Đàn', team: 'WEREWOLF' },
  { id: 'thang_ngoc', name: 'Thằng Ngốc', team: 'MUTANT' },
  { id: 'ke_bi_nguyen', name: 'Kẻ Bị Nguyền', team: 'MUTANT' },
  { id: 'than_tinh_yeu', name: 'Thần Tình Yêu', team: 'MUTANT' },
];

export const NIGHT_ORDER = [
  'nhan_ban',
  'than_tinh_yeu',
  'bao_ve',
  'soi_thuong',
  'soi_an',
  'soi_phap_su',
  'soi_cuong_no',
  'soi_dau_dan',
  'phu_thuy',
  'tien_tri',
  'tham_tu',
  'truong_toc_gau',
  'nguyet_nu',
  'tho_san'
];

export function getRoleColor(roleId, team) {
  if (ROLE_COLORS[roleId]) return ROLE_COLORS[roleId];
  if (TEAM_COLORS[team]) return TEAM_COLORS[team];
  return { bg: 'bg-gray-600', border: 'border-gray-600', text: 'text-gray-600', whiteText: 'text-white' };
}
