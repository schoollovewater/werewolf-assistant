import React from 'react';
import { TEAM_COLORS } from '../constants';
import { Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoleAssignment({ players, setPlayers, availableRoles, onNext, onPrev }) {
  const handleRoleChange = (playerId, roleId) => {
    setPlayers(players.map(p => {
      if (p.id === playerId) {
        return { ...p, role: roleId };
      }
      return p;
    }));
  };

  const isAllAssigned = players.every(p => p.role !== null);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-2xl shadow-xl border border-border">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-dark mb-2">Gán Vai Trò</h2>
        <p className="text-sm text-gray-400">Chọn vai trò cho từng người chơi tương ứng với lá bài họ bốc được.</p>
      </div>

      <div className="space-y-4 mb-8">
        {players.map((player, index) => {
          const selectedRoleInfo = availableRoles.find(r => r.id === player.role);
          const teamStyle = selectedRoleInfo ? TEAM_COLORS[selectedRoleInfo.team] : null;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={player.id} 
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${teamStyle ? teamStyle.bg + ' ' + teamStyle.border : 'bg-background border-border'}`}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark font-bold shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 font-bold text-lg text-foreground truncate">
                {player.name}
              </div>
              <div className="flex-1 min-w-[200px]">
                <select
                  value={player.role || ''}
                  onChange={(e) => handleRoleChange(player.id, e.target.value)}
                  className={`w-full p-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark appearance-none cursor-pointer font-medium
                    ${!player.role ? 'text-gray-500 border-border' : (teamStyle.text + ' ' + teamStyle.border)}
                  `}
                >
                  <option value="" disabled>-- Chọn thẻ bài --</option>
                  {availableRoles.map(role => (
                    <option key={role.id} value={role.id} className="text-foreground">
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-between border-t border-border pt-6">
        <button
          onClick={onPrev}
          className="px-6 py-3 bg-background border border-border text-foreground font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Quay lại
        </button>
        <button
          onClick={onNext}
          disabled={!isAllAssigned}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Shield size={20} />
          Vào Trận
        </button>
      </div>
    </div>
  );
}
