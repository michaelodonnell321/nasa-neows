export default async function getAllNeos() {
    // gets data from Nasa NEO API

    const nasaKey = process.env.NASA_KEY;
    // today's date in yyyy-mm-dd format for API (https://api.nasa.gov/) for reference
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?&end_date=${formattedDate}&api_key=${nasaKey}`)
    
    if (!res.ok) throw new Error('fetch failed');9
    return res.json();
}