import Button from "../../ui/Button";

function CartItem({
  details: { name, imageUrl, price, _id: productId },
  quantity,
}) {
  console.log(productId);
  return (
    <li className="cartItem">
      <div className="cartItem__typo">
        <div className="cartItem__name">{name}</div>
        <div className="cartItem__price">Rs. {price}</div>
        <div className="cartItem__button--container">
          <Button className="cartItem__button cartItem__button--inc">-</Button>
          <span className="cartItem__quantity">{quantity}</span>
          <Button className="cartItem__button cartItem__button--dec">+</Button>
        </div>
      </div>
      <div className="cartItem__imgContainer">
        <img src={imageUrl} alt={name} className="cartItem__img" />
      </div>
    </li>
  );
}

export default CartItem;
