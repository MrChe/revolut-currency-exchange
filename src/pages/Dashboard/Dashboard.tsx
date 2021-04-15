import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Slider } from "../../components/Slider/Slider";
import { Icon } from "../../components/icons/icons";
import { useStore } from "../../models/connect";
import SwiperClass from "swiper/types/swiper-class";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const { AccountsModel } = useStore();

  useEffect(() => {
    if (AccountsModel.accounts.length === 0) {
      AccountsModel.getLatestRates();
    }
  }, [AccountsModel.accounts.length]);

  const handleSlideChange = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
    }
  };

  const goToExchange = () => {
    history.push(`/exchange/#${AccountsModel.selectedAccount?.id}`);
  };

  return AccountsModel.accounts.length !== 0 ? (
    <div className={styles.Dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.Preview}>
        <Slider
          data={AccountsModel.accountsAsArray}
          id={"dashboard_slider"}
          onSlideChange={handleSlideChange}
        />
      </div>
      <div className={styles.Controls}>
        <button onClick={goToExchange}>
          <Icon.Exchange />
        </button>
      </div>
      <div className={styles.History}>History</div>
    </div>
  ) : (
    <div>Loading</div>
  );
});
