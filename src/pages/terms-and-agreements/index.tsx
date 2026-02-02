import Head from "next/head";
import { Box, Link, Typography } from "@mui/material";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAtom } from "jotai";
import { atom, THEMES } from "../../atom/atom";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export default function TermsAndAgreements() {
  const [data] = useAtom(atom);
  const router = useRouter();

  const backgroundImage = useMemo(() => {
    return data.theme === THEMES.DARK
      ? "radial-gradient(circle at 50% 14em, #333333 0%, #222222 60%, #000000 100%)"
      : "radial-gradient(circle at 50% 14em, #ffffff 0%, #eeeeee 60%, #cccccc 100%)";
  }, [data]);

  const onClickContactUs = useCallback(() => {
    router.push("/contact-us");
  }, [router]);

  return (
    <>
      <Head>
        <title>Terms and Agreements | ORBIX.software</title>
        <meta name="description" content="Read ORBIX.software terms and agreements for using our widget platform, including services, subscriptions, payments, and liability." />
        <meta name="keywords" content="orbix.software terms, terms and agreements, widget platform terms, embed service terms" />
        <link rel="canonical" href="https://orbix.software/terms-and-agreements" />
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
              Terms and Agreements
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}>
              These terms apply to using the ORBIX.software website and widget platform services we provide.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
              Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              By using this website or platform services with{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                ORBIX.software
              </Box>
              , you agree to these Terms and Agreements. If you do not agree, please do not use the site or platform.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Our services
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              We provide an embeddable widget platform that allows you to create, customize, and deploy widgets
              on your websites. Services are subject to your subscription plan and the technical specifications of your integration.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Account and widget creation
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  You are responsible for maintaining the security of your account and any widgets you create.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  You must have the legal right to deploy widgets on the websites where you integrate them.
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  You agree not to use the platform for illegal, harmful, or abusive purposes, or to violate third-party rights.
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Service availability
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  We strive to maintain high availability but cannot guarantee uninterrupted service. Maintenance,
                  updates, or technical issues may cause temporary downtime.
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  We reserve the right to modify, suspend, or discontinue features with reasonable notice.
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Payments and subscriptions
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  Subscriptions are billed according to your selected plan (monthly or annually).
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  You may cancel your subscription at any time. Refunds are handled according to our refund policy.
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Liability
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              We provide the platform "as is" and take reasonable care to maintain security and reliability.
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  We are not responsible for how you use widgets, content displayed within widgets, or issues
                  arising from your integration or third-party services.
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  Nothing in these terms limits liability where it cannot be limited under law (for example, for death
                  or personal injury caused by negligence).
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Changes to these terms
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We may update these terms from time to time. The latest version will always be available on this page.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you have questions about these Terms and Agreements, please{" "}
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
