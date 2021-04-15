import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCube } from "swiper";
import getSymbolFromCurrency from "currency-symbol-map";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import { observer } from "mobx-react-lite";
import styles from "./Slider.module.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCube]);

interface ISliderProps {
  data: any[];
  id: string;
}

export const Slider = observer(
  (props: ISliderProps): JSX.Element => {
    console.log("DATA", props.data);
    return (
      <div className={styles.Slider}>
        <Swiper
          id={props.id}
          tag={"section"}
          wrapperTag={"ul"}
          effect="cube"
          centeredSlides
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
            console.log("ACCOUNT", account);
            return (
              <SwiperSlide tag={"li"} key={account.id}>
                <h3>
                  {getSymbolFromCurrency(account.currency)} {account.balance}
                </h3>
                <p>{account.currency}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  },
);
