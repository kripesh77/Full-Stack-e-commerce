import Header from "../ui/Header";
import LandingMain from "../ui/LandingMain";
import SecondMain from "../ui/SecondMain";
import TopNotification from "../ui/TopNotification";

function AppLayout() {
  return (
    <>
      <TopNotification />
      <Header />
      <main>
        <LandingMain />
        <SecondMain />
      </main>
    </>
  );
}

export default AppLayout;
