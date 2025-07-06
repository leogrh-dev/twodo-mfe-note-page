const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function uploadFileToApi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer upload do arquivo');
  }

  const data = await response.json();
  return data.url;
}