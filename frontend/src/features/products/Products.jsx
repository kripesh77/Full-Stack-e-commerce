import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCarts } from "../../utils/apiCart";
import ProductCard from "./ProductCard";

function Products({ products }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { token } = JSON.parse(localStorage.getItem("auth"));

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCarts(token),
  });

  console.log(cart);

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
              key={products._id}
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
