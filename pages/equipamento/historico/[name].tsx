import React from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Historico from "../../../src/components/Historico";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const equipment = await axios
    .get("https://visualizer-blue.vercel.app/api/equipment/")
    .then((e) => e.data);

  return {
    props: {
      equipment,
    },
  };
}

const Produto: NextPage = ({ equipment }: any) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuLateral equipment={equipment} />
        <Historico />
      </div>
    </React.Fragment>
  );
};

export default Produto;
