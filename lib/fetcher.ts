async function fetcher(url: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(url, init);

  if (!res.ok) {
    const error = new NetworkError("No Content");
    error.info = await res.json();
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
