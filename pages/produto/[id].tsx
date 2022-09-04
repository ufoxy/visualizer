import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MenuLateral from '../../src/components/MenuLateral'
import Link from 'next/link'
import axios from 'axios'
import Dashboard from '../../src/components/Dashboard'

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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <MenuLateral>
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
        <Dashboard query={query} />
      </div>
    </React.Fragment>
  )
}

export default Produto
