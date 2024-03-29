import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import {
  IoTime,
  IoChevronBack,
  IoChevronForward,
  IoClose,
} from "react-icons/io5";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Countdown from "react-countdown";
import type { CountdownRendererFn } from "react-countdown";

import { TeamContext } from "~/utils/context/teamContext";
import type { TeamContextType } from "~/utils/context/teamContext";
import useExam from "~/hooks/useExam";
import Link from "next/link";
import { useRouter } from "next/router";
import { api, setToken } from "~/utils/api";

export default function Quiz() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { setTeam, team } = useContext(TeamContext) as TeamContextType;

  const router = useRouter();
  const examType = "PENYISIHAN";

  useEffect(() => {
    if (!router.query.index) {
      setIndex(0);
      return;
    }
    setIndex(parseInt(router.query.index as string) - 1);
  }, [router.query]);

  const {
    questionQuery,
    questionStatusQuery,
    answer,
    flag,
    examStatus,
    clearAnswer,
  } = useExam(index);

  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (payload) => {
      if (!payload) {
        void router.push("/auth/login");
      } else {
        const { accessToken, username } = payload;
        setTeam(username);
        setToken(accessToken);
      }
    },
    onError: () => {
      void router.push("/auth/login");
    },
  });

  //refresh token upon page load (only once)
  useEffect(() => {
    refreshToken.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionChange = (optionId: string | undefined) => {
    if (!questionQuery.data || !optionId) return;
    answer.mutate({
      examType: examType,
      index: index,
      optionId: optionId,
      examQuestionId: questionQuery.data.id,
    });
  };

  const handleFlagQuestion = () => {
    if (!questionQuery.data) return;
    flag.mutate({
      examType: examType,
      index: index,
      examQuestionId: questionQuery.data.id,
    });
  };

  const handleClearAnswer = () => {
    if (!questionQuery.data) return;
    clearAnswer.mutate({
      examType: examType,
      index: index,
      examQuestionId: questionQuery.data.id,
    });
  };

  useEffect(() => {
    if (questionQuery.data) setRemainingTime(questionQuery.data.timeRemaining);
  }, [questionQuery.data]);

  // Define a renderer function to format the countdown
  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => (
    <span>
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );

  if (questionQuery.error || questionStatusQuery.error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <h2>
          {questionQuery.error?.message || questionStatusQuery.error?.message}
        </h2>
      </div>
    );
  }

  if (examStatus?.isLoading) {
    return <div></div>;
  }

  // if (examStatus?.error) {
  //   return <div>{examStatus?.error.message}</div>;
  // }

  // if (
  //   examStatus.data?.status === "GRADED" ||
  //   examStatus.data?.status === "SUBMITTED"
  // ) {
  //   setTimeout(() => {
  //     void router.push("/");
  //   }, 5000);
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center">
  //       <h1 className="text-2xl font-bold">Jawaban anda telah tersubmit</h1>
  //     </div>
  //   );
  // }

  // if (!examStatus.data?.isActive) {
  //   setTimeout(() => {
  //     void router.push("/");
  //   }, 5000);

  //   if (Date.now() > new Date(examStatus.data?.endsAt).getTime()) {
  //     return (
  //       <div className="flex h-screen flex-col items-center justify-center">
  //         <h1 className="text-2xl font-bold">
  //           Ujian telah selesai, jawaban anda sudah disimpan
  //         </h1>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="flex h-screen flex-col items-center justify-center">
  //         <h1 className="text-2xl font-bold">Ujian belum dimulai</h1>
  //       </div>
  //     );
  //   }
  // }

  return (
    <>
      <Head>
        <title>Penyisihan ({index + 1}) / Joints Logic Competition</title>
        <meta name="description" content="Joints Logic Competition Website" />
      </Head>
      <div className="relative h-screen overflow-clip">
        {/* Nav Desktop */}
        <nav className="z-50 hidden h-[8vh] w-full items-center justify-between bg-[#E6EAED] px-14 shadow-md lg:flex">
          <Link href="/" className="flex items-center space-x-4">
            <svg
              className="w-7"
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
            <b className="text-lg">Joints Logic Competition</b>
          </Link>
          <div className="flex items-center space-x-4">
            <TeamContext.Consumer>
              {(value) => (
                <p className="font-medium text-primary-dark">{value?.team}</p>
              )}
            </TeamContext.Consumer>
            <p>|</p>
            <div className="flex space-x-3">
              <IoTime size={24} className="fill-primary-dark" />
              <p className="font-medium">
                <Countdown
                  key={Date.now() + remainingTime}
                  date={Date.now() + remainingTime}
                  autoStart
                  renderer={renderer}
                />
              </p>
            </div>
          </div>
        </nav>

        {/* Nav Mobile */}
        <nav className="flex h-[7vh] w-full items-center justify-between bg-[#E6EAED] px-5 shadow-md lg:hidden">
          <svg
            width="28"
            height="28"
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
              d="M14.7031 19.6664L15.8887 19.8609L16.3403 19.506L15.2031 19.24L14.7031 19.6664Z"
              fill="#D84545"
            />
            <path
              d="M12.2944 17.1996L13.074 17.256H13.6304L14.8967 17.3205L15.4988 17.3448L16.3403 16.2748L13.8644 15.85L13.3859 15.4629L12.2944 17.1996Z"
              fill="#CC3737"
            />
            <path
              d="M12.2944 17.1996L10.9717 15.5973L11.8643 14.6941L13.3859 15.4629L12.2944 17.1996Z"
              fill="#E65251"
            />
            <path
              d="M16.3402 16.2748L14.3172 15.1134L11.8643 14.6941L13.3858 15.4629L13.8643 15.8501L16.3402 16.2748Z"
              fill="#D84545"
            />
            <path
              d="M16.3403 16.275L17.2892 16.5007L17.3754 13.1564L16.3403 12.7048L14.3174 15.1136L16.3403 16.275Z"
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
              d="M7.71606 16.0444L7.9929 16.9417C7.9929 16.9417 9.5413 17.5224 9.52524 17.474C9.50919 17.4256 9.20253 16.2749 9.20253 16.2749L8.5413 16.4041L7.71606 16.0447V16.0444Z"
              fill="#CC3737"
            />
            <path
              d="M8.5415 16.4039L9.20274 16.275L10.3803 15.947L10.9716 14.2156L8.65435 14.3286L8.5415 16.4039Z"
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
              d="M6.38021 14.7451L4.58984 13.8983L7.71622 10.0811L8.24581 11.3391L7.12746 12.5434L6.55774 13.0866L6.38021 14.7451Z"
              fill="#CC3737"
            />
            <path
              d="M7.71623 10.0811L5.48503 10.4251L4.91232 11.9815L4.58984 13.8983L7.71623 10.0811Z"
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
              d="M9.82632 11.2639L10.6651 10.4895L12.019 9.54321L11.7298 10.6187L10.9715 12.0811L8.6543 14.3285L8.97677 12.1026L9.82632 11.2639Z"
              fill="#E04C4C"
            />
            <path
              d="M10.9715 12.0811L11.8158 11.8123L10.9715 14.2155L8.6543 14.3285L10.9715 12.0811Z"
              fill="#E76A72"
            />
            <path
              d="M11.8159 11.8123L15.2031 9.59717L14.4288 12.2639L10.9717 14.2155L11.8159 11.8123Z"
              fill="#E04C4C"
            />
            <path
              d="M15.8461 12.4092L16.3402 12.7048L14.3172 15.1135L11.8643 14.6943L13.3858 13.3287L15.8461 12.4092Z"
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
              d="M20.128 12.4686L19.4936 9.17773L18.9128 9.29608L19.6764 11.9064L20.128 12.4686Z"
              fill="#E65251"
            />
            <path
              d="M18.9128 9.29614L16.9773 11.2317L19.6764 11.9065L18.9128 9.29614Z"
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
              d="M17.0525 9.29614L16.9773 11.2317L18.9128 9.29614H17.0525Z"
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
              d="M8.04129 8.45715L9.57364 8.08077L13.3858 6.9248L11.5576 9.54316L7.71606 10.081L8.04129 8.45715Z"
              fill="#E76A72"
            />
            <path
              d="M7.71606 10.0811L11.5576 9.54321L10.0736 10.6723L8.24565 11.3391L7.71606 10.0811Z"
              fill="#E65251"
            />
            <path
              d="M6.8479 7.42492L12.2945 5.89258L7.71625 7.89281L6.8479 7.42492Z"
              fill="#EF8E9C"
            />
            <path
              d="M12.2943 5.89258L13.3858 6.92492L9.57364 8.08088L7.71606 7.89281L12.2943 5.89258Z"
              fill="#EF848F"
            />
            <path
              d="M12.5447 6.12939C12.5701 6.15348 14.574 6.29591 14.574 6.29591L16.4454 6.86586L13.386 6.92504L12.5449 6.12962L12.5447 6.12939Z"
              fill="#E76A72"
            />
            <path
              d="M12.0191 9.54316L13.8319 9.17756L15.203 9.59706L13.3858 6.9248L11.5576 9.54316H12.0191Z"
              fill="#CC3737"
            />
            <path
              d="M16.4452 6.86572L17.0525 9.296L15.2029 9.59715L13.3857 6.9249L16.4452 6.86572Z"
              fill="#D64949"
            />
            <path
              d="M10.9717 12.0812L11.8159 11.8124L15.2031 9.59723L13.832 9.17773L11.7299 10.6188L10.9717 12.0812Z"
              fill="#EF848F"
            />
            <path
              d="M12.0192 9.54333L13.832 9.17773L11.73 10.6188L12.0192 9.54333Z"
              fill="#ED5A5A"
            />
          </svg>
          <div className="flex space-x-3">
            <IoTime size={24} className="fill-primary-dark" />
            <p className="font-medium">
              <Countdown
                key={Date.now() + remainingTime}
                date={Date.now() + remainingTime}
                renderer={renderer}
                autoStart
              />
            </p>
          </div>
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H7C7.26522 3 7.51957 3.10536 7.70711 3.29289C7.89464 3.48043 8 3.73478 8 4V7C8 7.26522 7.89464 7.51957 7.70711 7.70711C7.51957 7.89464 7.26522 8 7 8H4C3.73478 8 3.48043 7.89464 3.29289 7.70711C3.10536 7.51957 3 7.26522 3 7V4ZM3 10.5C3 10.2348 3.10536 9.98043 3.29289 9.79289C3.48043 9.60536 3.73478 9.5 4 9.5H7C7.26522 9.5 7.51957 9.60536 7.70711 9.79289C7.89464 9.98043 8 10.2348 8 10.5V13.5C8 13.7652 7.89464 14.0196 7.70711 14.2071C7.51957 14.3946 7.26522 14.5 7 14.5H4C3.73478 14.5 3.48043 14.3946 3.29289 14.2071C3.10536 14.0196 3 13.7652 3 13.5V10.5ZM3 17C3 16.7348 3.10536 16.4804 3.29289 16.2929C3.48043 16.1054 3.73478 16 4 16H7C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17V20C8 20.2652 7.89464 20.5196 7.70711 20.7071C7.51957 20.8946 7.26522 21 7 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V17ZM9.5 4C9.5 3.73478 9.60536 3.48043 9.79289 3.29289C9.98043 3.10536 10.2348 3 10.5 3H13.5C13.7652 3 14.0196 3.10536 14.2071 3.29289C14.3946 3.48043 14.5 3.73478 14.5 4V7C14.5 7.26522 14.3946 7.51957 14.2071 7.70711C14.0196 7.89464 13.7652 8 13.5 8H10.5C10.2348 8 9.98043 7.89464 9.79289 7.70711C9.60536 7.51957 9.5 7.26522 9.5 7V4ZM9.5 10.5C9.5 10.2348 9.60536 9.98043 9.79289 9.79289C9.98043 9.60536 10.2348 9.5 10.5 9.5H13.5C13.7652 9.5 14.0196 9.60536 14.2071 9.79289C14.3946 9.98043 14.5 10.2348 14.5 10.5V13.5C14.5 13.7652 14.3946 14.0196 14.2071 14.2071C14.0196 14.3946 13.7652 14.5 13.5 14.5H10.5C10.2348 14.5 9.98043 14.3946 9.79289 14.2071C9.60536 14.0196 9.5 13.7652 9.5 13.5V10.5ZM9.5 17C9.5 16.7348 9.60536 16.4804 9.79289 16.2929C9.98043 16.1054 10.2348 16 10.5 16H13.5C13.7652 16 14.0196 16.1054 14.2071 16.2929C14.3946 16.4804 14.5 16.7348 14.5 17V20C14.5 20.2652 14.3946 20.5196 14.2071 20.7071C14.0196 20.8946 13.7652 21 13.5 21H10.5C10.2348 21 9.98043 20.8946 9.79289 20.7071C9.60536 20.5196 9.5 20.2652 9.5 20V17ZM16 4C16 3.73478 16.1054 3.48043 16.2929 3.29289C16.4804 3.10536 16.7348 3 17 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V7C21 7.26522 20.8946 7.51957 20.7071 7.70711C20.5196 7.89464 20.2652 8 20 8H17C16.7348 8 16.4804 7.89464 16.2929 7.70711C16.1054 7.51957 16 7.26522 16 7V4ZM16 10.5C16 10.2348 16.1054 9.98043 16.2929 9.79289C16.4804 9.60536 16.7348 9.5 17 9.5H20C20.2652 9.5 20.5196 9.60536 20.7071 9.79289C20.8946 9.98043 21 10.2348 21 10.5V13.5C21 13.7652 20.8946 14.0196 20.7071 14.2071C20.5196 14.3946 20.2652 14.5 20 14.5H17C16.7348 14.5 16.4804 14.3946 16.2929 14.2071C16.1054 14.0196 16 13.7652 16 13.5V10.5ZM16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16H20C20.2652 16 20.5196 16.1054 20.7071 16.2929C20.8946 16.4804 21 16.7348 21 17V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H17C16.7348 21 16.4804 20.8946 16.2929 20.7071C16.1054 20.5196 16 20.2652 16 20V17Z"
                fill="#223144"
              />
            </svg>
          </button>
        </nav>

        {questionStatusQuery.data && (
          <>
            {/* Sidebar Mobile */}
            <nav
              className={`${
                isSidebarOpen ? "translate-x-0" : "translate-x-[90vw]"
              } absolute top-0 right-0 z-40 flex h-screen w-[90vw] transform bg-primary-dark transition duration-500 lg:hidden`}
            >
              <div className="absolute top-0 z-50 flex h-screen w-full flex-col p-5">
                <div className="flex w-full justify-between">
                  <TeamContext.Consumer>
                    {(value) => (
                      <p className="font-medium text-white">{value?.team}</p>
                    )}
                  </TeamContext.Consumer>
                  <button
                    className="h-5"
                    onClick={() => {
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                  >
                    <IoClose size={24} className="text-white" />
                  </button>
                </div>
                <h3 className="mt-8 text-center text-xl font-bold text-white">
                  Navigasi Soal
                </h3>
                <div className="mt-5 grid grid-cols-5 gap-3 px-5">
                  {
                    //generate 1-40 array and map it
                    questionStatusQuery.data?.examQuestionsStatus.map(
                      (item) => (
                        <button key={item.index}>
                          {item.index == 0 ? (
                            <div className="flex aspect-square rounded-md bg-white p-1.5">
                              <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#76A8E9]">
                                <p className="text-center font-semibold text-primary-dark">
                                  {item.index + 1}
                                </p>
                              </div>
                            </div>
                          ) : item.index == 1 ? (
                            <div className="relative flex aspect-square items-center justify-center rounded-md bg-white p-1.5">
                              <svg
                                width="20"
                                height="20"
                                className="absolute top-0 right-0"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M16 16L0 0H12C14.2091 0 16 1.79086 16 4V16Z"
                                  fill="#E04C4C"
                                />
                              </svg>
                              <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#76A8E9]">
                                <p className="text-center font-semibold text-primary-dark">
                                  {item.index + 1}
                                </p>
                              </div>
                            </div>
                          ) : item.index == 2 ? (
                            <div className="flex aspect-square rounded-md bg-white p-1">
                              <div className="flex h-full w-full items-center justify-center rounded-sm bg-primary-dark p-1">
                                <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#76A8E9]">
                                  <p className="text-center font-semibold text-primary-dark">
                                    {item.index + 1}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : item.index == 3 ? (
                            <div className="relative flex aspect-square rounded-md bg-white p-1">
                              <svg
                                width="20"
                                height="20"
                                className="absolute top-0 right-0"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M16 16L0 0H12C14.2091 0 16 1.79086 16 4V16Z"
                                  fill="#E04C4C"
                                />
                              </svg>
                              <div className="flex h-full w-full items-center justify-center rounded-sm bg-primary-dark">
                                <p className="text-center font-semibold text-white">
                                  {item.index + 1}
                                </p>
                              </div>
                            </div>
                          ) : item.index == 4 ? (
                            <div className="relative flex aspect-square items-center justify-center rounded-md bg-white p-1.5 font-semibold">
                              <svg
                                width="20"
                                height="20"
                                className="absolute top-0 right-0"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M16 16L0 0H12C14.2091 0 16 1.79086 16 4V16Z"
                                  fill="#E04C4C"
                                />
                              </svg>
                              {item.index + 1}
                            </div>
                          ) : (
                            <div className="flex aspect-square items-center justify-center rounded-md bg-white p-1.5 font-semibold">
                              {item.index + 1}
                            </div>
                          )}
                        </button>
                      )
                    )
                  }
                </div>
              </div>
              <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 300 288"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_287_2188"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="320"
                  height="288"
                >
                  <rect width="320" height="288" fill="#223144" />
                </mask>
                <g mask="url(#mask0_287_2188)">
                  <path
                    d="M-3.24463 224.046L56.6609 186.255L77.5475 252.522L-3.24463 224.046Z"
                    fill="#B72C2C"
                  />
                  <path
                    d="M-2.09717 223.894L77.3179 252.353L24.0685 307.434L-2.09717 223.894Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M56.6606 186.255L96.5977 231.238L77.3177 252.353L56.6606 186.255Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M56.6606 186.256L75.9406 173.403L96.5977 231.238L56.6606 186.256Z"
                    fill="#D64949"
                  />
                  <path
                    d="M75.9409 173.403L114.96 216.55L96.598 231.238L75.9409 173.403Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M75.9409 173.403L124.141 199.567L114.96 216.55L75.9409 173.403Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M-0.720029 172.485L56.6608 186.256L-2.09717 223.894L-0.720029 172.485Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M-0.720215 172.485L37.7616 168.198L56.6606 186.256L-0.720215 172.485Z"
                    fill="#D64949"
                  />
                  <path
                    d="M11.4444 123.716L37.8396 168.354L4.17773 158.559L11.4444 123.716Z"
                    fill="#D64949"
                  />
                  <path
                    d="M114.959 216.55L152.601 213.947L124.14 199.567L114.959 216.55Z"
                    fill="#D64949"
                  />
                  <path
                    d="M117.406 249.443L77.3179 252.353L96.5978 231.238L117.406 249.443Z"
                    fill="#D64949"
                  />
                  <path
                    d="M96.5977 231.238L114.96 216.55L117.415 249.456L96.5977 231.238Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M114.959 216.55L138.371 247.762L152.601 213.947L114.959 216.55Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M114.959 216.55L117.406 249.443L138.371 247.763L114.959 216.55Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M152.602 213.947L138.371 247.762L201.568 259.541L152.602 213.947Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M138.371 247.763L129.649 299.63L201.568 259.541L138.371 247.763Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M152.602 213.947L200.035 219.148L201.568 259.541L152.602 213.947Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M152.602 213.947L194.375 209.206L200.035 219.148L152.602 213.947Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M0.657227 105.47L37.84 168.354L48.1685 122.913L0.657227 105.47Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M48.1684 122.912L75.9407 173.403L37.8398 168.354L48.1684 122.912Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M37.8398 168.354L75.9407 173.403L56.6607 186.256L37.8398 168.354Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M75.9408 173.403L48.1685 122.912L92.9255 133.929L75.9408 173.403Z"
                    fill="#B72C2C"
                  />
                  <path
                    d="M92.9256 133.929L124.141 199.567L75.9409 173.403L92.9256 133.929Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M124.141 199.567L178.308 187.173L152.602 213.947L124.141 199.567Z"
                    fill="#E04C4C"
                  />
                  <path
                    d="M178.308 187.173L194.375 209.206L152.602 213.947L178.308 187.173Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M92.9255 133.929L106.697 83.438L48.1685 122.913L92.9255 133.929Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M0.657227 105.47L27.2819 66.4545L48.1685 122.912L0.657227 105.47Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M103.483 291.368L117.255 271.172L129.649 299.63L103.483 291.368Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M201.568 259.541L129.649 299.63L201.568 307.277L200.343 260.156L201.568 307.277"
                    fill="#EF848F"
                  />
                  <path
                    d="M201.568 307.277L228.496 276.065L266.445 283.717L201.568 307.277Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M77.3179 252.353L117.255 271.172L89.7121 314.319L77.3179 252.353Z"
                    fill="#D64949"
                  />
                  <path
                    d="M77.3179 252.353L117.406 249.443L117.255 271.172L77.3179 252.353Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M0.656986 105.47L27.2817 66.4546L-1.1792 46.7173L0.656986 105.47Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M27.2817 66.4545L106.697 83.4377L48.1684 122.912L27.2817 66.4545Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M27.2817 66.4543L55.7885 40.7958L106.697 83.4376L27.2817 66.4543Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M77.5473 252.238L90.9744 314.318L24.0684 307.433L77.5473 252.238Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M117.255 271.172L138.371 247.763L117.406 249.443L117.255 271.172Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M92.9253 133.929L178.308 187.174L124.14 199.567L92.9253 133.929Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M-1.1792 46.717L27.2817 66.4543L55.7885 40.7958L-1.1792 46.717Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M117.255 271.172L129.649 299.63L138.371 247.763L117.255 271.172Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M200.035 219.148L250.837 241.681L201.568 259.541L200.035 219.148Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M261.854 169.575L200.035 219.148L250.837 241.681L261.854 169.575Z"
                    fill="#E04C4C"
                  />
                  <path
                    d="M194.375 209.206L261.854 169.575L200.035 219.148L194.375 209.206Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M250.837 241.681L275.626 229.554L261.855 169.575L250.837 241.681Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M261.854 169.575L321.223 229.861L275.626 229.554L261.854 169.575Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M275.626 229.554L324.285 265.205L321.223 229.861L275.626 229.554Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M250.837 241.681L228.496 276.065L201.568 259.541L250.837 241.681Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M266.445 283.717L228.496 276.065L250.837 241.681L266.445 283.717Z"
                    fill="#EF848F"
                  />
                  <path
                    d="M201.568 307.277V259.541L228.496 276.065L201.568 307.277Z"
                    fill="#D64949"
                  />
                  <path
                    d="M250.837 241.681L254.854 253.041L266.445 283.717L275.626 229.554L250.837 241.681Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M324.285 265.205L266.445 283.717L275.626 229.554L324.285 265.205Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M266.445 283.716L312.96 307.585L324.285 265.205L266.445 283.716Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M0.349364 157.182L37.8397 168.354L-0.720215 172.485L0.349364 157.182Z"
                    fill="#D64949"
                  />
                  <path
                    d="M24.0685 307.433L-20 305.749L-1.78963 219.763L24.0685 308.503"
                    fill="#B72C2C"
                  />
                  <path
                    d="M0.657058 105.47L11.4446 123.716L4.32943 158.256L-8.21631 154.506L0.657058 105.47Z"
                    fill="#AA1B1B"
                  />
                  <path
                    d="M201.568 307.277L312.96 307.585L266.445 283.717L201.568 307.277Z"
                    fill="#B72C2C"
                  />
                  <path
                    d="M195.293 202.78L185.194 185.337L222.377 183.501L195.293 202.78Z"
                    fill="#E04C4C"
                  />
                  <path
                    d="M321.567 210.849L299.533 153.707L344.286 185.374L321.567 210.849Z"
                    fill="#E04C4C"
                  />
                  <path
                    d="M101.188 130.1L115.005 81.4181L141.855 93.8067L101.188 130.1Z"
                    fill="#E04C4C"
                  />
                  <path
                    d="M281.593 162.387L290.774 185.337L269.924 167.477L281.593 162.387Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M75.9409 37L113.583 68.9791L130.108 37H75.9409Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M190.285 174.702L208.871 169.199L200.572 159.133L190.285 174.702Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M130.843 110.331L145.987 95.1838L166.644 102.757L130.843 110.331Z"
                    fill="#CC3737"
                  />
                  <path
                    d="M102.106 133.47L170.963 142.953L162.393 161.621L102.106 133.47Z"
                    fill="#CC3737"
                  />
                  <rect
                    width="320"
                    height="288"
                    fill="url(#paint0_linear_287_2188)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_287_2188"
                    x1="160"
                    y1="58.4025"
                    x2="160"
                    y2="275.071"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#223144" />
                    <stop offset="1" stop-color="#223144" stop-opacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </nav>
          </>
        )}
        {/* Content Mobile */}

        <div className="flex h-[86vh] w-full flex-col items-center space-y-4 overflow-y-scroll bg-[#F4F4F4] px-5 py-6 lg:hidden">
          <h3 className="text-lg font-semibold">
            Nomor {questionQuery.data && questionQuery.data.index + 1}
          </h3>
          <div className="flex h-auto w-full flex-col items-center justify-start space-y-4 rounded-xl bg-white p-6 shadow-2xl">
            {questionQuery.isLoading ? (
              <div role="status" className="max-w-sm animate-pulse">
                <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 " />
                <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 " />
                <div className="mb-2.5 h-2 rounded-full bg-gray-200 " />
                <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 " />
                <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 " />
                <div className="h-2 max-w-[360px] rounded-full bg-gray-200 " />
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              questionQuery.data && (
                <>
                  {questionQuery.data.image && (
                    // <Image
                    //   src={questionQuery.data.image}
                    //   alt="sample"
                    //   height={400}
                    //   width={300}
                    // />
                    <img
                      src={questionQuery.data.image}
                      alt="question image"
                      height={400}
                      width={300}
                    />
                  )}
                  <p className="pt-1 text-start text-sm">
                    <Latex>{questionQuery.data.question}</Latex>
                  </p>
                  <div className="flex w-full flex-col space-y-4">
                    {questionQuery.data.options.map((option, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            handleOptionChange(option?.id);
                          }}
                          className="flex aspect-square h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary-dark bg-none text-xs"
                        >
                          <div
                            className={
                              option?.id == questionQuery.data.answer
                                ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-white"
                                : ""
                            }
                          >
                            {index == 0
                              ? "A"
                              : index == 1
                              ? "B"
                              : index == 2
                              ? "C"
                              : index == 3
                              ? "D"
                              : "E"}
                          </div>
                        </button>
                        <p className="pt-1 text-start text-sm">
                          <Latex>{option?.prompt}</Latex>
                        </p>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleClearAnswer}
                      className="mr-2 mb-2 w-fit rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-primary-dark hover:border-primary-dark hover:bg-gray-100 focus:z-10  focus:outline-none"
                    >
                      Clear Answer
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>

        {/* Content Desktop */}
        <div className="flex w-full overflow-y-scroll">
          {/* Sidebar Desktop */}
          <nav
            className={`z-40 hidden h-screen w-[360px] transform bg-primary-dark transition duration-500 lg:flex`}
          >
            <div className="absolute top-0 z-50 flex h-screen w-full flex-col p-5">
              <h3 className="mt-8 text-center text-xl font-bold text-white">
                Navigasi Soal
              </h3>
              <div className="mt-5 grid grid-cols-5 gap-3 px-5">
                {questionStatusQuery?.data?.examQuestionsStatus.map((item) => (
                  <Link
                    href={`/competition/quiz?index=${item.index + 1}`}
                    key={item.index}
                  >
                    <div className="relative flex aspect-square rounded-md bg-white p-1.5">
                      {item.isFlagged && (
                        <svg
                          width="20"
                          height="20"
                          className="absolute top-0 right-0"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 16L0 0H12C14.2091 0 16 1.79086 16 4V16Z"
                            fill="#E04C4C"
                          />
                        </svg>
                      )}
                      {item.index == index ? (
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-primary-dark p-1">
                          {item.isAnswered ? (
                            <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#76A8E9]">
                              <p className="text-center font-semibold text-primary-dark">
                                {item.index + 1}
                              </p>
                            </div>
                          ) : (
                            <p className="text-center font-semibold text-white">
                              {item.index + 1}
                            </p>
                          )}
                        </div>
                      ) : item.isAnswered ? (
                        <div className="flex h-full w-full items-center justify-center rounded-sm bg-[#76A8E9]">
                          <p className="text-center font-semibold text-primary-dark">
                            {item.index + 1}
                          </p>
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-sm">
                          <p className="text-center font-semibold text-primary-dark">
                            {item.index + 1}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <svg
              className="absolute bottom-0 w-full opacity-10"
              viewBox="0 0 300 288"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_287_2188"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="320"
                height="288"
              >
                <rect width="320" height="288" fill="#223144" />
              </mask>
              <g mask="url(#mask0_287_2188)">
                <path
                  d="M-3.24463 224.046L56.6609 186.255L77.5475 252.522L-3.24463 224.046Z"
                  fill="#B72C2C"
                />
                <path
                  d="M-2.09717 223.894L77.3179 252.353L24.0685 307.434L-2.09717 223.894Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M56.6606 186.255L96.5977 231.238L77.3177 252.353L56.6606 186.255Z"
                  fill="#EF848F"
                />
                <path
                  d="M56.6606 186.256L75.9406 173.403L96.5977 231.238L56.6606 186.256Z"
                  fill="#D64949"
                />
                <path
                  d="M75.9409 173.403L114.96 216.55L96.598 231.238L75.9409 173.403Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M75.9409 173.403L124.141 199.567L114.96 216.55L75.9409 173.403Z"
                  fill="#EF848F"
                />
                <path
                  d="M-0.720029 172.485L56.6608 186.256L-2.09717 223.894L-0.720029 172.485Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M-0.720215 172.485L37.7616 168.198L56.6606 186.256L-0.720215 172.485Z"
                  fill="#D64949"
                />
                <path
                  d="M11.4444 123.716L37.8396 168.354L4.17773 158.559L11.4444 123.716Z"
                  fill="#D64949"
                />
                <path
                  d="M114.959 216.55L152.601 213.947L124.14 199.567L114.959 216.55Z"
                  fill="#D64949"
                />
                <path
                  d="M117.406 249.443L77.3179 252.353L96.5978 231.238L117.406 249.443Z"
                  fill="#D64949"
                />
                <path
                  d="M96.5977 231.238L114.96 216.55L117.415 249.456L96.5977 231.238Z"
                  fill="#CC3737"
                />
                <path
                  d="M114.959 216.55L138.371 247.762L152.601 213.947L114.959 216.55Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M114.959 216.55L117.406 249.443L138.371 247.763L114.959 216.55Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M152.602 213.947L138.371 247.762L201.568 259.541L152.602 213.947Z"
                  fill="#CC3737"
                />
                <path
                  d="M138.371 247.763L129.649 299.63L201.568 259.541L138.371 247.763Z"
                  fill="#CC3737"
                />
                <path
                  d="M152.602 213.947L200.035 219.148L201.568 259.541L152.602 213.947Z"
                  fill="#EF848F"
                />
                <path
                  d="M152.602 213.947L194.375 209.206L200.035 219.148L152.602 213.947Z"
                  fill="#EF848F"
                />
                <path
                  d="M0.657227 105.47L37.84 168.354L48.1685 122.913L0.657227 105.47Z"
                  fill="#CC3737"
                />
                <path
                  d="M48.1684 122.912L75.9407 173.403L37.8398 168.354L48.1684 122.912Z"
                  fill="#EF848F"
                />
                <path
                  d="M37.8398 168.354L75.9407 173.403L56.6607 186.256L37.8398 168.354Z"
                  fill="#CC3737"
                />
                <path
                  d="M75.9408 173.403L48.1685 122.912L92.9255 133.929L75.9408 173.403Z"
                  fill="#B72C2C"
                />
                <path
                  d="M92.9256 133.929L124.141 199.567L75.9409 173.403L92.9256 133.929Z"
                  fill="#EF848F"
                />
                <path
                  d="M124.141 199.567L178.308 187.173L152.602 213.947L124.141 199.567Z"
                  fill="#E04C4C"
                />
                <path
                  d="M178.308 187.173L194.375 209.206L152.602 213.947L178.308 187.173Z"
                  fill="#CC3737"
                />
                <path
                  d="M92.9255 133.929L106.697 83.438L48.1685 122.913L92.9255 133.929Z"
                  fill="#EF848F"
                />
                <path
                  d="M0.657227 105.47L27.2819 66.4545L48.1685 122.912L0.657227 105.47Z"
                  fill="#EF848F"
                />
                <path
                  d="M103.483 291.368L117.255 271.172L129.649 299.63L103.483 291.368Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M201.568 259.541L129.649 299.63L201.568 307.277L200.343 260.156L201.568 307.277"
                  fill="#EF848F"
                />
                <path
                  d="M201.568 307.277L228.496 276.065L266.445 283.717L201.568 307.277Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M77.3179 252.353L117.255 271.172L89.7121 314.319L77.3179 252.353Z"
                  fill="#D64949"
                />
                <path
                  d="M77.3179 252.353L117.406 249.443L117.255 271.172L77.3179 252.353Z"
                  fill="#EF848F"
                />
                <path
                  d="M0.656986 105.47L27.2817 66.4546L-1.1792 46.7173L0.656986 105.47Z"
                  fill="#EF848F"
                />
                <path
                  d="M27.2817 66.4545L106.697 83.4377L48.1684 122.912L27.2817 66.4545Z"
                  fill="#EF848F"
                />
                <path
                  d="M27.2817 66.4543L55.7885 40.7958L106.697 83.4376L27.2817 66.4543Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M77.5473 252.238L90.9744 314.318L24.0684 307.433L77.5473 252.238Z"
                  fill="#EF848F"
                />
                <path
                  d="M117.255 271.172L138.371 247.763L117.406 249.443L117.255 271.172Z"
                  fill="#EF848F"
                />
                <path
                  d="M92.9253 133.929L178.308 187.174L124.14 199.567L92.9253 133.929Z"
                  fill="#CC3737"
                />
                <path
                  d="M-1.1792 46.717L27.2817 66.4543L55.7885 40.7958L-1.1792 46.717Z"
                  fill="#CC3737"
                />
                <path
                  d="M117.255 271.172L129.649 299.63L138.371 247.763L117.255 271.172Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M200.035 219.148L250.837 241.681L201.568 259.541L200.035 219.148Z"
                  fill="#CC3737"
                />
                <path
                  d="M261.854 169.575L200.035 219.148L250.837 241.681L261.854 169.575Z"
                  fill="#E04C4C"
                />
                <path
                  d="M194.375 209.206L261.854 169.575L200.035 219.148L194.375 209.206Z"
                  fill="#CC3737"
                />
                <path
                  d="M250.837 241.681L275.626 229.554L261.855 169.575L250.837 241.681Z"
                  fill="#EF848F"
                />
                <path
                  d="M261.854 169.575L321.223 229.861L275.626 229.554L261.854 169.575Z"
                  fill="#CC3737"
                />
                <path
                  d="M275.626 229.554L324.285 265.205L321.223 229.861L275.626 229.554Z"
                  fill="#EF848F"
                />
                <path
                  d="M250.837 241.681L228.496 276.065L201.568 259.541L250.837 241.681Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M266.445 283.717L228.496 276.065L250.837 241.681L266.445 283.717Z"
                  fill="#EF848F"
                />
                <path
                  d="M201.568 307.277V259.541L228.496 276.065L201.568 307.277Z"
                  fill="#D64949"
                />
                <path
                  d="M250.837 241.681L254.854 253.041L266.445 283.717L275.626 229.554L250.837 241.681Z"
                  fill="#CC3737"
                />
                <path
                  d="M324.285 265.205L266.445 283.717L275.626 229.554L324.285 265.205Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M266.445 283.716L312.96 307.585L324.285 265.205L266.445 283.716Z"
                  fill="#CC3737"
                />
                <path
                  d="M0.349364 157.182L37.8397 168.354L-0.720215 172.485L0.349364 157.182Z"
                  fill="#D64949"
                />
                <path
                  d="M24.0685 307.433L-20 305.749L-1.78963 219.763L24.0685 308.503"
                  fill="#B72C2C"
                />
                <path
                  d="M0.657058 105.47L11.4446 123.716L4.32943 158.256L-8.21631 154.506L0.657058 105.47Z"
                  fill="#AA1B1B"
                />
                <path
                  d="M201.568 307.277L312.96 307.585L266.445 283.717L201.568 307.277Z"
                  fill="#B72C2C"
                />
                <path
                  d="M195.293 202.78L185.194 185.337L222.377 183.501L195.293 202.78Z"
                  fill="#E04C4C"
                />
                <path
                  d="M321.567 210.849L299.533 153.707L344.286 185.374L321.567 210.849Z"
                  fill="#E04C4C"
                />
                <path
                  d="M101.188 130.1L115.005 81.4181L141.855 93.8067L101.188 130.1Z"
                  fill="#E04C4C"
                />
                <path
                  d="M281.593 162.387L290.774 185.337L269.924 167.477L281.593 162.387Z"
                  fill="#CC3737"
                />
                <path
                  d="M75.9409 37L113.583 68.9791L130.108 37H75.9409Z"
                  fill="#CC3737"
                />
                <path
                  d="M190.285 174.702L208.871 169.199L200.572 159.133L190.285 174.702Z"
                  fill="#CC3737"
                />
                <path
                  d="M130.843 110.331L145.987 95.1838L166.644 102.757L130.843 110.331Z"
                  fill="#CC3737"
                />
                <path
                  d="M102.106 133.47L170.963 142.953L162.393 161.621L102.106 133.47Z"
                  fill="#CC3737"
                />
                <rect
                  width="320"
                  height="288"
                  fill="url(#paint0_linear_287_2188)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_287_2188"
                  x1="160"
                  y1="58.4025"
                  x2="160"
                  y2="275.071"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#223144" />
                  <stop offset="1" stop-color="#223144" stop-opacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </nav>
          <div className="flex h-full w-full flex-col items-center space-y-8  py-8">
            <h3 className="text-xl font-bold">
              Nomor {questionQuery.data && questionQuery.data.index + 1}
            </h3>
            <div className="flex h-[65vh] w-[80%] flex-col items-start justify-start space-y-4 overflow-y-scroll rounded-xl bg-white p-6 shadow-2xl">
              {questionQuery.isLoading ? (
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 " />
                  <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 " />
                  <div className="mb-2.5 h-2 rounded-full bg-gray-200 " />
                  <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 " />
                  <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 " />
                  <div className="h-2 max-w-[360px] rounded-full bg-gray-200 " />
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                questionQuery.data && (
                  <>
                    {questionQuery.data.image && (
                      // <Image
                      //   src={questionQuery.data.image}
                      //   alt="sample"
                      //   height={400}
                      //   width={300}
                      // />
                      <img
                        src={questionQuery.data.image}
                        alt="question image"
                        height={400}
                        width={300}
                      />
                    )}
                    <p className="text-md leading-relaxed">
                      <Latex>{questionQuery.data.question}</Latex>
                    </p>
                    <div className="flex w-full flex-col space-y-4">
                      {questionQuery.data.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4"
                          onClick={() => {
                            handleOptionChange(option?.id);
                          }}
                        >
                          <button className="flex aspect-square h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary-dark bg-none text-xs">
                            <div
                              className={
                                option?.id == questionQuery.data.answer
                                  ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-dark text-white"
                                  : ""
                              }
                            >
                              {index == 0
                                ? "A"
                                : index == 1
                                ? "B"
                                : index == 2
                                ? "C"
                                : index == 3
                                ? "D"
                                : "E"}
                            </div>
                          </button>
                          <p className="text-md pt-0.5 text-start">
                            <Latex>{option?.prompt}</Latex>
                          </p>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleClearAnswer}
                        className="mr-2 mb-2 w-fit rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-primary-dark hover:border-primary-dark hover:bg-gray-100 focus:z-10 focus:outline-none"
                      >
                        Clear Answer
                      </button>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="flex h-auto w-[80%] items-end justify-between">
              <Link
                href={`/competition/quiz?index=${index}`}
                className={`${
                  index <= 0 ? "invisible" : "visible"
                } flex items-center space-x-4 rounded-lg bg-primary-dark py-2 px-3 shadow-md`}
              >
                <IoChevronBack size={20} className="text-white" />
                <p className="text-sm font-medium text-white">
                  Soal sebelumnya
                </p>
              </Link>

              {questionQuery.data && (
                <button
                  onClick={() => handleFlagQuestion()}
                  className={`${
                    questionQuery.data.isFlagged
                      ? "border-white bg-red-400"
                      : "border-primary-dark bg-white"
                  } flex items-center space-x-3 rounded-md border-[0.75px] py-2 px-3 text-primary-dark shadow-md`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_440_819)">
                      <path
                        d="M6.096 2.38499C5.86774 2.28616 5.61849 2.24565 5.37068 2.26709C5.12286 2.28854 4.88428 2.37127 4.67639 2.50785C4.4685 2.64442 4.29784 2.83055 4.17977 3.04948C4.0617 3.2684 3.99992 3.51326 4 3.76199V21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22C5.26522 22 5.51957 21.8946 5.70711 21.7071C5.89464 21.5196 6 21.2652 6 21V16.657L19.339 10.877C20.544 10.354 20.544 8.64599 19.339 8.12399L6.096 2.38499Z"
                        fill={`${
                          questionQuery.data.isFlagged ? "#FFFFFF" : "#223144"
                        }`}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_440_819">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p
                    className={`${
                      questionQuery.data.isFlagged
                        ? "text-white"
                        : " text-primary-dark"
                    } text-sm`}
                  >
                    Tandai soal
                  </p>
                </button>
              )}
              {questionStatusQuery?.data &&
                (index <
                questionStatusQuery.data.examQuestionsStatus.length - 1 ? (
                  <Link
                    href={`/competition/quiz?index=${index + 2}`}
                    className="flex items-center space-x-4 rounded-lg bg-primary-dark py-2 px-3 shadow-md"
                  >
                    <IoChevronForward size={24} className="text-white" />
                    <p className="text-sm font-medium text-white">
                      Soal selanjutnya
                    </p>
                  </Link>
                ) : (
                  index ==
                    questionStatusQuery.data.examQuestionsStatus.length - 1 && (
                    <Link
                      href={`/competition/quiz/submit`}
                      className="flex items-center space-x-4 rounded-lg bg-primary-dark py-2 px-8 shadow-md"
                    >
                      <p className="text-sm font-medium text-white">Submit</p>
                    </Link>
                  )
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Nav Mobile */}
        <nav className="absolute bottom-0 z-30 flex h-[7vh] w-full items-center justify-between bg-primary-dark px-5 lg:hidden">
          <Link
            href={`/competition/quiz?index=${index}`}
            className={`${index <= 0 ? "invisible" : "visible"}`}
          >
            <IoChevronBack size={24} className="text-white" />
          </Link>
          {questionQuery.data && (
            <button
              onClick={() => handleFlagQuestion()}
              className={`${
                questionQuery.data.isFlagged ? "bg-red-400" : ""
              } flex items-center space-x-3 rounded-md border-[0.75px] border-white py-1 px-4 text-white`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_431_676)">
                  <path
                    d="M5.07967 1.98743C4.88946 1.90507 4.68175 1.87131 4.47524 1.88918C4.26873 1.90705 4.0699 1.97599 3.89666 2.08981C3.72342 2.20362 3.58121 2.35873 3.48281 2.54116C3.38442 2.7236 3.33294 2.92765 3.33301 3.13493V17.4999C3.33301 17.7209 3.42081 17.9329 3.57709 18.0892C3.73337 18.2455 3.94533 18.3333 4.16634 18.3333C4.38736 18.3333 4.59932 18.2455 4.7556 18.0892C4.91188 17.9329 4.99967 17.7209 4.99967 17.4999V13.8808L16.1155 9.0641C17.1197 8.62826 17.1197 7.20493 16.1155 6.76993L5.07967 1.98743Z"
                    fill="#F4F4F4"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_431_676">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-sm">Tandai soal</p>
            </button>
          )}

          {questionStatusQuery?.data &&
            (index < questionStatusQuery.data.examQuestionsStatus.length - 1 ? (
              <Link href={`/competition/quiz?index=${index + 2}`}>
                <IoChevronForward size={24} className="text-white" />
              </Link>
            ) : (
              index ==
                questionStatusQuery.data.examQuestionsStatus.length - 1 && (
                <Link href={`/competition/quiz/submit`}>
                  <p className=" font-medium text-white">Submit</p>
                </Link>
              )
            ))}
        </nav>
      </div>
    </>
  );
}
