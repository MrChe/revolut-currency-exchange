import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCube,
  HashNavigation,
} from "swiper";
import SwiperClass from "swiper/types/swiper-class";
import getSymbolFromCurrency from "currency-symbol-map";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import styles from "./Slider.module.scss";
import { AccountModel } from "../../models/AccountModel";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCube, HashNavigation]);

interface ISliderProps {
  data: AccountModel[];
  id: string;
  hashNavigation?: boolean;
  onSlideChange?: (swiper: SwiperClass) => void;
  onSwiper?: (swiper: SwiperClass) => void;
  children: JSX.Element;
}

export const Slider = (props: ISliderProps): JSX.Element => {
  return (
    <div className={styles.Slider}>
      <Swiper
        hashNavigation={props.hashNavigation}
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
            <SwiperSlide tag={"li"} key={account.id} data-hash={account.id}>
              {props.children}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
