import React from "react";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Detalhes.module.scss";
import Developing from "./Developing";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CgPerformance } from "react-icons/cg";
import { IoBuildOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";




function Detalhes() {
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
            <h2 className={styles.h2}>Modelo: Caminhão de Carga</h2>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Função:</span> Transporte de
              materiais pesados ou volumosos.
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Compatibilidade:</span>{" "}
              Aplicações: Logística, Construção civil, Movimentação de insumos
            </p>
          </div>
          <div className={styles.operationRequirements_card}>
            <h1 className={styles.h1}>
              <IoMdCheckboxOutline fontSize={38} /> Requisitos Operacionais{" "}
            </h1>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Condições Ideais:</span>{" "}
              Estradas pavimentadas ou terrenos estáveis.
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Habilidades P/ Operar:</span>{" "}
              Certificado em condução de veículos pesados.
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Compatibilidade:</span> Pode
              ser equipado com reboques ou carrocerias específicas.
            </p>
          </div>
        </article>
        <article className={styles.article}>
          <div className={styles.performance_card}>
            <h1 className={styles.h1}>
              <CgPerformance fontSize={38} /> Desempenho{" "}
            </h1>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Produtividade:</span> Cerca de
              100 toneladas transportadas por dia.
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Eficiência:</span> Eficiente
              para viagens de média e longa distância.
            </p>
            <p className={styles.p}>
              <span style={{ fontWeight: "600" }}>Custo de operação:</span> R$
              80/hora (combustível e desgaste).
            </p>
          </div>
          <div className={styles.use_card}>
            <div className={styles.technicalSpecifications_card}>
              <h1 className={styles.h1}>
                <IoBuildOutline fontSize={38} /> Especificações Técnicas{" "}
              </h1>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Capacidade:</span> 15
                Toneladas
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Dimensões:</span> 8m
                (comprimento) x 2.5m (largura) x 3.5m (altura).
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>
                  Consumo de combustível:
                </span>{" "}
                5 km/L
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Velocidade:</span> 90 km/h
                (velocidade máxima)
              </p>
            </div>
            <div className={styles.safety_card}>
              <h1 className={styles.h1}>
                <MdOutlineSecurity fontSize={38} /> Segurança{" "}
              </h1>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>
                  Equipamentos Necessários:
                </span>{" "}
                Capacete, Luvas, Cintos de segurança
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Riscos Associados:</span>{" "}
                Capotamento, sobrecarga e falhas mecânicas.
              </p>
              <p className={styles.p}>
                <span style={{ fontWeight: "600" }}>Regulamento:</span> Norma
                NR-12 para transporte seguro.
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
