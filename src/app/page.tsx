'use client';

import React, { useEffect, useState } from 'react';

type Match = {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    name: string;
  };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: {
    home: number;
    away: number;
  };
};

export default function HomePage() {
  const [matchesByDate, setMatchesByDate] = useState<{ [key: string]: Match[] }>({});

  useEffect(() => {
    const fetchMatchesForDate = async (date: string) => {
      try {
        const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, {
          method: 'GET',
          headers: {
            'x-apisports-key': 'e0554e4b6823032fe331f955d5be4d58'
          }
        });
        const data = await res.json();
        return data.response as Match[];
      } catch (err) {
        console.error(`Veri çekilemedi (${date}):`, err);
        return [];
      }
    };

    const formatDate = (offset: number) => {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return d.toISOString().split('T')[0];
    };

    const fetchAllDates = async () => {
      const dates = {
        yesterday: formatDate(-1),
        today: formatDate(0),
        tomorrow: formatDate(1),
      };

      const [yesterdayMatches, todayMatches, tomorrowMatches] = await Promise.all([
        fetchMatchesForDate(dates.yesterday),
        fetchMatchesForDate(dates.today),
        fetchMatchesForDate(dates.tomorrow),
      ]);

      setMatchesByDate({
        [dates.yesterday]: yesterdayMatches,
        [dates.today]: todayMatches,
        [dates.tomorrow]: tomorrowMatches,
      });
    };

    fetchAllDates();
  }, []);

  const formatReadableDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tüm Maçlar (Dün - Bugün - Yarın)</h1>

      {Object.entries(matchesByDate).map(([date, matches]) => (
        <section key={date} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{formatReadableDate(date)}</h2>
          {matches.length === 0 ? (
            <p className="text-sm text-gray-500">Maç bulunamadı.</p>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.fixture.id}
                  className="bg-white p-4 rounded shadow-sm border flex flex-col"
                >
                  <div className="flex justify-between font-medium text-lg">
                    <span>{match.teams.home.name}</span>
                    <span>
                      {match.goals.home} - {match.goals.away}
                    </span>
                    <span>{match.teams.away.name}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {match.league.name} • {match.fixture.status.long}{' '}
                    {match.fixture.status.elapsed
                      ? `(${match.fixture.status.elapsed} dk)`
                      : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
