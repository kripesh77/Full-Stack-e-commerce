import Button from "../../ui/Button";

function Products({ products }) {
  console.log(products);
  return (
    <div className="product-div">
      <div className="product-div__container">
        <ul className="product">
          {products.map((item) => (
            <ProductCard key={products._id} product={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { name, imageUrl, price, stock, category } = product;
  const outOfStock = stock === 0;

  // function handleClick() {
  //   console.log("Added " + id);
  // }
  return (
    <li className="product__card">
      <div className="product__card--img--div">
        <img src={imageUrl} alt={name} className="product__card--img" />
      </div>
      <div className="product__card--category">{category}</div>
      <div className="product__card--name" title={name}>
        {name.length <= 15 ? name : `${name.substring(0, 12) + "..."}`}
      </div>
      <div className="product__card--price">Rs. {price}</div>
      <div className="product__card--stock">
        Remaining:
        <span style={{ color: `${stock > 10 ? "green" : "red"}` }}>
          &nbsp;
          {stock}
          {stock < 10 && (
            <span>{outOfStock ? " (out of stock)" : " (low on stock)"}</span>
          )}
        </span>
      </div>
      <div className="product__card--actions">
        {/* <button
          onClick={handleClick}
          disabled={outOfStock}
          className="product__card--button"
        >
          Add to cart
        </button> */}
        <Button
          className="button--small product__card--button"
          disabled={outOfStock}
        >
          Add to cart
        </Button>
      </div>
    </li>
  );
}

export default Products;
