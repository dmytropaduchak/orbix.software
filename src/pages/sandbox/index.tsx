import { Box, Card, CardActionArea, CircularProgress, Grid, IconButton, Link, Paper, TextField, Tooltip, tooltipClasses, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import Image from 'next/image';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useAtom } from "jotai";
import { atom, WIDGETS } from "../../atom/atom";
import { useRef, useState } from "react";
import { ArrowForwardIos, Description, Phonelink, Refresh } from "@mui/icons-material";

const DEFAULT_URL = "https://mysmi.uk/";

export default function Sandbox() {
  const [data, setData] = useAtom(atom);
  const [view, setView] = useState(false);
  const [place, setPlace] = useState("");
  const [placeError, setPlaceError] = useState("");
  const [key, setKey] = useState(0);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [loading, setLoading] = useState(true);
  const [loadingPlace, setLoadingPlace] = useState(false);

  const theme = useTheme();
  const ref = useRef<HTMLIFrameElement>(null);

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
        flex: 1,
        paddingX: 2,
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
      }}> 
        {data?.widget ? (
          <Grid container spacing={2} flexGrow={1} sx={{
            '& .MuiPaper-root': {
              borderRadius: "20px",
            }
          }}>
            <Grid size={view ? 8.5 : 4} component={Paper} variant="outlined" sx={{
              padding: 2,
              position: "relative",
            }}>
              <Box>
                <Box sx={{
                  display: "flex",
                }}>
                  <Image
                    src="/google.png"
                    width={24}
                    height={24}
                    alt="Google"
                  /> 
                  <Typography sx={{
                    fontWeight: 600,
                    fontSize: 20,
                    marginLeft: 2,
                  }}>Google Reviews</Typography>
                </Box>
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 2,
                }}>
                <Tooltip title={placeError} open={!!placeError} arrow placement="bottom-start">
                  <TextField
                    size="small"
                    fullWidth
                    autoFocus
                    error={!!placeError}
                    placeholder="..."
                    label="Google Map Link or Place ID"
                    variant="outlined"
                    onFocus={() => {
                      setPlaceError('');
                    }}
                    onChange={(ev) => {
                      setPlace(ev.target.value);
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Tooltip title="Next" arrow placement="bottom-start">
                            {loadingPlace ? (
                              <Box>
                                <CircularProgress size={14} />
                              </Box>
                            ) : (
                            <IconButton onClick={async () => {
                              try {
                                if (!place) {
                                  throw new Error("Please enter a Google Maps link.");
                                }
                                setLoadingPlace(true);

                                const data = await fetch(`/api/google/places?url=${encodeURIComponent(place)}`);
                                const dataJson = await data.json();
                                console.log(dataJson);
                              } catch (err) {
                                console.error(err);
                                setPlaceError("We couldn't find this business on Google Maps. Please check the URL and try again.");
                              } finally {
                                setLoadingPlace(false);
                              }
                            }} color="primary" size="small" sx={{
                              marginRight: -0.5
                            }}>
                              <ArrowForwardIos fontSize="small" sx={{
                                fontSize: 14,
                              }} />
                            </IconButton>
                            )}
                          </Tooltip>
                        ),
                      }
                    }}
                  />
                </Tooltip>
                <Typography variant="caption" color="secondary" sx={{
                  marginTop: 1,
                }}>
                  Provide a direct link to your profile on google maps. To find it, go to <Link target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps"><Box sx={{ color: "primary.main" }} component="span">maps.google.com</Box></Link>, find your business, select share and then <Box sx={{ color: "primary.main" }}  component="span">copy link</Box>
                </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size="grow" component={Paper} variant="outlined" sx={{
              display: "flex",
              flexDirection: "column",
            }}>
              <TextField
                size="small"
                fullWidth
                value={url}
                onChange={(e) => {
                  const str = e.target.value?.trim();
                  if (!str) {
                    return;
                  }
                  if (!/^https?:\/\//i.test(str)) {
                    setUrl(`https://${str}`);
                    return;
                  }
                  setUrl(str);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && url) {
                    setLoading(true);

                    const widgetUrl = url;
                    setData({ ...data, widgetUrl });
                    setKey(key ? 0 : 1);
                  }
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Tooltip title="Enter your website URL to preview the widget" arrow placement="bottom-start">
                        {loading ? (
                          <Box sx={{
                            marginRight: 1,
                          }}>
                            <CircularProgress size={14} />
                          </Box>
                        ) : (
                          <Description color="secondary" fontSize="small" sx={{
                            fontSize: 14,
                            marginRight: 1,
                          }}/>
                        )}
                      </Tooltip>
                    ),
                    endAdornment: (
                      <>
                      <IconButton disabled={loading} color={view ? "primary" : "secondary"} size="small" onClick={() => {
                        setView(!view);
                      }}>
                        <Phonelink fontSize="small" sx={{
                          fontSize: 14,
                        }} />
                      </IconButton>
                      <IconButton disabled={loading} onClick={() => {
                        setLoading(true);

                        const widgetUrl = url;
                        setData({ ...data, widgetUrl });
                        setKey(key ? 0 : 1);
                      }} color="secondary" size="small" sx={{
                        marginRight: -0.5
                      }}>
                        <Refresh fontSize="small" sx={{
                          fontSize: 14,
                        }} />
                      </IconButton>
                      </>
                    )
                  },
                }}
                sx={{
                  '& fieldset': {
                    borderRadius: "20px 20px 0 0",
                  }
                }}
                placeholder="..."
              />
              <Box sx={{
                display: "flex",
                flexGrow: 1,
                borderRadius: "0 0 20px 20px",
              }}>
                <iframe
                  ref={ref}
                  src={`${data?.widgetUrl || url}?key=${key}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    zoom: 0.7,
                    borderRadius: "0 0 20px 20px",
                    padding: "1px"
                  }}
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                  onLoad={() => {
                    setLoading(false);
                  }}
                  onError={() => {
                    setLoading(false);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="h1" sx={{
              fontWeight: 600,
              fontSize: 60,
              flexWrap: "wrap",
            }}>
              Widget <Box component="span" sx={{ color: "primary.main", marginLeft: 1 }}>Sandbox</Box>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300, fontSize: 18 }}>
              Explore available widgets and see how they look on your site.
            </Typography>
            <Card
              variant="outlined"
              sx={{
                mt: 4,
                borderRadius: 3,
                maxWidth: 520,
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: 3,
                  borderColor: "primary.main",
                },
              }}
            >
              <CardActionArea
                onClick={() => {
                  setData({
                    ...data,
                    widget: WIDGETS.GOOGLE_REVIEWS,
                  });
                }}
                sx={{
                  p: 2,
                }}
              >
                <Image
                  src="/google.png"
                  width={24}
                  height={24}
                  alt="Google"
                  style={{
                    position: "absolute",
                    right: 16,
                  }}
                /> 
                <Typography fontWeight={600} fontSize={20}>
                  Google Reviews
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  Display authentic Google Reviews on your website to build trust, attract new customers, and strengthen credibility with real customer feedback.
                </Typography>
              </CardActionArea>
            </Card>
          </>
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
