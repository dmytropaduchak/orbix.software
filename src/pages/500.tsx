import { Box, Link, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function InternalServerError() {
  const router = useRouter();

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Server Error | ORBIX.software</title>
        <meta name="description" content="Something went wrong. Our team is working to resolve this issue. Please try again shortly." />
        <meta name="keywords" content="500 error, server error, technical issue, ORBIX.software" />
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
        }}>500</Typography>
        <Typography variant="h2" sx={{
          fontWeight: 100,
        }}>Internal Server Error</Typography>
        <Typography variant="body1" sx={{
          fontWeight: 100,
        }}>
          We're aware of the issue and actively working to resolve it as quickly as possible. Please try again later, or navigate
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
