import axios from 'axios';

interface SearchResult {
  title: string;
  url: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const company = url.searchParams.get('company');

  if (!company) {
    return new Response(JSON.stringify({ error: 'Company query parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const query = encodeURIComponent(`${company} interview experience site:geeksforgeeks.org`);
    const searchUrl = `https://www.google.com/search?q=${query}`;

    const { data } = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    
    const baseUrl = 'https://www.geeksforgeeks.org';

    // Use a regular expression to find all matching links
    const regex = new RegExp(`${baseUrl}[^\\s"']*`, 'g'); // Adjusted regex to handle quotes and single quotes
    const foundLinks = data.match(regex) || [];

    // Use Set to filter out duplicate links and exclude those ending with "<span" or containing "&amp"
    const uniqueLinks = Array.from(new Set(
      foundLinks
        .filter((link:string) => !link.endsWith('<span'))  // Exclude links ending with '<span>'
        .filter((link:string) => !link.includes('&amp'))   // Exclude links containing '&amp'
    ));

    // Return the first 7 unique links
    const firstSevenLinks = uniqueLinks.slice(0, 7);

    
    return new Response(JSON.stringify({ firstSevenLinks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch search results' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
