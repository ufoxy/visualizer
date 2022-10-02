import React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import MenuLateral from '../src/components/MenuLateral'
import dynamic from "next/dynamic";
import styles from '../styles/Home.module.scss'

const DEFAULT_CENTER = [38.907132, -77.036546]
console.log("Update do Vercel")

export async function getStaticProps() {


  const equipment = await axios
    .get("https://visualizer-blue.vercel.app/api/equipment/")
    .then((e) => e.data);

  const equipmentPositionHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentPositionHistory/")
    .then((e) => e.data);

  const equipmentModel = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentModel/")
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
      equipmentPositionHistory,
      equipmentModel, 
    },
  }
}

const Home: NextPage = ({ equipment, equipmentPositionHistory, equipmentModel }: any) => {

  const Map = dynamic(() => import("../src/components/Map"), {
    ssr: false
  });
  function MapCaller({ equipment, equipmentPositionHistory, equipmentModel }: any) {
    return <Map equipment={equipment} equipmentPositionHistory={equipmentPositionHistory} equipmentModel={equipmentModel} />
  }

  return (
    <React.Fragment>
      <section className={styles.section}>
        <MenuLateral equipment={equipment} path={'equipamento/'} />
        <MapCaller equipment={equipment} equipmentPositionHistory={equipmentPositionHistory} equipmentModel={equipmentModel} />
      </section>
    </React.Fragment>
  )
}

export default Home
