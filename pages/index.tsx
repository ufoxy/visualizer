import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../src/components/MenuLateral";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.scss";
import MapContext from "../src/common/contexts/Map";
import MenuLateralContext from "../src/common/contexts/Menu-lateral";

const DEFAULT_CENTER = [38.907132, -77.036546];

export async function getStaticProps() {
  const equipment = await axios
    .get("https://visualizer-blue.vercel.app/api/equipment/")
    .then((e) => e.data);

  const equipmentPositionHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentPositionHistory/")
    .then((e) => e.data);

  const equipmentModel = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentModel/")
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
      equipmentPositionHistory,
      equipmentModel,
    },
  };
}

const Home: NextPage = ({
  equipment,
  equipmentPositionHistory,
  equipmentModel,
}: any) => {
  const Map = dynamic(() => import("../src/components/Map"), {
    ssr: false,
  });
  function MapCaller({
    equipment,
    equipmentPositionHistory,
    equipmentModel,
  }: any) {
    return <Map />;
  }

  const path = "equipamento/";

  return (
    <React.Fragment>
      <section className={styles.section}>
        <MenuLateralContext.Provider value={{ equipment, path }}>
          <MenuLateral />
        </MenuLateralContext.Provider>
        <MapContext.Provider
          value={{ equipment, equipmentPositionHistory, equipmentModel }}
        >
          <MapCaller />
        </MapContext.Provider>
      </section>
    </React.Fragment>
  );
};

export default Home;
