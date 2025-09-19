const url = import.meta.env.VITE_URL;

export async function getProducts() {
  const page = 2;
  const limit = 8;
  const category = 1;
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
