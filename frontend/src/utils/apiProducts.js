// In production (unified deployment), use relative URLs since frontend and backend are on same domain
// In development, use VITE_API_URL or fallback to localhost:5000
const url = import.meta.env.PROD
  ? "" // Empty string for relative URLs in production
  : import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getProducts({ page }) {
  const limit = 8;
  const res = await fetch(`${url}/api/v1/products?page=${page}&limit=${limit}`);

  if (!res.ok) {
    if (!res.status === 429) {
      const { error } = await res.json();
      throw new Error(error || "Failed to get products");
    }
    throw new Error("Too many requests");
  }
  return await res.json();
}
