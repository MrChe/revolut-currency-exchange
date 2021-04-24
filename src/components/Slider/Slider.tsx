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
import { Account } from "../../components/Account/Account";
import { HistoryOptions } from "swiper/types/components/history";
import { formatCurrency, currencyNames } from "../../utils/helpers";

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
  view: "preview" | "exchange";
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
        {props.data.map((account: AccountModel) => {
          return (
            <SwiperSlide tag={"li"} key={account.id} data-history={account.id}>
              <Account
                balance={formatCurrency(account.balance, account.currency)}
                view={props.view}
                currency={account.currency}
                currencyName={currencyNames[account.currency] || ""}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
