import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCube,
  HashNavigation,
} from "swiper";
import SwiperClass from "swiper/types/swiper-class";
import { observer } from "mobx-react-lite";
import getSymbolFromCurrency from "currency-symbol-map";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";

import styles from "./Slider.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, HashNavigation, EffectCube]);

interface ISliderProps {
  data: any[];
  id: string;
  hashNavigation?: boolean;
  onSlideChange?: (swiper: SwiperClass) => void;
  onSwiper?: (swiper: SwiperClass) => void;
}

export const Slider = observer(
  (props: ISliderProps): JSX.Element => {
    return (
      <div className={styles.Slider}>
        <Swiper
          hashNavigation={props.hashNavigation}
          id={props.id}
          tag={"section"}
          wrapperTag={"ul"}
          effect="cube"
          centeredSlides
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={props.onSwiper}
          onSlideChange={props.onSlideChange}
        >
          {props.data.map((account) => {
            return (
              <SwiperSlide tag={"li"} key={account.id} data-hash={account.id}>
                <h3>{account.currency}</h3>
                <p>
                  You have: {getSymbolFromCurrency(account.currency)}{" "}
                  {account.balance}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  },
);
