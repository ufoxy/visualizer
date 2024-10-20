function useGetAllPositionsById(id: any, equipmentPositionHistory: any) {
      const positions = equipmentPositionHistory.map((e: any) => {
        return { id: e.equipmentId, positions: e.positions };
      }).filter((e:any) => e.id === id).map((e:any) => e.positions)

  return positions;
}

export default useGetAllPositionsById;