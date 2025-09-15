const url = import.meta.env.VITE_URL;

export async function addToCart({ token, id: productId, quantity = 1 }) {
  const res = await fetch(`${url}/api/cart/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Failed to add cart");
  }

  return await res.json();
}

export async function getCarts(token) {
  const res = await fetch(`${url}/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Failed to get cart");
  }

  return await res.json();
}
