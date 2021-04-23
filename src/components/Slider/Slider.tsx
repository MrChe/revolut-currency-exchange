import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCube,
  History,
} from "swiper";
import SwiperClass from "swiper/types/swiper-class";
import { AccountModel } from "../../models/AccountModel";
import { HistoryOptions } from "swiper/types/components/history";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import styles from "./Slider.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCube, History]);

interface ISliderProps {
  data: AccountModel[];
  id: string;
  history?: HistoryOptions | boolean;
  onSlideChange?: (swiper: SwiperClass) => void;
  onSwiper?: (swiper: SwiperClass) => void;
  children: JSX.Element;
}

export const Slider = (props: ISliderProps): JSX.Element => {
  return (
    <div className={styles.Slider}>
      <Swiper
        history={props.history}
        id={props.id}
        tag={"section"}
        wrapperTag={"ul"}
        centeredSlides
        navigation={false}
        pagination={{
          clickable: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={props.onSwiper}
        onSlideChange={props.onSlideChange}
      >
        {props.data.map((account) => {
          return (
            <SwiperSlide tag={"li"} key={account.id} data-history={account.id}>
              {props.children}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
