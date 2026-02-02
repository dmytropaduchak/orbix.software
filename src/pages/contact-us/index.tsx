import Head from "next/head";
import { Box, Typography } from "@mui/material";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAtom } from "jotai";
import { atom, THEMES } from "../../atom/atom";
import { useMemo } from "react";

export default function ContactUs() {
  const [data] = useAtom(atom);

  const backgroundImage = useMemo(() => {
    return data.theme === THEMES.DARK
      ? "radial-gradient(circle at 50% 14em, #333333 0%, #222222 60%, #000000 100%)"
      : "radial-gradient(circle at 50% 14em, #ffffff 0%, #eeeeee 60%, #cccccc 100%)";
  }, [data]);

  return (
    <>
      <Head>
        <title>Contact Us | ORBIX.software</title>
        <meta name="description" content="Get in touch with ORBIX.software for widget platform support, custom integration help, partnership opportunities, or technical assistance." />
        <meta name="keywords" content="contact ORBIX.software, widget platform support, embed integration help, developer support" />
        <link rel="canonical" href="https://orbix.software/contact-us" />
      </Head>
      <Box
        sx={{
          backgroundImage,
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Header />

        <Box
          sx={{
            maxWidth: 1200,
            flex: 1,
            mx: "auto",
            px: { xs: 2, md: 4 },
            py: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 900 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 1,
                fontSize: "2.1rem",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}>
              We're here to help with your widget platform questions, integrations, and technical support needs.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Feedback &amp; Suggestions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              Your experience matters. If you have feedback or ideas for improving our service or website, let us know
              — we’re always listening.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Partnership Opportunities
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              Interested in collaborating with mySMI.uk? We’re open to working with garages, dealerships, recovery
              operators, fleet managers, and local businesses. Contact us to explore opportunities.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Technical Support
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              If you encounter any issues with the website (pages not loading, forms not working, or links), please
              include your device, browser, and a short description of what happened so we can fix it quickly.
            </Typography>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}
