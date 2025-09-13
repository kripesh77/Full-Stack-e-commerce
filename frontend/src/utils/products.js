const url = import.meta.env.VITE_URL;

export async function getProducts() {
  const res = await fetch(`${url}/api/products`);
  const data = await res.json();
  return data;
}
