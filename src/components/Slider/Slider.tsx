import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import styles from "./Slider.module.scss";

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
    <div className={styles.Slider}>
      <Swiper
        // id={"main"}
        // tag={"section"}
        // wrapperTag={"ul"}
        centeredSlides
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) =>
          console.log("slide change:", swiper.activeIndex)
        }
        onReachEnd={() => console.log("slides end")}
      >
        {props.data.map((account, index) => {
          return (
            <SwiperSlide
              // tag={"li"}
              key={account.id}
            >
              {account.currency}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
