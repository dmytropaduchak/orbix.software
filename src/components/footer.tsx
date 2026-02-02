import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Typography, useTheme, Box, ClickAwayListener, Tooltip } from "@mui/material";
import { useAtom } from "jotai";
import { HexColorPicker } from "react-colorful";
import { atom, THEMES } from "../atom/atom";
import Switch from "./switch";
import { useRouter } from "next/router";

export default function Footer() {
  const theme = useTheme();
  const [data, setData] = useAtom(atom);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    setChecked(data.theme === THEMES.LIGHT);
  }, [data]);

  const onChangeTheme = useCallback((_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const theme = checked ? THEMES.LIGHT : THEMES.DARK;
    setData({ ...data, theme });
  }, [data, setData]);

  const onChangeColor = useCallback((color: string) => {
    setData({ ...data, color });
  }, [data, setData]);

  const onClickAway = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <Box sx={{
      padding: 2,
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down('md')]: {
          justifyContent: "center",
          flexWrap: "wrap",
          columnGap: 2,
          order: 2
        },
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          [theme.breakpoints.down('md')]: {
            justifyContent: "center",
          },
          '& .ColorPicker .MuiTooltip-tooltip': {
            padding: "4px",
            borderRadius: "12px",
          },
          "& .MuiTooltip-tooltip": {
            padding: 0,
          },
          opacity: 0.6
        }}>
          <ClickAwayListener onClickAway={onClickAway}>
            <div className="ColorPicker">
              <Tooltip
                onClose={onClose}
                open={open}
                arrow
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <HexColorPicker color={data.color} onChange={onChangeColor} />
                }
                slotProps={{
                  popper: {
                    disablePortal: true,
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: data.color || theme.palette.primary.main,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: `1px solid rgba(255,255,255,.35)`,
                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    marginRight: 1,
                  }}
                  onClick={onClickOpen}
                />
              </Tooltip>
            </div>
          </ClickAwayListener>
          <Typography color="secondary" variant="caption">
            © {new Date().getFullYear()} BRAINIAC.software
          </Typography>
        </Box>
        <Box sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Switch size="small" color="primary" aria-label="Change Theme" checked={checked} onChange={onChangeTheme} />
        </Box>
      </Box>
    </Box>
  );
}
