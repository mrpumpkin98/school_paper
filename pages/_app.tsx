import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { GlobalStyles } from "../styles/globalStyles";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyles />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
