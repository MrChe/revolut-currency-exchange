import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Slider } from "../../components/Slider/Slider";
import { Icon } from "../../components/icons/icons";
import { useStore } from "../../models/connect";
import SwiperClass from "swiper/types/swiper-class";
import { Button } from "../../components/Button/Button";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const { AccountsModel, ExchangeModel } = useStore();

  useEffect(() => {
    if (AccountsModel.accounts.length === 0) {
      AccountsModel.init();
    }
  }, []);

  useEffect(() => {
    if (AccountsModel.ratesData) {
      ExchangeModel.init(AccountsModel.ratesData);
    }
  }, [AccountsModel.ratesData]);

  const handleSlideChange = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
    }
  };

  const goToExchange = () => {
    history.push(`/exchange/#${AccountsModel.selectedAccount?.id}`);
  };

  const onInitSwiper = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
    }
  };

  console.log("accounts", AccountsModel.accounts);
  console.log("selectedAccount", AccountsModel.selectedAccount);

  return AccountsModel.accounts.length !== 0 ? (
    <div className={styles.Dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.Preview}>
        <Slider
          history={true}
          data={AccountsModel.accountsAsArray}
          id={"dashboard_slider"}
          onSlideChange={handleSlideChange}
          onSwiper={onInitSwiper}
          editMode={false}
        />
      </div>
      <div className={styles.Controls}>
        <Button onClick={goToExchange} type={"circle"}>
          <Icon.Exchange />
        </Button>
      </div>
      <div className={styles.History}>History</div>
    </div>
  ) : (
    <div>Loading</div>
  );
});
