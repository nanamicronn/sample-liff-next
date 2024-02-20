import {liff, Liff} from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Home = () => {
    const [liffObject, setLiffObject] = useState<Liff | null>(null);
    const [liffError, setLiffError] = useState<string | null>(null);
    const [hoge, setHoge] = useState<string>('');
    const router = useRouter()
    // Execute liff.init() when the app is initialized
    useEffect(() => {
        const fetchHoge = async () => {
            const res= await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
            const data = await res.json()
            setHoge(JSON.stringify(data))

        }
        liff
            .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
            .then(() => {
                console.log("LIFF init succeeded.");
                console.log(liff.getIDToken())
                setLiffObject(liff);
            })
            .catch((error: Error) => {
                console.log("LIFF init failed.");
                setLiffError(error.toString());
            });
        if(liffObject){
            void fetchHoge()
        }
    }, [liffObject, router]);

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liffObject && <p>LIFF init succeeded.</p>}
        {liffObject && <p>{liffObject.getIDToken()}</p>}
        {hoge}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
      </main>
    </div>
  );
};

export default Home;
