import type { Context } from '@netlify/functions';

const ALLOWED_ORIGINS = [
  'https://app.contentful.com',
  'http://localhost:5173',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
}

async function getTwitchToken(): Promise<string> {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID!,
      client_secret: process.env.TWITCH_CLIENT_SECRET!,
      grant_type: 'client_credentials',
    }),
  });
  if (!res.ok) throw new Error(`Twitch auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

function buildImageUrls(imageId: string) {
  return {
    thumb: `https://images.igdb.com/igdb/image/upload/t_thumb/${imageId}.jpg`,
    micro: `https://images.igdb.com/igdb/image/upload/t_micro/${imageId}.jpg`,
    cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`,
  };
}

export default async (req: Request, _context: Context) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const apiKey = req.headers.get('X-API-Key');
  if (!apiKey || apiKey !== process.env.IGDB_PROXY_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const query = url.searchParams.get('q');
  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing q parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = await getTwitchToken();

    const igdbRes = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: /^\d+$/.test(query)
        ? `where id = ${query}; fields name,summary,alternative_names.name,cover.image_id; limit 1;`
        : `search "${query.replace(/"/g, '\\"')}"; fields name,summary,alternative_names.name,cover.image_id; limit 8;`,
    });

    if (!igdbRes.ok) {
      throw new Error(`IGDB API error: ${igdbRes.status}`);
    }

    const games = await igdbRes.json();

    const results = games.map(
      (game: {
        id: number;
        name: string;
        summary?: string;
        alternative_names?: { name: string }[];
        cover?: { image_id: string };
      }) => ({
        id: game.id,
        name: game.name,
        aliases: game.alternative_names
          ? game.alternative_names.map((a) => a.name).join('\n')
          : '',
        summary: game.summary || '',
        image: game.cover?.image_id
          ? buildImageUrls(game.cover.image_id)
          : { thumb: '', micro: '', cover: '' },
      }),
    );

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
};
