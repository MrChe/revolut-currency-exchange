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

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCube, HashNavigation]);

interface ISliderProps {
  data: any[];
  id: string;
  hashNavigation?: boolean;
  onSlideChange?: (swiper: SwiperClass) => void;
  onSwiper?: (swiper: SwiperClass) => void;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputDisabled?: boolean;
  editMode?: boolean;
  sign?: "-" | "+";
  inputValue?: string | number | undefined;
  autoFocus?: boolean;
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
              <div className={styles.SwiperSlideWrapper}>
                <div className={styles.CurrencyInformation}>
                  <h3>{account.currency}</h3>
                  <p>
                    You have: {getSymbolFromCurrency(account.currency)}{" "}
                    {account.balance}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {props.editMode && (
        <div className={styles.InputWrapper}>
          <span className={styles.Sign}>{props.sign}</span>
          <input
            className={styles.Input}
            type="text"
            value={props.inputValue}
            onChange={props.onInputChange}
            disabled={props.inputDisabled}
            autoFocus={props.autoFocus}
          />
        </div>
      )}
    </div>
  );
};
