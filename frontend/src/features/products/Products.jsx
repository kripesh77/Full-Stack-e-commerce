function Products({ products }) {
  console.log(products);
  return (
    <div>
      <ul>
        {products.map((item) => (
          <ProductCard key={products._id} product={item} />
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ product }) {
  console.log(product);
  const { _id: id, name, imageUrl, price, stock } = product;
  return (
    <li>
      <img src={imageUrl} alt="name" />
      <div>{name}</div>
      <div>{id}</div>
      <div>{price}</div>
      <div>{stock}</div>
    </li>
  );
}

export default Products;
