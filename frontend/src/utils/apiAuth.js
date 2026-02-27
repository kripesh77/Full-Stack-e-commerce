// In production (unified deployment), use relative URLs since frontend and backend are on same domain
// In development, use VITE_API_URL or fallback to localhost:5000
const API_URL = import.meta.env.PROD
  ? "" // Empty string for relative URLs in production
  : import.meta.env.VITE_API_URL || "http://localhost:5000";

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
    throw new Error(error.message || "signin failed");
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
    throw new Error(error.message || "signup failed");
  }

  return response.json();
}

export async function getCurrentUser() {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  if (!token) return null;

  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user data");
  }

  return response.json();
}

export async function updateUserData({ name, email }) {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const response = await fetch(`${API_URL}/api/v1/users/updateMe`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update user data");
  }

  return response.json();
}

export async function updateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const response = await fetch(`${API_URL}/api/v1/users/updateMyPassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: passwordCurrent,
      password,
      confirmPassword: passwordConfirm,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update password");
  }

  const data = await response.json();

  localStorage.setItem(
    "auth",
    JSON.stringify({ role: "user", token: data.token }),
  );

  return data;
}
