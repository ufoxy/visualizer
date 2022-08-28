import React, { Children } from "react";
import Link from 'next/link'

function MenuLateral({ children }: any) {

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
                    {children}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default MenuLateral;