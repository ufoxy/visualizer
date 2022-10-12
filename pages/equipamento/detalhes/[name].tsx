import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import MenuLateral from "../../../src/components/MenuLateral";
import Detalhes from "../../../src/components/Detalhes";
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
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuLateralContext.Provider value={{ equipment, filteredEquipment, path, searchFilter }}>
          <MenuLateral />
        </MenuLateralContext.Provider>
        <Detalhes />
      </div>
    </React.Fragment>
  );
};

export default Produto;
