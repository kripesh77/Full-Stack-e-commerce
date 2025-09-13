import { useTouchOrMobile } from "../hooks/useMediaQuery";
import LandingMain from "../ui/LandingMain";
import SecondMain from "../ui/SecondMain";
import SecondMainCarousal from "../ui/SecondMainCarousal";

function Home() {
  const isTouchOrMobile = useTouchOrMobile();
  return (
    <main>
      <LandingMain />
      {isTouchOrMobile ? <SecondMainCarousal /> : <SecondMain />}
    </main>
  );
}

export default Home;
