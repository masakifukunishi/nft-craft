import { NextPage } from "next";

import Layout from "@/components/templates/Layout";
import LoginTemplate from "@/components/templates/login";

const Login: NextPage = () => {
  return (
    <Layout title="Login">
      <LoginTemplate />
    </Layout>
  );
};

export default Login;
