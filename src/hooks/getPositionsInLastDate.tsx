function useGetPositionsInLastDate(
  id: any,
  equipmentPositionHistory: any,
  date: number
) {
  // Obter a data atual
  const now = new Date("2021-03-01T01:00:00.000Z");

  // Variável que define o limite para o filtro de data
  let limit = new Date(now);

  // Sequência de if para definir a lógica por trás da definição do limite para filtrar o array de datas
  if (date === 1) limit = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  else if (date === 3)
    limit = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  else if (date === 7)
    limit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  else if (date === 30) limit = new Date(limit.setDate(now.getDate() - 30));
  else
    throw new Error(
      "Só é possível filtrar as datas em '1' dia, '3' dias, '7' dias e '30' dias. Qualquer outro valor lançado na função não funcionará"
    );

  // Array de datas
  const datesArray = equipmentPositionHistory
    .filter((e: any) => e.equipmentId == id)
    .map((e: any) => e.positions.map((e: any) => e.date))[0];

  // Filtrar as datas que estão nas últimas 24 horas
  const filteredDate = datesArray.filter((date: any) => {
    const data = new Date(date);
    return data >= limit && data <= now;
  });

  const filteredArrayDate = equipmentPositionHistory
    .filter((e: any) => e.equipmentId == id)
    .map((e: any) =>
      e.positions
        .map((e: any) => e)
        .map((e: any) => e)
        .filter((e: any) => filteredDate.includes(e.date))
    );

  return filteredArrayDate;
}

export default useGetPositionsInLastDate;
