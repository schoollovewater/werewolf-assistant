export const TEAM_COLORS = {
  VILLAGER: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]'
  },
  WEREWOLF: {
    text: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
  },
  MUTANT: {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/50',
    glow: 'shadow-[0_0_15px_rgba(232,121,249,0.3)]'
  }
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
