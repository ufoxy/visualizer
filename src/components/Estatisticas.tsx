import React, { useState, useRef, useEffect, useContext } from "react";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Estatisticas.module.scss";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ArcElement,
} from "chart.js";
import { BsInfoCircle } from "react-icons/bs";
import { IoChevronUpCircle } from "react-icons/io5";
import { IoChevronDownCircle } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

import useGetEarningCalculatorById from "../hooks/getEarningCalculatorById";
import useGetModel from "../hooks/getModel";
import useGetProductivityPercentageById from "../hooks/getProductivityPercentageById";
import useGetPositionById from "../hooks/getPositionById";
import useGetStateById from "../hooks/getStateById";
import useGetStatusClassById from "../hooks/getStatusClassById";
import useProductivityTrend from "../hooks/getProductivityTrend";
import { useRouter } from "next/router";
import StatisticsContext from "../common/contexts/Statistics";
import useGetEarningsByPeriod from "../hooks/getEarningsByPeriod";
import useGetOperationCounts from "../hooks/getOperationsCount";
import useEarningsTrend from "../hooks/getEarningsTrend";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type Period = "24hrs" | "7d" | "30d" | "1y" | "all";

function Estatisticas() {
  const {
    equipment,
    equipmentModel,
    equipmentPositionHistory,
    equipmentStateHistory,
    equipmentState,
  }: any = useContext(StatisticsContext);
  const { query } = useRouter();

  const [filterDay, setFilterDay] = useState("24hrs");

  const model = useGetModel(query.id, equipment, equipmentModel).map(
    (e: any) => e.name
  );
  // Modelo do equipamento

  const productivityPercentage = useGetProductivityPercentageById(
    query.id,
    equipment,
    equipmentModel,
    equipmentStateHistory,
    filterDay as Period
  ).replace(".", ","); // Percentual de produtividade usando a fórmula a seguir: (Total de operações / Data a ser filtrado) * 100
  const productivityTrend = useProductivityTrend(
    query.id,
    equipment,
    equipmentModel,
    equipmentStateHistory,
    filterDay as Period
  );
  const earnings = useGetEarningCalculatorById(
    query.id,
    equipmentModel,
    equipmentStateHistory,
    equipment,
    filterDay as Period
  );
  let earningsByPeriod = useGetEarningsByPeriod(
    query.id,
    equipmentModel,
    equipmentStateHistory,
    filterDay as Period
  );
  const earningsTrend = useEarningsTrend(
    query.id,
    equipmentModel,
    equipmentStateHistory,
    filterDay as Period
  );
  const operationCounts = useGetOperationCounts(
    query.id,
    equipmentState,
    equipmentStateHistory,
    filterDay as Period
  );

  function trendHandler(trend: string, type: string) {
    if (trend === "Manteve") {
      return (
        <abbr title={`A ${type} se manteve igual ao período anterior.`}>
          {" "}
          <IoCheckmarkCircle className={styles.trend_icon} />{" "}
        </abbr>
      );
    } else if (trend === "Diminuiu") {
      return (
        <abbr
          title={`A ${type} apresentou uma queda comparado ao período anterior.`}
        >
          {" "}
          <IoChevronDownCircle className={styles.trend_icon} />{" "}
        </abbr>
      );
    } else
      return (
        <abbr
          title={`A ${type} teve um desempenho superior em comparação ao período anterior.`}
        >
          {" "}
          <IoChevronUpCircle className={styles.trend_icon} />{" "}
        </abbr>
      );
  }

  function dateFilterHandler(date: any) {
    // "24hrs" | "7d" | "30d" | "1y" | "all"
    if (date === "24hrs") return "as últimas 24 horas";
    else if (date === "7d") return "os últimos 7 dias";
    else if (date === "30d") return "os últimos 30 Dias";
    else if (date === "1y") return "o período de 1 ano";
    else return "em todo o período";
  }

  const DoughnutChart: React.FC = () => {
    const data = {
      labels: [
        "Operações Neutras",
        "Operações de Manutenção",
        "Operações Produtivas",
      ],
      datasets: [
        {
          data: [
            operationCounts.idleOperations,
            operationCounts.maintenanceOperations,
            operationCounts.productiveOperations,
          ],
          backgroundColor: [
            "rgba(0, 43, 73, 1)",
            "rgba(0, 103, 160, 1)",
            "rgba(83, 217, 217, 1)",
          ],
          borderColor: [
            "rgba(0, 43, 73, 1)",
            "rgba(0, 103, 160, 1)",
            "rgba(83, 217, 217, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    return <Doughnut data={data} options={options} />;
  };

  // ----------------------------------

  function generateLast24HoursArray() {
    const baseDate = new Date(2021, 1, 28, 22); // 28/02/2021 às 22:00 (mês é indexado em 0)
    const hoursArray = [];

    for (let i = 23; i >= 0; i--) {
      const hour = new Date(baseDate);
      hour.setHours(baseDate.getHours() - i);

      // Formata as horas e minutos em "HH:MM"
      const formattedTime = hour
        .toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        .replace(":00", ":00"); // Opcional: força "00" nos minutos, caso o formato local seja diferente.
      hoursArray.push(formattedTime);
    }

    return hoursArray;
  }

  const [labels, useLabels] = useState(generateLast24HoursArray());
  const chartRef = useRef<ChartJS<"line", number[], string>>(null); // Define o tipo corretamente

  const LineChartComponent: React.FC = () => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Receita de Produção (R$)",
          data: earningsByPeriod,
          fill: false,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 12,
          borderColor: "#00aeff",
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      animations: {
        radius: {
          duration: 400,
          easing: "linear",
          loop: (context) => context.active,
        },
      },
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: "white",
            font: {
              size: 16, // Tamanho da fonte dos rótulos do eixo Y
            },
            padding: 25,
          },
        },
        y: {
          ticks: {
            color: "white",
            font: {
              size: 15, // Tamanho da fonte dos rótulos do eixo Y
            },
            padding: 25,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white",
          },
        },
        title: {
          display: false,
          // text: "Gráfico de Produção",
          // color: "white",
        },
      },
    };

    useEffect(() => {
      const chartInstance = chartRef.current; // Acesso à instância do gráfico
      if (chartInstance) {
        const ctx = chartInstance.ctx;

        // Criar o gradiente
        const gradient = ctx.createLinearGradient(
          0,
          0,
          0,
          chartInstance.height
        );

        gradient.addColorStop(0, "#00aeff"); // Azul vibrante
        gradient.addColorStop(0.25, "#3caeff"); // Azul claro
        gradient.addColorStop(0.5, "#5581FF"); // Azul médio

        // Aplicar o gradiente à linha
        chartInstance.data.datasets[0].borderColor = gradient;
        chartInstance.update();
      }
    }, [labels]);

    return <Line ref={chartRef} data={data} options={options} />;
  };

  function useGetWeekDays() {
    // Cria um objeto Date para a data 28/08/2021
    const specificDate = new Date(2021, 7, 25); // Os meses começam em 0
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const dayOfWeek = specificDate.getDay();
    const weekDays = [];

    // Adiciona os 7 dias, incluindo o dia específico
    for (let i = 0; i < 7; i++) {
      const dayIndex = (dayOfWeek - i + 7) % 7; // Ajusta o índice para não ser negativo
      weekDays.unshift(days[dayIndex]); // Adiciona o dia no início do array
    }
    // Define os dias da semana
    useLabels(weekDays);

    setFilterDay("7d");
  }

  function useGet24Hours() {
    // Hora específica
    const specificHour = new Date();
    specificHour.setHours(22, 0, 0, 0); // Define a hora para 22:00:00

    // Array para armazenar as horas
    const hours = [];

    // Adiciona as 24 horas, começando pela hora específica
    for (let i = 0; i < 24; i++) {
      const hour = new Date(specificHour); // Cria uma nova instância de Date para evitar mutação
      hour.setHours(specificHour.getHours() - i); // Subtrai i horas
      // Formata a hora para HH:MM
      const formattedHour = hour.toTimeString().slice(0, 5);
      hours.unshift(formattedHour); // Adiciona a hora no início do array
    }

    // Define as horas
    useLabels(hours);

    setFilterDay("24hrs");
  }

  function useGetMonth() {
    // Cria um objeto Date para a data específica
    const specificDate = new Date(2021, 7, 28); // 28 de agosto de 2021

    // Array para armazenar os dias
    const daysInMonth = [];

    // Adiciona os 30 dias para trás, incluindo o dia específico
    for (let i = 0; i < 30; i++) {
      const pastDate = new Date(specificDate); // Cria uma nova instância de Date
      pastDate.setDate(specificDate.getDate() - i); // Subtrai i dias
      const formattedDate = pastDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
      daysInMonth.unshift(formattedDate); // Adiciona a data formatada ao início do array
    }

    // Exibe os dias do mês
    useLabels(daysInMonth);

    setFilterDay("30d");
  }

  function useGetYear() {
    // Cria um objeto Date para a data específica
    const specificDate = new Date(2021, 7, 28); // 28 de agosto de 2021

    // Array com as abreviações dos meses
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    // Array para armazenar os meses
    const monthsInPreviousYear = [];

    // Adiciona os 12 meses, começando pela data específica
    for (let i = 0; i < 12; i++) {
      const pastDate = new Date(specificDate); // Cria uma nova instância de Date
      pastDate.setMonth(specificDate.getMonth() - i); // Subtrai i meses
      const monthAbbreviation = months[pastDate.getMonth()]; // Obtém a abreviação do mês
      const year = pastDate.getFullYear(); // Obtém o ano
      monthsInPreviousYear.unshift(`${monthAbbreviation} ${year}`); // Adiciona o mês e ano ao início do array
    }

    // Exibe os meses
    useLabels(monthsInPreviousYear);

    setFilterDay("1y");
  }

  function useGetYears() {
    // Cria um objeto Date para a data específica
    const specificDate = new Date(2021, 7, 28); // 28 de agosto de 2021

    // Obtém o ano a partir da data
    const startYear = specificDate.getFullYear();
    const endYear = 2018;

    // Array para armazenar os anos como strings
    const years = [];

    // Adiciona os anos de 2018 até 2021
    for (let i = endYear; i <= startYear; i++) {
      years.push(i.toString()); // Adiciona o ano como string ao array
    }

    // Exibe os anos
    useLabels(years);

    setFilterDay("all");
  }

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <nav>
          <ul className={styles.chart_bar_ul}>
            <li
              className={styles.li}
              onClick={() => useGetYears()}
              style={{
                borderRight: "0px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              Todo o Período
            </li>
            <li
              className={styles.li}
              onClick={() => useGetYear()}
              style={{ borderRight: "0px" }}
            >
              1 Ano
            </li>
            <li
              className={styles.li}
              onClick={() => useGetMonth()}
              style={{ borderRight: "0px" }}
            >
              30 Dias
            </li>
            <li
              className={styles.li}
              onClick={() => useGetWeekDays()}
              style={{ borderRight: "0px" }}
            >
              7 Dias
            </li>
            <li
              className={styles.li}
              onClick={() => useGet24Hours()}
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              24 Horas
            </li>
          </ul>
        </nav>

        <div className={styles.flex}>
          <div className={styles.flex_collumn}>
            <div
              className={styles.earnings_div}
              style={{
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            >
              <h2 className={styles.h2}>
                Receita{" "}
                <abbr
                  title={`Receita gerada em uma data específica escolhida pelo usuário. Atualmente, exibindo ${dateFilterHandler(
                    filterDay
                  )}.`}
                >
                  <BsInfoCircle className={styles.icon} />
                </abbr>
              </h2>
              <h3 className={styles.h3}>
                <small className={styles.small}>R$</small>
                {earnings}
                {trendHandler(earningsTrend, "receita")}
              </h3>
            </div>

            <div
              className={styles.earnings_percentage_div}
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <h2 className={styles.h2}>
                Percentual de Produtividade
                <abbr
                  title={`O percentual de produtividade mostrará ao usuário a porcentagem de ações produtivas conforme a data informada. Atualmente, exibindo ${dateFilterHandler(
                    filterDay
                  )}.`}
                >
                  <BsInfoCircle className={styles.icon} />
                </abbr>
              </h2>
              <h3 className={styles.h3}>
                {`${productivityPercentage}`}
                <small className={styles.small}>%</small>
                {trendHandler(productivityTrend, "produtividade")}
              </h3>
            </div>
          </div>

          <div
            className={styles.doughnut_chart_div}
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          >
            <h2 className={styles.h2}>
              Gráfico de Operações{" "}
              <abbr
                title={`O gráfico de operações converte as informações de cada um dos três tipos de operações — produtiva, neutra (parado) e de manutenção — em uma representação gráfica, com base na data informada. Atualmente, exibindo ${dateFilterHandler(
                  filterDay
                )}.`}
              >
                <BsInfoCircle className={styles.icon} />
              </abbr>
            </h2>
            <div className={styles.doughnut_chart}>
              <DoughnutChart />
            </div>
          </div>
        </div>

        <div
          className={styles.chart_bar_div}
          style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
        >
          <h2 className={styles.h2}>
            Gráfico de Produção{" "}
            <abbr
              title={`O gráfico de produção apresenta os ganhos gerados de forma visual, facilitando a análise de períodos e a compreensão dos gastos e lucros. Atualmente, exibindo ${dateFilterHandler(
                filterDay
              )}.`}
            >
              <BsInfoCircle className={styles.icon} />
            </abbr>
          </h2>
          <LineChartComponent />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Estatisticas;
