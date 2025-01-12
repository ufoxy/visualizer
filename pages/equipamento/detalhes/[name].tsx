import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Detalhes from "../../../src/components/Detalhes";
import MenuLateralContext from "../../../src/common/contexts/Menu-lateral";
import Head from "next/head";
import SizeBlock from "../../../src/components/Size-block";
import DetailsContext from "../../../src/common/contexts/Details";

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

  const equipmentDetails = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentDetails/")
    .then((e) => e.data);

  const equipmentModel = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentModel/")
    .then((e) => e.data);

  return {
    props: {
      equipment,
      equipmentDetails,
      equipmentModel,
    },
  };
}

const Produto: NextPage = ({
  equipment,
  equipmentDetails,
  equipmentModel,
}: any) => {
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
        <title>Detalhes | Visualizer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SizeBlock />
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
        <DetailsContext.Provider
          value={{ equipment, equipmentDetails, equipmentModel }}
        >
          <Detalhes />
        </DetailsContext.Provider>
      </div>
    </>
  );
};

export default Produto;
