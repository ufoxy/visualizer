import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MenuLateral from "../../src/components/MenuLateral";
import axios from "axios";
import Dashboard from "../../src/components/Dashboard";
import MenuLateralContext from "../../src/common/contexts/Menu-lateral";
import DashboardContext from "../../src/common/contexts/Dashboard";
import Head from "next/head";
import SizeBlock from "../../src/components/Size-block";

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
    revalidate: 10,
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
        <title>Equipamento | Visualizer</title>
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
        <DashboardContext.Provider
          value={{
            equipment,
            equipmentModel,
            equipmentPositionHistory,
            equipmentStateHistory,
            equipmentState,
          }}
        >
          <Dashboard />
        </DashboardContext.Provider>
      </div>
    </>
  );
};

export default Produto;
