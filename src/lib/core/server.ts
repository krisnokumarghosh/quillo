const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async <T = unknown>(
  path: string,
  data?: unknown,
  methode: string = "POST",
): Promise<T> => {
  const options: RequestInit = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${path}`, options);
  console.log(res.status);
  return await res.json();
};



export const serverFetch = async <T>(
  path: string
): Promise<T> => {
  const res = await fetch(`${baseUrl}${path}`);

  return res.json() as Promise<T>;
};