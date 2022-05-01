import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";

import Head from "next/head";
import { Partytown } from "@builder.io/partytown/react";

import dataProvider from "@pankod/refine-simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

export const PostIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

import { Layout } from "components/Layout";
import { PostList } from "pages/posts/list";
import { PostShow } from "pages/posts/show";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        { name: "posts", icon: PostIcon, list: PostList, show: PostShow },
      ]}
      Layout={Layout}
    >
      <Head>
        <Partytown debug={true} forward={["dataLayer.push"]} />
      </Head>

      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
