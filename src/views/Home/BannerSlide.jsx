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
        autoplaySpeed: 2000,
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
        <div style={{ maxWidth: '1480px', margin: 'auto' }}>
            <Slider  {...settings}>
                {data.map((i) => (
                    <div >
                        <img style={{ width: '100%', height: '80vh' }} src={i.photosImagePath} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default BannerSlide