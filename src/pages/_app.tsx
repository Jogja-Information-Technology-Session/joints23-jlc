import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import { api } from "~/utils/api";

const montserrat = Montserrat({ subsets: ["latin"] });

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
  