import React, { Children } from "react";
import { useRouter } from "next/router";
import useGetEarningCalculatorById from "../hooks/getEarningCalculatorById";
import useGetModel from "../hooks/getModel";
import useGetProductivityPercentageById from "../hooks/getProductivityPercentageById";
import useGetPositionById from "../hooks/getPositionById";
import useGetStateById from "../hooks/getStateById";
import useGetStatusClassById from "../hooks/getStatusClassById";
import formatStringDate from "../utils/formatStringDate";

import styles from "../../styles/components/Dashboard.module.scss"

function Dashboard({
  equipment,
  equipmentModel,
  equipmentPositionHistory,
  equipmentStateHistory,
  equipmentState,
}: any) {
  const { query } = useRouter();

  // console.log(equipment);
  // console.log(equipmentModel);
  // console.log(equipmentPositionHistory);
  // console.log(equipmentStateHistory);
  // console.log(equipmentState);

  return (
    <React.Fragment>
      <section className={styles.section}>
        <div className={styles.flex}>
          <p>
            {`Percentual de Produtividade: ${useGetProductivityPercentageById(
              query.id,
              equipment,
              equipmentModel,
              equipmentStateHistory
            ).replace(".", ",")}%`}
          </p>
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
        <div className={styles.flex}>
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
        <div className={styles.flex}>
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
      </section>
    </React.Fragment>
  );
}

export default Dashboard;
