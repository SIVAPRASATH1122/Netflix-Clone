import React from 'react'
import './Home.css'
import Nabar from '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/TitleCards'
import Footer from '../../Components/Footer/Footer'



const Home = () => {
  return (
    <div className='home'>
      <Nabar/>
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>A young man discovers he’s the chosen protector of Istanbul, destined to fight immortal enemies.
          As secrets unfold, he must embrace his powers to save the city from darkness.</p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt=""/>Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt=""/>More Info</button>
          </div>
          <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
        <TitleCards title={"Top Picks For You"} category={"now_playing"}/>
        <TitleCards title={"Only On Netflix"} category={"popular"}/>
        <TitleCards title={"Upcoming"} category={"upcoming"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
