import { useRouter } from "next/router";
import { useEffect } from "react";
import { api, setToken } from "~/utils/api";

export default function SubmitExam() {
  const router = useRouter();

  const examStatus = api.exam.getExamStatus.useQuery({
    examType: "WARM_UP",
  });
  const submitExam = api.exam.submitExam.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (payload) => {
      if (!payload) {
        void router.push("/auth/login");
      } else {
        const { accessToken } = payload;
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

  if (examStatus.isLoading) return <div></div>;

  if (examStatus.error) return <div>{examStatus.error.message}</div>;

  if (
    examStatus.data?.status === "SUBMITTED" ||
    examStatus.data?.status === "GRADED"
  ) {
    setTimeout(() => {
      void router.push("/");
    }, 3000);
    return (
      <div className=" mx-auto flex h-screen max-w-lg flex-col items-center justify-center gap-4 text-lg font-medium text-primary-dark ">
        Anda sudah mengumpulkan ujian!
      </div>
    );
  }

  if (examStatus.data?.status === "NOT_STARTED") {
    setTimeout(() => {
        void router.push("/");
      }, 3000);
    return (
      <div className=" mx-auto flex h-screen max-w-lg flex-col items-center justify-center gap-4 text-lg font-medium text-primary-dark ">
        <h1>Anda belum memulai ujian!</h1>
      </div>
    );
  }

  return (
    <div className=" mx-auto flex h-screen max-w-lg flex-col items-center justify-center gap-4 text-lg font-medium text-primary-dark ">
      <h1>Apakah anda yakin akan mengumpulkan ujian?</h1>
      <div className=" flex w-full flex-col gap-4 px-8">
        <button
          className=" w-full rounded-xl border border-primary-dark py-2"
          onClick={() => void router.push("/competition/quiz")}
        >
          Kembali
        </button>

        <button
          className="w-full rounded-xl border bg-primary-dark py-2 text-white transition-all active:border-primary-dark active:bg-white"
          onClick={() => submitExam.mutate({ examType: "WARM_UP" })}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
