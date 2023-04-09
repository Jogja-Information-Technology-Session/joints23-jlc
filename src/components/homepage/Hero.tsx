import Image from "next/image";
import { CrystalLeft, CrystalRight } from "./assets/Crystals";

export default function Hero() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 lg:px-20 2xl:px-40">
      <Image
        src="/homepage/background.png"
        alt="bg"
        fill
        className="-z-10 object-cover"
        quality={100}
      />

      <div className="relative z-10 mb-8 h-7 w-full max-w-lg rounded-b-xl bg-[#223144] lg:mb-12 lg:h-16 lg:max-w-6xl 2xl:h-20">
        <div className="absolute -bottom-1 left-0 my-1 h-80 w-1/4 overflow-hidden rounded-bl-xl lg:w-[30%]">
          <img
            src="/homepage/hero/crystal_header.svg"
            alt="jlc"
            className="absolute -bottom-1 -left-3 w-full lg:-bottom-5 lg:-left-5"
          />
        </div>
        <div className="absolute -bottom-1 right-0 my-1 h-80 w-1/4 overflow-hidden rounded-br-xl lg:w-[30%]">
          <img
            src="/homepage/hero/crystal_header.svg"
            alt="jlc"
            className="absolute -bottom-1 -right-3 w-full scale-x-flip lg:-bottom-5 lg:-right-5"
          />
        </div>

        <div className="absolute bottom-1 left-0 right-0 z-10 mx-auto block aspect-square h-auto w-1/4 rounded-full border-2 border-[#E6EAED] bg-[#223144]  sm:h-24 sm:w-24 lg:bottom-4 lg:h-44 lg:w-44 lg:border-4">
          <Image
            src="/homepage/jlc_logo.svg"
            alt="jlc"
            fill
            className="p-3 lg:p-6"
          />
        </div>
      </div>

      {/* bg crystal 2 biji yang di atas */}
      <img
        src="/homepage/hero/crystal_bg.svg"
        alt=""
        className="absolute top-0 -left-[14%] w-1/2 scale-x-flip sm:-top-[6%] md:-top-[20%] md:left-[1%] md:w-[44%] 2xl:left-[10%] 2xl:w-[36%]"
      />
      <img
        src="/homepage/hero/crystal_bg.svg"
        alt=""
        className="absolute top-0 -right-[14%] w-1/2 sm:-top-[6%] md:-top-[20%] md:right-[1%] md:w-[44%] 2xl:right-[10%] 2xl:w-[36%]"
      />

      <div className="z-10 flex max-w-lg flex-col items-center rounded-xl bg-white px-4 py-5 text-[#223144] shadow-lg sm:p-6 lg:max-w-6xl lg:px-8 lg:py-10 2xl:px-12">
        <h1 className="mb-2 text-xl font-extrabold lg:mb-10 lg:text-5xl lg:font-extrabold">
          Joints Logic Competition
        </h1>
        <p className="text-justify text-sm font-medium lg:px-10 lg:text-base">
          JOINTS Logic Competition merupakan kompetisi yang memperlombakan
          kemampuan logika berpikir dan pemikiran matematis untuk menyelesaikan
          soal permasalahan logika dan aritmatika. Untuk kompetisi ini, target
          peserta yang dituju adalah siswa SMA dan SLTA atau sederajat. Untuk
          pelaksanaannya dilakukan secara beregu/tim dengan anggota 1-2 siswa
          yang berasal dari instansi yang sama. Perlombaan akan dilaksanakan
          secara hybrid dalam 3 babak yaitu Penyisihan, Final Tahap I, dan Final
          Tahap II.
        </p>
      </div>

      <img
        src="/homepage/hero/crystal_footer.svg"
        alt=""
        className="absolute bottom-0 left-0 z-[1] w-[48%] md:w-[36%]"
      />
      <img
        src="/homepage/hero/crystal_footer.svg"
        alt=""
        className="absolute bottom-0 right-0 z-[1] w-[48%] scale-x-flip md:w-[36%]"
      />
      <img
        src="/homepage/hero/crystal_footer_line.svg"
        alt=""
        className="absolute bottom-0 left-0 w-1/2 md:hidden"
      />
      <img
        src="/homepage/hero/crystal_footer_line.svg"
        alt=""
        className="absolute bottom-0 right-0 w-1/2 scale-x-flip md:hidden"
      />
      <img
        src="/homepage/hero/crystal_footer_line_lg.svg"
        alt=""
        className="absolute bottom-0 right-1/2 hidden w-full translate-x-1/2 md:inline-block"
      />

      {/* <svg
        viewBox="0 0 177 111"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" absolute bottom-0 right-0 w-1/2 lg:w-1/3"
      >
        <path
          d="M204.678 97.904L173.322 78.1238L162.389 112.809L204.678 97.904Z"
          fill="#B72C2C"
        />
        <path
          d="M204.077 97.8245L162.509 112.72L190.381 141.551L204.077 97.8245Z"
          fill="#AA1B1B"
        />
        <path
          d="M173.322 78.1238L152.418 101.669L162.509 112.72L173.322 78.1238Z"
          fill="#EF848F"
        />
        <path
          d="M173.322 78.1236L163.23 71.3965L152.418 101.669L173.322 78.1236Z"
          fill="#D64949"
        />
        <path
          d="M163.23 71.3965L142.807 93.9804L152.418 101.669L163.23 71.3965Z"
          fill="#AA1B1B"
        />
        <path
          d="M163.23 71.3965L138.001 85.091L142.807 93.9805L163.23 71.3965Z"
          fill="#EF848F"
        />
        <path
          d="M203.356 70.916L173.322 78.1237L204.077 97.8246L203.356 70.916Z"
          fill="#AA1B1B"
        />
        <path
          d="M203.356 70.9161L183.214 68.6721L173.322 78.1238L203.356 70.9161Z"
          fill="#D64949"
        />
        <path
          d="M142.807 93.9805L123.104 92.6182L138.001 85.0911L142.807 93.9805Z"
          fill="#D64949"
        />
        <path
          d="M141.526 111.197L162.509 112.72L152.418 101.669L141.526 111.197Z"
          fill="#D64949"
        />
        <path
          d="M152.418 101.669L142.807 93.9805L141.521 111.204L152.418 101.669Z"
          fill="#CC3737"
        />
        <path
          d="M142.807 93.9807L130.553 110.318L123.104 92.6184L142.807 93.9807Z"
          fill="#AA1B1B"
        />
        <path
          d="M142.807 93.9805L141.526 111.197L130.553 110.318L142.807 93.9805Z"
          fill="#AA1B1B"
        />
        <path
          d="M123.104 92.6184L130.553 110.318L97.474 116.483L123.104 92.6184Z"
          fill="#CC3737"
        />
        <path
          d="M130.553 110.318L135.118 137.467L97.474 116.483L130.553 110.318Z"
          fill="#CC3737"
        />
        <path
          d="M123.104 92.6184L98.2765 95.3405L97.474 116.483L123.104 92.6184Z"
          fill="#EF848F"
        />
        <path
          d="M123.104 92.6183L101.239 90.1365L98.2765 95.3404L123.104 92.6183Z"
          fill="#EF848F"
        />
        <path
          d="M177.767 44.9685L163.23 71.3966L183.173 68.7537L177.767 44.9685Z"
          fill="#EF848F"
        />
        <path
          d="M183.173 68.7537L163.23 71.3965L173.322 78.1236L183.173 68.7537Z"
          fill="#CC3737"
        />
        <path
          d="M163.23 71.3966L177.767 44.9685L154.34 50.7346L163.23 71.3966Z"
          fill="#B72C2C"
        />
        <path
          d="M154.34 50.7346L138.001 85.0911L163.23 71.3965L154.34 50.7346Z"
          fill="#EF848F"
        />
        <path
          d="M138.001 85.0911L109.649 78.6042L123.104 92.6183L138.001 85.0911Z"
          fill="#E04C4C"
        />
        <path
          d="M109.649 78.6042L101.239 90.1365L123.104 92.6183L109.649 78.6042Z"
          fill="#CC3737"
        />
        <path
          d="M154.34 50.7344L147.132 24.3064L177.767 44.9683L154.34 50.7344Z"
          fill="#EF848F"
        />
        <path
          d="M188.699 15.417L147.132 24.3064L177.767 44.9683L188.699 15.417Z"
          fill="#EF848F"
        />
        <path
          d="M188.699 15.4171L173.778 1.98682L147.132 24.3065L188.699 15.4171Z"
          fill="#AA1B1B"
        />
        <path
          d="M141.605 122.571L130.553 110.318L141.526 111.197L141.605 122.571Z"
          fill="#EF848F"
        />
        <path
          d="M154.34 50.7346L109.649 78.6042L138.001 85.0911L154.34 50.7346Z"
          fill="#CC3737"
        />
        <path
          d="M203.596 5.08611L188.699 15.4171L173.778 1.98682L203.596 5.08611Z"
          fill="#CC3737"
        />
        <path
          d="M141.605 122.571L135.118 137.467L130.553 110.318L141.605 122.571Z"
          fill="#AA1B1B"
        />
        <path
          d="M98.2766 95.3403L71.6853 107.134L97.4741 116.483L98.2766 95.3403Z"
          fill="#CC3737"
        />
        <path
          d="M65.9187 69.3928L98.2766 95.3404L71.6853 107.134L65.9187 69.3928Z"
          fill="#E04C4C"
        />
        <path
          d="M101.239 90.1364L65.9187 69.3928L98.2765 95.3404L101.239 90.1364Z"
          fill="#CC3737"
        />
        <path
          d="M71.6853 107.134L58.7104 100.787L65.9187 69.3928L71.6853 107.134Z"
          fill="#EF848F"
        />
        <path
          d="M65.9187 69.3928L34.8439 100.948L58.7104 100.787L65.9187 69.3928Z"
          fill="#CC3737"
        />
        <path
          d="M58.7104 100.787L33.2413 119.448L34.8439 100.948L58.7104 100.787Z"
          fill="#EF848F"
        />
        <path
          d="M71.6853 107.135L83.3794 125.132L97.474 116.483L71.6853 107.135Z"
          fill="#AA1B1B"
        />
        <path
          d="M63.516 129.137L83.3795 125.132L71.6853 107.135L63.516 129.137Z"
          fill="#EF848F"
        />
        <path
          d="M71.6853 107.135L69.5829 113.081L63.5159 129.137L58.7104 100.787L71.6853 107.135Z"
          fill="#CC3737"
        />
        <path
          d="M33.2412 119.448L63.5159 129.137L58.7104 100.787L33.2412 119.448Z"
          fill="#AA1B1B"
        />
        <path
          d="M34.8439 100.948L0.0832481 105.753L33.2412 119.448L34.8439 100.948Z"
          fill="#CC3737"
        />
        <path
          d="M33.2413 119.447L37.0857 133.781L20.747 139.547L0.0833015 105.753L33.2413 119.447Z"
          fill="#E04C4C"
        />
        <path
          d="M100.759 86.7728L106.045 77.6431L86.5824 76.6821L100.759 86.7728Z"
          fill="#E04C4C"
        />
        <path
          d="M34.6637 90.9965L46.1969 61.0872L22.7725 77.6623L34.6637 90.9965Z"
          fill="#E04C4C"
        />
        <path
          d="M22.4288 53.6177L22.6691 59.8643L30.3579 56.2605L22.4288 53.6177Z"
          fill="#CC3737"
        />
        <path
          d="M150.015 48.731L142.783 23.2495L128.729 29.734L150.015 48.731Z"
          fill="#E04C4C"
        />
        <path
          d="M55.5869 65.6306L50.7814 77.6434L61.6947 68.295L55.5869 65.6306Z"
          fill="#CC3737"
        />
        <path
          d="M26.2733 52.4165L15.4609 48.0919L21.2275 44.2478L26.2733 52.4165Z"
          fill="#CC3737"
        />
        <path d="M163.23 0L143.528 16.7386L134.878 0H163.23Z" fill="#CC3737" />
        <path
          d="M103.38 72.0765L93.6513 69.1958L97.9954 63.927L103.38 72.0765Z"
          fill="#CC3737"
        />
        <path
          d="M134.493 38.383L126.566 30.4546L115.754 34.4188L134.493 38.383Z"
          fill="#CC3737"
        />
        <path
          d="M149.535 50.4944L113.493 55.4581L117.979 65.2292L149.535 50.4944Z"
          fill="#CC3737"
        />
      </svg>
      <svg
        viewBox="0 0 178 111"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-1/2 lg:w-1/3"
      >
        <path
          d="M-27.1467 97.904L4.20919 78.1238L15.1417 112.809L-27.1467 97.904Z"
          fill="#B72C2C"
        />
        <path
          d="M-26.546 97.8245L15.0216 112.72L-12.8503 141.551L-26.546 97.8245Z"
          fill="#AA1B1B"
        />
        <path
          d="M4.20923 78.1238L25.1132 101.669L15.0216 112.72L4.20923 78.1238Z"
          fill="#EF848F"
        />
        <path
          d="M4.20923 78.1236L14.3008 71.3965L25.1132 101.669L4.20923 78.1236Z"
          fill="#D64949"
        />
        <path
          d="M14.3008 71.3965L34.7242 93.9804L25.1132 101.669L14.3008 71.3965Z"
          fill="#AA1B1B"
        />
        <path
          d="M14.3008 71.3965L39.5297 85.091L34.7242 93.9805L14.3008 71.3965Z"
          fill="#EF848F"
        />
        <path
          d="M-25.8252 70.916L4.20921 78.1237L-26.546 97.8246L-25.8252 70.916Z"
          fill="#AA1B1B"
        />
        <path
          d="M-25.8252 70.9161L-5.68292 68.6721L4.20921 78.1238L-25.8252 70.9161Z"
          fill="#D64949"
        />
        <path
          d="M34.7241 93.9805L54.4267 92.6182L39.5296 85.0911L34.7241 93.9805Z"
          fill="#D64949"
        />
        <path
          d="M36.0048 111.197L15.0216 112.72L25.1132 101.669L36.0048 111.197Z"
          fill="#D64949"
        />
        <path
          d="M25.1132 101.669L34.7242 93.9805L36.0096 111.204L25.1132 101.669Z"
          fill="#CC3737"
        />
        <path
          d="M34.7241 93.9807L46.9782 110.318L54.4267 92.6184L34.7241 93.9807Z"
          fill="#AA1B1B"
        />
        <path
          d="M34.7241 93.9805L36.0048 111.197L46.9782 110.318L34.7241 93.9805Z"
          fill="#AA1B1B"
        />
        <path
          d="M54.4268 92.6184L46.9783 110.318L80.057 116.483L54.4268 92.6184Z"
          fill="#CC3737"
        />
        <path
          d="M46.9782 110.318L42.413 137.467L80.0569 116.483L46.9782 110.318Z"
          fill="#CC3737"
        />
        <path
          d="M54.4268 92.6184L79.2544 95.3405L80.0569 116.483L54.4268 92.6184Z"
          fill="#EF848F"
        />
        <path
          d="M54.4268 92.6183L76.2918 90.1365L79.2544 95.3404L54.4268 92.6183Z"
          fill="#EF848F"
        />
        <path
          d="M-0.235896 44.9685L14.3008 71.3966L-5.64209 68.7537L-0.235896 44.9685Z"
          fill="#EF848F"
        />
        <path
          d="M-5.64209 68.7537L14.3008 71.3965L4.2092 78.1236L-5.64209 68.7537Z"
          fill="#CC3737"
        />
        <path
          d="M14.3008 71.3966L-0.23584 44.9685L23.191 50.7346L14.3008 71.3966Z"
          fill="#B72C2C"
        />
        <path
          d="M23.191 50.7346L39.5297 85.0911L14.3008 71.3965L23.191 50.7346Z"
          fill="#EF848F"
        />
        <path
          d="M39.5297 85.0911L67.8821 78.6042L54.4267 92.6183L39.5297 85.0911Z"
          fill="#E04C4C"
        />
        <path
          d="M67.8822 78.6042L76.2918 90.1365L54.4268 92.6183L67.8822 78.6042Z"
          fill="#CC3737"
        />
        <path
          d="M23.191 50.7344L30.3993 24.3064L-0.23584 44.9683L23.191 50.7344Z"
          fill="#EF848F"
        />
        <path
          d="M-11.1683 15.417L30.3993 24.3064L-0.235809 44.9683L-11.1683 15.417Z"
          fill="#EF848F"
        />
        <path
          d="M-11.1683 15.4171L3.75276 1.98682L30.3993 24.3065L-11.1683 15.4171Z"
          fill="#AA1B1B"
        />
        <path
          d="M35.9255 122.571L46.9782 110.318L36.0048 111.197L35.9255 122.571Z"
          fill="#EF848F"
        />
        <path
          d="M23.1909 50.7346L67.8821 78.6042L39.5296 85.0911L23.1909 50.7346Z"
          fill="#CC3737"
        />
        <path
          d="M-26.0654 5.08611L-11.1684 15.4171L3.75273 1.98682L-26.0654 5.08611Z"
          fill="#CC3737"
        />
        <path
          d="M35.9255 122.571L42.413 137.467L46.9782 110.318L35.9255 122.571Z"
          fill="#AA1B1B"
        />
        <path
          d="M79.2544 95.3403L105.846 107.134L80.0569 116.483L79.2544 95.3403Z"
          fill="#CC3737"
        />
        <path
          d="M111.612 69.3928L79.2544 95.3404L105.846 107.134L111.612 69.3928Z"
          fill="#E04C4C"
        />
        <path
          d="M76.2919 90.1364L111.612 69.3928L79.2545 95.3404L76.2919 90.1364Z"
          fill="#CC3737"
        />
        <path
          d="M105.846 107.134L118.821 100.787L111.612 69.3928L105.846 107.134Z"
          fill="#EF848F"
        />
        <path
          d="M111.612 69.3928L142.687 100.948L118.821 100.787L111.612 69.3928Z"
          fill="#CC3737"
        />
        <path
          d="M118.82 100.787L144.29 119.448L142.687 100.948L118.82 100.787Z"
          fill="#EF848F"
        />
        <path
          d="M105.846 107.135L94.1516 125.132L80.057 116.483L105.846 107.135Z"
          fill="#AA1B1B"
        />
        <path
          d="M114.015 129.137L94.1515 125.132L105.846 107.135L114.015 129.137Z"
          fill="#EF848F"
        />
        <path
          d="M105.846 107.135L107.948 113.081L114.015 129.137L118.821 100.787L105.846 107.135Z"
          fill="#CC3737"
        />
        <path
          d="M144.29 119.448L114.015 129.137L118.821 100.787L144.29 119.448Z"
          fill="#AA1B1B"
        />
        <path
          d="M142.687 100.948L177.448 105.753L144.29 119.448L142.687 100.948Z"
          fill="#CC3737"
        />
        <path
          d="M144.29 119.447L140.445 133.781L156.784 139.547L177.448 105.753L144.29 119.447Z"
          fill="#E04C4C"
        />
        <path
          d="M76.7723 86.7728L71.4862 77.6431L90.9485 76.6821L76.7723 86.7728Z"
          fill="#E04C4C"
        />
        <path
          d="M142.867 90.9965L131.334 61.0872L154.759 77.6623L142.867 90.9965Z"
          fill="#E04C4C"
        />
        <path
          d="M155.102 53.6177L154.862 59.8643L147.173 56.2605L155.102 53.6177Z"
          fill="#CC3737"
        />
        <path
          d="M27.5159 48.731L34.7482 23.2495L48.8019 29.734L27.5159 48.731Z"
          fill="#E04C4C"
        />
        <path
          d="M121.944 65.6306L126.75 77.6434L115.836 68.295L121.944 65.6306Z"
          fill="#CC3737"
        />
        <path
          d="M151.258 52.4165L162.07 48.0919L156.303 44.2478L151.258 52.4165Z"
          fill="#CC3737"
        />
        <path
          d="M14.3008 0L34.0034 16.7386L42.6533 0H14.3008Z"
          fill="#CC3737"
        />
        <path
          d="M74.151 72.0765L83.8797 69.1958L79.5356 63.927L74.151 72.0765Z"
          fill="#CC3737"
        />
        <path
          d="M43.0377 38.383L50.9644 30.4546L61.7768 34.4188L43.0377 38.383Z"
          fill="#CC3737"
        />
        <path
          d="M27.9965 50.4944L64.0378 55.4581L59.5518 65.2292L27.9965 50.4944Z"
          fill="#CC3737"
        />
      </svg>
      <svg
        className=" absolute right-0 bottom-0 -z-10 w-1/2"
        viewBox="0 0 180 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_257_1194"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="272"
          height="298"
        >
          <rect width="272" height="298" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_257_1194)">
          <path
            d="M215.815 70.6958L175.969 59.3369L198.248 91.6007L215.815 70.6958Z"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M221.551 28.6277L132.946 47.5763L189.745 0L221.551 28.6277Z"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M149.244 102.867C149.101 102.723 148.918 102.625 148.719 102.585C148.52 102.545 148.314 102.565 148.127 102.643C147.939 102.72 147.779 102.851 147.666 103.02C147.553 103.188 147.493 103.387 147.493 103.589C147.493 103.792 147.553 103.991 147.666 104.159C147.779 104.328 147.939 104.459 148.127 104.536C148.314 104.614 148.52 104.634 148.719 104.594C148.918 104.554 149.101 104.455 149.244 104.312C149.434 104.12 149.542 103.86 149.542 103.589C149.542 103.319 149.434 103.059 149.244 102.867V102.867Z"
            fill="#E65251"
          />
          <path
            d="M132.947 48.5773C132.384 48.5773 131.928 48.121 131.928 47.5582C131.928 46.9953 132.384 46.5391 132.947 46.5391C133.51 46.5391 133.966 46.9953 133.966 47.5582C133.966 48.121 133.51 48.5773 132.947 48.5773Z"
            fill="#E65251"
          />
          <path
            d="M70.6008 116.167C70.0379 116.167 69.5816 115.711 69.5816 115.148C69.5816 114.585 70.0379 114.129 70.6008 114.129C71.1637 114.129 71.62 114.585 71.62 115.148C71.62 115.711 71.1637 116.167 70.6008 116.167Z"
            fill="#E65251"
          />
          <path
            d="M67.0461 147.074C66.4832 147.074 66.0269 146.618 66.0269 146.055C66.0269 145.492 66.4832 145.036 67.0461 145.036C67.609 145.036 68.0653 145.492 68.0653 146.055C68.0653 146.618 67.609 147.074 67.0461 147.074Z"
            fill="#E65251"
          />
          <path
            d="M144.829 211.591C144.686 211.447 144.503 211.349 144.304 211.309C144.106 211.269 143.899 211.289 143.712 211.366C143.524 211.444 143.364 211.575 143.251 211.744C143.138 211.912 143.078 212.11 143.078 212.313C143.078 212.516 143.138 212.714 143.251 212.883C143.364 213.052 143.524 213.183 143.712 213.26C143.899 213.338 144.106 213.357 144.304 213.317C144.503 213.277 144.686 213.179 144.829 213.035C145.02 212.843 145.127 212.584 145.127 212.313C145.127 212.043 145.02 211.783 144.829 211.591Z"
            fill="#E65251"
          />
          <path
            d="M29.5757 198.128C29.4327 197.984 29.2501 197.886 29.0513 197.846C28.8524 197.806 28.6461 197.826 28.4586 197.903C28.2711 197.98 28.1107 198.112 27.9979 198.28C27.8851 198.449 27.8249 198.647 27.8249 198.85C27.8249 199.053 27.8851 199.251 27.9979 199.42C28.1107 199.588 28.2711 199.719 28.4586 199.797C28.6461 199.874 28.8524 199.894 29.0513 199.854C29.2501 199.814 29.4327 199.716 29.5757 199.572C29.7665 199.38 29.8735 199.121 29.8735 198.85C29.8735 198.579 29.7665 198.32 29.5757 198.128V198.128Z"
            fill="#E65251"
          />
          <path
            d="M81.7296 194.19C81.1667 194.19 80.7104 193.733 80.7104 193.17C80.7104 192.608 81.1667 192.151 81.7296 192.151C82.2925 192.151 82.7488 192.608 82.7488 193.17C82.7488 193.733 82.2925 194.19 81.7296 194.19Z"
            fill="#E65251"
          />
          <path
            d="M167.559 148.999C166.77 148.999 166.13 148.36 166.13 147.571C166.13 146.782 166.77 146.142 167.559 146.142C168.348 146.142 168.988 146.782 168.988 147.571C168.988 148.36 168.348 148.999 167.559 148.999Z"
            fill="#E65251"
          />
          <path
            d="M123.896 197.78C123.107 197.78 122.467 197.14 122.467 196.351C122.467 195.562 123.107 194.922 123.896 194.922C124.686 194.922 125.325 195.562 125.325 196.351C125.325 197.14 124.686 197.78 123.896 197.78Z"
            fill="#E65251"
          />
          <path
            d="M78.3282 134.143C78.1852 133.999 78.0027 133.901 77.8038 133.861C77.605 133.821 77.3987 133.841 77.2112 133.918C77.0237 133.996 76.8633 134.127 76.7505 134.295C76.6377 134.464 76.5774 134.662 76.5774 134.865C76.5774 135.068 76.6377 135.266 76.7505 135.435C76.8633 135.603 77.0237 135.735 77.2112 135.812C77.3987 135.889 77.605 135.909 77.8038 135.869C78.0027 135.829 78.1852 135.731 78.3282 135.587C78.519 135.395 78.6261 135.136 78.6261 134.865C78.6261 134.594 78.519 134.335 78.3282 134.143V134.143Z"
            fill="#E65251"
          />
          <path
            d="M53.658 157.578C53.3044 157.578 53.0178 157.291 53.0178 156.938C53.0178 156.584 53.3044 156.297 53.658 156.297C54.0116 156.297 54.2982 156.584 54.2982 156.938C54.2982 157.291 54.0116 157.578 53.658 157.578Z"
            fill="#E65251"
          />
          <path
            d="M50.4313 128.018C50.0777 128.018 49.7911 127.731 49.7911 127.378C49.7911 127.024 50.0777 126.738 50.4313 126.738C50.7849 126.738 51.0715 127.024 51.0715 127.378C51.0715 127.731 50.7849 128.018 50.4313 128.018Z"
            fill="#E65251"
          />
          <path
            d="M53.1608 163.877C52.8072 163.877 52.5206 163.59 52.5206 163.237C52.5206 162.883 52.8072 162.596 53.1608 162.596C53.5144 162.596 53.801 162.883 53.801 163.237C53.801 163.59 53.5144 163.877 53.1608 163.877Z"
            fill="#E65251"
          />
          <path
            d="M113.429 177.704C113.075 177.704 112.788 177.418 112.788 177.064C112.788 176.71 113.075 176.424 113.429 176.424C113.782 176.424 114.069 176.71 114.069 177.064C114.069 177.418 113.782 177.704 113.429 177.704Z"
            fill="#E65251"
          />
          <path
            d="M20.214 213.67C19.8605 213.67 19.5738 213.384 19.5738 213.03C19.5738 212.677 19.8605 212.39 20.214 212.39C20.5676 212.39 20.8542 212.677 20.8542 213.03C20.8542 213.384 20.5676 213.67 20.214 213.67Z"
            fill="#E65251"
          />
          <path
            d="M175.969 60.3559C175.407 60.3559 174.95 59.8996 174.95 59.3368C174.95 58.7739 175.407 58.3176 175.969 58.3176C176.532 58.3176 176.989 58.7739 176.989 59.3368C176.989 59.8996 176.532 60.3559 175.969 60.3559Z"
            fill="#E65251"
          />
          <path
            d="M50.4873 127.45L67.0457 146.055L53.5603 157.153L70.4619 114.647L77.6322 135.132L113.484 177.126L167.262 147.935L198.248 91.601L132.946 47.5583"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M167.262 147.934L188.773 162.274L144.214 212.462L167.262 147.934Z"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M188.773 162.274L209.772 142.301L167.262 147.935L148.312 103.892L132.947 47.5583"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M144.214 212.462L123.727 196.074L120.997 232.773L144.214 212.462Z"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M247.329 131.372L239.221 92.4968L205.418 123.352L167.262 147.934L123.727 196.074L81.7297 193.17L27.0968 244.04"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M221.541 28.5938L198.248 91.6004L148.311 103.891"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M205.418 123.352L148.311 103.892"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M144.215 212.462L165.726 236.02L226.033 298.371"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-0.897898 125.227L-11.9966 139.74L-25.4819 144.006L-40.1658 143.663L28.8078 198.973L27.0972 244.04L97.6073 230.898L123.728 196.074L113.484 177.125L148.312 103.892L77.6328 135.131"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.8073 198.973L81.7295 193.17L97.6067 230.898L120.997 232.773"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0506 153.439C10.697 153.439 10.4104 153.153 10.4104 152.799C10.4104 152.446 10.697 152.159 11.0506 152.159C11.4042 152.159 11.6908 152.446 11.6908 152.799C11.6908 153.153 11.4042 153.439 11.0506 153.439Z"
            fill="#E65251"
          />
          <path
            d="M35.066 188.576C34.7124 188.576 34.4258 188.29 34.4258 187.936C34.4258 187.583 34.7124 187.296 35.066 187.296C35.4195 187.296 35.7062 187.583 35.7062 187.936C35.7062 188.29 35.4195 188.576 35.066 188.576Z"
            fill="#E65251"
          />
          <path
            d="M35.1226 187.88L81.7299 193.17L20.2697 212.974L35.1226 187.88Z"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-17.1177 122.84L11.0515 152.8L28.8083 198.973L-27.8733 224.113L-66.2858 183.271L-40.1653 143.663L-106.404 210.926"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M81.7301 193.17L53.0487 163.298L113.484 177.125"
            stroke="#E65251"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <svg
        className="absolute left-0 bottom-0 -z-10 w-1/2"
        viewBox="0 0 180 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-35.8152 70.6958L4.03146 59.3369L-18.2478 91.6007L-35.8152 70.6958Z"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-41.5509 28.6277L47.0541 47.5763L-9.74529 0L-41.5509 28.6277Z"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30.7564 102.867C30.8994 102.723 31.0819 102.625 31.2807 102.585C31.4796 102.545 31.6859 102.565 31.8734 102.643C32.0609 102.72 32.2213 102.851 32.3341 103.02C32.4469 103.188 32.5072 103.387 32.5072 103.589C32.5072 103.792 32.4469 103.991 32.3341 104.159C32.2213 104.328 32.0609 104.459 31.8734 104.536C31.6859 104.614 31.4796 104.634 31.2807 104.594C31.0819 104.554 30.8994 104.455 30.7564 104.312C30.5656 104.12 30.4585 103.86 30.4585 103.589C30.4585 103.319 30.5656 103.059 30.7564 102.867V102.867Z"
          fill="#E65251"
        />
        <path
          d="M47.0529 48.5773C47.6158 48.5773 48.0721 48.121 48.0721 47.5582C48.0721 46.9953 47.6158 46.5391 47.0529 46.5391C46.49 46.5391 46.0337 46.9953 46.0337 47.5582C46.0337 48.121 46.49 48.5773 47.0529 48.5773Z"
          fill="#E65251"
        />
        <path
          d="M109.399 116.167C109.962 116.167 110.418 115.711 110.418 115.148C110.418 114.585 109.962 114.129 109.399 114.129C108.836 114.129 108.38 114.585 108.38 115.148C108.38 115.711 108.836 116.167 109.399 116.167Z"
          fill="#E65251"
        />
        <path
          d="M112.954 147.074C113.517 147.074 113.973 146.618 113.973 146.055C113.973 145.492 113.517 145.036 112.954 145.036C112.391 145.036 111.935 145.492 111.935 146.055C111.935 146.618 112.391 147.074 112.954 147.074Z"
          fill="#E65251"
        />
        <path
          d="M35.1712 211.591C35.3142 211.447 35.4967 211.349 35.6955 211.309C35.8944 211.269 36.1007 211.289 36.2882 211.366C36.4757 211.444 36.6361 211.575 36.7489 211.744C36.8617 211.912 36.922 212.11 36.922 212.313C36.922 212.516 36.8617 212.714 36.7489 212.883C36.6361 213.052 36.4757 213.183 36.2882 213.26C36.1007 213.338 35.8944 213.357 35.6955 213.317C35.4967 213.277 35.3142 213.179 35.1712 213.035C34.9804 212.843 34.8733 212.584 34.8733 212.313C34.8733 212.043 34.9804 211.783 35.1712 211.591Z"
          fill="#E65251"
        />
        <path
          d="M150.424 198.128C150.567 197.984 150.75 197.886 150.949 197.846C151.148 197.806 151.354 197.826 151.541 197.903C151.729 197.98 151.889 198.112 152.002 198.28C152.115 198.449 152.175 198.647 152.175 198.85C152.175 199.053 152.115 199.251 152.002 199.42C151.889 199.588 151.729 199.719 151.541 199.797C151.354 199.874 151.148 199.894 150.949 199.854C150.75 199.814 150.567 199.716 150.424 199.572C150.234 199.38 150.126 199.121 150.126 198.85C150.126 198.579 150.234 198.32 150.424 198.128V198.128Z"
          fill="#E65251"
        />
        <path
          d="M98.2704 194.19C98.8333 194.19 99.2896 193.733 99.2896 193.17C99.2896 192.608 98.8333 192.151 98.2704 192.151C97.7075 192.151 97.2512 192.608 97.2512 193.17C97.2512 193.733 97.7075 194.19 98.2704 194.19Z"
          fill="#E65251"
        />
        <path
          d="M12.4408 148.999C13.23 148.999 13.8697 148.36 13.8697 147.571C13.8697 146.782 13.23 146.142 12.4408 146.142C11.6516 146.142 11.0118 146.782 11.0118 147.571C11.0118 148.36 11.6516 148.999 12.4408 148.999Z"
          fill="#E65251"
        />
        <path
          d="M56.1036 197.78C56.8928 197.78 57.5326 197.14 57.5326 196.351C57.5326 195.562 56.8928 194.922 56.1036 194.922C55.3144 194.922 54.6747 195.562 54.6747 196.351C54.6747 197.14 55.3144 197.78 56.1036 197.78Z"
          fill="#E65251"
        />
        <path
          d="M101.672 134.143C101.815 133.999 101.997 133.901 102.196 133.861C102.395 133.821 102.601 133.841 102.789 133.918C102.976 133.996 103.137 134.127 103.25 134.295C103.362 134.464 103.423 134.662 103.423 134.865C103.423 135.068 103.362 135.266 103.25 135.435C103.137 135.603 102.976 135.735 102.789 135.812C102.601 135.889 102.395 135.909 102.196 135.869C101.997 135.829 101.815 135.731 101.672 135.587C101.481 135.395 101.374 135.136 101.374 134.865C101.374 134.594 101.481 134.335 101.672 134.143V134.143Z"
          fill="#E65251"
        />
        <path
          d="M126.342 157.578C126.696 157.578 126.982 157.291 126.982 156.938C126.982 156.584 126.696 156.297 126.342 156.297C125.988 156.297 125.702 156.584 125.702 156.938C125.702 157.291 125.988 157.578 126.342 157.578Z"
          fill="#E65251"
        />
        <path
          d="M129.569 128.018C129.922 128.018 130.209 127.731 130.209 127.378C130.209 127.024 129.922 126.738 129.569 126.738C129.215 126.738 128.928 127.024 128.928 127.378C128.928 127.731 129.215 128.018 129.569 128.018Z"
          fill="#E65251"
        />
        <path
          d="M126.839 163.877C127.193 163.877 127.479 163.59 127.479 163.237C127.479 162.883 127.193 162.596 126.839 162.596C126.486 162.596 126.199 162.883 126.199 163.237C126.199 163.59 126.486 163.877 126.839 163.877Z"
          fill="#E65251"
        />
        <path
          d="M66.5715 177.704C66.9251 177.704 67.2117 177.418 67.2117 177.064C67.2117 176.71 66.9251 176.424 66.5715 176.424C66.2179 176.424 65.9313 176.71 65.9313 177.064C65.9313 177.418 66.2179 177.704 66.5715 177.704Z"
          fill="#E65251"
        />
        <path
          d="M159.786 213.67C160.14 213.67 160.426 213.384 160.426 213.03C160.426 212.677 160.14 212.39 159.786 212.39C159.432 212.39 159.146 212.677 159.146 213.03C159.146 213.384 159.432 213.67 159.786 213.67Z"
          fill="#E65251"
        />
        <path
          d="M4.03057 60.3559C4.59347 60.3559 5.04979 59.8996 5.04979 59.3368C5.04979 58.7739 4.59347 58.3176 4.03057 58.3176C3.46767 58.3176 3.01135 58.7739 3.01135 59.3368C3.01135 59.8996 3.46767 60.3559 4.03057 60.3559Z"
          fill="#E65251"
        />
        <path
          d="M129.513 127.45L112.954 146.055L126.44 157.153L109.538 114.647L102.368 135.132L66.5161 177.126L12.7385 147.935L-18.2477 91.601L47.0537 47.5583"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.7385 147.934L-8.77258 162.274L35.786 212.462L12.7385 147.934Z"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-8.77298 162.274L-29.7719 142.301L12.7381 147.935L31.6883 103.892L47.0533 47.5583"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35.7864 212.462L56.2731 196.074L59.0029 232.773L35.7864 212.462Z"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-67.3289 131.372L-59.2212 92.4968L-25.4182 123.352L12.7383 147.934L56.2726 196.074L98.2703 193.17L152.903 244.04"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-41.5411 28.5938L-18.2478 91.6004L31.6886 103.891"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-25.4181 123.352L31.6886 103.892"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35.7855 212.462L14.2744 236.02L-46.0333 298.371"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M180.898 125.227L191.997 139.74L205.482 144.006L220.166 143.663L151.192 198.973L152.903 244.04L82.3927 230.898L56.2722 196.074L66.5155 177.125L31.6881 103.892L102.367 135.131"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M151.193 198.973L98.2705 193.17L82.3933 230.898L59.0026 232.773"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M168.949 153.439C169.303 153.439 169.59 153.153 169.59 152.799C169.59 152.446 169.303 152.159 168.949 152.159C168.596 152.159 168.309 152.446 168.309 152.799C168.309 153.153 168.596 153.439 168.949 153.439Z"
          fill="#E65251"
        />
        <path
          d="M144.934 188.576C145.288 188.576 145.574 188.29 145.574 187.936C145.574 187.583 145.288 187.296 144.934 187.296C144.58 187.296 144.294 187.583 144.294 187.936C144.294 188.29 144.58 188.576 144.934 188.576Z"
          fill="#E65251"
        />
        <path
          d="M144.877 187.88L98.2701 193.17L159.73 212.974L144.877 187.88Z"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M197.118 122.84L168.949 152.8L151.192 198.973L207.873 224.113L246.286 183.271L220.165 143.663L286.404 210.926"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M98.2699 193.17L126.951 163.298L66.5155 177.125"
          stroke="#E65251"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
    </main>
  );
}
