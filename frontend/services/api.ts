const BASE_URL = process.env.API_URL;

type ApiConfig = {
  data?: unknown;
  headers?: Record<string, string>;
  method?: RequestInit["method"];
  query?: Record<string, string | number | boolean>;
};

export const apiClient = async <T = unknown>(
  endpoint: string,
  config: ApiConfig = {},
): Promise<T> => {
  const { data, headers, method = "GET", query } = config;

  let url = BASE_URL + endpoint;

  const queryParams = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => {
            queryParams.append(key, String(v));
          });
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url = url + "?" + queryString;
    }
  }

  const response = await fetch(url, {
    method,
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
    responseData = null;
    console.log(error);
  }

  if (!response.ok) {
    throw new Error(
      responseData?.message || response.statusText || "Something went wrong",
    );
  }

  return responseData as T;
};
