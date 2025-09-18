const url = import.meta.env.VITE_URL;

export async function getProducts() {
  const res = await fetch(`${url}/api/products`);

  if (!res.ok) {
    if (!res.status === 429) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get products");
    }
    throw new Error("Too many requests");
  }
  return await res.json();
}
