import "../styles/globals.css";
import { type AppProps } from "next/app";
import { type Liff, liff } from "@line/liff";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  return <Component />;
}

export default MyApp;
