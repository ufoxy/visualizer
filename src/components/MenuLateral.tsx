import React, { Children } from "react";
import Link from "next/link";

function MenuLateral({ children }: any) {
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: "#0B132B",
          margin: "5px 0 5px 5px",
          minWidth: "300px",
          maxWidth: "300px",
          height: "calc(100vh - 10px)",
          fontSize: "24",
          color: "#3A506B",
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <h1 style={{}}>Hello World!</h1>
        <ul
          style={{
            listStyleType: "none",
            padding: "8px",
            color: "#FFF",
          }}
        >
          {children}
        </ul>
        <Link href="/">
            <button
              style={{
                minWidth: "calc(300px - 16px)",
                minHeight: "25px",
                margin: '0 8px 25px 8px',
                position: 'absolute',
                bottom: '0'
              }}
            >
              Mapa
            </button>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default MenuLateral;
