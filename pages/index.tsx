import { NextPage } from 'next'
import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {

  const res = await axios.get('https://visualizer-blue.vercel.app/api/hello/')
  .then((r) => r.data)
  const props = res

  return {
    props: {props},
  }
}

const Home: NextPage = ({ props }: any) => {
  console.log(props)

  return (
    <React.Fragment>
      <div style={{
        backgroundColor: '#0B132B',
        margin: '5px 0 5px 5px',
        maxWidth: '300px',
        height: 'calc(100vh - 10px)',
        padding: '8px',
        fontSize: '24',
        color: '#3A506B'
      }}>
        <h1 style={{}}>
          Hello World!
        </h1>

        <ul
          style={{
            listStyleType: 'none',
            color: '#FFF'
          }}
        >
          <li>oi</li>
          <li>oi</li>
          <li>oi</li>
          <li>oi</li>
          <li>oi</li>
        </ul>

      </div>
    </React.Fragment>
  )
}

export default Home
