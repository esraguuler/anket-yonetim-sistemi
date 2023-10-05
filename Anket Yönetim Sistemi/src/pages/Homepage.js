import React from 'react'
import { Link } from 'react-router-dom'

export const Homepage = () => {
  return (
    <div className='position-relative wrapper'>
        <div className="position-absolute showcase">
            <h1 className='text-center'>Anket formunuzu oluşturun.</h1>
            <div className="text-center mt-5">
                <Link className='btn btn-primary d-inline btn-lg' to="/create-form">Başla</Link>
            </div>
        </div>
    </div>
  )
}