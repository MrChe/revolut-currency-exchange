import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Slider } from "../../components/Slider/Slider";
import { Icon } from "../../components/icons/icons";
import { useStore } from "../../models/connect";
import SwiperClass from "swiper/types/swiper-class";
import { Button } from "../../components/Button/Button";
import { Account } from "../../components/Account/Account";
import { HistoryList } from "../../components/HistoryList/HistoryList";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const { ExchangeModel } = useStore();

  useEffect(() => {
    if (ExchangeModel.accounts.length === 0) {
      ExchangeModel.init();
    }
  }, []);

  const activeAccountFrom = ExchangeModel.activeAccountFrom;

  const handleSlideChange = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      ExchangeModel.setActiveAccountFrom(slideId);
    }
  };

  const goToExchange = () => {
    history.push(`/exchange/#${activeAccountFrom?.id}`);
  };

  const onInitSwiper = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      ExchangeModel.setActiveAccountFrom(slideId);
    }
  };

  return ExchangeModel.accountsAsArray.length !== 0 ? (
    <div className={styles.Dashboard}>
      <div className={styles.Preview}>
        <div className={styles.SliderWrapper}>
          <Slider
            hashNavigation={true}
            data={ExchangeModel.accountsAsArray}
            id={"dashboard_slider"}
            onSlideChange={handleSlideChange}
            onSwiper={onInitSwiper}
          >
            <Account type={"from"} view={"preview"} />
          </Slider>
        </div>
      </div>
      <div className={styles.Controls}>
        <Button onClick={goToExchange} type={"circle"}>
          <Icon.Exchange />
        </Button>
      </div>

      <div className={styles.HistoryWrapper}>
        <HistoryList />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
});
