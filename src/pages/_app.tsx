import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { RefreshToken, TeamContext } from "~/utils/context/teamContext";

const montserrat = Montserrat({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <TeamContext.Provider value={RefreshToken()}>
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </TeamContext.Provider>
  );
};

export default api.withTRPC(MyApp);
