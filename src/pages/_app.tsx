import "@fontsource/mulish";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import "../../styles/globals.css";
import { FavIcon } from "../../public/icons";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </div>
  );
}