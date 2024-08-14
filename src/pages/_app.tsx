import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ContextProvider } from "../../context/context";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {

  const publicPages: Array<string> = ['/', '/auth/signin', 'auth/signup'];

  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);
  return (
    <ContextProvider>
      <ClerkProvider {...pageProps}>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </ContextProvider>
  )
}
