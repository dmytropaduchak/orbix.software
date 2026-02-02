import { Box, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function Page() {
 return (
    <>
      <Head>
        <title>brainiac.software | A Brand Hub for GitHub Apps</title>
        <meta
          name="description"
          content="brainiac.software is the umbrella brand for GitHub apps and experiments. New tools and product ideas will launch here over time."
        />
        <meta
          name="keywords"
          content="brainiac.software, github apps, developer tools, indie apps, product experiments, software projects"
        />
      </Head>
      <Box sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        <Box sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>
          <Header />
          <Box sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            paddingLeft: 2,
            paddingRight: 2,
          }}>
            <Box sx={{
              maxWidth: 720,
              position: "relative"
            }}>
              {/* <Box sx={{
                position: "absolute",
                left: 0,
                top: -32,
              }}>
                <Chip
                  label="Trusted UK Auto Locksmith Experts"
                  color="secondary"
                  variant="outlined"
                  icon={<SecurityOutlined fontSize="small"/>}
                />
              </Box> */}
              <Typography variant="h1" sx={{
                fontWeight: 500,
                fontSize: 60,
                flexWrap: "wrap",
              }}>
                <Box component="span" sx={{ color: "primary.main" }}>GitHub Applications</Box> and Developer Tools Hub
              </Typography>

              <Typography variant="body1" sx={{
                fontWeight: 300,
              }}>
                A central place to explore GitHub applications and developer tools, ranging from production-ready automations to experimental concepts.
              </Typography>
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
