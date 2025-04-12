// Sofascore tarzı: Modern, logolu, responsive Canlı Maç Uygulaması

'use client';

import React, { useEffect, useState } from 'react';

export default function LiveFootballScores() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
          method: 'GET',
          headers: {
            'x-apisports-key': 'e0554e4b6823032fe331f955d5be4d58'
          }
        });

        const data = await response.json();
        setMatches(data.response);
      } catch (error) {
        console.error('API çekiminde hata:', error);
      }
    };

    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Match Finished' || status === 'FT') return 'bg-gray-400';
    if (status === 'Not Started' || status === 'NS') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Canlı Futbol Maçları</h1>
      {matches.length === 0 ? (
        <p className="text-center text-gray-500">Şu anda canlı maç bulunmamaktadır.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>{match.league.country} • {match.league.name}</span>
                <span className={`text-white text-xs px-2 py-0.5 rounded-full ${getStatusColor(match.fixture.status.short)}`}>
                  {match.fixture.status.long}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-1/3">
                  <img src={match.teams.home.logo} alt="home" className="w-6 h-6" />
                  <span className="truncate font-medium text-sm">{match.teams.home.name}</span>
                </div>

                <div className="w-1/3 text-center text-2xl font-bold text-gray-800">
                  {match.goals.home} - {match.goals.away}
                </div>

                <div className="flex items-center gap-2 justify-end w-1/3">
                  <span className="truncate text-sm text-right font-medium">{match.teams.away.name}</span>
                  <img src={match.teams.away.logo} alt="away" className="w-6 h-6" />
                </div>
              </div>

              {match.fixture.status.elapsed && (
                <div className="text-center text-xs text-gray-400 mt-2">
                  {match.fixture.status.elapsed} dk oynandı
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
