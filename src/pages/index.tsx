import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function Page() {
 return (
    <>
      <Head>
        <title>Orbix | Google Reviews Widget for Any Website</title>
        <meta
          name="description"
          content="Embed beautiful Google Reviews widgets on your site in minutes. No iframes. Fully customizable. Fast, SEO-safe, and secure."
        />
        <meta
          name="keywords"
          content="google reviews widget, reviews embed, testimonials, social proof, saas"
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
            <Stack spacing={3} sx={{ maxWidth: 900 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Chip label="Google Reviews Widget" color="secondary" variant="outlined" />
              </Box>
              <Typography variant="h1" sx={{
                fontWeight: 600,
                fontSize: { xs: 36, md: 64 },
              }}>
                Turn Google Reviews into
                <Box component="span" sx={{ color: "primary.main", marginLeft: 1 }}>instant trust</Box>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 300, fontSize: 18 }}>
                Create a beautiful, fast, and fully customizable reviews widget.
                Copy one script tag and embed it anywhere. No iframes. No bloat.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                <Button variant="contained" size="large">Get started</Button>
                <Button variant="outlined" size="large">Live demo</Button>
              </Stack>
              <Box sx={{ marginTop: 4 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {[
                    "Shadow DOM isolation",
                    "Custom themes",
                    "Cache reviews",
                    "Fast API",
                  ].map((item) => (
                    <Chip key={item} label={item} variant="outlined" color="secondary" />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ width: "100%", paddingX: 2, paddingBottom: 6 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
                maxWidth: 1200,
                margin: "0 auto",
              }}
            >
              {[
                {
                  title: "Connect a place",
                  desc: "Paste a Google Maps URL, CID, or Place ID. We resolve and fetch reviews.",
                },
                {
                  title: "Customize",
                  desc: "Pick layout, colors, and review filters to match your brand.",
                },
                {
                  title: "Embed",
                  desc: "Use one script tag: www.orbix.software/widget/UUID.js",
                },
              ].map((card) => (
                <Box
                  key={card.title}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 300 }}>
                    {card.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
