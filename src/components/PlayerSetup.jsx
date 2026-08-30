import React, { useState } from 'react';
import { UserPlus, X, ArrowRight, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_COLORS } from '../constants';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function PlayerSetup({ 
  players, 
  setPlayers, 
  allRoles, 
  setAllRoles, 
  selectedRoleIds, 
  setSelectedRoleIds, 
  onNext 
}) {
  const [name, setName] = useState('');
  const [showCustomRoleForm, setShowCustomRoleForm] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleTeam, setNewRoleTeam] = useState('VILLAGER');

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (players.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) return;
    
    setPlayers([...players, { id: Date.now().toString(), name: name.trim(), role: null, isAlive: true, note: '' }]);
    setName('');
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const toggleRoleSelection = (roleId) => {
    if (selectedRoleIds.includes(roleId)) {
      setSelectedRoleIds(selectedRoleIds.filter(id => id !== roleId));
    } else {
      setSelectedRoleIds([...selectedRoleIds, roleId]);
    }
  };

  const handleAddCustomRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    
    const newRole = {
      id: 'custom_' + Date.now(),
      name: newRoleName.trim(),
      team: newRoleTeam
    };
    
    setAllRoles([...allRoles, newRole]);
    setSelectedRoleIds([...selectedRoleIds, newRole.id]);
    setNewRoleName('');
    setShowCustomRoleForm(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Cột 1: Người chơi */}
      <div className="flex-1 p-6 bg-card rounded-2xl shadow-xl border border-border flex flex-col">
        <div className="mb-6 border-b border-border pb-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-1">Người Chơi</h2>
          <p className="text-sm text-gray-400">Đã thêm: {players.length}</p>
        </div>

        <form onSubmit={handleAddPlayer} className="flex gap-2 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên người chơi..."
            className="flex-1 px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <UserPlus size={20} />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto min-h-[200px]">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {players.map(player => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={player.id}
                  className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-full text-sm shadow-sm"
                >
                  <span className="font-medium text-foreground">{player.name}</span>
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors rounded-full p-0.5 hover:bg-red-500/10"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {players.length === 0 && (
              <div className="w-full text-center py-8 text-gray-500 italic">
                Chưa có người chơi nào...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cột 2: Roles tham gia */}
      <div className="flex-1 p-6 bg-card rounded-2xl shadow-xl border border-border flex flex-col">
        <div className="mb-6 border-b border-border pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-1">Thẻ Bài (Roles)</h2>
            <p className="text-sm text-gray-400">Đã chọn: {selectedRoleIds.length}</p>
          </div>
          <button 
            onClick={() => setShowCustomRoleForm(!showCustomRoleForm)}
            className="p-2 bg-background border border-border hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1 text-sm"
          >
            <Plus size={16} /> Thêm Role
          </button>
        </div>

        {showCustomRoleForm && (
          <form onSubmit={handleAddCustomRole} className="mb-6 p-4 bg-background border border-border rounded-xl space-y-3">
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="Tên chức năng (VD: Thợ săn ma)"
              className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-sm"
            />
            <div className="flex gap-2">
              <select 
                value={newRoleTeam} 
                onChange={(e) => setNewRoleTeam(e.target.value)}
                className="flex-1 p-2 bg-card border border-border rounded-lg text-sm focus:outline-none cursor-pointer"
              >
                <option value="VILLAGER">Phe Dân Làng</option>
                <option value="WEREWOLF">Phe Sói</option>
                <option value="MUTANT">Phe Thứ 3 / Khác</option>
              </select>
              <button
                type="submit"
                disabled={!newRoleName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm font-bold"
              >
                Lưu
              </button>
            </div>
          </form>
        )}

        <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-2">
          {allRoles.map(role => {
            const isSelected = selectedRoleIds.includes(role.id);
            const teamStyle = TEAM_COLORS[role.team];
            
            return (
              <div 
                key={role.id}
                onClick={() => toggleRoleSelection(role.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 select-none",
                  isSelected ? `${teamStyle.bg} ${teamStyle.border} ${teamStyle.glow}` : "bg-background border-border hover:border-gray-400 opacity-60 grayscale-[50%]"
                )}
              >
                <span className={cn("font-medium", isSelected ? teamStyle.text : "text-foreground")}>
                  {role.name}
                </span>
                <div className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                  isSelected ? "bg-primary border-primary text-white" : "border-gray-500"
                )}>
                  {isSelected && <Check size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex justify-end">
          <button
            onClick={onNext}
            disabled={players.length < 3 || selectedRoleIds.length === 0}
            className="px-8 py-3 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            Tiếp tục
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
