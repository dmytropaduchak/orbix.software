import { FC } from "react";

type Props = {
  size?: number;
  color?: string;
};


const FAQ: FC<Props> = ({
  size = 64,
  color = "currentColor",
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

  <path d="M285 90h160a45 45 0 0 1 45 45v155a45 45 0 0 1-45 45H360l-55 70v-70h-20a45 45 0 0 1-45-45V135a45 45 0 0 1 45-45z" />

  <path d="M40 120h300a45 45 0 0 1 45 45v150a45 45 0 0 1-45 45H205l-80 95v-95H85a45 45 0 0 1-45-45V165a45 45 0 0 1 45-45z" />

  <path d="M125 195h45v35h-45zm0 40h45v75h-45zM200 195h45l25 115h-45l-5-30h-40l-5 30h-45zm-15 55h20l-10-40zM305 200c35 0 60 25 60 60 0 22-12 40-30 50l15 20h-40l-10-15c-30-3-50-28-50-55 0-35 25-60 55-60zm0 35c-15 0-25 10-25 25s10 25 25 25 25-10 25-25-10-25-25-25z" fill="#ffffff"/>
</svg>
  );
};

export default FAQ;