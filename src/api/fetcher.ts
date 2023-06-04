export const fetcher = <T>(url: string | URL, init?: RequestInit): Promise<T> =>
  fetch(url, init).then(res => res.json())

const api = {
  get<T>(path: string) {
    return fetcher<T>(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  post<T>(path: string, body: any) {
    return fetcher<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },

  delete<T>(path: string) {
    return fetcher<T>(path, {
      method: 'DELETE',
    })
  },
}

export default api
