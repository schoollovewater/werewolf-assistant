import { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import RoleAssignment from './components/RoleAssignment';
import GameDashboard from './components/GameDashboard';
import { DEFAULT_ROLES } from './constants';
import { Moon } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [players, setPlayers] = useState([]);
  
  // Toàn bộ roles (Mặc định + Custom)
  const [allRoles, setAllRoles] = useState(DEFAULT_ROLES);
  // Danh sách ID các role được chọn để tham gia ván đấu
  const [selectedRoleIds, setSelectedRoleIds] = useState(DEFAULT_ROLES.map(r => r.id));

  const rolesInGame = allRoles.filter(r => selectedRoleIds.includes(r.id));

  return (
    <div className="min-h-screen p-4 sm:p-8 relative">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <Moon size={24} className="fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground m-0 leading-none pb-1">Ma Sói</h1>
            <p className="text-sm text-primary-dark font-medium m-0 leading-none">Game Master Assistant</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === i ? 'bg-primary w-6' : step > i ? 'bg-primary/50' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative">
        {step === 1 && (
          <PlayerSetup 
            players={players} 
            setPlayers={setPlayers} 
            allRoles={allRoles}
            setAllRoles={setAllRoles}
            selectedRoleIds={selectedRoleIds}
            setSelectedRoleIds={setSelectedRoleIds}
            onNext={() => setStep(2)} 
          />
        )}
        
        {step === 2 && (
          <RoleAssignment 
            players={players} 
            setPlayers={setPlayers} 
            availableRoles={rolesInGame}
            onNext={() => setStep(3)}
            onPrev={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <GameDashboard 
            players={players} 
            setPlayers={setPlayers} 
            availableRoles={rolesInGame}
          />
        )}
      </main>
    </div>
  );
}

export default App;
