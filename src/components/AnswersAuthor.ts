export default async function GetAnswersAuthor(
  idArray: number[],
  accessToken: string | undefined
) {
  const url = process.env.NEXT_PUBLIC_DATA_API_URL;

  // Use Promise.all to wait for all fetch calls
  const data = await Promise.all(
    idArray.map(async (id) => {
      try {
        const response = await fetch(`${url}/api/users/data/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ID: ${id}`);
        }

        return response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    })
  );

  return data.filter((item) => item !== null);
}
