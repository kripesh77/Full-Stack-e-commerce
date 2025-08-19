import FirstVideo from "../ui/FirstVideo";
import Header from "../ui/Header";
import LandingMain from "../ui/LandingMain";
import SecondMain from "../ui/SecondMain";
// import Thirdmain from "../ui/ThirdMain";
import TopNotification from "../ui/TopNotification";

function AppLayout() {
  return (
    <>
      <TopNotification />
      <Header />
      <main>
        <LandingMain />
        <SecondMain />
        {/* <Thirdmain /> */}
        <FirstVideo />
      </main>
    </>
  );
}

export default AppLayout;
