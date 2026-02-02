import { Box, Button, Link, Typography } from "@mui/material";
import { useCallback } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Box sx={{
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
      padding: 2,
    }}>
      <Box>
        <Link underline="none" color="secondary" href="/" onClick={onClick} sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 1,
        }}>
          <Typography component="h1" sx={{
            fontSize: "12px",
          }}>
            <Box component="span" color="primary.main">ORBIX</Box>.software
          </Typography>
        </Link>
      </Box>
      <Box>

        {/* <Button
          variant="text"
          color="secondary"
          // onClick={onClickSignIn}
          href="/donate"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          Pricing
        </Button> */}
        <Button
          variant="text"
          color="primary"
          // onClick={onClickSignIn}
          href="/donate"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          Donate
        </Button>
        {/* <Button
          variant="text"
          color="secondary"
          // onClick={onClickSignIn}
          href="/sandbox"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          Sandbox
        </Button> */}
        <Button
          variant="text"
          color="secondary"
          // onClick={onClickSignIn}
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 2,
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          // onClick={onClickSignIn}
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 16,
            paddingRight: 2,
            paddingLeft: 2,
            marginLeft: 1,
          }}
        >
          Create a Widget
        </Button>
        {/* <IconButton
          size="small"
          color="secondary"
          onClick={onOpen}
        >
          <Avatar sx={{ width: 20, height: 20, bgcolor: "#6f6f6f" }} src="/icon.svg" />
        </IconButton> */}
      </Box>
    </Box>
  );
}
