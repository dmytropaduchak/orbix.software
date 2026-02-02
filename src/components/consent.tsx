import { Card, CardContent, Typography, SnackbarContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, Accordion, AccordionSummary, AccordionDetails, useTheme, Box } from "@mui/material";
import { useCallback, useState } from "react";
import { useAtom } from "jotai";
import { CONSENT, atom } from "../atom/atom";
import Switch from "./switch";

const settings = [{
  name: "Essential",
  value: CONSENT.NO,
  description: "Essential cookies and services are used to enable core website features, such as ensuring the security of the website.",
}, {
  name: "Marketing",
  value: CONSENT.YES,
  description: "Marketing cookies and services are used to deliver personalized advertisements, promotions, and offers. These technologies enable targeted advertising and marketing campaigns by collecting information about users' interests, preferences, and online activities.",
}, {
  name: "Analytics",
  value: CONSENT.YES,
  description: "Analytics cookies and services are used for collecting statistical information about how visitors interact with a website. These technologies provide insights into website usage, visitor behavior, and site performance to understand and improve the site and enhance user experience.",
}, {
  name: "Functional",
  value: CONSENT.YES,
  description: "Functional cookies and services are used to offer enhanced and personalized functionalities. These technologies provide additional features and improved user experiences, such as remembering your language preferences, font sizes, region selections, and customized layouts. Opting out of these cookies may render certain services or functionality of the website unavailable.",
}].map((i) => ({ ...i, key: i.name.toLowerCase().replace(/\s/g, "-") }));

const defaultSettings = settings.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {});

export default function Consent() {
  const [open, setOpen] = useState(false);
  const [consentSettings, setConsentSettings] = useState<Record<string, CONSENT>>(defaultSettings);
  const [data, setData] = useAtom(atom);

  const theme = useTheme();

  const onClickDeny = useCallback(() => {
    const consent = CONSENT.NO;
    setData({ ...data, consent });
  }, [data, setData]);

  const onClickAccept = useCallback(() => {
    const consent = CONSENT.YES;
    setData({ ...data, consent, consentSettings });
  }, [data, consentSettings, setData]);

  const onClickSwitch = useCallback((key: string) => (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setConsentSettings({ ...consentSettings, [key]: consentSettings[key] === CONSENT.YES ? CONSENT.NO : CONSENT.YES });
  }, [consentSettings, setConsentSettings]);

  const onClickAcceptAll = useCallback(() => {
    const consent = CONSENT.YES;
    const consentSettings = {
      essential: CONSENT.YES,
      marketing: CONSENT.YES,
      analytics: CONSENT.YES,
      functional: CONSENT.YES,
    };
    setData({ ...data, consent, consentSettings });
  }, [data, setData]);

  const onClickConsentSettings = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  if (data.consent) {
    return null;
  }

  return (
    <SnackbarContent elevation={0} sx={{
      padding: 0,
      background: "transparent",
      "& .MuiSnackbarContent-message": {
        padding: 0,
        background: "transparent",
      },
      [theme.breakpoints.down('md')]: {
        display: "none",
      },
    }} message={
      <>
        <Card
          sx={{
            whiteSpace: "normal",
          }}
        >
          <CardContent sx={{
            padding: 2,
            "&:last-child": {
              padding: 2,
            },
          }}>
            <Typography noWrap={false} variant="body2" sx={{
              marginBottom: 2,
            }}>
              <Box component="span" color="primary.main">ORBIX</Box>.software uses a few tracking technologies to keep insights accurate and your experience secure. You can choose what to share.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 16,
                paddingRight: 2,
                paddingLeft: 2,
              }}
              onClick={onClickDeny}
            >
              Deny
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: 16,
                marginLeft: 1,
                paddingRight: 2,
                paddingLeft: 2,
              }}
              onClick={onClickAccept}
            >
              Accept
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                float: "right",
                textTransform: "none",
                borderRadius: 16,
                marginLeft: 1,
                paddingRight: 2,
                paddingLeft: 2,
              }}
              onClick={onClickConsentSettings}
            >
              Consent Settings
            </Button>
          </CardContent>
        </Card>
        <Dialog
          open={open}
          slotProps={{
            paper: {
              elevation: 0,
            }
          }}
        >
          <DialogTitle sx={{
            paddingBottom: 1,
          }}>
            <Typography variant="h6">Your Privacy</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="secondary" sx={{
              paddingBottom: 2,
              fontWeight: 200,
            }}>ORBIX.software uses a few tracking technologies to keep insights accurate and your experience secure. You can choose what to share.</Typography>
            {settings.map((i, key) => (
              <Accordion key={key} slotProps={{
                root: {
                  elevation: 0,
                  variant: "outlined"
                }
              }}>
                <AccordionSummary sx={{
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
                }}>
                  <Typography component="span" sx={{
                    fontWeight: 200,
                  }}>{i.name}</Typography>
                  <Switch color="primary" checked={consentSettings[i.key] === CONSENT.YES} onClick={onClickSwitch(i.key)} />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="secondary" sx={{
                    fontWeight: 200,
                  }}>
                    {i.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </DialogContent>
          <DialogActions sx={{
            display: "block",
            padding: 2,
            paddingTop: 1,
          }}>
            <Button size="small" variant="outlined" color="secondary" sx={{
              borderRadius: 16,
              paddingRight: 2,
              paddingLeft: 2,
              textTransform: "none",
            }} onClick={onClickDeny}>Deny</Button>
            <Button size="small" variant="outlined" color="secondary" onClick={onClickAcceptAll} sx={{
              borderRadius: 16,
              paddingRight: 2,
              paddingLeft: 2,
              textTransform: "none",
            }}>Accept all</Button>
            <Button size="small" variant="contained" color="secondary" onClick={onClickAccept} sx={{
              float: "right",
              borderRadius: 16,
              paddingRight: 2,
              paddingLeft: 2,
              textTransform: "none",
            }}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    } />
  );
}
