import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import DetailsContext from "../common/contexts/Details";
import Tabs from "./Tabs/Tabs";
import BlueLabel from "./Blue-label/Blue-label";
import Developing from "./Developing";
import useGetModel from "../hooks/getModel";
import useGetEquipmentDetails from "../hooks/getEquipmentDetails";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CgPerformance } from "react-icons/cg";
import { IoBuildOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import styles from "../../styles/components/Detalhes.module.scss";

function Detalhes() {
  const { equipment, equipmentDetails, equipmentModel }: any =
    useContext(DetailsContext);
  const { query } = useRouter();

  const model = useGetModel(query.id, equipment, equipmentModel).map(
    (e: any) => e.name
  );
  const details = useGetEquipmentDetails(
    query.id as string,
    equipmentDetails,
    model
  );

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        {/* <Developing /> */}
        <article className={styles.article}>
          <div className={styles.main_card}>
            <h1 className={styles.h1}>
              <MdOutlineDescription fontSize={38} /> Descrição{" "}
            </h1>
            <h2 className={styles.h2}>Modelo: {details?.name}</h2>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Função:</span>{" "}
              {details?.description.function}
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600", marginRight: "5px" }}>
                Aplicações:
              </span>{" "}
              {details?.description.applications.map((e) => (
                <BlueLabel children={e} />
              ))}
            </p>
          </div>
          <div className={styles.operationRequirements_card}>
            <h1 className={styles.h1}>
              <IoMdCheckboxOutline fontSize={38} /> Requisitos Operacionais{" "}
            </h1>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Condições Ideais:</span>{" "}
              {details?.operationRequirements.idealConditions}
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Habilidades P/ Operar:</span>{" "}
              {details?.operationRequirements.operatorSkill}
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Compatibilidade:</span>{" "}
              {details?.operationRequirements.compatibility}
            </p>
          </div>
        </article>
        <article className={styles.article}>
          <div className={styles.performance_card}>
            <h1 className={styles.h1}>
              <CgPerformance fontSize={38} /> Desempenho{" "}
            </h1>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Produtividade:</span>{" "}
              {details?.performanceData.productivity}
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Eficiência:</span>{" "}
              {details?.performanceData.efficiency}
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Custo de operação:</span>{" "}
              {details?.performanceData.operationalCost}
            </p>
          </div>
          <div className={styles.use_card}>
            <div className={styles.technicalSpecifications_card}>
              <h1 className={styles.h1}>
                <IoBuildOutline className={styles.ico} /> Especificações Técnicas{" "}
              </h1>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Capacidade:</span>{" "}
                {details?.technicalSpecifications.capacity}
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Dimensões:</span>{" "}
                {details?.technicalSpecifications.dimensions}
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>
                  Consumo de combustível:
                </span>{" "}
                {details?.technicalSpecifications.fuelConsumption}
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Velocidade:</span>{" "}
                {details?.technicalSpecifications.operationSpeed}
              </p>
            </div>
            <div className={styles.safety_card}>
              <h1 className={styles.h1}>
                <MdOutlineSecurity className={styles.ico} /> Segurança{" "}
              </h1>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>
                  Equipamentos Necessários:
                </span>{" "}
                {details?.safety.requiredEquipment.join(", ")}
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Riscos Associados:</span>{" "}
                {details?.safety.associatedRisks}
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Regulamento:</span>{" "}
                {details?.safety.regulations}
              </p>
            </div>
          </div>
        </article>
      </section>

      <article></article>
    </React.Fragment>
  );
}

export default Detalhes;
