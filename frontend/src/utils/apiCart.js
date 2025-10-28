// In production (unified deployment), use relative URLs since frontend and backend are on same domain
// In development, use VITE_API_URL or fallback to localhost:5000
const url =
  import.meta.env.PROD
    ? "" // Empty string for relative URLs in production
    : import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function addOrRemoveCart({
  token,
  id: productId,
  add = false,
  remove = false,
}) {
  let res;

  if (add) {
    res = await fetch(`${url}/api/v1/carts/add/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  } else if (remove) {
    res = await fetch(`${url}/api/v1/carts/remove/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  } else {
    throw new Error("Must specify either add or remove operation");
  }

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error("Too many requests");
    }
    const { error } = await res.json();
    throw new Error(error || "Failed to update cart");
  }

  return await res.json();
}

export async function getCarts({ token }) {
  if (!token) {
    throw new Error("Authentication token required");
  }
  const res = await fetch(`${url}/api/v1/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Failed to get cart");
  }

  return await res.json();
}
