import { atomWithStorage } from "jotai/utils";
import { PaletteMode } from "@mui/material";

const { name } = require('../../package.json');

export enum CONSENT {
  YES = "yes",
  NO = "no",
}

export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

export enum MESSAGES {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export interface Message {
  type: MESSAGES;
  text: string;
}

export interface State {
  messages: Message[];
  consent?: CONSENT;
  consentSettings?: Record<string, CONSENT>;
  color: string;
  theme: THEMES | PaletteMode;
}

export const atom = atomWithStorage<State>(name, {
  theme: THEMES.DARK,
  color: "#ea3accff",
  messages: [],
});

