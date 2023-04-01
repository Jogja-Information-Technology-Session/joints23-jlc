import Brain from "~/components/homepage/assets/Brain";
import {
  CrystalLeft,
  GuidebookCrystalBG,
  SmallCrystal,
} from "./assets/Crystals";

export default function Guidebook() {
  return (
    <>
      <section className="relative flex flex-col items-center overflow-hidden bg-[#223144] p-12 text-[#E6EAED]">
        <h1 className="relative z-10 text-3xl font-extrabold lg:text-4xl xl:text-5xl">
          Prepare to win
        </h1>
        <h2 className="relative z-10 mt-2 text-lg font-semibold lg:text-2xl xl:text-4xl">
          read our guidebook now!
        </h2>
        <a
          href="https://drive.google.com/file/d/143Egc3voJrd2D9Z0KT8rJ3Wbn2l2OEdm/view"
          className="relative z-10 mt-8 mb-[28vw] rounded-md bg-[#E6EAED] px-3 py-2 font-bold text-[#223144] xl:text-lg"
        >
          Download Guidebook
        </a>

        {/* brain decoration */}
        {/* brain */}
        <img
          src="/homepage/guidebook/brain.svg"
          alt="brain"
          className="absolute bottom-0 left-1/2 z-20 w-1/2 translate-y-[36%] -translate-x-1/2 scale-50 sm:w-[40%] lg:translate-y-[28%]"
        />

        {/* circles */}
        <div className="absolute bottom-0 z-10 aspect-square w-[60%] translate-y-1/2 rounded-full border border-[#E65251] sm:w-[50%]"></div>
        <div
          className="absolute bottom-0 z-10 aspect-square w-[55%] translate-y-1/2 rounded-full border-2 border-[#E65251] bg-white sm:w-[45%]"
          style={styles["brain-bg"]}
        ></div>

        {/* small crystal decoration */}
        <div className="absolute -bottom-[4%] left-1/2 z-10 flex w-[120%] -translate-x-1/2 justify-between lg:-bottom-[10%] lg:w-[105%]">
          <div className="relative h-full w-full ">
            <img
              src="/homepage/guidebook/small_crystal.svg"
              alt=""
              className="w-1/2 lg:w-[36%]"
            />
          </div>
          {/* smaller crystal l */}
          <img
            src="/homepage/guidebook/smaller_crystal.svg"
            alt=""
            className="invisible absolute left-0 -bottom-0 h-[40%] w-[40%] lg:visible"
          />
          <div className="relative h-full w-full scale-x-[-1]">
            <img
              src="/homepage/guidebook/small_crystal.svg"
              alt=""
              className="w-1/2 lg:w-[36%]"
            />
          </div>
          {/* smaller crystal r */}
          <img
            src="/homepage/guidebook/smaller_crystal.svg"
            alt=""
            className="invisible absolute right-0 -bottom-0 h-[40%] w-[40%] scale-x-[-1] lg:visible"
          />
        </div>

        {/* big crystal bg */}
        <div className="absolute left-1/2 top-1/2 flex h-3/4 w-1/2 -translate-y-1/2 -translate-x-1/2 scale-125 justify-center gap-x-[40vw] lg:gap-x-[50vw]">
          <img
            src="/homepage/guidebook/crystal_bg.svg"
            alt=""
            className="w-full scale-x-[-1]"
          />
          <img
            src="/homepage/guidebook/crystal_bg.svg"
            alt=""
            className="w-full"
          />
        </div>
      </section>
    </>
  );
}

const styles = {
  "brain-bg": {
    backgroundImage: "url('/homepage/guidebook/brain_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 140%",
    backgroundSize: "120%",
  },
};
