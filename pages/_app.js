import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Footer from "../components/Footer";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Layout>
      <Head>
        <title>Piece of Mind</title>
        <meta name="description" content="An Online Freedom Wall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </Layout>
  );
}
