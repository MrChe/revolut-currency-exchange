import React from "react";
import { Swiper, SwiperSlide } from "swiper/swiper-react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface ISliderProps {
  data: any[];
}
export const Slider = (props: ISliderProps): JSX.Element => {
  return (
    <Swiper
      id={"main"}
      tag={"section"}
      wrapperTag={"ul"}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) =>
        console.log("slide change:", swiper.activeIndex)
      }
      onReachEnd={() => console.log("slides end")}
    >
      {props.data.map((account, index) => {
        return (
          <SwiperSlide tag={"li"} key={account.id}>
            <div
              style={{
                width: "100%",
                height: "500px",
                // border: "10px solid black",
              }}
            >
              {account.currency}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
