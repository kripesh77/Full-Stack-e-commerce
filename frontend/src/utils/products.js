const url = "https://c06mzsh1-2000.inc1.devtunnels.ms";

export async function getProducts() {
  const res = await fetch(`${url}/api/products`);
  const data = await res.json();
  return data;
}
