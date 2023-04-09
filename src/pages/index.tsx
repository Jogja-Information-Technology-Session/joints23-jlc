import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useContext, useEffect } from "react";
import Hero from "~/components/homepage/Hero";
import PreExamNavbar from "~/components/preExam/preExamNavbar";
import { api, setToken } from "~/utils/api";
import { TeamContext } from "~/utils/context/teamContext";
import type { TeamContextType } from "~/utils/context/teamContext";
import Guidebook from "~/components/homepage/Guidebook";
import Timeline from "~/components/homepage/Timeline";
import Countdown from "~/components/homepage/Countdown";

const Home: NextPage = () => {
  const { setTeam } = useContext(TeamContext) as TeamContextType;

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

  return (
    <>
      <Head>
        <title>Joints Logic Competition</title>
        <meta name="description" content="Joints Logic Competition Website" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
          integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
          crossOrigin="anonymous"
        />

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js"
          integrity="sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4"
          crossOrigin="anonymous"
        ></script>

        <script
          defer
          src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js"
          integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <PreExamNavbar />
      <Hero />
      <Guidebook />
      <Timeline />
      <Countdown />
    </>
  );
};

export default Home;
