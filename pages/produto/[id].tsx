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
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const equipment = await axios
    .get("https://visualizer-blue.vercel.app/api/equipment/")
    .then((e) => e.data);
  const equipmentModel = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentModel/")
    .then((e) => e.data);
  const equipmentPositionHistory = await axios
    .get("https://visualizer-blue.vercel.app/api/equipmentPositionHistory/")
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
      equipmentModel,
      equipmentPositionHistory,
      equipmentStateHistory,
      equipmentState,
    },
  };
}

const Produto: NextPage = ({
  equipment,
  equipmentModel,
  equipmentPositionHistory,
  equipmentStateHistory,
  equipmentState
}: any) => {
  const { query } = useRouter();

  // console.log(equipment);
  // console.log(equipmentModel);
  // console.log(equipmentPositionHistory);
  // console.log(equipmentStateHistory);
  // console.log(equipmentState);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MenuLateral>
          {equipment.map((e: any) => (
            <Link key={e.id} href={`${e.name}`} prefetch={false}>
              <li
                key={e.id}
                // onClick={() => alert(e.id)}
              >
                {e.name}
              </li>
            </Link>
          ))}
        </MenuLateral>
        <Dashboard />
      </div>
    </React.Fragment>
  );
};

export default Produto;
