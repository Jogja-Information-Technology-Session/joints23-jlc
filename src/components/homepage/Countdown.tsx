import { useState, useRef, useEffect } from "react";

export default function Countdown() {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const interval = useRef<NodeJS.Timeout | number>();

  const startTimer = () => {
    const date = new Date("April 16, 2023 13:00:00").getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const countdown = date - now;
      const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((countdown % (100 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

      if (countdown < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#223344] px-10 pt-12 font-extrabold text-white lg:py-32">
        <p className="relative z-10 text-center text-xl sm:px-[24vw] md:px-[28vw] lg:px-[14vw] lg:text-5xl xl:px-[20vw] 2xl:px-[30vw]">
          Penyisihan JLC 2023 akan dimulai dalam
        </p>
        <div className="relative mx-auto mt-5 mb-32 grid max-w-xs grid-cols-4 place-items-center gap-x-3 lg:static lg:mt-10 lg:mb-0 lg:max-w-2xl lg:gap-x-12">
          <div className="relative z-10 lg:w-full">
            <div className="relative lg:w-full">
              <img
                src="/homepage/countdown/num_bg.svg"
                alt=""
                className="lg:w-full"
              />
              <p className="absolute top-1/2 left-1/2 m-auto -translate-y-1/2 -translate-x-1/2 p-2 text-center text-2xl lg:text-5xl">
                {timerDays}
              </p>
            </div>
            <p className="mt-2 text-center text-[.9rem] lg:text-4xl">Hari</p>
          </div>
          <div className="relative z-10 lg:w-full">
            <div className="relative lg:w-full">
              <img
                src="/homepage/countdown/num_bg.svg"
                alt=""
                className="lg:w-full"
              />
              <p className="absolute top-1/2 left-1/2 m-auto -translate-y-1/2 -translate-x-1/2 p-2 text-center text-2xl lg:text-5xl">
                {timerHours}
              </p>
            </div>
            <p className="mt-2 text-center text-[.9rem] lg:text-4xl">Jam</p>
          </div>
          <div className="relative z-10 lg:w-full">
            <div className="relative lg:w-full">
              <img
                src="/homepage/countdown/num_bg.svg"
                alt=""
                className="lg:w-full"
              />
              <p className="absolute top-1/2 left-1/2 m-auto -translate-y-1/2 -translate-x-1/2 p-2 text-center text-2xl lg:text-5xl">
                {timerMinutes}
              </p>
            </div>
            <p className="mt-2 text-center text-[.9rem] lg:text-4xl">Menit</p>
          </div>
          <div className="relative z-10 lg:w-full">
            <div className="relative lg:w-full">
              <img
                src="/homepage/countdown/num_bg.svg"
                alt=""
                className="lg:w-full"
              />
              <p className="absolute top-1/2 left-1/2 m-auto -translate-y-1/2 -translate-x-1/2 p-2 text-center text-2xl lg:text-5xl">
                {timerSeconds}
              </p>
            </div>
            <p className="mt-2 text-center text-[.9rem] lg:text-4xl">Detik</p>
          </div>
          <img
            src="/homepage/countdown/robot_small.svg"
            alt="robot"
            className="absolute -bottom-[calc(128px)] -left-[8%] z-10 rotate-[35deg] lg:bottom-auto lg:top-6 lg:left-6 lg:rotate-[135deg] lg:scale-[2] 2xl:top-16 2xl:left-16 2xl:scale-[3]"
          />
          <img
            src="/homepage/countdown/robot_large.svg"
            alt="robot"
            className="absolute -bottom-[calc(128px+25%)] right-0 z-10 rotate-[-25deg] lg:bottom-5 lg:right-8 lg:scale-[2] 2xl:bottom-16 2xl:right-20 2xl:scale-[3]"
          />
        </div>
        <img
          src="/homepage/countdown/bg.png"
          alt=""
          className="absolute bottom-0 left-0 w-full"
        />
      </section>
    </>
  );
}
