'use client';

import React, { useEffect, useState } from 'react';
import MatchCard from '../components/MatchCard';

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
    country: string;
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: {
    home: number;
    away: number;
  };
};

const COUNTRY_FILTERS = [
  'Turkey',
  'England',
  'Spain',
  'Germany',
  'Portugal',
  'Italy',
  'France',
  'Netherlands',
  'Belgium',
  'Brazil',
  'Argentina',
  'Scotland',
  'USA',
  'Japan',
  'South Korea',
  'Mexico',
  'Switzerland',
];

export default function HomePage() {
  const [matchesByDate, setMatchesByDate] = useState<{ [key: string]: Match[] }>({});
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

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

  const filterByCountry = (matches: Match[]) => {
    if (selectedCountry === 'All') return matches;
    return matches.filter((match) => match.league.country === selectedCountry);
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Canlı Futbol Maçları</h1>

      {/* FİLTRE */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Ülkeye göre filtrele:</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">Tüm Ülkeler</option>
          {COUNTRY_FILTERS.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* MAÇ LİSTELERİ */}
      {Object.entries(matchesByDate).map(([date, matches]) => {
        const filtered = filterByCountry(matches);
        return (
          <section key={date} className="mb-10">
           <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">
  {formatReadableDate(date)}
</h2>
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-500">Maç bulunamadı.</p>
            ) : (
              <div className="space-y-4">
                {filtered.map((match) => (
                  <MatchCard key={match.fixture.id} match={match} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
