import React from 'react';

export default function MatchCard({ match }: { match: any }) {
  const { teams, goals, league, fixture } = match;

  const getStatusColor = (status: string) => {
    if (status === 'Match Finished' || status === 'FT') return 'bg-gray-400';
    if (status === 'Not Started' || status === 'NS') return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>{league.country} • {league.name}</span>
        <span
          className={`text-white text-xs px-2 py-0.5 rounded-full ${getStatusColor(fixture.status.short)}`}
        >
          {fixture.status.long}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Ev Sahibi */}
        <div className="flex items-center gap-2 w-1/3">
          <img src={teams.home.logo} alt="home" className="w-6 h-6" />
          <span className="truncate font-medium text-sm">{teams.home.name}</span>
        </div>

        {/* Skor */}
        <div className="w-1/3 text-center text-2xl font-bold text-gray-800">
          {goals.home} - {goals.away}
        </div>

        {/* Deplasman */}
        <div className="flex items-center gap-2 justify-end w-1/3">
          <span className="truncate text-sm text-right font-medium">{teams.away.name}</span>
          <img src={teams.away.logo} alt="away" className="w-6 h-6" />
        </div>
      </div>

      {fixture.status.elapsed && (
        <div className="text-center text-xs text-gray-400 mt-2">
          {fixture.status.elapsed} dk oynandı
        </div>
      )}
    </div>
  );
}
