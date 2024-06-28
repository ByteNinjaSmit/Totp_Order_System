import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Error = () => {
  return (
    <div className="bg-dark">
    <section className='bg-danger text-center py-5' style={{height: '90vh'}}>
        <div className="container justify-content-center mt-5 text-center ">
            <h1 className='text-white'>PAGE NOT FOUND</h1>
            <h2 className='mt-5 text-bg-danger align-middle my-4 bg-body-danger'>ERROR 404</h2>
            <p className="text-white">Sorry page Not Found !</p>
            <Link to="/">
              <Button variant="warning">Go Back Home</Button>
            </Link>
        </div>
    </section>
    </div>
  )
}

export default Error
