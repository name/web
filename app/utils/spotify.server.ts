// app/utils/spotify.server.ts

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN ?? "",
    }),
  });

  return response.json().then(res => res.access_token);
}

async function getNowPlaying() {
  const accessToken = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return 'Having issues with Spotify...';
  }

  try {
    const song = await response.json();
    const track = {
      title: song.item.name,
      artist: song.item.artists.map((artist: { name: any; }) => artist.name).join(', '),
      songUrl: song.item.external_urls.spotify,
      coverArt: song.item.album.images[0].url,
      previewUrl: song.item.preview_url,
      isPlaying: song.is_playing,
    };
    return track;
  } catch {
    return 'Having issues with Spotify...';
  }
}

export { getNowPlaying };
