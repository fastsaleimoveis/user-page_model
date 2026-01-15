interface GoogleAdsHeadProps {
  gtagId: string;
}

export function GoogleAdsHead({ gtagId }: GoogleAdsHeadProps) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
        suppressHydrationWarning
      />
      <script
        id={`google-ads-config-${gtagId}`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}');
          `,
        }}
      />
    </>
  );
}

