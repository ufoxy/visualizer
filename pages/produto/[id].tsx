import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MenuLateral from '../../src/components/MenuLateral'
import Link from 'next/link'
import axios from 'axios'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps() {

  const res = await axios.get('https://visualizer-blue.vercel.app/api/equipment/')
  const equipments = res.data

  return {
    props: {
      equipments,
    },
  }
}

const Produto: NextPage = ({ equipments }: any) => {

  const { query } = useRouter()

  return (
    <React.Fragment>
      <h1>oi: {query.id}</h1>
      {/* <MenuLateral>
        {equipments.map((e: any) =>
          <Link key={e.id} href={`${e.name}`} prefetch={false}>
            <li
              key={e.id}
              // onClick={() => alert(e.id)}
            >
              {e.name}
            </li>
          </Link>
        )}
      </MenuLateral>
      <h1>o id é: {query.id}</h1> */}
    </React.Fragment>
  )
}

export default Produto
