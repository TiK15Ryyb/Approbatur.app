// This gets called on every request
export async function getCrawl(crawlId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const limit = 3
  try {
    //Disable cors
    const response = await fetch(`${apiUrl}/api/crawls/${crawlId}?expand=bars&limit=${limit}`);
    if (response.status !== 200) {
      console.error(`Error fetching crawl ${crawlId}: ${response.status} ${response.statusText}`)
      return null
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null
  }
}