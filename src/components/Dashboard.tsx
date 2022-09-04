import React, { Children } from "react";
import Link from "next/link";

function Dashboard({ children, query }: any) {
  return (
    <React.Fragment>
        <div style={{
            width: '100%',
            margin: "5px 5px 5px 0",
            backgroundColor: '#3A506B',
        }}>
            <h1>o id é: {query.id}</h1>
        </div>
    </React.Fragment>
  );
}

export default Dashboard;