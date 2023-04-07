import { Dialog, Disclosure, Transition } from "@headlessui/react";
import router from "next/router";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import { api, setToken } from "~/utils/api";
import PreExamNavbar from "~/components/preExam/preExamNavbar";
import { TeamContext } from "~/utils/context/teamContext";
import type { TeamContextType } from "~/utils/context/teamContext";
import { ExamStatus } from "@prisma/client";

const guides = [
  {
    title: "Tata Cara Mengakses Soal Penyisihan",
    guide: [
      "Klik link (laman web)",
      "Klik tombol `Login` yang ada pada Kanan Atas",
      "Kemudian pilih opsi Login dengan Google",
      "Masuk dengan akun Google yang telah diisikan pada formulir pendaftaran",
      "Silakan pilih button dropdown `Competition`",
      "Pilih course yang sesuai (warmup sama penyisihan)",
      "Setelah paham dengan peraturan dan ketentuan yang ada, klik `Mulai kerjakan` dan kalian sudah berhasil masuk ke laman pengerjaan soal.",
    ],
  },
  {
    title: "Tata Cara Pengerjaan Soal",
    guide: [
      "Seluruh peserta bertanggung jawab penuh terhadap kesiapan koneksi internet dan perangkat yang digunakan untuk mengikuti babak penyisihan. Apabila terdapat kendala yang dialami peserta sehubungan dengan hal-hal tersebut, diharapkan untuk segera menghubungi narahubung tertera.",
      "Tahap penyisihan dilakukan secara daring pada tanggal 16 April 2023 pukul 13.00 - 15.00 WIB melalui platform yang akan dikirimkan tautannya melalui email yang digunakan untuk pendaftaran.",
      "Tiap anggota dalam 1 tim harus berada di tempat yang sama.",
      "Pengerjaan soal hanya bisa mengerjakan menggunakan 1 device yang sama.",
      "Peserta dilarang menanyakan hal apapun yang berkaitan dengan soal penyisihan JLC 2023 saat waktu pengerjaan masih berlangsung.",
      "Total waktu penyisihan adalah 120 menit.",
      "Bentuk penyisihan adalah soal pilihan ganda berjumlah 40 butir soal. Cara menjawab adalah dengan memilih 1 jawaban diantara pilihan jawaban lain yang sudah disediakan.",
      "Penilaian pada babak ini dilakukan berdasarkan benar, tidak, atau kosongnya jawaban.\n Setiap soal dengan jawaban benar bernilai +4. \n Setiap soal dengan jawaban kosong bernilai 0. \n Setiap soal dengan jawaban salah bernilai -1.",
      "Poin maksimal yang dapat diperoleh pada babak ini adalah 160.",
      "Panitia berhak mendiskualifikasi peserta yang dianggap melakukan pelanggaran atau kecurangan selama pelaksanaan babak penyisihan.",
      "Semua keputusan panitia adalah mutlak dan tidak dapat diganggu gugat.",
    ],
  },
];

export default function PenyisihanPage() {
  const { setTeam } = useContext(TeamContext) as TeamContextType;
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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

  const getExamStatus = api.exam.getExamStatus.useQuery(
    { examType: "PENYISIHAN" },
    {
      onError: (error) => {
        if (error.message === "UNAUTHORIZED") {
          refreshToken
            .mutateAsync()
            .then(() => {
              void getExamStatus.refetch();
            })
            .catch(() => {
              console.log("error");
            });
        }
      },
      retry: 0,
    }
  );

  //refresh token upon page load (only once)
  useEffect(() => {
    refreshToken.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Penyisihan / Joints Logic Competition</title>
        <meta name="description" content="Joints Logic Competition Website" />
      </Head>
      <div className="relative min-h-screen w-screen">
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Mulai sesi Penyisihan?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Jika Anda memulai sesi Penyisihan, sesi akan dimulai dan
                        tidak dapat dibatalkan
                      </p>
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-dark px-4 py-2 text-sm font-medium text-white"
                        onClick={() => {
                          void router.push("competition/quiz");
                          closeModal();
                        }}
                      >
                        Mulai sesi
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div className="z-20 flex h-full min-h-screen w-full flex-col items-center overflow-clip bg-[url('/preExam/bg_desktop_full.png')] bg-cover pb-12 lg:pb-24">
          <PreExamNavbar />
          <h2 className="py-10 text-center text-2xl font-bold lg:py-16 lg:text-4xl">
            Penyisihan Joints Logic Competition
          </h2>
          <div className="z-30 flex w-[90%] flex-col space-y-6 rounded-xl bg-[#F4F4F4] p-5 shadow-xl lg:w-3/4">
            {guides.map((guide, index) => {
              return (
                <div key={index}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg p-2 text-left font-medium">
                          <p className="text-lg font-semibold lg:text-xl">
                            {guide.title}
                          </p>
                          {open ? (
                            <IoChevronUp size={20} />
                          ) : (
                            <IoChevronDown size={20} />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="md:text-md px-2 pt-2 pb-2 text-sm text-gray-500">
                          {guide.guide.map((penyisihan, index) => (
                            <div className="flex w-full space-x-3" key={index}>
                              <p>{`${index + 1}.`}</p>
                              <p key={index} className="mb-2">
                                {penyisihan}
                              </p>
                            </div>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              //Exam is not started (startTime > now)
              if (
                getExamStatus.data?.status == ExamStatus.NOT_STARTED &&
                getExamStatus.data.startsAt.getTime() > Date.now()
              ) {
                setError(
                  "Exam belum dimulai. Silahkan coba lagi sesuai jadwal exam."
                );
                //Exam is already started
              } else if (
                getExamStatus.data?.status == ExamStatus.STARTED ||
                getExamStatus.data?.status == ExamStatus.NOT_STARTED
              ) {
                //on-going exam
                if (getExamStatus.data?.timeRemaining > 0) {
                  openModal();
                } else if (getExamStatus.data?.timeRemaining <= 0) {
                  setError(
                    "Exam telah selesai. Jawaban Anda telah disimpan server."
                  );
                }
              } else if (
                getExamStatus.data?.status == ExamStatus.SUBMITTED ||
                getExamStatus.data?.status == ExamStatus.GRADED
              ) {
                setError("Exam telah dikumpulkan.");
              } else {
                setError(
                  "Mohon maaf, terjadi kesalahan pada server. Silahkan coba lagi!"
                );
              }
            }}
            className={`${
              getExamStatus.data?.isActive
                ? //active
                  "opacity-100"
                : //inactive
                  "opacity-75"
            } z-30 mt-12 rounded-md bg-primary-dark px-6 py-2.5 font-medium text-white`}
          >
            Mulai Penyisihan
          </button>
          <p className="mt-4 px-8 text-center text-sm text-red-500 lg:px-0">
            {error}
          </p>
        </div>
        <svg
          className="absolute bottom-0 z-10 w-full"
          viewBox="0 0 1440 478"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1502.16 170.67L1406.52 143.408L1459.99 220.841L1502.16 170.67Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1515.92 69.7066L1303.27 115.183L1439.59 1L1515.92 69.7066Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M826.943 438.797C826.6 438.452 826.162 438.217 825.685 438.121C825.207 438.025 824.712 438.072 824.262 438.258C823.812 438.444 823.428 438.759 823.157 439.163C822.886 439.568 822.741 440.044 822.741 440.53C822.741 441.017 822.886 441.493 823.157 441.898C823.428 442.302 823.812 442.617 824.262 442.803C824.712 442.989 825.207 443.036 825.685 442.94C826.162 442.844 826.6 442.609 826.943 442.263C827.401 441.803 827.658 441.18 827.658 440.53C827.658 439.881 827.401 439.258 826.943 438.797Z"
            fill="#E65251"
          />
          <path
            d="M1342.38 247.881C1342.04 247.536 1341.6 247.301 1341.13 247.205C1340.65 247.109 1340.15 247.156 1339.7 247.342C1339.25 247.528 1338.87 247.843 1338.6 248.247C1338.33 248.652 1338.18 249.128 1338.18 249.614C1338.18 250.101 1338.33 250.577 1338.6 250.982C1338.87 251.386 1339.25 251.701 1339.7 251.887C1340.15 252.073 1340.65 252.12 1341.13 252.024C1341.6 251.928 1342.04 251.693 1342.38 251.347C1342.84 250.887 1343.1 250.264 1343.1 249.614C1343.1 248.965 1342.84 248.342 1342.38 247.881Z"
            fill="#E65251"
          />
          <path
            d="M1303.27 117.585C1301.92 117.585 1300.83 116.49 1300.83 115.139C1300.83 113.788 1301.92 112.693 1303.27 112.693C1304.62 112.693 1305.72 113.788 1305.72 115.139C1305.72 116.49 1304.62 117.585 1303.27 117.585Z"
            fill="#E65251"
          />
          <path
            d="M1153.64 279.801C1152.29 279.801 1151.2 278.706 1151.2 277.355C1151.2 276.004 1152.29 274.909 1153.64 274.909C1154.99 274.909 1156.09 276.004 1156.09 277.355C1156.09 278.706 1154.99 279.801 1153.64 279.801Z"
            fill="#E65251"
          />
          <path
            d="M1145.11 353.977C1143.76 353.977 1142.66 352.882 1142.66 351.532C1142.66 350.181 1143.76 349.086 1145.11 349.086C1146.46 349.086 1147.56 350.181 1147.56 351.532C1147.56 352.882 1146.46 353.977 1145.11 353.977Z"
            fill="#E65251"
          />
          <path
            d="M1055.18 476.506C1054.84 476.161 1054.4 475.926 1053.92 475.83C1053.45 475.734 1052.95 475.781 1052.5 475.967C1052.05 476.153 1051.67 476.468 1051.39 476.872C1051.12 477.277 1050.98 477.753 1050.98 478.239C1050.98 478.726 1051.12 479.202 1051.39 479.607C1051.67 480.011 1052.05 480.326 1052.5 480.512C1052.95 480.698 1053.45 480.745 1053.92 480.649C1054.4 480.553 1054.84 480.318 1055.18 479.972C1055.64 479.512 1055.9 478.889 1055.9 478.239C1055.9 477.59 1055.64 476.967 1055.18 476.506Z"
            fill="#E65251"
          />
          <path
            d="M1180.35 467.055C1179 467.055 1177.9 465.96 1177.9 464.609C1177.9 463.258 1179 462.163 1180.35 462.163C1181.7 462.163 1182.8 463.258 1182.8 464.609C1182.8 465.96 1181.7 467.055 1180.35 467.055Z"
            fill="#E65251"
          />
          <path
            d="M1386.34 358.599C1384.45 358.599 1382.91 357.063 1382.91 355.169C1382.91 353.276 1384.45 351.74 1386.34 351.74C1388.24 351.74 1389.77 353.276 1389.77 355.169C1389.77 357.063 1388.24 358.599 1386.34 358.599Z"
            fill="#E65251"
          />
          <path
            d="M1281.55 475.671C1279.66 475.671 1278.12 474.136 1278.12 472.242C1278.12 470.348 1279.66 468.812 1281.55 468.812C1283.45 468.812 1284.98 470.348 1284.98 472.242C1284.98 474.136 1283.45 475.671 1281.55 475.671Z"
            fill="#E65251"
          />
          <path
            d="M1172.19 322.943C1171.84 322.598 1171.41 322.362 1170.93 322.266C1170.45 322.17 1169.96 322.218 1169.51 322.403C1169.06 322.589 1168.67 322.904 1168.4 323.309C1168.13 323.713 1167.99 324.189 1167.99 324.676C1167.99 325.163 1168.13 325.639 1168.4 326.043C1168.67 326.448 1169.06 326.763 1169.51 326.948C1169.96 327.134 1170.45 327.182 1170.93 327.086C1171.41 326.99 1171.84 326.754 1172.19 326.409C1172.65 325.948 1172.9 325.325 1172.9 324.676C1172.9 324.027 1172.65 323.404 1172.19 322.943Z"
            fill="#E65251"
          />
          <path
            d="M1112.98 379.186C1112.13 379.186 1111.44 378.498 1111.44 377.65C1111.44 376.801 1112.13 376.113 1112.98 376.113C1113.83 376.113 1114.52 376.801 1114.52 377.65C1114.52 378.498 1113.83 379.186 1112.98 379.186Z"
            fill="#E65251"
          />
          <path
            d="M1105.23 308.243C1104.39 308.243 1103.7 307.555 1103.7 306.706C1103.7 305.858 1104.39 305.17 1105.23 305.17C1106.08 305.17 1106.77 305.858 1106.77 306.706C1106.77 307.555 1106.08 308.243 1105.23 308.243Z"
            fill="#E65251"
          />
          <path
            d="M1111.79 394.304C1110.94 394.304 1110.25 393.616 1110.25 392.768C1110.25 391.919 1110.94 391.231 1111.79 391.231C1112.63 391.231 1113.32 391.919 1113.32 392.768C1113.32 393.616 1112.63 394.304 1111.79 394.304Z"
            fill="#E65251"
          />
          <path
            d="M1256.43 427.49C1255.58 427.49 1254.89 426.802 1254.89 425.953C1254.89 425.105 1255.58 424.417 1256.43 424.417C1257.28 424.417 1257.96 425.105 1257.96 425.953C1257.96 426.802 1257.28 427.49 1256.43 427.49Z"
            fill="#E65251"
          />
          <path
            d="M982.315 302.946C981.466 302.946 980.779 302.258 980.779 301.409C980.779 300.561 981.466 299.873 982.315 299.873C983.164 299.873 983.852 300.561 983.852 301.409C983.852 302.258 983.164 302.946 982.315 302.946Z"
            fill="#E65251"
          />
          <path
            d="M887.936 347.88C887.088 347.88 886.4 347.193 886.4 346.344C886.4 345.495 887.088 344.808 887.936 344.808C888.785 344.808 889.473 345.495 889.473 346.344C889.473 347.193 888.785 347.88 887.936 347.88Z"
            fill="#E65251"
          />
          <path
            d="M1406.53 145.854C1405.18 145.854 1404.08 144.759 1404.08 143.408C1404.08 142.057 1405.18 140.962 1406.53 140.962C1407.88 140.962 1408.97 142.057 1408.97 143.408C1408.97 144.759 1407.88 145.854 1406.53 145.854Z"
            fill="#E65251"
          />
          <path
            d="M1105.37 306.879L1145.11 351.532L1112.74 378.167L1153.31 276.152L1170.52 325.315L1256.56 426.102L1385.63 356.043L1459.99 220.842L1303.27 115.14"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1385.63 356.042L1437.25 390.457L1330.31 510.908L1385.63 356.042Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1437.26 390.458L1487.65 342.523L1385.63 356.043L1340.15 250.34L1303.27 115.14"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1330.31 510.908L1281.14 471.577L1274.59 559.654L1330.31 510.908Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1577.79 316.293L1558.33 222.992L1477.2 297.045L1385.63 356.042L1281.15 471.577L1180.35 464.608L1049.23 586.695"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1515.9 69.625L1459.99 220.841L1340.15 250.339"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1477.2 297.046L1340.15 250.34"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M982.045 301.544L955.408 336.377L923.043 346.615L887.802 345.792L1053.34 478.534L1049.23 586.695L1218.46 555.156L1281.15 471.578L1256.56 426.101L1340.15 250.34L1170.52 325.315"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1053.34 478.534L1180.35 464.608L1218.46 555.156L1274.59 559.655"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M955.393 337.434C954.545 337.434 953.857 336.746 953.857 335.898C953.857 335.049 954.545 334.361 955.393 334.361C956.242 334.361 956.93 335.049 956.93 335.898C956.93 336.746 956.242 337.434 955.393 337.434Z"
            fill="#E65251"
          />
          <path
            d="M922.698 347.598C921.849 347.598 921.161 346.91 921.161 346.062C921.161 345.213 921.849 344.525 922.698 344.525C923.546 344.525 924.234 345.213 924.234 346.062C924.234 346.91 923.546 347.598 922.698 347.598Z"
            fill="#E65251"
          />
          <path
            d="M943.288 297.181C942.439 297.181 941.751 296.493 941.751 295.645C941.751 294.796 942.439 294.108 943.288 294.108C944.136 294.108 944.824 294.796 944.824 295.645C944.824 296.493 944.136 297.181 943.288 297.181Z"
            fill="#E65251"
          />
          <path
            d="M1010.72 369.254C1009.87 369.254 1009.18 368.567 1009.18 367.718C1009.18 366.869 1009.87 366.182 1010.72 366.182C1011.57 366.182 1012.26 366.869 1012.26 367.718C1012.26 368.567 1011.57 369.254 1010.72 369.254Z"
            fill="#E65251"
          />
          <path
            d="M1068.36 453.583C1067.51 453.583 1066.82 452.896 1066.82 452.047C1066.82 451.199 1067.51 450.511 1068.36 450.511C1069.21 450.511 1069.89 451.199 1069.89 452.047C1069.89 452.896 1069.21 453.583 1068.36 453.583Z"
            fill="#E65251"
          />
          <path
            d="M1068.49 451.912L1180.35 464.609L1032.85 512.138L1068.49 451.912Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M887.802 345.792L917.303 538.871L850.926 506.398L887.802 345.792Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M943.287 295.816L1010.89 367.719L1053.51 478.534L917.474 538.871L825.283 440.85L887.973 345.792L729 507.221"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M703.422 469.525L728.829 507.222L720.63 601.862L850.926 506.398L728.829 507.222L551 531.804"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M704.515 468.431C704.299 468.212 704.023 468.062 703.722 468.001C703.421 467.94 703.108 467.969 702.824 468.086C702.54 468.202 702.297 468.401 702.126 468.656C701.955 468.911 701.863 469.211 701.863 469.518C701.863 469.826 701.955 470.126 702.126 470.381C702.297 470.636 702.54 470.835 702.824 470.951C703.108 471.068 703.421 471.097 703.722 471.036C704.023 470.974 704.299 470.825 704.515 470.606C704.801 470.316 704.961 469.926 704.961 469.518C704.961 469.111 704.801 468.72 704.515 468.431Z"
            fill="#E65251"
          />
          <path
            d="M711.066 409.435C710.851 409.22 710.577 409.074 710.279 409.015C709.981 408.956 709.673 408.987 709.392 409.103C709.111 409.22 708.872 409.417 708.703 409.669C708.534 409.922 708.444 410.219 708.444 410.522C708.444 410.826 708.534 411.123 708.703 411.376C708.872 411.628 709.111 411.825 709.392 411.942C709.673 412.058 709.981 412.089 710.279 412.03C710.577 411.971 710.851 411.825 711.066 411.61C711.209 411.467 711.323 411.298 711.4 411.111C711.478 410.925 711.517 410.725 711.517 410.522C711.517 410.32 711.478 410.12 711.4 409.934C711.323 409.747 711.209 409.577 711.066 409.435Z"
            fill="#E65251"
          />
          <path
            d="M771.112 434.865C770.263 434.865 769.575 434.177 769.575 433.328C769.575 432.48 770.263 431.792 771.112 431.792C771.961 431.792 772.648 432.48 772.648 433.328C772.648 434.177 771.961 434.865 771.112 434.865Z"
            fill="#E65251"
          />
          <path
            d="M1180.35 464.608L1111.52 392.915L1256.56 426.101"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M703.422 469.525L771.434 433.476L709.973 410.528"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M-62.1562 170.67L33.4757 143.408L-19.9946 220.841L-62.1562 170.67Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M-75.9219 69.7066L136.73 115.183L0.411594 1L-75.9219 69.7066Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M613.057 438.797C613.4 438.452 613.838 438.217 614.315 438.121C614.793 438.025 615.288 438.072 615.738 438.258C616.188 438.444 616.572 438.759 616.843 439.163C617.114 439.568 617.259 440.044 617.259 440.53C617.259 441.017 617.114 441.493 616.843 441.898C616.572 442.302 616.188 442.617 615.738 442.803C615.288 442.989 614.793 443.036 614.315 442.94C613.838 442.844 613.4 442.609 613.057 442.263C612.599 441.803 612.342 441.18 612.342 440.53C612.342 439.881 612.599 439.258 613.057 438.797Z"
            fill="#E65251"
          />
          <path
            d="M97.6153 247.881C97.9586 247.536 98.3966 247.301 98.8739 247.205C99.3511 247.109 99.8462 247.156 100.296 247.342C100.746 247.528 101.131 247.843 101.402 248.247C101.673 248.652 101.817 249.128 101.817 249.614C101.817 250.101 101.673 250.577 101.402 250.982C101.131 251.386 100.746 251.701 100.296 251.887C99.8462 252.073 99.3511 252.12 98.8739 252.024C98.3966 251.928 97.9586 251.693 97.6153 251.347C97.1574 250.887 96.9005 250.264 96.9005 249.614C96.9005 248.965 97.1574 248.342 97.6153 247.881Z"
            fill="#E65251"
          />
          <path
            d="M136.727 117.585C138.078 117.585 139.173 116.49 139.173 115.139C139.173 113.788 138.078 112.693 136.727 112.693C135.376 112.693 134.281 113.788 134.281 115.139C134.281 116.49 135.376 117.585 136.727 117.585Z"
            fill="#E65251"
          />
          <path
            d="M286.358 279.801C287.709 279.801 288.804 278.706 288.804 277.355C288.804 276.004 287.709 274.909 286.358 274.909C285.007 274.909 283.912 276.004 283.912 277.355C283.912 278.706 285.007 279.801 286.358 279.801Z"
            fill="#E65251"
          />
          <path
            d="M294.89 353.977C296.241 353.977 297.336 352.882 297.336 351.532C297.336 350.181 296.241 349.086 294.89 349.086C293.539 349.086 292.444 350.181 292.444 351.532C292.444 352.882 293.539 353.977 294.89 353.977Z"
            fill="#E65251"
          />
          <path
            d="M384.819 476.506C385.162 476.161 385.6 475.926 386.077 475.83C386.554 475.734 387.049 475.781 387.499 475.967C387.95 476.153 388.334 476.468 388.605 476.872C388.876 477.277 389.021 477.753 389.021 478.239C389.021 478.726 388.876 479.202 388.605 479.607C388.334 480.011 387.95 480.326 387.499 480.512C387.049 480.698 386.554 480.745 386.077 480.649C385.6 480.553 385.162 480.318 384.819 479.972C384.361 479.512 384.104 478.889 384.104 478.239C384.104 477.59 384.361 476.967 384.819 476.506Z"
            fill="#E65251"
          />
          <path
            d="M259.649 467.055C261 467.055 262.095 465.96 262.095 464.609C262.095 463.258 261 462.163 259.649 462.163C258.298 462.163 257.203 463.258 257.203 464.609C257.203 465.96 258.298 467.055 259.649 467.055Z"
            fill="#E65251"
          />
          <path
            d="M53.658 358.599C55.552 358.599 57.0875 357.063 57.0875 355.169C57.0875 353.276 55.552 351.74 53.658 351.74C51.7639 351.74 50.2285 353.276 50.2285 355.169C50.2285 357.063 51.7639 358.599 53.658 358.599Z"
            fill="#E65251"
          />
          <path
            d="M158.449 475.671C160.343 475.671 161.878 474.136 161.878 472.242C161.878 470.348 160.343 468.812 158.449 468.812C156.555 468.812 155.02 470.348 155.02 472.242C155.02 474.136 156.555 475.671 158.449 475.671Z"
            fill="#E65251"
          />
          <path
            d="M267.813 322.943C268.156 322.598 268.594 322.362 269.071 322.266C269.548 322.17 270.043 322.218 270.493 322.403C270.944 322.589 271.328 322.904 271.599 323.309C271.87 323.713 272.014 324.189 272.014 324.676C272.014 325.163 271.87 325.639 271.599 326.043C271.328 326.448 270.944 326.763 270.493 326.948C270.043 327.134 269.548 327.182 269.071 327.086C268.594 326.99 268.156 326.754 267.813 326.409C267.355 325.948 267.098 325.325 267.098 324.676C267.098 324.027 267.355 323.404 267.813 322.943Z"
            fill="#E65251"
          />
          <path
            d="M327.021 379.186C327.869 379.186 328.557 378.498 328.557 377.65C328.557 376.801 327.869 376.113 327.021 376.113C326.172 376.113 325.484 376.801 325.484 377.65C325.484 378.498 326.172 379.186 327.021 379.186Z"
            fill="#E65251"
          />
          <path
            d="M334.765 308.243C335.614 308.243 336.302 307.555 336.302 306.706C336.302 305.858 335.614 305.17 334.765 305.17C333.916 305.17 333.229 305.858 333.229 306.706C333.229 307.555 333.916 308.243 334.765 308.243Z"
            fill="#E65251"
          />
          <path
            d="M328.214 394.304C329.063 394.304 329.751 393.616 329.751 392.768C329.751 391.919 329.063 391.231 328.214 391.231C327.366 391.231 326.678 391.919 326.678 392.768C326.678 393.616 327.366 394.304 328.214 394.304Z"
            fill="#E65251"
          />
          <path
            d="M183.572 427.49C184.42 427.49 185.108 426.802 185.108 425.953C185.108 425.105 184.42 424.417 183.572 424.417C182.723 424.417 182.035 425.105 182.035 425.953C182.035 426.802 182.723 427.49 183.572 427.49Z"
            fill="#E65251"
          />
          <path
            d="M457.685 302.946C458.534 302.946 459.221 302.258 459.221 301.409C459.221 300.561 458.534 299.873 457.685 299.873C456.836 299.873 456.148 300.561 456.148 301.409C456.148 302.258 456.836 302.946 457.685 302.946Z"
            fill="#E65251"
          />
          <path
            d="M552.064 347.88C552.912 347.88 553.6 347.193 553.6 346.344C553.6 345.495 552.912 344.808 552.064 344.808C551.215 344.808 550.527 345.495 550.527 346.344C550.527 347.193 551.215 347.88 552.064 347.88Z"
            fill="#E65251"
          />
          <path
            d="M33.4735 145.854C34.8244 145.854 35.9196 144.759 35.9196 143.408C35.9196 142.057 34.8244 140.962 33.4735 140.962C32.1225 140.962 31.0273 142.057 31.0273 143.408C31.0273 144.759 32.1225 145.854 33.4735 145.854Z"
            fill="#E65251"
          />
          <path
            d="M334.631 306.879L294.891 351.532L327.255 378.167L286.692 276.152L269.483 325.315L183.439 426.102L54.3726 356.043L-19.9941 220.842L136.729 115.14"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M54.3726 356.042L2.74609 390.457L109.687 510.908L54.3726 356.042Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.74495 390.458L-47.6523 342.523L54.3715 356.043L99.8519 250.34L136.728 115.14"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M109.688 510.908L158.856 471.577L165.407 559.654L109.688 510.908Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M-137.789 316.293L-118.331 222.992L-37.2034 297.045L54.3721 356.042L158.854 471.577L259.649 464.608L390.768 586.695"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M-75.8984 69.625L-19.9943 220.841L99.8529 250.339"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M-37.2031 297.046L99.8529 250.34"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M457.955 301.544L484.592 336.377L516.957 346.615L552.198 345.792L386.661 478.534L390.767 586.695L221.543 555.156L158.853 471.578L183.437 426.101L99.8516 250.34L269.481 325.315"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M386.663 478.534L259.649 464.608L221.544 555.156L165.406 559.655"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M484.607 337.434C485.455 337.434 486.143 336.746 486.143 335.898C486.143 335.049 485.455 334.361 484.607 334.361C483.758 334.361 483.07 335.049 483.07 335.898C483.07 336.746 483.758 337.434 484.607 337.434Z"
            fill="#E65251"
          />
          <path
            d="M517.302 347.598C518.151 347.598 518.839 346.91 518.839 346.062C518.839 345.213 518.151 344.525 517.302 344.525C516.454 344.525 515.766 345.213 515.766 346.062C515.766 346.91 516.454 347.598 517.302 347.598Z"
            fill="#E65251"
          />
          <path
            d="M496.712 297.181C497.561 297.181 498.249 296.493 498.249 295.645C498.249 294.796 497.561 294.108 496.712 294.108C495.864 294.108 495.176 294.796 495.176 295.645C495.176 296.493 495.864 297.181 496.712 297.181Z"
            fill="#E65251"
          />
          <path
            d="M429.279 369.254C430.127 369.254 430.815 368.567 430.815 367.718C430.815 366.869 430.127 366.182 429.279 366.182C428.43 366.182 427.742 366.869 427.742 367.718C427.742 368.567 428.43 369.254 429.279 369.254Z"
            fill="#E65251"
          />
          <path
            d="M371.642 453.583C372.491 453.583 373.178 452.896 373.178 452.047C373.178 451.199 372.491 450.511 371.642 450.511C370.793 450.511 370.105 451.199 370.105 452.047C370.105 452.896 370.793 453.583 371.642 453.583Z"
            fill="#E65251"
          />
          <path
            d="M371.506 451.912L259.648 464.609L407.153 512.138L371.506 451.912Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M552.198 345.792L522.697 538.871L589.074 506.398L552.198 345.792Z"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M496.883 295.816L429.277 367.719L386.66 478.534L522.696 538.871L614.886 440.85L552.197 345.792L711.17 507.221"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M736.578 469.525L711.171 507.222L719.37 601.862L589.074 506.398L711.171 507.222L889 531.804"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M735.485 468.431C735.701 468.212 735.977 468.062 736.278 468.001C736.579 467.94 736.892 467.969 737.176 468.086C737.46 468.202 737.703 468.401 737.874 468.656C738.045 468.911 738.137 469.211 738.137 469.518C738.137 469.826 738.045 470.126 737.874 470.381C737.703 470.636 737.46 470.835 737.176 470.951C736.892 471.068 736.579 471.097 736.278 471.036C735.977 470.974 735.701 470.825 735.485 470.606C735.199 470.316 735.039 469.926 735.039 469.518C735.039 469.111 735.199 468.72 735.485 468.431Z"
            fill="#E65251"
          />
          <path
            d="M728.934 409.435C729.149 409.22 729.423 409.074 729.721 409.015C730.019 408.956 730.327 408.987 730.608 409.103C730.889 409.22 731.128 409.417 731.297 409.669C731.466 409.922 731.556 410.219 731.556 410.522C731.556 410.826 731.466 411.123 731.297 411.376C731.128 411.628 730.889 411.825 730.608 411.942C730.327 412.058 730.019 412.089 729.721 412.03C729.423 411.971 729.149 411.825 728.934 411.61C728.791 411.467 728.677 411.298 728.6 411.111C728.522 410.925 728.483 410.725 728.483 410.522C728.483 410.32 728.522 410.12 728.6 409.934C728.677 409.747 728.791 409.577 728.934 409.435Z"
            fill="#E65251"
          />
          <path
            d="M668.888 434.865C669.737 434.865 670.425 434.177 670.425 433.328C670.425 432.48 669.737 431.792 668.888 431.792C668.039 431.792 667.352 432.48 667.352 433.328C667.352 434.177 668.039 434.865 668.888 434.865Z"
            fill="#E65251"
          />
          <path
            d="M259.648 464.608L328.483 392.915L183.438 426.101"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M736.578 469.525L668.566 433.476L730.027 410.528"
            stroke="#E65251"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1129.9 418.932L1168.19 385L1154.5 428.894L1129.9 418.932Z"
            fill="#ED7E7E"
          />
          <path
            d="M1168.19 385L1205.24 437.61L1184.69 450.373L1154.5 428.894L1168.19 385Z"
            fill="#F29191"
          />
          <path
            d="M1184.69 450.373L1168.19 534.423L1184.69 526.641L1193.41 484.305L1196.83 480.569L1205.24 437.61L1184.69 450.373Z"
            fill="#AA1B1B"
          />
          <path
            d="M1129.9 418.932L1144.53 446.325L1154.5 428.894L1129.9 418.932Z"
            fill="#F29191"
          />
          <path
            d="M1154.5 428.894L1184.69 450.373L1168.19 534.423L1144.53 446.325L1154.5 428.894Z"
            fill="#E65251"
          />
          <path
            d="M1129.9 418.932L1149.05 520.726L1144.53 446.325L1129.9 418.932Z"
            fill="#AA1B1B"
          />
          <path
            d="M1144.53 446.325L1149.05 520.726L1168.19 534.423L1144.53 446.325Z"
            fill="#CC3737"
          />
          <path
            d="M1138.53 464.786L1110.6 437.61L1149.05 520.726L1138.53 464.786Z"
            fill="#E65251"
          />
          <path
            d="M1110.6 437.61L1105 464.38L1126.69 472.399L1110.6 437.61Z"
            fill="#F29191"
          />
          <path
            d="M1105 464.38L1115.85 475.277L1126.69 472.399L1105 464.38Z"
            fill="#E76A6A"
          />
          <path
            d="M1105 464.38L1110.6 488.661L1115.85 475.277L1105 464.38Z"
            fill="#CC3737"
          />
          <path
            d="M1115.85 475.277L1126.69 472.399L1149.05 520.726L1110.6 488.662L1115.85 475.277Z"
            fill="#AA1B1B"
          />
          <path
            d="M1193.41 484.304L1196.83 480.569L1226.72 456.288L1215.51 490.374L1193.41 484.304Z"
            fill="#E65251"
          />
          <path
            d="M1226.72 456.288L1228.58 484.304L1215.51 490.374L1226.72 456.288Z"
            fill="#ED7E7E"
          />
          <path
            d="M311.058 418.932L272.767 385L286.465 428.894L311.058 418.932Z"
            fill="#ED7E7E"
          />
          <path
            d="M272.767 385L235.723 437.61L256.269 450.373L286.465 428.894L272.767 385Z"
            fill="#F29191"
          />
          <path
            d="M256.269 450.373L272.767 534.423L256.269 526.641L247.553 484.305L244.129 480.569L235.723 437.61L256.269 450.373Z"
            fill="#AA1B1B"
          />
          <path
            d="M311.058 418.932L296.427 446.325L286.465 428.894L311.058 418.932Z"
            fill="#F29191"
          />
          <path
            d="M286.465 428.894L256.269 450.373L272.767 534.423L296.427 446.325L286.465 428.894Z"
            fill="#E65251"
          />
          <path
            d="M311.058 418.932L291.911 520.726L296.427 446.325L311.058 418.932Z"
            fill="#AA1B1B"
          />
          <path
            d="M296.427 446.325L291.911 520.726L272.767 534.423L296.427 446.325Z"
            fill="#CC3737"
          />
          <path
            d="M302.432 464.786L330.357 437.61L291.911 520.726L302.432 464.786Z"
            fill="#E65251"
          />
          <path
            d="M330.357 437.61L335.96 464.38L314.266 472.399L330.357 437.61Z"
            fill="#F29191"
          />
          <path
            d="M335.96 464.38L325.113 475.277L314.266 472.399L335.96 464.38Z"
            fill="#E76A6A"
          />
          <path
            d="M335.96 464.38L330.357 488.661L325.113 475.277L335.96 464.38Z"
            fill="#CC3737"
          />
          <path
            d="M325.113 475.277L314.266 472.399L291.911 520.726L330.357 488.662L325.113 475.277Z"
            fill="#AA1B1B"
          />
          <path
            d="M247.553 484.304L244.129 480.569L214.244 456.288L225.451 490.374L247.553 484.304Z"
            fill="#E65251"
          />
          <path
            d="M214.244 456.288L212.377 484.304L225.451 490.374L214.244 456.288Z"
            fill="#ED7E7E"
          />
          <path
            d="M1235.28 394.537L1222.97 425.31L1253.57 418.49L1235.28 394.537Z"
            fill="#E76A6A"
          />
          <path
            d="M1235.28 394.537L1258.23 404.02L1253.58 418.49L1235.28 394.537Z"
            fill="#F29191"
          />
          <path
            d="M1258.23 404.02L1269.38 449.595L1262.22 454.42L1253.57 418.49L1258.23 404.02Z"
            fill="#E65251"
          />
          <path
            d="M1253.57 418.49L1222.97 425.31L1250.58 462.904L1262.22 454.42L1253.57 418.49Z"
            fill="#CC3737"
          />
          <path
            d="M1209 330.331L1225.47 348.63L1249.16 400.274L1245.19 398.632L1209 330.331Z"
            fill="#EF5E5E"
          />
          <path
            d="M1209 330.331L1209.66 297.065L1229.08 276.438L1280.69 284.258L1242.76 311.203L1225.47 348.63L1209 330.331Z"
            fill="#E76A6A"
          />
          <path
            d="M1280.69 284.258L1299.6 365.305L1287.84 366.54L1265.28 295.209L1280.69 284.258Z"
            fill="#CC3737"
          />
          <path
            d="M1265.28 295.209L1242.76 311.203L1270.32 389.38L1279.64 368.977L1287.84 366.541L1265.28 295.209Z"
            fill="#E65251"
          />
          <path
            d="M1242.76 311.203L1236.21 325.397L1289.17 452.59L1291.84 453.743V441.946L1267.88 397.143L1270.32 389.38L1242.76 311.203Z"
            fill="#CC3737"
          />
          <path
            d="M1236.21 325.397L1225.47 348.63L1249.16 400.274L1258.23 404.02L1269.38 449.595L1274.54 444.605L1289.17 452.59L1236.21 325.397Z"
            fill="#E76A6A"
          />
          <path
            d="M1342.4 207.076L1315.34 284.259L1336.19 409.924L1346.39 406.514L1356.6 419.765L1351.27 261.637L1342.4 207.076Z"
            fill="#E76A6A"
          />
          <path
            d="M1342.4 207.076L1372.12 190L1417.14 265.405L1351.27 261.637L1342.4 207.076Z"
            fill="#F29191"
          />
          <path
            d="M1351.27 261.637L1397.4 326.397L1399.84 311.203L1413.82 305.548L1351.27 261.637Z"
            fill="#AA1B1B"
          />
          <path
            d="M1351.27 261.637L1417.14 265.405L1419.14 303.776L1413.82 305.548L1351.27 261.637Z"
            fill="#CC3737"
          />
          <path
            d="M1351.27 261.637L1397.4 326.397L1394.96 347.687L1387.65 344.805L1367.91 363.436L1364.14 427.305L1356.6 419.765L1351.27 261.637Z"
            fill="#E65251"
          />
          <path
            d="M1394.96 347.687L1387.64 344.805L1386.54 377.517L1389.53 378.735L1394.96 347.687Z"
            fill="#C34343"
          />
          <path
            d="M1387.64 344.805L1367.91 363.436L1386.54 377.517L1387.64 344.805Z"
            fill="#E76A6A"
          />
          <path
            d="M1367.91 363.436L1364.14 427.306L1369.68 434.292L1386.54 377.517L1367.91 363.436Z"
            fill="#CC3737"
          />
          <path
            d="M1386.54 377.517L1389.53 378.735L1376.78 441.391L1369.68 434.291L1386.54 377.517Z"
            fill="#AA1B1B"
          />
          <path
            d="M1399.84 311.203L1397.4 326.397L1394.96 347.687L1376.78 441.391L1380.55 445.273L1409.27 330.056L1399.84 311.203Z"
            fill="#E65251"
          />
          <path
            d="M1399.84 311.203L1413.82 305.548L1419.14 303.776L1436.99 296.567L1409.27 330.056L1399.84 311.203Z"
            fill="#E76A6A"
          />
          <path
            d="M1409.27 330.056L1454.4 337.928L1436.99 296.567L1409.27 330.056Z"
            fill="#F29191"
          />
          <path
            d="M1409.27 330.056L1454.4 337.928L1399.84 430.192L1385.52 425.31L1409.27 330.056Z"
            fill="#E76A6A"
          />
          <path
            d="M1385.52 425.31L1380.55 445.273L1393.52 460.576L1394.08 480.312L1400.73 472.994L1399.84 430.192L1385.52 425.31Z"
            fill="#CC3737"
          />
          <path
            d="M1400.73 472.994L1422.02 452.813L1454.4 337.928L1399.84 430.191L1400.73 472.994Z"
            fill="#AA1B1B"
          />
          <path
            d="M1385.52 487.852L1394.08 480.312L1400.73 472.994L1422.02 452.813L1450.19 425.31L1452.18 452.813L1386.54 508.81L1385.52 487.852Z"
            fill="#CC3737"
          />
          <path
            d="M1386.54 508.81L1405.11 521.123L1480.96 477.539L1452.18 452.813L1386.54 508.81Z"
            fill="#AA1B1B"
          />
          <path
            d="M1279.64 368.977L1287.84 366.54L1299.6 365.305L1312.02 363.436L1306.58 388.996L1284.4 401.248L1267.88 397.143L1270.32 389.38L1279.64 368.977Z"
            fill="#F29191"
          />
          <path
            d="M1312.02 363.436L1323.66 416.333C1323.66 416.333 1312.9 419.551 1312.57 419.769C1312.24 419.988 1306.59 388.996 1306.59 388.996L1312.02 363.436Z"
            fill="#E65251"
          />
          <path
            d="M1306.58 388.996L1284.4 401.248L1298.82 426.751L1312.57 419.765L1306.58 388.996Z"
            fill="#CC3737"
          />
          <path
            d="M1267.88 397.143L1284.4 401.248L1298.82 426.751L1293.61 429.218L1291.84 441.945L1267.88 397.143Z"
            fill="#AA1B1B"
          />
          <path
            d="M1236.94 472.548L1250.58 462.903L1262.22 454.42L1269.38 449.595L1274.54 444.604L1289.84 483.032L1253.58 480.202L1236.94 472.548Z"
            fill="#E76A6A"
          />
          <path
            d="M1236.94 472.548L1247.03 508.256L1261.48 512.028L1248.36 477.801L1236.94 472.548Z"
            fill="#AA1B1B"
          />
          <path
            d="M1247.85 477.565L1253.57 480.203L1269.38 513.028L1261.48 512.028L1247.85 477.565Z"
            fill="#CC3737"
          />
          <path
            d="M1274.54 444.604L1289.17 452.59L1315.12 463.816L1289.84 483.032L1274.54 444.604Z"
            fill="#F29191"
          />
          <path
            d="M1289.84 483.032L1315.12 463.816L1318.37 521.206L1312.46 521.896L1289.84 483.032Z"
            fill="#E65251"
          />
          <path
            d="M1353.82 505.016L1357.92 473.548L1379 507.815L1353.82 505.016Z"
            fill="#E65251"
          />
          <path
            d="M1357.92 473.548L1334.31 499.829L1353.82 505.016L1357.92 473.548Z"
            fill="#EF8484"
          />
          <path
            d="M1357.92 473.548L1322.77 483.53L1334.31 499.829L1357.92 473.548Z"
            fill="#E76A6A"
          />
          <path
            d="M1308.95 461.149L1313.13 436.733L1293.61 429.218L1291.84 441.946V453.743L1308.95 461.149Z"
            fill="#AA1B1B"
          />
          <path
            d="M1293.61 429.218L1312.57 419.765L1323.66 416.329L1336.19 409.923L1346.39 406.513L1313.13 436.732L1293.61 429.218Z"
            fill="#E76A6A"
          />
          <path
            d="M1346.39 406.513L1356.6 419.765L1364.14 427.305L1369.68 434.291L1376.78 441.391L1381 445.801L1393.52 460.576L1375.34 463.816L1346.39 406.513Z"
            fill="#D35E5E"
          />
          <path
            d="M1375.34 463.816L1346.39 406.513L1313.13 436.732L1375.34 463.816Z"
            fill="#F29191"
          />
          <path
            d="M1368.65 460.908L1315.94 478.303L1315.12 463.816L1308.95 461.148L1313.13 436.732L1368.65 460.908Z"
            fill="#E65251"
          />
          <path
            d="M1368.65 460.908L1375.34 463.816L1369.68 492.664L1357.92 473.548L1316.34 485.394L1315.94 478.303L1368.65 460.908Z"
            fill="#CC3737"
          />
          <path
            d="M1376.78 504.208L1386.27 503.252L1385.52 487.852L1394.08 480.312L1393.52 460.576L1375.34 463.816L1369.68 492.664L1376.78 504.208Z"
            fill="#AA1B1B"
          />
          <path
            d="M205.68 394.537L217.989 425.31L187.385 418.49L205.68 394.537Z"
            fill="#E76A6A"
          />
          <path
            d="M205.68 394.537L182.727 404.02L187.385 418.49L205.68 394.537Z"
            fill="#F29191"
          />
          <path
            d="M182.727 404.02L171.58 449.595L178.736 454.42L187.385 418.49L182.727 404.02Z"
            fill="#E65251"
          />
          <path
            d="M187.386 418.49L217.989 425.31L190.376 462.904L178.736 454.42L187.386 418.49Z"
            fill="#CC3737"
          />
          <path
            d="M231.96 330.331L215.495 348.63L191.8 400.274L195.773 398.632L231.96 330.331Z"
            fill="#EF5E5E"
          />
          <path
            d="M231.96 330.331L231.297 297.065L211.88 276.438L160.271 284.258L198.196 311.203L215.495 348.63L231.96 330.331Z"
            fill="#E76A6A"
          />
          <path
            d="M160.271 284.258L141.365 365.305L153.119 366.54L175.68 295.209L160.271 284.258Z"
            fill="#CC3737"
          />
          <path
            d="M175.68 295.209L198.196 311.203L170.641 389.38L161.323 368.977L153.119 366.541L175.68 295.209Z"
            fill="#E65251"
          />
          <path
            d="M198.196 311.203L204.754 325.397L151.787 452.59L149.124 453.743V441.946L173.077 397.143L170.641 389.38L198.196 311.203Z"
            fill="#CC3737"
          />
          <path
            d="M204.754 325.397L215.495 348.63L191.8 400.274L182.727 404.02L171.58 449.595L166.423 444.605L151.787 452.59L204.754 325.397Z"
            fill="#E76A6A"
          />
          <path
            d="M98.5584 207.076L125.616 284.259L104.772 409.924L94.5677 406.514L84.3638 419.765L89.6862 261.637L98.5584 207.076Z"
            fill="#E76A6A"
          />
          <path
            d="M98.5586 207.076L68.8419 190L23.8172 265.405L89.6863 261.637L98.5586 207.076Z"
            fill="#F29191"
          />
          <path
            d="M89.6862 261.637L43.5568 326.397L41.1161 311.203L27.1441 305.548L89.6862 261.637Z"
            fill="#AA1B1B"
          />
          <path
            d="M89.6862 261.637L23.817 265.405L21.8216 303.776L27.1441 305.548L89.6862 261.637Z"
            fill="#CC3737"
          />
          <path
            d="M89.6862 261.637L43.5568 326.397L45.9976 347.687L53.3154 344.805L73.0552 363.436L76.8232 427.305L84.3638 419.765L89.6862 261.637Z"
            fill="#E65251"
          />
          <path
            d="M45.9976 347.687L53.3155 344.805L54.4245 377.517L51.4293 378.735L45.9976 347.687Z"
            fill="#C34343"
          />
          <path
            d="M53.3155 344.805L73.0553 363.436L54.4245 377.517L53.3155 344.805Z"
            fill="#E76A6A"
          />
          <path
            d="M73.0553 363.436L76.8234 427.306L71.2826 434.292L54.4245 377.517L73.0553 363.436Z"
            fill="#CC3737"
          />
          <path
            d="M54.4243 377.517L51.4291 378.735L64.1829 441.391L71.2824 434.291L54.4243 377.517Z"
            fill="#AA1B1B"
          />
          <path
            d="M41.116 311.203L43.5568 326.397L45.9975 347.687L64.1829 441.391L60.4148 445.273L31.6937 330.056L41.116 311.203Z"
            fill="#E65251"
          />
          <path
            d="M41.1161 311.203L27.1442 305.548L21.8217 303.776L3.96812 296.567L31.6938 330.056L41.1161 311.203Z"
            fill="#E76A6A"
          />
          <path
            d="M31.6938 330.056L-13.44 337.928L3.96818 296.567L31.6938 330.056Z"
            fill="#F29191"
          />
          <path
            d="M31.694 330.056L-13.4399 337.928L41.1163 430.192L55.4376 425.31L31.694 330.056Z"
            fill="#E76A6A"
          />
          <path
            d="M55.4374 425.31L60.415 445.273L47.4385 460.576L46.884 480.312L40.2298 472.994L41.1162 430.192L55.4374 425.31Z"
            fill="#CC3737"
          />
          <path
            d="M40.2298 472.994L18.94 452.813L-13.4401 337.928L41.1161 430.191L40.2298 472.994Z"
            fill="#AA1B1B"
          />
          <path
            d="M55.4376 487.852L46.8842 480.312L40.23 472.994L18.9402 452.813L-9.22649 425.31L-11.2219 452.813L54.4246 508.81L55.4376 487.852Z"
            fill="#CC3737"
          />
          <path
            d="M54.4245 508.81L35.8505 521.123L-40 477.539L-11.222 452.813L54.4245 508.81Z"
            fill="#AA1B1B"
          />
          <path
            d="M161.323 368.977L153.119 366.54L141.365 365.305L128.943 363.436L134.379 388.996L156.555 401.248L173.077 397.143L170.641 389.38L161.323 368.977Z"
            fill="#F29191"
          />
          <path
            d="M128.943 363.436L117.298 416.333C117.298 416.333 128.057 419.551 128.389 419.769C128.72 419.988 134.375 388.996 134.375 388.996L128.943 363.436Z"
            fill="#E65251"
          />
          <path
            d="M134.379 388.996L156.555 401.248L142.138 426.751L128.389 419.765L134.379 388.996Z"
            fill="#CC3737"
          />
          <path
            d="M173.077 397.143L156.555 401.248L142.138 426.751L147.351 429.218L149.124 441.945L173.077 397.143Z"
            fill="#AA1B1B"
          />
          <path
            d="M204.016 472.548L190.376 462.903L178.736 454.42L171.58 449.595L166.423 444.604L151.124 483.032L187.385 480.202L204.016 472.548Z"
            fill="#E76A6A"
          />
          <path
            d="M204.016 472.548L193.926 508.256L179.482 512.028L192.603 477.801L204.016 472.548Z"
            fill="#AA1B1B"
          />
          <path
            d="M193.11 477.565L187.385 480.203L171.58 513.028L179.483 512.028L193.11 477.565Z"
            fill="#CC3737"
          />
          <path
            d="M166.423 444.604L151.787 452.59L125.839 463.816L151.124 483.032L166.423 444.604Z"
            fill="#F29191"
          />
          <path
            d="M151.124 483.032L125.839 463.816L122.595 521.206L128.502 521.896L151.124 483.032Z"
            fill="#E65251"
          />
          <path
            d="M87.1363 505.016L83.0364 473.548L61.9649 507.815L87.1363 505.016Z"
            fill="#E65251"
          />
          <path
            d="M83.0364 473.548L106.653 499.829L87.1363 505.016L83.0364 473.548Z"
            fill="#EF8484"
          />
          <path
            d="M83.0365 473.548L118.189 483.53L106.653 499.829L83.0365 473.548Z"
            fill="#E76A6A"
          />
          <path
            d="M132.008 461.149L127.834 436.733L147.351 429.218L149.124 441.946V453.743L132.008 461.149Z"
            fill="#AA1B1B"
          />
          <path
            d="M147.351 429.218L128.389 419.765L117.298 416.329L104.772 409.923L94.5677 406.513L127.834 436.732L147.351 429.218Z"
            fill="#E76A6A"
          />
          <path
            d="M94.5679 406.513L84.364 419.765L76.8234 427.305L71.2827 434.291L64.1832 441.391L59.961 445.801L47.4386 460.576L65.624 463.816L94.5679 406.513Z"
            fill="#D35E5E"
          />
          <path
            d="M65.6239 463.816L94.5677 406.513L127.834 436.732L65.6239 463.816Z"
            fill="#F29191"
          />
          <path
            d="M72.313 460.908L125.022 478.303L125.839 463.816L132.008 461.148L127.834 436.732L72.313 460.908Z"
            fill="#E65251"
          />
          <path
            d="M72.3131 460.908L65.624 463.816L71.2826 492.664L83.0366 473.548L124.621 485.394L125.022 478.303L72.3131 460.908Z"
            fill="#CC3737"
          />
          <path
            d="M64.1829 504.208L54.695 503.252L55.4373 487.852L46.8838 480.312L47.4383 460.576L65.6238 463.816L71.2824 492.664L64.1829 504.208Z"
            fill="#AA1B1B"
          />
        </svg>
      </div>
    </>
  );
}
