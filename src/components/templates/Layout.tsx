import Head from "next/head";

import Header from "@/components/organisms/layout/Header";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | NFT MINTINNG`}</title>
      </Head>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};
export default Layout;
