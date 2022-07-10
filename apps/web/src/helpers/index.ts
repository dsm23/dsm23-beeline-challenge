const API = 'http://localhost:3333';

type Options = {
  method?: string;
  body?: BodyInit;
}

export async function fetchFromAPI(endpointURL: string, opts?: Options) {
  const { method, body } = { method: 'POST', body: null, ...opts};

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json();
}