import React, { Children } from "react";
import { useRouter } from "next/router";
import useGetEarningCalculatorById from "../hooks/getEarningCalculatorById";
import useGetModel from "../hooks/getModel";
import useGetProductivityPercentageById from "../hooks/getProductivityPercentageById";
import useGetPositionById from "../hooks/getPositionById";
import useGetStateById from "../hooks/getStateById";
import useGetStatusClassById from "../hooks/getStatusClassById";
import formatStringDate from "../utils/formatStringDate";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "../../styles/components/Dashboard.module.scss"
import Tabs from "./Tabs/Tabs";
import { BiNotepad } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";

function Dashboard({
  equipment,
  equipmentModel,
  equipmentPositionHistory,
  equipmentStateHistory,
  equipmentState,
}: any) {
  const { query } = useRouter();

  const model = useGetModel(
    query.id, 
    equipment, 
    equipmentModel
    ).map((e:any) => e.name)
    // Modelo do equipamento
  const productivityPercentage = useGetProductivityPercentageById(
    query.id,
    equipment,
    equipmentModel,
    equipmentStateHistory
  ).replace(".", ",")
    // Percentual de produtividade usando a fórmula a seguir: (Total de operações / 24) * 100
  const earnings = useGetEarningCalculatorById(
    query.id,
    equipmentModel,
    equipmentStateHistory,
    equipment
  ).toFixed(2).replace(".", ",")
    // Ganhos gerados no dia atual
  const position = useGetPositionById(
    query.id,
    equipmentPositionHistory
  ).map((e: any) => `${e.position.lat}, ${e.position.lon}`)
    // Posição atual do equipamento em latitude e longitude.
  const positionLastAtt = useGetPositionById(
    query.id,
    equipmentPositionHistory
  ).map((e: any) => formatStringDate(e.date))
    // Última atualização de posição do equipamento em data e horário.
  const stateColor = useGetStatusClassById(
    query.id,
    equipmentStateHistory,
    equipmentState
  )
    // className com as alterações de cor de cada tipo de estado. ex; Vermelho para parado.
  const state = useGetStateById(
    query.id,
    equipmentStateHistory,
    equipmentState
  ).map((e: any) => e.state.map((e: any) => e.name))
    // Estaddo atual do equipamento. ex; Parado.
  const stateLastAtt = useGetStateById(
    query.id,
    equipmentStateHistory,
    equipmentState
  ).map((e: any) => formatStringDate(e.date))
    // Última atualização de estado do equipamento em data e horário.
  const dateFromState = useGetStateById(
    query.id,
    equipmentStateHistory,
    equipmentState
  ).map((e: any) => e.date)
  const date = new Date(dateFromState[0]).toLocaleDateString()
    // Data atual

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <div className={styles.info}>
          <div className={styles.flex}>
            <div className={styles.name_and_model_info}>
              <h1>{`Nome: ${query.name}`}</h1>
              <h2>{`Modelo: ${model}`}</h2>
            </div>
            <BiNotepad fontSize={63}/>
          </div>
          <div className={styles.flex}>
          </div>
          <div className={styles.flex}>
            <p className={styles.other_info}>{`Posição Atual: ${position}`}</p>
            <p className={styles.other_info}>{`Última Atualização: ${positionLastAtt}`}</p>
          </div>
          <div className={styles.flex}>
            <p className={styles.other_info}>
              {`Status: `}
              <span
                className={`circle-dot ${stateColor}`}
              ></span>
              {`${state}`}
            </p>
            <p className={styles.other_info}>{`Última Atualização: ${stateLastAtt}`}</p>
          </div>
        </div>

        <div className={styles.flex}>
          <div className={styles.earnings}>
            <h2>Receita <abbr title={`Receita gerada hoje ${date}`}><BsInfoCircle className={styles.icon} /></abbr> </h2>
            <h3><small className={styles.small}>R$</small>{`${earnings}`}</h3>
          </div>
          <div className={styles.productivity_percentage}>
            <h2>Percentual de Produtividade <abbr title="Fórmula: (Operações Produtivas) / 24 * 100"><BsInfoCircle className={styles.icon} /></abbr></h2>
            <div className={styles.productivity_percentage_div}>
              <p>{`${productivityPercentage}%`}</p>
              <div style={{width:'160px', padding:'25px 0', margin:'0'}}>
                <CircularProgressbar value={parseFloat(productivityPercentage.replace(',', '.'))} text={`${productivityPercentage}%`} />
              </div>
            </div>
          </div>
        </div>

        <div style={{height: '120px'}}></div>

      </section>
    </React.Fragment>
  );
}

export default Dashboard;
