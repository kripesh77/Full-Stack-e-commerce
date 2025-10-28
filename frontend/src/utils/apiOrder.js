const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_URL ||
  "http://localhost:3000";

export async function createOrder(token) {
  const response = await fetch(`${API_URL}/api/v1/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create order");
  }

  return response.json();
}

export async function checkPaymentStatus(orderId, token) {
  const response = await fetch(`${API_URL}/api/v1/orders/status/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to check payment status");
  }

  return response.json();
}

export async function getOrderHistory(token) {
  const response = await fetch(`${API_URL}/api/v1/orders/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get order history");
  }

  return response.json();
}
