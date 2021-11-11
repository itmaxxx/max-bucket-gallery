export const request = async (
  url: string,
  method = 'GET',
  body: any = null,
  headers: any = {}
) => {
  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, { method, body, headers });
  return await response.json();
};
