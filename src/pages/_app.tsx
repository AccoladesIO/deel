import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "../../context/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
