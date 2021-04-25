import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import SwiperClass from "swiper/types/swiper-class";
import { InputNumber } from "../../components/InputNumber/InputNumber";
import { Spinner } from "../../components/Spinner/Spinner";

import styles from "./Exchange.module.scss";

const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel } = useStore();

  const activeAccountTo = ExchangeModel.activeAccountTo;
  const activeAccountFrom = ExchangeModel.activeAccountFrom;
  const inputFromValue = ExchangeModel.inputFromValue;
  const inputToValue = ExchangeModel.inputToValue;

  const history = useHistory();

  useEffect(() => {
    if (activeAccountTo && activeAccountFrom) {
      ExchangeModel.updateInputToValue(
        ExchangeModel.convertCurrency(inputFromValue ? inputFromValue : 0, {
          from: activeAccountFrom?.currency || "",
          to: activeAccountTo?.currency || "",
        }),
      );
    }
  }, [activeAccountFrom]);

  useEffect(() => {
    if (activeAccountTo && activeAccountFrom) {
      ExchangeModel.updateInputFromValue(
        ExchangeModel.convertCurrency(inputToValue ? inputToValue : 0, {
          from: activeAccountTo?.currency || "",
          to: activeAccountFrom?.currency || "",
        }),
      );
    }
  }, [activeAccountTo]);

  const handleFromChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    console.log("before value", value);
    if (value === "" || regExp.test(value)) {
      console.log("after value", value);
      ExchangeModel.updateInputFromValue(value);
      if (activeAccountFrom && activeAccountTo) {
        ExchangeModel.updateInputToValue(
          ExchangeModel.convertCurrency(value ? value : 0, {
            from: activeAccountFrom?.currency || "",
            to: activeAccountTo?.currency || "",
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
      ExchangeModel.updateInputToValue(value);
      if (activeAccountTo && activeAccountFrom) {
        ExchangeModel.updateInputFromValue(
          ExchangeModel.convertCurrency(value ? value : 0, {
            from: activeAccountTo?.currency || "",
            to: activeAccountFrom?.currency || "",
          }),
        );
      }
    }
  };

  const handleExchange = () => {
    ExchangeModel.exchange();
    ExchangeModel.updateInputToValue("");
    ExchangeModel.updateInputFromValue("");
    history.push(`/dashboard/${activeAccountFrom?.id}`);
  };

  const handleCancel = () => {
    history.push(`/dashboard/${activeAccountFrom?.id}`);
  };

  const handleChangeSlideFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute(
      "data-history",
    );
    if (slideId) {
      ExchangeModel.setActiveAccountFrom(slideId);
    }
  };

  const handleChangeSlideTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute(
      "data-history",
    );
    if (slideId) {
      ExchangeModel.setActiveAccountTo(slideId);
    }
  };

  const onInitSwiperFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute(
      "data-history",
    );
    if (slideId) {
      ExchangeModel.setActiveAccountFrom(slideId);
    }
  };

  const onInitSwiperTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute(
      "data-history",
    );
    if (slideId) {
      ExchangeModel.setActiveAccountTo(slideId);
    }
  };

  return ExchangeModel.accountsAsArray.length !== 0 ? (
    <div className={styles.Exchange}>
      <div className={styles.HeaderWrapper}>
        <Button name={"cancel"} onClick={handleCancel} bg={"white"}>
          Cancel
        </Button>
      </div>

      <div
        className={cn({
          [styles.AccountSection]: true,
          [styles.Light]: true,
        })}
      >
        <div className={styles.SliderWrapper}>
          <Slider
            history={{
              key: "account",
            }}
            data={ExchangeModel.accountsAsArray}
            id={"from_account_slider"}
            onSlideChange={handleChangeSlideFrom}
            onSwiper={onInitSwiperFrom}
            view={"exchange"}
          />
        </div>
        <div className={styles.InputWrapper}>
          <div className={styles.InputSign}>-</div>
          <InputNumber
            onChange={handleFromChangeValue}
            value={inputFromValue}
            autoFocus={true}
          />
        </div>
      </div>
      <div className={styles.ExchangeControlDivider}>
        <Button
          name={"exchange"}
          bg={"white"}
          onClick={handleExchange}
          disabled={ExchangeModel.isDisableExchange}
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
        <div className={styles.SliderWrapper}>
          <Slider
            data={ExchangeModel.accountsAsArray}
            id={"to_account_slider"}
            onSlideChange={handleChangeSlideTo}
            onSwiper={onInitSwiperTo}
            view={"exchange"}
          />
        </div>

        <div className={styles.InputWrapper}>
          <div className={styles.InputSign}>+</div>
          <InputNumber onChange={handleToChangeValue} value={inputToValue} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.LoadingWrapper}>
      <Spinner />
    </div>
  );
});

export default Exchange;
