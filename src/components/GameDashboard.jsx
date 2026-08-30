import React, { useState, useEffect } from 'react';
import { TEAM_COLORS } from '../constants';
import { Eye, EyeOff, Skull, Heart, Search, Filter, AlertTriangle, Shield, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function GameDashboard({ players, setPlayers, availableRoles }) {
  const [globalShowRoles, setGlobalShowRoles] = useState(false);
  const [filterTeam, setFilterTeam] = useState('ALL');
  const [search, setSearch] = useState('');
  
  const [flippedCards, setFlippedCards] = useState({});
  const [gameOverMsg, setGameOverMsg] = useState(null);

  const getRoleInfo = (roleId) => {
    return availableRoles.find(r => r.id === roleId);
  };

  useEffect(() => {
    const alivePlayers = players.filter(p => p.isAlive);
    const wolvesCount = alivePlayers.filter(p => getRoleInfo(p.role)?.team === 'WEREWOLF').length;
    const villagersCount = alivePlayers.filter(p => getRoleInfo(p.role)?.team === 'VILLAGER').length;
    
    if (players.length > 0 && alivePlayers.length > 0) {
      if (wolvesCount === 0) {
        setGameOverMsg({ title: 'DÂN LÀNG CHIẾN THẮNG!', desc: 'Tất cả Sói đã bị tiêu diệt.', team: 'VILLAGER' });
      } else if (wolvesCount >= villagersCount) {
        setGameOverMsg({ title: 'MA SÓI CHIẾN THẮNG!', desc: 'Số lượng Sói đã lớn hơn hoặc bằng Dân Làng.', team: 'WEREWOLF' });
      } else {
        setGameOverMsg(null);
      }
    }
  }, [players, availableRoles]);

  const toggleAlive = (id, e) => {
    e.stopPropagation();
    setPlayers(players.map(p => p.id === id ? { ...p, isAlive: !p.isAlive } : p));
  };

  const toggleCardFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updatePlayerNote = (id, noteKey, value, e) => {
    e.stopPropagation();
    setPlayers(players.map(p => {
      if (p.id === id) {
        return {
          ...p,
          notes: {
            ...(p.notes || {}),
            [noteKey]: value
          }
        };
      }
      return p;
    }));
  };

  const filteredPlayers = players.filter(p => {
    const roleInfo = getRoleInfo(p.role);
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        (roleInfo && roleInfo.name.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filterTeam === 'ALL' || (roleInfo && roleInfo.team === filterTeam);
    return matchSearch && matchFilter;
  });

  const aliveCount = players.filter(p => p.isAlive).length;
  const alivePlayers = players.filter(p => p.isAlive);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-card rounded-2xl shadow-xl border border-border">
      <AnimatePresence>
        {gameOverMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-start gap-4 ${TEAM_COLORS[gameOverMsg.team]?.bg} ${TEAM_COLORS[gameOverMsg.team]?.border} border-2 ${TEAM_COLORS[gameOverMsg.team]?.glow}`}
          >
            <AlertTriangle className={TEAM_COLORS[gameOverMsg.team]?.text} size={32} />
            <div>
              <h3 className={`text-xl font-bold ${TEAM_COLORS[gameOverMsg.team]?.text}`}>{gameOverMsg.title}</h3>
              <p className="text-foreground">{gameOverMsg.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary-dark mb-1">Bảng Điều Khiển</h2>
          <p className="text-sm text-gray-400">
            Tổng số: {players.length} | Còn sống: <span className="text-green-500 font-bold">{aliveCount}</span> | Đã chết: <span className="text-red-500 font-bold">{players.length - aliveCount}</span>
          </p>
        </div>
        
        <button
          onClick={() => {
            setGlobalShowRoles(!globalShowRoles);
            setFlippedCards({});
          }}
          className="px-4 py-2 bg-background border border-border rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
        >
          {globalShowRoles ? <EyeOff size={18} /> : <Eye size={18} />}
          {globalShowRoles ? 'Ẩn Tất Cả Vai Trò' : 'Hiện Tất Cả Vai Trò'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm người chơi hoặc vai trò..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select 
            value={filterTeam} 
            onChange={(e) => setFilterTeam(e.target.value)}
            className="p-2 bg-background border border-border rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả phe</option>
            <option value="VILLAGER">Phe Dân Làng</option>
            <option value="WEREWOLF">Phe Sói</option>
            <option value="MUTANT">Phe Thứ 3 / Khác</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => {
          const roleInfo = getRoleInfo(player.role);
          const teamStyle = roleInfo ? TEAM_COLORS[roleInfo.team] : null;
          const isCardRevealed = globalShowRoles || flippedCards[player.id];
          const notes = player.notes || {};
          
          return (
            <motion.div 
              layout
              key={player.id}
              onClick={() => toggleCardFlip(player.id)}
              className={cn(
                "p-4 rounded-xl border relative overflow-hidden transition-all duration-300 cursor-pointer select-none group flex flex-col justify-between min-h-[140px]",
                player.isAlive ? "bg-background border-border hover:border-gray-400" : "bg-red-950/20 border-red-900/30 grayscale-[50%] opacity-80",
                (isCardRevealed && player.isAlive && teamStyle) ? `${teamStyle.glow} border-${teamStyle.border.split('-')[1]}-500/50` : ""
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className={cn(
                  "font-bold text-lg",
                  !player.isAlive && "line-through text-gray-500",
                  (isCardRevealed && player.isAlive && teamStyle) ? teamStyle.text : "text-foreground"
                )}>
                  {player.name}
                </h3>
                <button
                  onClick={(e) => toggleAlive(player.id, e)}
                  className={cn(
                    "p-2 rounded-full transition-colors z-10 shrink-0 ml-2",
                    player.isAlive ? "text-red-500 hover:bg-red-500/10" : "text-green-500 hover:bg-green-500/10"
                  )}
                  title={player.isAlive ? "Giết" : "Hồi sinh"}
                >
                  {player.isAlive ? <Skull size={18} /> : <Heart size={18} />}
                </button>
              </div>
              
              {/* Role Reveal Box */}
              <div className={cn(
                "p-3 rounded-lg flex flex-col items-center justify-center font-bold text-sm tracking-wide transition-all duration-300",
                isCardRevealed 
                  ? (teamStyle ? `${teamStyle.bg} border ${teamStyle.border}` : "bg-card border border-border shadow-inner") 
                  : "bg-gray-200 dark:bg-gray-800/50 border border-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-700/50 h-[46px]"
              )}>
                {isCardRevealed && roleInfo ? (
                  <>
                    <span className={teamStyle?.text}>{roleInfo.name}</span>
                    
                    {/* Extra Notes UI for Specific Roles */}
                    {roleInfo.id === 'phu_thuy' && (
                      <div className="flex gap-4 mt-3 pt-3 border-t border-cyan-500/30 w-full justify-center" onClick={e => e.stopPropagation()}>
                        <label className="flex items-center gap-1.5 cursor-pointer text-green-400 hover:text-green-300">
                          <input 
                            type="checkbox" 
                            checked={notes.usedSave || false} 
                            onChange={(e) => updatePlayerNote(player.id, 'usedSave', e.target.checked, e)}
                            className="accent-green-500 w-4 h-4 cursor-pointer"
                          />
                          <Heart size={14} /> Cứu
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-red-400 hover:text-red-300">
                          <input 
                            type="checkbox" 
                            checked={notes.usedKill || false} 
                            onChange={(e) => updatePlayerNote(player.id, 'usedKill', e.target.checked, e)}
                            className="accent-red-500 w-4 h-4 cursor-pointer"
                          />
                          <Droplet size={14} /> Độc
                        </label>
                      </div>
                    )}

                    {roleInfo.id === 'bao_ve' && (
                      <div className="mt-3 pt-3 border-t border-cyan-500/30 w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2 text-cyan-400 mb-1 text-xs">
                          <Shield size={14} /> Đang bảo vệ:
                        </div>
                        <select
                          value={notes.guardedPlayer || ''}
                          onChange={(e) => updatePlayerNote(player.id, 'guardedPlayer', e.target.value, e)}
                          className="w-full bg-background border border-cyan-500/50 text-cyan-400 rounded px-2 py-1 text-xs focus:outline-none"
                        >
                          <option value="">-- Không chọn --</option>
                          {alivePlayers.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                ) : (
                  !isCardRevealed && (
                    <span className="text-gray-500 flex items-center gap-2 h-full">
                      <EyeOff size={14} /> Chạm để mở thẻ
                    </span>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Không tìm thấy người chơi nào phù hợp.
        </div>
      )}
    </div>
  );
}
