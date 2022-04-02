import "../styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer";
import { SessionProvider } from "next-auth/react";

export type NextPageWithAuth = NextPage & { auth?: boolean };

// noinspection JSUnusedGlobalSymbols
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
