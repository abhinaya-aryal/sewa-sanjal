const BASE_URL = process.env.API_URL;

type ApiConfig = {
  data?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
};

export const apiClient = async <T = unknown>(
  endpoint: string,
  config: ApiConfig = {},
): Promise<T> => {
  const { data, headers } = config;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: config.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
  });

  let responseData: any = null;

  try {
    responseData = await response.json();
  } catch (error) {
    console.log(error);
  }

  if (!response.ok) {
    throw new Error(
      responseData?.message || response.statusText || "Something went wrong",
    );
  }

  return responseData as T;
};
