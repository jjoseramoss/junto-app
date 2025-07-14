import React from 'react'

const Hero = () => {
  return (
    <div className="content">
        <div data-aos="fade-down" data-aos-duration="1500" className="tag-box">
              <div className="tag">INTRODUCING &hearts;</div>
            </div>

            <h1 data-aos="fade-down" data-aos-duration="2000">
              Effortless Meetups with Friends
            </h1>

            <p
              data-aos="fade-down"
              data-aos-duration="2500"
              className="description"
            >
              No more missed messages or endless group chats. Share your
              availability, see when your friends are free, and make planning
              hangouts simple.
            </p>

            <div data-aos="fade-down" data-aos-duration="3000" className="buttons">
                <a className="btn-get-started" href="#"> Get Started </a>
            </div>
    </div>
)
}

export default Hero