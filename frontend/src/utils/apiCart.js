const url = import.meta.env.VITE_URL;

export async function addOrRemoveCart({
  token,
  id: productId,
  add = false,
  remove = false,
}) {
  let res;

  if (add) {
    res = await fetch(`${url}/api/cart/add/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
  } else if (remove) {
    res = await fetch(`${url}/api/cart/remove/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
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
