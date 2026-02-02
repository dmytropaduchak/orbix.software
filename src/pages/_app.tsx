import type { AppProps } from "next/app";
import { ReactNode, useState, useEffect, useMemo } from "react";
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { Box, CircularProgress, CssBaseline, Stack } from "@mui/material";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Router from "next/router";
import { useRouter } from "next/router";
import Head from "next/head";
import { usePalette } from "../palette/palette";
import { useAtom } from "jotai";
import { atom, THEMES } from "../atom/atom";
import Ukraine from "../components/ukraine";
import Consent from "../components/consent";

const cssVariables = true;

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

function Main({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [routing, setRouting] = useState(false);
  const [data] = useAtom(atom);
  const theme = useTheme();

  const backgroundImage = useMemo(() => {
    return theme.palette.mode === THEMES.DARK
      ? 'radial-gradient(circle at 50% 14em, #333333 0%, #222222 60%, #000000 100%)' 
      : 'radial-gradient(circle at 50% 14em, #ffffff 0%, #eeeeee 60%, #cccccc 100%)';
  }, [theme]);

  useEffect(() => {
    const handleRouteStart = () => {
      setRouting(true);
    }
    const handleRouteDone = () => {
      setRouting(false);
    }

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, [setRouting, data]);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (loading) {
    return null;
  }

  if (routing) {
    return (
      <Box sx={{
        backgroundImage,
        height: '100vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <CircularProgress size={21} />
      </Box>
    );
  }

  return (
    <main className={roboto.className}>
      <Box sx={{
        backgroundImage,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
        <Stack sx={{
          position: "fixed",
          zIndex: 1000,
          right: "8px",
          bottom: "8px",
          width: 380,
          [theme.breakpoints.down('sm')]: {
            width: "auto",
            paddingRight: 1,
          },
        }} spacing={1}>
          <Consent />
          <Ukraine />
        </Stack>
        {children}
      </Box>
    </main>
  )
}

function Body({ children }: { children: ReactNode }) {
  const palette = usePalette();
  const theme = createTheme({ palette, cssVariables });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main>{children}</Main>
    </ThemeProvider>
  );
}

export default function _App(props: AppProps) {
  const { Component, pageProps } = props;

  const { asPath } = useRouter();

  const canonicalPath = useMemo(() => {
    const path = asPath.split(/[?#]/)[0] || "/";
    return path.startsWith("/") ? path : `/${path}`;
  }, [asPath]);
  
  const canonicalUrl = `https://www.brainiac.software${canonicalPath}`;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="signalVision.io" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Body>
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </Body>
    </AppCacheProvider>
  );
}
