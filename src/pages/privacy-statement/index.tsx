import Head from "next/head";
import { Box, Link, Typography } from "@mui/material";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useAtom } from "jotai";
import { atom, THEMES } from "../../atom/atom";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export default function PrivacyStatement() {
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
        <title>Privacy Statement | ORBIX.software</title>
        <meta name="description" content="Learn how ORBIX.software collects, uses, and protects your personal data when you use our widget platform and services." />
        <meta name="keywords" content="orbix.software privacy, privacy statement, UK GDPR, data protection, widget platform" />
        <link rel="canonical" href="https://orbix.software/privacy-statement" />
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
              Privacy Statement
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}>
              Your privacy matters. This statement explains how we collect, use, and protect personal data when you use
              ORBIX.software and our widget platform services.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
              Who we are
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                ORBIX.software
              </Box>{" "}
              provides an embeddable widget platform for developers and businesses. We aim to comply with applicable UK data protection laws,
              including the UK GDPR and the Data Protection Act 2018.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Personal data we collect
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              Depending on how you interact with us, we may collect:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Contact details:
                  </Box>{" "}
                  name, phone number, email address.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Widget configuration:
                  </Box>{" "}
                  widget settings, customization options, integration domains, and usage data.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Communications:
                  </Box>{" "}
                  messages and information you send via email or contact forms.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Usage data:
                  </Box>{" "}
                  basic technical data such as IP address, browser type, device information, pages viewed, and referring
                  URLs (typically collected in an aggregated way).
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    Preferences:
                  </Box>{" "}
                  your theme and color selection saved in your browser (for example, local storage).
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              How we use your data
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary" }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  Provide widgets, maintain your account, and deliver the services you requested.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  Respond to enquiries and communicate about your widgets or account.
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  Improve our platform, reliability, and user experience.
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body1" color="text.secondary">
                  Maintain security, prevent fraud, and comply with legal obligations.
                </Typography>
              </Box>
            </Box>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Legal basis for processing
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              We process personal data where it’s necessary to perform a contract (or take steps at your request before
              a contract), to comply with legal obligations, for our legitimate interests (such as operating and
              securing the website), or with your consent where required (for example, certain analytics or marketing).
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Sharing your information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              We do not sell your personal data. We may share information with service providers who help us operate
              our platform and communications (for example, hosting, analytics, email, and payment processors), or where required by law.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Data retention
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We keep personal data only as long as necessary for the purposes described above, including maintaining
              your account, providing widgets, handling enquiries, and meeting legal or accounting obligations.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Security
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We use appropriate technical and organisational measures to protect data, including access controls and
              secure systems. No online system is 100% secure, but we take reasonable steps to reduce risk.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Your rights
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              Under UK data protection law, you may have rights including access, correction, deletion (where
              applicable), restriction, portability, objection, and withdrawal of consent.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Cookies
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              For details about cookies and similar technologies, please see our{" "}
              <Link href="/cookie-statement" underline="none" sx={{ "&:hover": { color: "primary.main" } }}>
                Cookie Statement
              </Link>
              .
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Updates
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We may update this Privacy Statement from time to time to reflect changes in our practices or legal
              requirements. The latest version will always be available on this page.
            </Typography>

            <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 1, mt: 3 }}>
              Contact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              If you have questions about privacy or want to exercise your rights, please{" "}
              <Link
                onClick={onClickContactUs}
                underline="none"
                sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
              >
                contact us
              </Link>{" "}
              or email{" "}
              <Link underline="none" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} sx={{ "&:hover": { color: "primary.main" } }}>
                {process.env.NEXT_PUBLIC_EMAIL}
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
