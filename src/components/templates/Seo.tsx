import Head from "next/head";

type Props = {
  title: string;
  isUseDefaultTitle?: boolean;
};

const Seo = ({ title, isUseDefaultTitle = true }: Props) => {
  const effectiveTitle = isUseDefaultTitle ? `${title} | NFT Craft` : title;
  const description =
    "Discover the future of digital art ownership with our platform. Mint your own unique NFTs effortlessly and become part of an ever-expanding universe of creativity. Dive into a seamless experience where innovation meets digital asset security.";
  const url = "https://nft-craft-ten.vercel.app/";
  const imgUrl = "https://nft-craft-ten.vercel.app/ogp.png";
  const imgWidth = 1280;
  const imgHeight = 640;
  const ogpTitle = "NFT Craft";

  return (
    <Head>
      <title>{effectiveTitle}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="keywords" content="NFT, digital art, minting, blockchain" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogpTitle} />
      <meta property="og:site_name" content={ogpTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={ogpTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default Seo;
