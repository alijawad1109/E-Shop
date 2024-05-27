import React, { useEffect, useState } from 'react'
import './Slider.scss'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Slider = () => {
    const [currentSlide,setCurrentSlide]=useState(0);
     const sliderData = [
        {
          image: "https://i.ibb.co/CBGRLhG/bg-4.jpg",
          heading: "Shoes Villa",
          desc: "Up to 30% off on all onsale proucts.",
        },
        {
          image: "https://i.ibb.co/cDLBk5h/bg-1.jpg",
          heading: "Women Fashion",
          desc: "Up to 30% off on all onsale proucts.",
        },
        {
          image: "https://i.ibb.co/HXjD3V0/bg-2.jpg",
          heading: "Men Fashion",
          desc: "Up to 30% off on all onsale proucts.",
        },
        {
          image: "https://i.ibb.co/H2FRmtV/bg-3.jpg",
          heading: "Awesome Gadgets",
          desc: "Up to 30% off on all onsale proucts.",
        },
        
      ];
      const slideLength = sliderData.length;
      const autoScroll =true;
      let slideInterval;
      let intervalTime =5000;

    const nextSlide = () =>{
        setCurrentSlide(currentSlide == slideLength -1 ? 0 : currentSlide + 1);
    }
    const prevSlide = () =>{
        setCurrentSlide(currentSlide ==0 ? slideLength -1 : currentSlide -1);
    }
    function auto(){
        slideInterval=setInterval(nextSlide, intervalTime)
    }
    useEffect(()=>{
        setCurrentSlide(0)
    },[])
    useEffect(()=>{
        if(autoScroll){
            auto()
        }
        return ()=> clearInterval(slideInterval)
    },[currentSlide, slideInterval ,autoScroll, auto])
  return (
    <div className='slider'>
<FaArrowAltCircleLeft onClick={nextSlide}  size={28} className='arrow prev'/>
<FaArrowAltCircleRight onClick={prevSlide} size={28}  className='arrow next'/>
{sliderData.map((slide,index)=>{
    const {image,heading,desc} =slide
    return(
        <>
        <div key={index} className={index == currentSlide ? "slide current" : "slide"} >
            {index == currentSlide &&(
                <>
                <img src={image} alt="slide" />
                <div className='content'>
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr />
                    <a className='--btn-primary --btn' href='#product'>Shop Now</a>
                </div>
                </>
            )}
        </div>
        </>
    )
})}
    </div>
  )
}

export default Slider
