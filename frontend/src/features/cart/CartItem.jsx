import Button from "../../ui/Button";

function CartItem({
  details: { name, imageUrl, price, _id: productId },
  quantity,
  mutate,
  isPending,
}) {
  console.log(productId);

  function handleInc() {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const add = true;
    mutate({ token, id: productId, add });
  }
  function handleDec() {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const remove = true;
    mutate({ token, id: productId, remove });
  }
  return (
    <li className="cartItem">
      <div className="cartItem__imgContainer">
        <img src={imageUrl} alt={name} className="cartItem__img" />
      </div>
      <div className="cartItem__typo">
        <div className="cartItem__namePrice">
          <div className="cartItem__name">{name}</div>
          <div className="cartItem__price">Rs. {price}</div>
        </div>
        <div className="cartItem__button--container">
          <Button
            className="cartItem__button cartItem__button--inc"
            onClick={handleDec}
            disabled={isPending}
          >
            -
          </Button>
          <span className="cartItem__quantity">{quantity}</span>
          <Button
            className="cartItem__button cartItem__button--dec"
            onClick={handleInc}
            disabled={isPending}
          >
            +
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
