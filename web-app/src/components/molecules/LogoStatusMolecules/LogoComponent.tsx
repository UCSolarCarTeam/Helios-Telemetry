import React from "react";

function LogoComponent() {
    return (
        <div className="grid w-full pt-4 pb-4">
            <img className="w-1/2 m-auto" src={require('../../../assets/Logo.png')} />
        </div>
    );
}

export default LogoComponent;
