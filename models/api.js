export async function fetchAPI(req, path, method, body=undefined) {

  // Stitch the URL together to get the result "http://localhost:3000/api/users"
  const url = req.protocol + "://" + req.headers.host + "/api/" + path;

  const result = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await result.json();
}