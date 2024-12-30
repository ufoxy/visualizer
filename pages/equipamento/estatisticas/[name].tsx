import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Estatisticas from "../../../src/components/Estatisticas";
import MenuLateralContext from "../../../src/common/contexts/Menu-lateral";
import Head from "next/head";
import SizeBlock from "../../../src/components/Size-block";
import StatisticsContext from "../../../src/common/contexts/Statistics";

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

  const equipmentModel = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentModel/")
    .then((e) => e.data);

  const equipmentPositionHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentPositionHistory/")
    .then((e) => e.data);

  const equipmentStateHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentStateHistory/")
    .then((e) => e.data);

  const equipmentState = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentState/")
    .then((e) => e.data);

  return {
    props: {
      equipment,
      equipmentModel,
      equipmentPositionHistory,
      equipmentStateHistory,
      equipmentState,
    },
  };
}

const Produto: NextPage = ({
  equipment,
  equipmentModel,
  equipmentPositionHistory,
  equipmentStateHistory,
  equipmentState,
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
        <title>Estatísticas | Visualizer</title>
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
        <StatisticsContext.Provider
          value={{
            equipment,
            equipmentModel,
            equipmentPositionHistory,
            equipmentStateHistory,
            equipmentState,
          }}
        >
          <Estatisticas />
        </StatisticsContext.Provider>
      </div>
    </>
  );
};

export default Produto;
