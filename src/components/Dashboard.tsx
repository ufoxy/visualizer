import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useGetEarningCalculatorById from "../hooks/getEarningCalculatorById";
import useGetModel from "../hooks/getModel";
import useGetPositionById from "../hooks/getPositionById";
import useGetStateById from "../hooks/getStateById";
import useGetStatusClassById from "../hooks/getStatusClassById";
import formatStringDate from "../utils/formatStringDate";

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

function Dashboard({
  children,
  equipment,
  equipmentModel,
  equipmentPositionHistory,
  equipmentStateHistory,
  equipmentState,
}: any) {
  const { query } = useRouter();

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          margin: "5px 5px 5px 0",
          backgroundColor: "#3A506B",
        }}
      >
        <div className="flex">
          {/* <p>
            {`Percentual de Produtividade: ${useGetProductivityPercentageById(
              query.id,
              equipment,
              equipmentModel,
              equipmentStateHistory
            ).replace(".", ",")}%`}
          </p> */}
          <p>
            {`Ganhos Gerados: R$${useGetEarningCalculatorById(
              query.id,
              equipmentModel,
              equipmentStateHistory,
              equipment
            )
              .toFixed(2)
              .replace(".", ",")}`}
          </p>
        </div>
        <div className="flex">
          <p>
            {`Posição Atual: ${useGetPositionById(
              query.id,
              equipmentPositionHistory
            ).map((e: any) => `${e.position.lat}, ${e.position.lon}`)}`}
          </p>
          <p>
            {`Última Atualização: ${useGetPositionById(
              query.id,
              equipmentPositionHistory
            ).map((e: any) => formatStringDate(e.date))}`}
          </p>
        </div>
        <div className="flex">
          <p>
            {`Status: `}
            <span
              className={`circle-dot ${useGetStatusClassById(
                query.id,
                equipmentStateHistory,
                equipmentState
              )}`}
            ></span>
            {`${useGetStateById(
              query.id,
              equipmentStateHistory,
              equipmentState
            ).map((e: any) => e.state.map((e: any) => e.name))}`}
          </p>
          <p>
            {`Última Atualização: ${useGetStateById(
              query.id,
              equipmentStateHistory,
              equipmentState
            ).map((e: any) => formatStringDate(e.date))}`}
          </p>
        </div>
        <h1>o id é: {query.id}</h1>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
function useGetProductivityPercentageById(
  id: any,
  equipment: any,
  equipmentModel: any,
  equipmentStateHistory: any
) {
  throw new Error("Function not implemented.");
}
