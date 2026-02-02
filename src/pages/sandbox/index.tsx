import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useAtom } from "jotai";
import { atom } from "../../atom/atom";

export default function Sandbox() {
  // const router = useRouter();
  const [data] = useAtom(atom);

  return (
    <>
      <Head>
        <title>Sandbox | ORBIX.software</title>
        <meta name="description" content="Test and preview ORBIX.software widgets in a safe sandbox environment before deploying to production." />
        <meta name="keywords" content="widget sandbox, embed testing, ORBIX.software, widget preview" />
      </Head>
      <Header/>
      <Box sx={{
        display: "flex",
        alignSelf: "center",
        // maxWidth: 720,
        flex: 1,
        padding: 2,
        justifyContent: "center",
        flexDirection: "column",
      }}> 
        {data?.widget ? (
          <>{data?.widget}</>
        ) : (
          <Typography variant="h1" sx={{
            fontWeight: 600,
            fontSize: 60,
            flexWrap: "wrap",
            // fontSize: { xs: 36, md: 64 },
          }}>
            Widget <Box component="span" sx={{ color: "primary.main", marginLeft: 1 }}>Sandbox</Box>
            {/* Powerful Widgets
            Effortless Integration</Box> */}
          </Typography>
        )}


        {/* <Typography variant="h1" color="primary" sx={{
          fontWeight: 400,
        }}>Widget Sandbox</Typography>
        <Typography variant="h2" sx={{
          fontWeight: 100,
        }}>Test Your Widgets</Typography>
        <Typography variant="body1" sx={{
          fontWeight: 100,
        }}>
          Use this sandbox environment to test and preview your widgets before deploying to production. You can experiment with different configurations and see how they behave in a controlled setting.
        </Typography>
        <Typography variant="body1" sx={{
          fontWeight: 100,
          marginTop: 2,
        }}>
          Navigate{" "}
          <Link underline="none" onClick={onClickBack} sx={{
            fontWeight: 200,
            marginLeft: 1,
            marginRight: 1,
            cursor: "pointer",
          }}>
            back to home
          </Link>
          {" "}or create a widget to get started.
        </Typography> */}
      </Box>
      <Footer />
    </>
  );
}
