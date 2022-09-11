import React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import MenuLateral from '../src/components/MenuLateral'
import dynamic from "next/dynamic";
import Link from 'next/link'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import useGetPosition from '../src/hooks/getPosition'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Map from '../src/components/Map'

const DEFAULT_CENTER = [38.907132, -77.036546]

export async function getStaticProps() {

  const equipment = await axios
    .get("https://visualizer-blue.vercel.app/api/equipment/")
    .then((e) => e.data);

  const equipmentPositionHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentPositionHistory/")
    .then((e) => e.data);

  return {
    props: {
      equipment,
      equipmentPositionHistory
    },
  }
}

const Home: NextPage = ({ equipment, equipmentPositionHistory }: any) => {
  
  const MapWithNoSSR = dynamic(() => import("../src/components/Map"), {
    ssr: false
  });

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <h1 style={{
          position: 'absolute',
          right: '2%',
          zIndex: '99'
        }}>teste</h1>
        <MenuLateral equipment={equipment} path={'equipamento/'} />
        <MapWithNoSSR />
      </div>
    </React.Fragment>
  )
}

export default Home
