import React, { useState, useRef, useEffect } from "react";
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

function Estatisticas() {
  const DoughnutChart: React.FC = () => {
    const data = {
      labels: [
        "Operações Neutras",
        "Operações de Manutenção",
        "Operações Produtivas",
      ],
      datasets: [
        {
          data: [55, 15, 80],
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

  const Data = [
    { id: 1, year: 2016, userGain: 80000, userLost: 823 },
    { id: 2, year: 2017, userGain: 45677, userLost: 345 },
    { id: 3, year: 2018, userGain: 78888, userLost: 555 },
    { id: 4, year: 2019, userGain: 90000, userLost: 4555 },
    { id: 5, year: 2020, userGain: 4300, userLost: 234 },
  ];

  const [labels, useLabels] = useState([
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
  ]);
  const chartRef = useRef<ChartJS<"line", number[], string>>(null); // Define o tipo corretamente

  const LineChartComponent: React.FC = () => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Receita de Produção",
          data: [65, 59, 80, 81, 56, 55, 0, 0, -90],
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
            padding: 15,
          },
        },
        y: {
          ticks: {
            color: "white",
            font: {
              size: 15, // Tamanho da fonte dos rótulos do eixo Y
            },
            padding: 15,
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
        gradient.addColorStop(0.75, "#a68eff"); // Lilás claro
        gradient.addColorStop(1, "#b58eff"); // Lilás mais claro

        // Aplicar o gradiente à linha
        chartInstance.data.datasets[0].borderColor = gradient;
        chartInstance.update();
      }
    }, [labels]);

    return <Line ref={chartRef} data={data} options={options} />;
  };

  function getWeekDays() {
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
  }

  function get24Hours() {
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
  }

  function getMonth() {
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
  }

  function getYear() {
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
  }

  function getYears() {
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
  }

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <nav>
          <ul className={styles.chart_bar_ul}>
            <li
              className={styles.li}
              onClick={() => getYears()}
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
              onClick={() => getYear()}
              style={{ borderRight: "0px" }}
            >
              1 Ano
            </li>
            <li
              className={styles.li}
              onClick={() => getMonth()}
              style={{ borderRight: "0px" }}
            >
              30 Dias
            </li>
            <li
              className={styles.li}
              onClick={() => getWeekDays()}
              style={{ borderRight: "0px" }}
            >
              7 Dias
            </li>
            <li
              className={styles.li}
              onClick={() => get24Hours()}
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
                  title={`Receita gerada em uma determinada data específica informada pelo usuário`}
                >
                  <BsInfoCircle className={styles.icon} />
                </abbr>
              </h2>
              <h3 className={styles.h3}>
                <small className={styles.small}>R$</small>
                {`100`}
                <IoChevronDownCircle className={styles.percentage_icon} />
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
                  title={`O Percentual de Receita te mostrará se houve um aumento ou não na receita gerada.`}
                >
                  <BsInfoCircle className={styles.icon} />
                </abbr>
              </h2>
              <h3 className={styles.h3}>
                {`100`}
                <small className={styles.small}>%</small>
                {/* <IoChevronUpCircle className={styles.percentage_icon}/> */}
                {/* <IoChevronDownCircle className={styles.percentage_icon} /> */}
                <IoCheckmarkCircle className={styles.percentage_icon} />
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
              <abbr title="">
                <BsInfoCircle className={styles.icon} />
              </abbr>
            </h2>
            <div className={styles.doughnut_chart}>
              <DoughnutChart />
            </div>
          </div>
        </div>

        <div className={styles.chart_bar_div} style={{borderTopLeftRadius: "0px", borderTopRightRadius: "0px"}}>
          <h2 className={styles.h2}>
            Gráfico de Produção{" "}
            <abbr title="">
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
