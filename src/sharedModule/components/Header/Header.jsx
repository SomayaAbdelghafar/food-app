import React from 'react'
import headerImg from "../../../assets/imgs/headerImg.png"
export default function Header({header,paragraph}) {
    

    return (
        <>
         <div className="header-container my-4 rounded-4">
         <div className="container row p-5 text-white">
            <div className="col-md-6 align-items-center">
                <h2 className='mb-4'>{header}</h2>
                <p>{paragraph}</p>

            </div>
            <div className="col-md-6 text-end">
                <img src={headerImg} alt="" />

            </div>

         </div>
         </div>
        </>
    )
}
