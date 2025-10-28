const API_URL = import.meta.env.VITE_URL;

export async function signin({ email, password }) {
  const response = await fetch(`${API_URL}/api/v1/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signin failed");
  }

  return response.json();
}

export async function signup({ name, email, password, confirmPassword }) {
  const response = await fetch(`${API_URL}/api/v1/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signin failed");
  }

  return response.json();
}
