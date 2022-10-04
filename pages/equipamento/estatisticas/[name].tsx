import React from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Estatisticas from "../../../src/components/Estatisticas";
import MenuLateralContext from "../../../src/common/contexts/Menu-lateral";

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
  const path = "";

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuLateralContext.Provider value={{ equipment, path }}>
          <MenuLateral />
        </MenuLateralContext.Provider>
        <Estatisticas />
      </div>
    </React.Fragment>
  );
};

export default Produto;
