async function fetcher(url: string, init?: RequestInit): Promise<any> {
  const res = await fetch(url, init);

  if (!res.ok) {
    const error = new NetworkError("No connection!");
    error.info = await res.text();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export class NetworkError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NetworkError";
  }
  status?: number;
  info?: any;
}

export default fetcher;
