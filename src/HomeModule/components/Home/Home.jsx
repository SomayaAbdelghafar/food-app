import React from 'react'
import Header from '../../../sharedModule/components/Header/Header'
import {Link} from 'react-router-dom'
export default function Home(props) {
    

    return (
        <>
            <Header header={"Welcome Upskilling"} paragraph={"This is a welcoming screen for the entry of the application , you can now see the options"} />
            <div className="row bg-light p-4 justify-content-between">
                <div className='col-md-6'>
                    <h3>Fill the Recipes </h3>
                    <p className='py-2'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                     
                </div>
                <div className="col-md-3 text-white">
                    <Link to='/dashboard/recipes'>
                    <button className='btn btn-success'>fill the Recipes
                    <i className="fa-solid fa-arrow-right px-1"></i>

                    </button></Link>
                </div>
            </div>

        </>
    )
}
