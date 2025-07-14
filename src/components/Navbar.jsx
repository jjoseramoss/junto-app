import React from 'react'

const Navbar = () => {
  return (
    <header>
        <h1 data-aos="fade-down" data-aos-duration="1500">JUNTO</h1>

        <nav>
          <a data-aos="fade-down" data-aos-duration="1500" href="#">Resources</a>
          <a data-aos="fade-down" data-aos-duration="2000" href="#">About</a>
          <a data-aos="fade-down" data-aos-duration="2500" href="#">Contact</a>
          <a data-aos="fade-down" data-aos-duration="3000" href="#">Learn More</a>
        </nav>

        <button data-aos="fade-down" data-aos-duration="1500" className="btn-signup">Sign Up</button>
    </header>
)
}

export default Navbar