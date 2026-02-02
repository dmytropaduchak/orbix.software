import Head from "next/head";
import { Box, Link, Typography } from "@mui/material";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAtom } from "jotai";
import { atom, THEMES } from "../../atom/atom";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export default function CookieStatement() {
  const [data] = useAtom(atom)

  const router = useRouter();
  
  const backgroundImage = useMemo(() => {
    return data.theme === THEMES.DARK
      ? 'radial-gradient(circle at 50% 14em, #333333 0%, #222222 60%, #000000 100%)' 
      : 'radial-gradient(circle at 50% 14em, #ffffff 0%, #eeeeee 60%, #cccccc 100%)';
  }, [data]);

  const onClickContactUs = useCallback(() => {
    router.push("/contact-us");
  }, [router]);

  return (
    <>
      <Head>
        <title>Cookie Statement | ORBIX.software</title>
        <meta name="description" content="Learn how ORBIX.software uses cookies and similar technologies to keep the platform working, remember preferences, and understand performance." />
        <meta name="keywords" content="orbix.software cookies, cookie statement, cookie policy, widget platform, website analytics, preferences" />
        <link rel="canonical" href="https://orbix.software/cookie-statement" />
      </Head>
      <Box sx={{
        backgroundImage,
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        flexDirection: "column",
      }}>
        <Header />
        <Box sx={{
          maxWidth: 1200,
          flex: 1,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <Box sx={{ maxWidth: 900 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 1,
                fontSize: "2.1rem",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Cookie Statement
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}>
              How ORBIX.software uses cookies and similar technologies.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
              Introduction
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              At <Box component="span" sx={{ color: "primary.main" }}> ORBIX.software </Box>, we use cookies (and similar technologies such as local storage) to keep the platform working, remember
              your preferences (like theme and color), and understand how people use the site so we can improve it.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              What are cookies?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Cookies are small text files stored on your device when you visit a website. They help websites work
              correctly, remember your preferences, and collect analytics data to understand what’s working well and
              what needs improvement.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              How we use cookies
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              We use cookies (and similar technologies) for these purposes:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Essential:
                  </Box>{" "}
                  Needed for the site to load and function securely (for example, page routing and basic features).
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Performance &amp; analytics:
                  </Box>{" "}
                  Helps us understand how visitors use pages and features, so we can improve speed, reliability, and
                  content.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Preferences:
                  </Box>{" "}
                  Stores your choices like theme (dark/light) and the accent color you select.
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Marketing:
                  </Box>{" "}
                  We do not run third-party advertising on ORBIX.software. If we ever add marketing cookies in the future,
                  we’ll update this page and request consent where required.
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Manage cookie preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              You can manage or delete cookies anytime through your browser settings. Disabling some cookies may affect
              site functionality or saved preferences.
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Box component="li">
                <Link href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noreferrer">
                  Chrome
                </Link>
              </Box>
              <Box component="li">
                <Link href="https://support.apple.com/en-in/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">
                  Safari
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&redirectlocale=en-US"
                  target="_blank"
                  rel="noreferrer"
                >
                  Firefox
                </Link>
              </Box>
              <Box component="li">
                <Link
                  href="https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc"
                  target="_blank"
                  rel="noreferrer"
                >
                  Microsoft Edge
                </Link>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Updates
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We may update this Cookie Statement from time to time to reflect changes to the website or legal
              requirements. Any updates will be posted here.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you have questions about this Cookie Statement, please{" "}
              <Link
                onClick={onClickContactUs}
                underline="none"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
              >
                contact us
              </Link>
              .
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
