import Link from "next/link";
import { api } from "~/utils/api";
import {
  IoCloseOutline,
  IoLogOutOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";
import PreExamDropdown from "./preExamDropdown";

export default function PreExamNavbar() {
  const router = useRouter();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const logout = api.user.logout.useMutation({
    onSuccess: () => {
      void router.push("/auth/login");
    },
  });

  const handleLogout = () => {
    logout.mutate();
  };

  const openNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="relative mb-[8vh] flex w-full flex-col">
      <div
        className={`${
          isNavbarOpen ? "shadow-lg" : "shadow-none"
        } absolute top-0 z-50 flex w-full justify-center bg-[#E6EAED] transition duration-500`}
      >
        <div className="flex h-[8vh] w-[85%] items-center justify-between lg:h-16 lg:w-[85%]">
          <Link href="/">
            <div className="flex items-center space-x-4">
              <svg
                className="w-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#223144" />
                <path
                  d="M13.074 17.2561H13.6304L15.2031 19.2401L14.7031 19.6664L13.074 17.2561Z"
                  fill="#B72C2C"
                />
                <path
                  d="M13.6304 17.2561L14.8967 17.3206L16.3402 19.5061L15.2031 19.2401L13.6304 17.2561Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M14.703 19.6664L15.8886 19.8609L16.3402 19.506L15.203 19.24L14.703 19.6664Z"
                  fill="#D84545"
                />
                <path
                  d="M12.2943 17.1996L13.0739 17.256H13.6303L14.8966 17.3205L15.4987 17.3448L16.3402 16.2748L13.8643 15.85L13.3858 15.4629L12.2943 17.1996Z"
                  fill="#CC3737"
                />
                <path
                  d="M12.2944 17.1996L10.9717 15.5973L11.8643 14.6941L13.3859 15.4629L12.2944 17.1996Z"
                  fill="#E65251"
                />
                <path
                  d="M16.3403 16.2748L14.3174 15.1134L11.8644 14.6941L13.3859 15.4629L13.8644 15.8501L16.3403 16.2748Z"
                  fill="#D84545"
                />
                <path
                  d="M16.3402 16.275L17.2891 16.5007L17.3753 13.1564L16.3402 12.7048L14.3173 15.1136L16.3402 16.275Z"
                  fill="#E76A72"
                />
                <path
                  d="M17.2891 16.5005C17.2891 16.5005 19.0634 15.167 19.1817 15.0702C19.3001 14.9735 19.8485 14.1778 19.8485 14.1778L17.3753 13.1562L17.2893 16.5005H17.2891Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M17.2891 16.5006L19.0313 15.6618L19.1817 15.0706L17.2891 16.5006Z"
                  fill="#D84545"
                />
                <path
                  d="M6.55762 13.0867L7.50922 15.0706L7.12207 15.7855L8.54157 16.4039L8.65441 14.3286L6.55762 13.0867Z"
                  fill="#E76A72"
                />
                <path
                  d="M7.1221 15.7855L6.55765 15.463L6.38013 14.7452L6.55765 13.0867L7.50926 15.0706L7.1221 15.7855Z"
                  fill="#E65251"
                />
                <path
                  d="M7.71619 16.0444L7.99302 16.9417C7.99302 16.9417 9.54142 17.5224 9.52536 17.474C9.50931 17.4256 9.20266 16.2749 9.20266 16.2749L8.54142 16.4041L7.71619 16.0447V16.0444Z"
                  fill="#CC3737"
                />
                <path
                  d="M8.54163 16.4039L9.20287 16.275L10.3804 15.947L10.9717 14.2156L8.65447 14.3286L8.54163 16.4039Z"
                  fill="#E65251"
                />
                <path
                  d="M10.3804 15.9469L10.9719 15.5974L11.8643 14.6942L13.3859 13.3286L15.8464 12.4091C15.8464 12.4091 14.4774 12.2639 14.429 12.2639C14.3806 12.2639 10.9719 14.2155 10.9719 14.2155L10.3804 15.9467V15.9469Z"
                  fill="#CC3737"
                />
                <path
                  d="M9.20288 16.2749L10.3804 15.947L10.9717 15.5974L12.0192 16.8662L9.52536 17.4738L9.20288 16.2749Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M6.38009 14.7451L4.58972 13.8983L7.7161 10.0811L8.24569 11.3391L7.12734 12.5434L6.55762 13.0866L6.38009 14.7451Z"
                  fill="#CC3737"
                />
                <path
                  d="M7.7161 10.0811L5.48491 10.4251L4.9122 11.9815L4.58972 13.8983L7.7161 10.0811Z"
                  fill="#E65251"
                />
                <path
                  d="M6.55762 13.0866L8.54157 11.5112L9.2028 11.2639H9.82643L8.97689 12.1027L8.65441 14.3286L6.55762 13.0866Z"
                  fill="#EF848F"
                />
                <path
                  d="M6.55762 13.0866L8.54157 11.5111L9.2028 11.2639H9.82643L10.6652 10.4895L12.0191 9.54321H11.5576L10.0737 10.6723L8.24569 11.3391L6.55762 13.0866Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M9.82644 11.2639L10.6652 10.4895L12.0191 9.54321L11.7299 10.6187L10.9716 12.0811L8.65442 14.3285L8.9769 12.1026L9.82644 11.2639Z"
                  fill="#E04C4C"
                />
                <path
                  d="M10.9716 12.0811L11.8159 11.8123L10.9716 14.2155L8.65442 14.3285L10.9716 12.0811Z"
                  fill="#E76A72"
                />
                <path
                  d="M11.8159 11.8123L15.2031 9.59717L14.4288 12.2639L10.9717 14.2155L11.8159 11.8123Z"
                  fill="#E04C4C"
                />
                <path
                  d="M15.8463 12.4092L16.3403 12.7048L14.3174 15.1135L11.8644 14.6943L13.3859 13.3287L15.8463 12.4092Z"
                  fill="#B72C2C"
                />
                <path
                  d="M19.8484 14.178L19.6764 11.9065L16.9773 11.2317L14.6496 11.5037L14.4287 12.264L15.8461 12.4092L16.3402 12.7049L17.3753 13.1565L19.8484 14.178Z"
                  fill="#CC3737"
                />
                <path
                  d="M19.6765 11.9062L20.1281 12.4684L19.8485 14.1778L19.6765 11.9062Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M20.1281 12.4686L19.4937 9.17773L18.913 9.29608L19.6765 11.9064L20.1281 12.4686Z"
                  fill="#E65251"
                />
                <path
                  d="M18.913 9.29614L16.9774 11.2317L19.6765 11.9065L18.913 9.29614Z"
                  fill="#E76A72"
                />
                <path
                  d="M18.913 9.296L16.4453 6.86572L19.4937 9.17765L18.913 9.296Z"
                  fill="#EF848F"
                />
                <path
                  d="M16.4453 6.86572L17.0527 9.296H18.913L16.4453 6.86572Z"
                  fill="#E76A72"
                />
                <path
                  d="M17.0526 9.29614L16.9774 11.2317L18.913 9.29614H17.0526Z"
                  fill="#EF848F"
                />
                <path
                  d="M17.0526 9.29614L15.2031 9.59729L14.6497 11.5037L16.9774 11.2317L17.0526 9.29614Z"
                  fill="#E65251"
                />
                <path
                  d="M4.58971 13.8983L3.99292 10.1992L5.20255 10.0811L5.48489 10.4251L4.91219 11.9815L4.58971 13.8983Z"
                  fill="#E76A72"
                />
                <path
                  d="M5.20255 10.081L6.84774 7.4248L3.99292 10.1991L5.20255 10.081Z"
                  fill="#EF848F"
                />
                <path
                  d="M5.20264 10.081L6.84782 7.4248L7.71617 7.8927L9.57375 8.08077L8.0414 8.45715L7.71617 10.081L5.48498 10.425L5.20264 10.081Z"
                  fill="#ED5A5A"
                />
                <path
                  d="M8.04142 8.45715L9.57376 8.08077L13.3859 6.9248L11.5577 9.54316L7.71619 10.081L8.04142 8.45715Z"
                  fill="#E76A72"
                />
                <path
                  d="M7.71619 10.0811L11.5577 9.54321L10.0738 10.6723L8.24577 11.3391L7.71619 10.0811Z"
                  fill="#E65251"
                />
                <path
                  d="M6.84778 7.42492L12.2943 5.89258L7.71613 7.89281L6.84778 7.42492Z"
                  fill="#EF8E9C"
                />
                <path
                  d="M12.2944 5.89258L13.3859 6.92492L9.57376 8.08088L7.71619 7.89281L12.2944 5.89258Z"
                  fill="#EF848F"
                />
                <path
                  d="M12.5448 6.12939C12.5703 6.15348 14.5742 6.29591 14.5742 6.29591L16.4455 6.86586L13.3861 6.92504L12.545 6.12962L12.5448 6.12939Z"
                  fill="#E76A72"
                />
                <path
                  d="M12.0191 9.54316L13.8319 9.17756L15.203 9.59706L13.3858 6.9248L11.5576 9.54316H12.0191Z"
                  fill="#CC3737"
                />
                <path
                  d="M16.4453 6.86572L17.0526 9.296L15.2031 9.59715L13.3859 6.9249L16.4453 6.86572Z"
                  fill="#D64949"
                />
                <path
                  d="M10.9717 12.0812L11.8159 11.8124L15.2031 9.59723L13.832 9.17773L11.7299 10.6188L10.9717 12.0812Z"
                  fill="#EF848F"
                />
                <path
                  d="M12.0191 9.54333L13.8319 9.17773L11.7299 10.6188L12.0191 9.54333Z"
                  fill="#ED5A5A"
                />
              </svg>
              <b className="text-xl lg:hidden">JLC 2023</b>
              <b className="hidden text-xl lg:block">
                Joints Logic Competition
              </b>
            </div>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => {
              openNavbar();
            }}
          >
            {isNavbarOpen ? (
              <IoCloseOutline className="h-7 w-7" />
            ) : (
              <IoMenuOutline className="h-7 w-7" />
            )}
          </button>
          <div className="hidden items-center space-x-8 lg:flex">
            <PreExamDropdown />
            <p>|</p>
            <p className="font-medium">Nama Tim</p>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="flex items-center space-x-2 rounded-lg bg-[#E65251] py-2 px-4 font-semibold text-white transition duration-200 hover:bg-[#C94545]"
            >
              <IoLogOutOutline />
              <p className="text-sm">Log out</p>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute z-40 flex w-full flex-col  items-start space-y-6 bg-[#F4F4F4] px-8 py-8 ${
          isNavbarOpen ? "translate-y-[8vh]" : "-translate-y-[100%]"
        } shadow-2xl transition duration-[700ms] lg:hidden`}
      >
        <p className="self-center">Nama Tim</p>
        <Link href="/warm-up" className="font-bold text-primary-dark">
          Warm Up
        </Link>
        <Link href="/penyisihan" className="font-bold text-primary-dark">
          Penyisihan
        </Link>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="font-bold text-[#E65251]"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
