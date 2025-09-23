const url = import.meta.env.VITE_API_URL || import.meta.env.VITE_URL || 'http://localhost:5000';

export async function getProducts({ page }) {
  const limit = 8;
  const category = 0;
  const res = await fetch(
    `${url}/api/v2/products?page=${page}&limit=${limit}&category=${category}`,
  );

  if (!res.ok) {
    if (!res.status === 429) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get products");
    }
    throw new Error("Too many requests");
  }
  return await res.json();
}
