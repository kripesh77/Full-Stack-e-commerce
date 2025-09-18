import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrRemoveCart } from "../../utils/apiCart";
import ProductCard from "./ProductCard";
import useCart from "../cart/useCart";

function Products({ products }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addOrRemoveCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  const cartProducts = cart?.products?.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  }));

  if (!products)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "red",
        }}
      >
        Failed to fetch products
      </div>
    );

  return (
    <div className="product-div">
      <div className="product-div__container">
        <ul className="product">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              mutate={mutate}
              cartProducts={cartProducts}
              isLoading={isPending}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
