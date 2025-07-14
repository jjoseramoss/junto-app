import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ThreeScene from './ThreeScene'

const LandingPage = () => {
  return (
    <div>
      <img className="image-abstract" src="/abstract.png" alt="abstract" />
      <div className='layer-blur'></div>

      <div className='container'>
        <Navbar />

      <main>
        <div className="main-flex">
            <Hero />

            <ThreeScene />
        </div>

        
      </main>

      </div>
    </div>
  )
}

export default LandingPage