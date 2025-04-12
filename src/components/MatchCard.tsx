import React from 'react';

export default function MatchCard({ match }: { match: any }) {
  const { teams, goals, league, fixture } = match;

  const getStatusColor = (status: string) => {
    if (status === 'Match Finished' || status === 'FT') return 'bg-gray-400';
    if (status === 'Not Started' || status === 'NS') return 'bg-red-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition">
      <div className="flex items-center justify-between mb-1 text-sm text-gray-500">
        <span>{league.country} • {league.name}</span>
        <span
          className={`text-white text-xs px-2 py-0.5 rounded-full ${getStatusColor(fixture.status.short)}`}
        >
          {fixture.status.long}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {/* Takım #1 */}
        <div className="flex items-center gap-2 w-1/3">
          <img src={teams.home.logo} alt="home" className="w-5 h-5" />
          <span className="truncate">{teams.home.name}</span>
        </div>

        {/* Skor */}
        <div className="text-2xl font-bold w-1/3 text-center">
          {goals.home} - {goals.away}
        </div>

        {/* Takım #2 */}
        <div className="flex items-center justify-end gap-2 w-1/3">
          <span className="truncate text-right">{teams.away.name}</span>
          <img src={teams.away.logo} alt="away" className="w-5 h-5" />
        </div>
      </div>

      {fixture.status.elapsed && (
        <div className="text-xs text-gray-400 mt-2 text-center">
          {fixture.status.elapsed} dk oynandı
        </div>
      )}
    </div>
  );
}
