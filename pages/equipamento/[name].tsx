import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MenuLateral from "../../src/components/MenuLateral";
import axios from "axios";
import Dashboard from "../../src/components/Dashboard";
import MenuLateralContext from "../../src/common/contexts/Menu-lateral";
import DashboardContext from "../../src/common/contexts/Dashboard";

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
    </React.Fragment>
  );
};

export default Produto;
