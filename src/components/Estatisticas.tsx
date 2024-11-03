import React, { useState, useRef, useEffect } from "react";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Estatisticas.module.scss";
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Estatisticas() {
  const Data = [
    { id: 1, year: 2016, userGain: 80000, userLost: 823 },
    { id: 2, year: 2017, userGain: 45677, userLost: 345 },
    { id: 3, year: 2018, userGain: 78888, userLost: 555 },
    { id: 4, year: 2019, userGain: 90000, userLost: 4555 },
    { id: 5, year: 2020, userGain: 4300, userLost: 234 }
  ];

  const [labels, useLabels] = useState(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']);
  const chartRef = useRef<ChartJS<'line', number[], string>>(null); // Define o tipo corretamente

  const LineChartComponent = () => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Vendas',
          data: [65, 59, 80, 81, 56, 55, 0, 0, -90],
          fill: false,
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 12,
          borderColor: '#00aeff',
        },
      ],
    };

    const options: ChartOptions<'line'> = {
      animations: {
        radius: {
          duration: 400,
          easing: 'linear',
          loop: (context) => context.active,
        },
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x',
      },
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: 'white',
            font: {
              size: 16 // Tamanho da fonte dos rótulos do eixo Y
          },
          padding: 15,
          },
        },
        y: {
          ticks: {
            color: 'white',
            font: {
              size: 15 // Tamanho da fonte dos rótulos do eixo Y
          },
          },
        },
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white',
          },
        },
        title: {
          display: true,
          text: 'Gráfico de Vendas',
          color: 'white'
        },
      },
    };

    useEffect(() => {
      const chartInstance = chartRef.current; // Acesso à instância do gráfico
      if (chartInstance) {
        const ctx = chartInstance.ctx;
    
        // Criar o gradiente
        const gradient = ctx.createLinearGradient(0, 0, 0, chartInstance.height);
        gradient.addColorStop(0, '#00aeff');      // Azul vibrante
        gradient.addColorStop(0.25, '#3caeff');   // Azul claro
        gradient.addColorStop(0.5, '#5581FF');    // Azul médio
        gradient.addColorStop(0.75, '#a68eff');    // Lilás claro
        gradient.addColorStop(1, '#b58eff');       // Lilás mais claro
    
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
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const dayOfWeek = specificDate.getDay();
  const weekDays = [];
  
  // Adiciona os 7 dias, incluindo o dia específico
  for (let i = 0; i < 7; i++) {
    const dayIndex = (dayOfWeek - i + 7) % 7; // Ajusta o índice para não ser negativo
    weekDays.unshift(days[dayIndex]); // Adiciona o dia no início do array
  }
  // Define os dias da semana
  useLabels(weekDays)
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
  useLabels(hours)
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
    const formattedDate = pastDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
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
        <div style={{ backgroundColor: "#2B2E44", padding: '20px 20px 5px 20px', minWidth: '560px', margin: '0 20px'}}>
          <button onClick={() => getYears()}>Todo o Período</button>
          <button onClick={() => getYear()}>1 Ano</button>
          <button onClick={() => getMonth()}>30 Dias</button>
          <button onClick={() => getWeekDays()}>7 Dias</button>
          <button onClick={() => get24Hours()}>24 Horas</button>
          <LineChartComponent />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Estatisticas;