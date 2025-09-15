import Button from "../../ui/Button";

function ProductCard({
  product,
  mutate,
  cartProducts = [],
  isLoading = false,
}) {
  const { name, imageUrl, price, stock, category, _id: id } = product;
  const outOfStock = stock === 0;

  const { 0: a } = cartProducts.filter((item) => item?.productId === id);

  const isInCart = a?.productId === id;
  console.log(isInCart);

  function handleAdd() {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    mutate({ token, id });
  }

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
      {isInCart ? (
        <div className="product__card--actions--incart">
          <Button
            className="product__card--button product__card--button--incdec"
            onClick={handleAdd}
            disabled={isLoading}
          >
            +
          </Button>
          <span className="product__card--inCartText">{a.quantity}</span>
          <Button
            className="product__card--button product__card--button--incdec"
            disabled={isLoading}
          >
            -
          </Button>
        </div>
      ) : (
        <div className="product__card--actions" onClick={handleAdd}>
          <Button
            className="button--small product__card--button product__card--button-full"
            disabled={outOfStock}
          >
            Add to cart
          </Button>
        </div>
      )}
    </li>
  );
}

export default ProductCard;
