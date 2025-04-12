import React from 'react';

export default function MatchCard({ match }: { match: any }) {
  const { teams, goals, league, fixture } = match;

  const getStatusColor = (status: string) => {
    if (status === 'Match Finished' || status === 'FT') return 'bg-gray-400';
    if (status === 'Not Started' || status === 'NS') return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
      {/* Lig & ülke */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <div>{league.country} • {league.name}</div>
        <div className={`text-white px-2 py-0.5 rounded-full text-xs ${getStatusColor(fixture.status.short)}`}>
          {fixture.status.long}
        </div>
      </div>

      {/* Takımlar + Skor */}
      <div className="grid grid-cols-3 items-center text-center">
        {/* Ev Sahibi */}
        <div className="flex items-center justify-start gap-2">
          <img src={teams.home.logo} alt={teams.home.name} className="w-6 h-6" />
          <span className="text-sm font-medium">{teams.home.name}</span>
        </div>

        {/* Skor */}
        <div className="text-2xl font-bold text-gray-800">
          {goals.home} - {goals.away}
        </div>

        {/* Deplasman */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm font-medium">{teams.away.name}</span>
          <img src={teams.away.logo} alt={teams.away.name} className="w-6 h-6" />
        </div>
      </div>

      {/* Süre */}
      {fixture.status.elapsed && (
        <div className="text-xs text-center text-gray-400 mt-2">
          {fixture.status.elapsed} dk oynandı
        </div>
      )}
    </div>
  );
}
