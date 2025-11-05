import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

function ProductCard({
  product,
  mutate,
  cartProducts = [],
  isLoading = false,
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { name, imageUrl, price, stock, category, _id: id } = product;
  const outOfStock = stock === 0;

  const { 0: a } = cartProducts.filter((item) => item?.productId._id === id);

  const isInCart = a?.productId._id === id;
  console.log(cartProducts, id);

  function handleInc() {
    if (isAuthenticated) {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const add = true;
      mutate({ token, id, add });
    } else {
      toast.error("Please signin first to add products to cart");
      navigate("/auth/signin");
    }
  }
  function handleDec() {
    if (isAuthenticated) {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const remove = true;
      mutate({ token, id, remove });
    } else {
      toast.error("Please signin first to add products into cart");
      navigate("/auth/signin");
    }
  }

  return (
    <li className="product__card">
      <div className="product__card--img--div">
        <img
          src={imageUrl}
          alt={name}
          className="product__card--img"
          loading="lazy"
        />
      </div>
      <div className="product__card--category">{category}</div>
      <div className="product__card--name" title={name}>
        {name.length <= 15 ? name : `${name.substring(0, 12) + "..."}`}
      </div>
      <div className="product__card--price">
        <span className="product__card--Rs">Rs.</span> {price}
      </div>
      <div className="product__card--stock">
        Remaining:
        <span style={{ color: `${stock > 10 ? "#16a34a" : "red"}` }}>
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
            onClick={handleInc}
            disabled={isLoading}
          >
            +
          </Button>
          <span className="product__card--inCartText">{a.quantity}</span>
          <Button
            className="product__card--button product__card--button--incdec"
            disabled={isLoading}
            onClick={handleDec}
          >
            -
          </Button>
        </div>
      ) : (
        <div className="product__card--actions" onClick={handleInc}>
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
