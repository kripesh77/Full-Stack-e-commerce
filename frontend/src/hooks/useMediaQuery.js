import { useMediaQuery } from "react-responsive";

const useTouchOrMobile = () => {
  const isTouchOrMobile = useMediaQuery({
    query: "(max-width: 767px), (pointer: coarse)",
  });

  return isTouchOrMobile;
};

export { useTouchOrMobile };
