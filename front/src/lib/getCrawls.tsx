// This gets called on every request
export async function getCrawls() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const limit = 3
    try {
      const response = await fetch(`${apiUrl}/api/crawls?expand=bars&limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return []
    }
  }