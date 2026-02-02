import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function Page() {
 return (
    <>
      <Head>
        <title>Orbix | Embeddable Widgets & Tools Platform</title>
        <meta
          name="description"
          content="Build and embed custom widgets on any website. Fast, secure, and production-ready. Add reviews, consent banners, chat, forms, and more with one script tag."
        />
        <meta
          name="keywords"
          content="embeddable widgets, website widgets, embed platform, iframe widgets, website tools, SaaS"
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
                <Chip label="Embed Platform" color="secondary" variant="outlined" />
              </Box>
              <Typography variant="h1" sx={{
                fontWeight: 600,
                fontSize: { xs: 36, md: 64 },
              }}>
                Powerful widgets,
                <Box component="span" sx={{ color: "primary.main", marginLeft: 1 }}>effortless integration</Box>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 300, fontSize: 18 }}>
                Deploy custom widgets to any website with a single script tag. 
                Built for performance, security, and scale. No configuration required.
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
                    "iframe sandbox",
                    "Custom themes",
                    "Auto-scaling",
                    "Global CDN",
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
                  title: "Configure",
                  desc: "Set up your widget with custom data, styling, and behavior options.",
                },
                {
                  title: "Customize",
                  desc: "Choose layouts, colors, and content filters to match your brand.",
                },
                {
                  title: "Deploy",
                  desc: "Copy the embed code and drop it into any website. Live in seconds.",
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
