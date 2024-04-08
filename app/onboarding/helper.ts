type FormData = {
  [key: string]: string | number | Date | undefined | boolean;
};

export async function makeApiCall(url: string, data: FormData) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function makeAndHandleApiCall(
  url: string,
  data: FormData,
  errorMessage: string
) {
  try {
    const response = await makeApiCall(url, data);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorMessage);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(errorMessage + ' ' + error.message);
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error(errorMessage);
    }
  }
}
