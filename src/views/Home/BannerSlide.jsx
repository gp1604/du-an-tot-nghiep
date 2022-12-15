import React, { useEffect } from 'react'
import Slider from 'react-slick';
import axios from "axios";
import { API } from "../../utils/const";
import './BannerSlide.css'
function BannerSlide() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        slickPrev: false,
        slickNext: false,
        swipeToSlide: false,
        arrows: false,
    };
    const [data, setData] = React.useState([]);
    const getData = async () => {
        const response = await axios.get(API + '/admin/webImage/?category=banner')
        if (response.status === 200) {
            setData(response.data)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='slide-home' style={{ width: '98.9vw', height: '100vh', overflow: "hidden", margin: 'auto', marginTop: '-9rem' }}>
            <Slider  {...settings}>
                {data.map((i, index) => (
                    <div key={index}>
                        <img className='images-slide' style={{ objectFit: "cover", width: '100vw', height: '100vh', overflow: "hidden", margin: "auto !important" }} src={i.photosImagePath} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default BannerSlide