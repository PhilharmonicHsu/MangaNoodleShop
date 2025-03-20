import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { getBanners } from "@api/noodleApi";

export default function Banner() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await getBanners();

                setBanners(data);
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
    
        fetchBanners();
    }, [])

    return <div className="pt-40 pb-20">
        <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={banners.length > 0}
            className="w-full max-w-4xl"
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index} className="w-full">
                    <div className="">
                        <img 
                            src={`/banners/${banner.image}`} 
                            art={banner.name} 
                        />
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    </div>
}