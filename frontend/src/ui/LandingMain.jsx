import Buttonbig from "./Buttonbig";

function LandingMain() {
  return (
    <section>
      <div className="flex h-[calc(100vh-8.25rem)] justify-center md:h-[calc(100vh-5.25rem)]">
        <div className="landing-main-div m-2.5 flex w-[100%] flex-col items-center justify-center rounded-2xl p-10 md:items-end">
          <span className="font-body relative z-20 mx-3 mb-5 text-center text-4xl leading-tight font-bold tracking-wider text-balance text-white drop-shadow-lg md:mx-5 md:text-4xl lg:text-6xl">
            Your Safety, Our Mission
          </span>
          <Buttonbig className="cursor-pointer">shop now</Buttonbig>
        </div>
      </div>
    </section>
  );
}

export default LandingMain;
