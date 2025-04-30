import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { getBanners } from "../api/graphqlNoodleApi";
import LoadingComponent from "./LoadingComponent";

export default function Banner() {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            setIsLoading(true);
            try {
                const data = await getBanners();

                setBanners(data);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchBanners();
    }, [])

    const SwiperComponent = () => {
        return <Swiper
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
    }

    return <div className="pt-40 pb-20">
        { 
            isLoading 
            ? <LoadingComponent />
            : <SwiperComponent />
        }
    </div>
}