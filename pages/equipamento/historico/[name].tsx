import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Historico from "../../../src/components/Historico";
import MenuLateralContext from "../../../src/common/contexts/Menu-lateral";
import Head from "next/head";

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
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  function searchFilter(filterValue: string) {
    if (filterValue == undefined || null) return;
    setFilteredEquipment(
      equipment.filter((e: any) =>
        !filterValue
          ? {}
          : e.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }

  return (
    <>
      <Head>
        <title>Histórico | Visualizer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuLateralContext.Provider
          value={{ equipment, filteredEquipment, path, searchFilter }}
        >
          <MenuLateral />
        </MenuLateralContext.Provider>
        <Historico />
      </div>
    </>
  );
};

export default Produto;
