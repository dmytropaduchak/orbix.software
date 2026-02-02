import { Html, Head, Main, NextScript, DocumentContext, DocumentProps } from "next/document";
import { ReactNode } from "react";
import { DocumentHeadTags, DocumentHeadTagsProps, createEmotionCache, documentGetInitialProps } from '@mui/material-nextjs/v15-pagesRouter';
import { Options } from "@emotion/cache";

function Body({ children }: { children: ReactNode }) {
  return <body style={{ margin: 0 }}>{children}</body>
}

export default function _Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang={props.locale || "en"}>
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}

_Document.getInitialProps = async (ctx: DocumentContext) => {
  const enableCssLayer = true;
  const emotionCache = createEmotionCache({ enableCssLayer } as unknown as Options)
  return documentGetInitialProps(ctx, { emotionCache });
}