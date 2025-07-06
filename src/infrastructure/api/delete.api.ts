export async function deleteFileFromApi(url: string): Promise<void> {
  await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
}