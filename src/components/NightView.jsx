import React from 'react';
import { NIGHT_ORDER, getRoleColor } from '../constants';
import { Shield, Droplet, Heart, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function NightView({ players, setPlayers, allRoles }) {
  const getRoleInfo = (roleId) => allRoles.find(r => r.id === roleId);

  // Nhóm người chơi theo role gốc
  const playersByRole = {};
  players.forEach(p => {
    if (p.role) {
      if (!playersByRole[p.role]) playersByRole[p.role] = [];
      playersByRole[p.role].push(p);
    }
  });

  // Chỉ lấy những role có trong game, và sắp xếp theo NIGHT_ORDER
  const rolesInGame = Object.keys(playersByRole);
  
  const orderedRoles = [];
  
  // 1. Lọc theo NIGHT_ORDER
  NIGHT_ORDER.forEach(roleId => {
    if (rolesInGame.includes(roleId)) {
      orderedRoles.push(roleId);
    }
  });

  // 2. Những role custom hoặc không có trong NIGHT_ORDER thì nhét xuống cuối
  rolesInGame.forEach(roleId => {
    if (!NIGHT_ORDER.includes(roleId)) {
      orderedRoles.push(roleId);
    }
  });

  const updatePlayerNote = (id, noteKey, value) => {
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

  const alivePlayers = players.filter(p => p.isAlive);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-card rounded-2xl shadow-xl border border-border">
      <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
        <Moon size={28} className="text-primary" />
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">Màn Hình Ban Đêm</h2>
          <p className="text-sm text-gray-500">Quản trò gọi dậy theo thứ tự từ trên xuống dưới.</p>
        </div>
      </div>

      <div className="space-y-4">
        {orderedRoles.map((roleId, index) => {
          const roleInfo = getRoleInfo(roleId);
          if (!roleInfo) return null;
          
          const style = getRoleColor(roleId, roleInfo.team);
          const playersWithThisRole = playersByRole[roleId];

          return (
            <div key={roleId} className="flex flex-col gap-2 relative pl-8">
              {/* Line kết nối */}
              <div className="absolute left-3 top-0 bottom-[-16px] w-0.5 bg-border z-0"></div>
              
              <div className="absolute left-0 top-6 w-6 h-6 rounded-full bg-background border-4 border-primary z-10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground">{index + 1}</span>
              </div>

              {playersWithThisRole.map(player => {
                const notes = player.notes || {};
                const isDead = !player.isAlive;

                return (
                  <div key={player.id} className={cn(
                    "flex flex-col sm:flex-row border-2 rounded-xl overflow-hidden shadow-sm z-10 ml-2 transition-opacity",
                    style.border,
                    isDead && "opacity-50 grayscale"
                  )}>
                    {/* Left: Tên Role */}
                    <div className={cn(
                      "sm:w-1/3 px-4 py-3 flex items-center font-bold text-sm",
                      style.bg, style.whiteText
                    )}>
                      {roleInfo.name}
                      {isDead && <span className="ml-2 text-xs font-normal opacity-80">(Đã chết)</span>}
                    </div>
                    
                    {/* Right: Tên Người chơi + Ghi chú */}
                    <div className="sm:w-2/3 bg-black flex flex-col justify-center px-4 py-3 min-h-[56px]">
                      <span className="font-bold text-white text-base mb-1">{player.name}</span>
                      
                      {/* Night Notes (Phù thủy / Bảo vệ) */}
                      {!isDead && roleId === 'phu_thuy' && (
                        <div className="flex gap-4 mt-2 pt-2 border-t border-gray-800">
                          <label className="flex items-center gap-1.5 cursor-pointer text-green-400 hover:text-green-300 text-sm font-medium">
                            <input 
                              type="checkbox" 
                              checked={notes.usedSave || false} 
                              onChange={(e) => updatePlayerNote(player.id, 'usedSave', e.target.checked)}
                              className="accent-green-500 w-4 h-4 cursor-pointer"
                            />
                            <Heart size={14} /> Cứu
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-red-400 hover:text-red-300 text-sm font-medium">
                            <input 
                              type="checkbox" 
                              checked={notes.usedKill || false} 
                              onChange={(e) => updatePlayerNote(player.id, 'usedKill', e.target.checked)}
                              className="accent-red-500 w-4 h-4 cursor-pointer"
                            />
                            <Droplet size={14} /> Độc
                          </label>
                        </div>
                      )}

                      {!isDead && roleId === 'bao_ve' && (
                        <div className="mt-2 pt-2 border-t border-gray-800 flex items-center gap-2">
                          <Shield size={14} className="text-green-400" />
                          <span className="text-gray-400 text-xs">Bảo vệ:</span>
                          <select
                            value={notes.guardedPlayer || ''}
                            onChange={(e) => updatePlayerNote(player.id, 'guardedPlayer', e.target.value)}
                            className="flex-1 bg-transparent border-b border-green-900 text-green-400 px-1 py-0.5 text-sm focus:outline-none focus:border-green-500 cursor-pointer"
                          >
                            <option value="" className="bg-gray-900">-- Không ai --</option>
                            {alivePlayers.map(p => (
                              <option key={p.id} value={p.id} className="bg-gray-900">{p.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        })}
        {orderedRoles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Chưa có người chơi nào được phân vai trò.
          </div>
        )}
      </div>
    </div>
  );
}
