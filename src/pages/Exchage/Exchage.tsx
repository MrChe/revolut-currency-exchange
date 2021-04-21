import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import styles from "./Exchage.module.scss";
import SwiperClass from "swiper/types/swiper-class";
import { AccountModel } from "../../models/AccountModel";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { AccountsModel } = useStore();

  // useEffect(() => {
  //   if (AccountsModel.accounts.length === 0) {
  //     AccountsModel.init();
  //   }
  // }, []);

  const history = useHistory();

  useEffect(() => {
    if (AccountsModel.activeAccountTo && AccountsModel.activeAccountFrom) {
      AccountsModel.updateInputToValue(
        AccountsModel.convertCurrency(
          AccountsModel.inputFromValue ? AccountsModel.inputFromValue : 0,
          {
            from: AccountsModel.activeAccountFrom?.currency || "",
            to: AccountsModel.activeAccountTo?.currency || "",
          },
        ),
      );
    }
  }, [AccountsModel.activeAccountFrom]);

  useEffect(() => {
    if (AccountsModel.activeAccountTo && AccountsModel.activeAccountFrom) {
      AccountsModel.updateInputFromValue(
        AccountsModel.convertCurrency(
          AccountsModel.inputToValue ? AccountsModel.inputToValue : 0,
          {
            from: AccountsModel.activeAccountTo?.currency || "",
            to: AccountsModel.activeAccountFrom?.currency || "",
          },
        ),
      );
    }
  }, [AccountsModel.activeAccountTo]);

  const handleFromChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      AccountsModel.updateInputFromValue(value);
      if (AccountsModel.activeAccountFrom && AccountsModel.activeAccountTo) {
        AccountsModel.updateInputToValue(
          AccountsModel.convertCurrency(value ? value : 0, {
            from: AccountsModel.activeAccountFrom?.currency || "",
            to: AccountsModel.activeAccountTo?.currency || "",
          }),
        );
      }
    }
  };

  const handleToChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      AccountsModel.updateInputToValue(value);
      if (AccountsModel.activeAccountTo && AccountsModel.activeAccountFrom) {
        AccountsModel.updateInputFromValue(
          AccountsModel.convertCurrency(value ? value : 0, {
            from: AccountsModel.activeAccountTo?.currency || "",
            to: AccountsModel.activeAccountFrom?.currency || "",
          }),
        );
      }
    }
  };

  const handleExchange = () => {
    AccountsModel.exchange();
    history.push(`/dashboard/#${AccountsModel.activeAccountFrom?.id}`);
  };

  const handleCancel = () => {
    history.push(`/dashboard/#${AccountsModel.activeAccountFrom?.id}`);
  };

  const handleChangeSlideFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setActiveAccountFrom(slideId);
    }
  };

  const handleChangeSlideTo = (swiper: SwiperClass) => {
    console.log("to activeIndex", swiper.slides);
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setActiveAccountTo(slideId);
    }
  };

  const onInitSwiperFrom = (swiper: SwiperClass) => {
    console.log("from activeIndex", swiper.slides);
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setActiveAccountFrom(slideId);
    }
  };

  const onInitSwiperTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setActiveAccountTo(slideId);
    }
  };

  console.log("accounts", AccountsModel.accountsAsArray);
  return AccountsModel.accountsAsArray.length !== 0 ? (
    <div className={styles.Exchange}>
      <div className={styles.HeaderWrapper}>
        <Button onClick={handleCancel} bg={"white"}>
          Cancel
        </Button>
      </div>

      <div
        className={cn({
          [styles.AccountSection]: true,
          [styles.Light]: true,
        })}
      >
        <Slider
          hashNavigation={true}
          data={AccountsModel.accountsAsArray}
          id={"from_account_slider"}
          onSlideChange={handleChangeSlideFrom}
          onSwiper={onInitSwiperFrom}
          editMode={true}
          sign={"-"}
          onInputChange={handleFromChangeValue}
          inputValue={AccountsModel.inputFromValue}
        />
      </div>
      <div className={styles.ExchangeControlDivider}>
        <Button
          bg={"white"}
          onClick={handleExchange}
          disabled={AccountsModel.isDisableExchange}
        >
          Exchange
        </Button>
      </div>
      <div
        className={cn({
          [styles.AccountSection]: true,
          [styles.Dark]: true,
        })}
      >
        <Slider
          data={AccountsModel.accountsAsArray}
          id={"to_account_slider"}
          onSlideChange={handleChangeSlideTo}
          onSwiper={onInitSwiperTo}
          editMode={true}
          sign={"+"}
          onInputChange={handleToChangeValue}
          inputValue={AccountsModel.inputToValue}
        />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
});
