import { useMemo } from "react";
import { atom, THEMES } from "../atom/atom";
import { useAtom } from "jotai";

export const usePalette = () => {
  const [data] = useAtom(atom);
  const mode = data?.theme || THEMES.DARK;
  const main = data?.color || "#ea3accff";
  return useMemo(() => ({
    mode,
    primary: {
      main,
    },
    secondary: {
      main: mode === THEMES.DARK ? "#a1a1a1" : "#000000",
    }
  }), [mode, main]);
}
