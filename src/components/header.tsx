import { Box, Link, Typography } from "@mui/material";
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
        }}>
            <Typography component="h1" sx={{
              fontSize: "12px",
            }}>
              ORBIX.software
            </Typography>
        </Link>
      </Box>
    </Box>
  );
}
