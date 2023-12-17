const e = '69KoY';
const n = 'd6lkH';
const i = 'WsGIF';
const g = 'ogspb';
const m = 'QPi9A';
const a = 'IEesgrz';
const GIPHYURL = 'https://api.giphy.com/v1/gifs/search?';

const LANG = '&lang=en';
const OFFSET = '&offset=0';
const RATING = '&rating=g';

const LIMIT = '&limit=10';
const BUNDLE = '&bundle=messaging_non_clips';

const buildRequestURL = (query) =>
  `${GIPHYURL}api_key=${e + n + i + g + m + a}&q=${query}${LIMIT}${OFFSET}${RATING}${LANG}${BUNDLE}`;

async function fetchGIFAsyncAwait(query) {
  const request = buildRequestURL(query);
  try {
    const response = await fetch(request, { mode: 'cors' });
    if (!response.ok) throw new Error('Network Response Error');
    return response.json();
  } catch (error) {
    console.error(`Fetch Error: ${error}}`);
  }
}

export { fetchGIFAsyncAwait };
