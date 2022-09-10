import React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import MenuLateral from '../src/components/MenuLateral'
import Link from 'next/link'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export async function getStaticProps() {

  const res = await axios.get('https://visualizer-blue.vercel.app/api/equipment/')
  const equipment = res.data

  return {
    props: {
      equipment,
    },
  }
}

const Home: NextPage = ({ equipment }: any) => {

  return (
    <React.Fragment>
      <MenuLateral equipment={equipment} path={'equipamento/'}/>
    </React.Fragment>
  )
}

export default Home
