"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Canlı Maçlar (Futbol)</h1>
      <ScrollArea className="h-[80vh] pr-4">
        {matches.length === 0 ? (
          <p>Şu anda canlı maç bulunmamaktadır.</p>
        ) : (
          matches.map((match: any) => (
            <Card key={match.fixture.id} className="mb-4">
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between text-xl font-semibold">
                  <span>{match.teams.home.name}</span>
                  <span>{match.goals.home} - {match.goals.away}</span>
                  <span>{match.teams.away.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {match.league.name} - {match.fixture.status.long} ({match.fixture.status.elapsed} dk)
                </div>
                <Badge>{match.fixture.status.short}</Badge>
              </CardContent>
            </Card>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
