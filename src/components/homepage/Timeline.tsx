import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Timeline() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const size = useWindowSize();

  useEffect(() => {
    if (size.width > 1023) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: "40%",
        },
        {
          translateX: "-40%",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "center top",
            scrub: 0.6,
            pin: true,
          },
        }
      );

      return () => {
        pin.kill();
      };
    }
  }, [size]);

  return (
    <div>
      <section
        ref={triggerRef}
        className="relative flex flex-col items-center justify-center overflow-hidden bg-[url(/homepage/background.png)] bg-cover py-16 text-[#223144] sm:px-20 lg:h-screen"
      >
        <h1 className="relative z-10 mb-12 hidden text-center text-5xl font-extrabold lg:block">
          Timeline
        </h1>
        <div ref={sectionRef}>
          <div className="relative z-10 h-full w-full flex-col items-start justify-center lg:flex">
            {/* desktop */}
            <div className="relative z-10 hidden w-full items-start justify-center lg:flex">
              {timelineItems.map((item, index) => (
                <div className="flex" key={index}>
                  <div
                    className={`my-8  flex w-64  ${
                      index % 2 === 0 ? "mt-40 flex-col" : "flex-col-reverse"
                    } `}
                  >
                    <div
                      className={` relative flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#223344] ${
                        index === 3 ? "translate-y-1/2" : ""
                      } `}
                    >
                      <h1 className=" text-4xl font-bold text-white">
                        {index + 1}
                      </h1>
                      <div
                        className={`absolute left-1/2 h-[175%] w-[2px] -translate-x-1/2 bg-[#223344] ${
                          index % 2 === 0
                            ? "bottom-0 translate-y-full"
                            : "top-0 -translate-y-full"
                        }`}
                      />
                    </div>
                    {index % 2 === 0 ? (
                      <div className="ml-8 -mt-4 pt-8 pl-8">
                        <h1 className="mt-8 text-2xl font-extrabold">
                          {item.title}
                        </h1>
                        <h1 className="mt-2 font-semibold">{item.date}</h1>
                      </div>
                    ) : (
                      <div className="ml-8 -mt-4 pb-8 pl-8 ">
                        <h1 className="text-2xl font-extrabold">
                          {item.title}
                        </h1>
                        <h1 className="mt-2 mb-4 font-semibold">{item.date}</h1>
                      </div>
                    )}
                  </div>
                  {index !== timelineItems.length - 1 && (
                    <hr className="relative my-8 -ml-48 mt-48 h-[2px] w-32 border-0 bg-[#223344]" />
                  )}
                </div>
              ))}
            </div>
            {/* mobile */}
            <div className="relative flex flex-col gap-y-6 lg:hidden">
              {timelineItems.map((item, i) => (
                <div
                  key={i}
                  className="relative flex -translate-x-[20%] items-center justify-center gap-x-2"
                  // onClick={() => setActive(i)}
                >
                  <div className="relative mx-auto ml-auto mr-0 w-fit">
                    <h2 className="relative z-10 mt-2 flex aspect-square h-[1.75em] w-auto items-center justify-center rounded-full bg-primary-dark text-2xl font-extrabold text-[#f4f4f4]">
                      {i + 1}
                    </h2>
                    <div
                      className={`absolute left-1/2 top-[1em] h-[250%] w-1 -translate-x-1/2 bg-primary-dark ${
                        i != timelineItems.length - 1 ? "" : "hidden"
                      }`}
                    ></div>
                    <div
                      className={`absolute -top-[1.5em] left-[27.5%] ml-2 h-[200%] w-[500%] rounded border-4 border-primary-dark 
                      `}
                    ></div>
                  </div>
                  <div className="relative w-1/2">
                    <p className="w-[90%] text-xl font-extrabold">
                      {item.title}
                    </p>
                    <span className="text-[14px]">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 flex h-[110%] w-[115vw] -translate-x-1/2 -translate-y-1/2 justify-between gap-y-10 gap-x-[25%] sm:gap-x-[40%] lg:h-[150%] lg:flex-col lg:justify-center lg:gap-y-[20%]">
          <div className="flex h-full -translate-y-[5%] flex-col justify-between lg:translate-y-0 lg:flex-row lg:items-end">
            {bg1.map((item, i) => (
              <img
                key={i}
                src={`/homepage/timeline/${item}.svg`}
                alt="bege"
                className="h-full w-full scale-75 lg:h-[60%] lg:w-[60%]"
              />
            ))}
          </div>
          <div className="flex h-full translate-y-[5%] flex-col justify-between lg:translate-y-[0%] lg:flex-row lg:items-start">
            {bg2.map((item, i) => (
              <img
                key={i}
                src={`/homepage/timeline/${item}.svg`}
                alt="bege"
                className="ml-auto h-full w-full scale-75 lg:m-0 lg:h-[60%] lg:w-[60%]"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const bg1 = ["flag", "bar", "joystick", "tag"];
const bg2 = ["brain", "mining", "flag", "bar"];

const timelineItems = [
  {
    title: "Pendaftaran Early Bird",
    date: "1 s.d. 14 Februari 2023",
  },
  {
    title: "Pendaftaran Reguler",
    date: "15 s.d. 28 Februari 2023",
  },
  {
    title: "Warmup Penyisihan",
    date: "9 April 2023",
  },
  {
    title: "Penyisihan",
    date: "16 April 2023",
  },
  {
    title: "Pengumuman Penyisihan",
    date: "2 Mei 2023",
  },
  {
    title: "Final Tahap 1 dan Tahap 2",
    date: "21 Mei 2023",
  },
  {
    title: "Pengumuman Pemenang",
    date: "21 Mei 2023",
  },
];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
