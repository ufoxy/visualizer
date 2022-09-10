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
  const equipments = res.data

  return {
    props: {
      equipments,
    },
  }
}

const Home: NextPage = ({ equipments }: any) => {

  return (
    <React.Fragment>
      <MenuLateral>
        {equipments.map((e: any) =>
          <Link key={e.id} href={`produto/${e.id}`} prefetch={false}>
            <li
              key={e.id}
              // onClick={() => alert(e.id)}
            >
              {e.name}
            </li>
          </Link>
        )}
      </MenuLateral>
    </React.Fragment>
  )
}

export default Home
