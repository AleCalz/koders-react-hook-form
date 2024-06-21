const API_URL = "https://koders-list-api.vercel.app";

export function getkoders() {
  return fetch(`${API_URL}/koders`)
    .then((response) => response.json()) //promesa del fetch
    .then((data) => data.koders); //promesa del .json()
}

export function createKoder(koder) {
  return fetch(`${API_URL}/koders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: koder.firstName,
      lastName: koder.lastName,
      email: koder.email,
    }),
  });
}

export function deleteKoder(koderId) {
  return fetch(`${API_URL}/koders/${koderId}/delete`, {
    method: "POST",
  });
}
