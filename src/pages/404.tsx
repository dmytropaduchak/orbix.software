import { Box, Link, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function NotFound() {
  const router = useRouter();

  const onClickBack = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Page Not Found | brainiac.software</title>
        <meta name="description" content="The page you're looking for does not exist. Explore brainiac.software to discover a variety of self-tests and insights." />
        <meta name="keywords" content="404 error, missing page, brainiac.software" />
      </Head>
      <Header/>
      <Box sx={{
        display: "flex",
        alignSelf: "center",
        maxWidth: 720,
        flex: 1,
        padding: 2,
        justifyContent: "center",
        flexDirection: "column",
      }}> 
        <Typography variant="h1" color="primary" sx={{
          fontWeight: 400,
        }}>404</Typography>
        <Typography variant="h2" sx={{
          fontWeight: 100,
        }}>Page Not Found</Typography>
        <Typography variant="body1" sx={{
          fontWeight: 100,
        }}>
          The page you're looking for doesn't seem to exist. It may have been moved, deleted, or never existed. Please try again later, or navigate
          <Link underline="none" onClick={onClickBack} sx={{
            fontWeight: 200,
            marginLeft: 1,
            marginRight: 1,
          }}>
            Back
          </Link>
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
