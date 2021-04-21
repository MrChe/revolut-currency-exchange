import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";

import styles from "./Exchage.module.scss";
import SwiperClass from "swiper/types/swiper-class";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { AccountsModel } = useStore();

  // useEffect(() => {
  //   if (AccountsModel.accounts.length === 0) {
  //     AccountsModel.init();
  //   }
  // }, []);

  const history = useHistory();

  useEffect(() => {
    if (
      AccountsModel.selectedAccounts?.to &&
      AccountsModel.selectedAccounts?.from
    ) {
      AccountsModel.updateInputToValue(
        AccountsModel.convertCurrency(
          AccountsModel.inputFromValue ? AccountsModel.inputFromValue : 0,
          {
            from: AccountsModel.selectedAccounts?.from.currency || "",
            to: AccountsModel.selectedAccounts?.to.currency || "",
          },
        ),
      );
    }
  }, [AccountsModel.selectedAccounts?.from]);

  useEffect(() => {
    if (
      AccountsModel.selectedAccounts?.to &&
      AccountsModel.selectedAccounts?.from &&
      AccountsModel.inputToValue
    ) {
      AccountsModel.updateInputFromValue(
        AccountsModel.convertCurrency(
          AccountsModel.inputToValue ? AccountsModel.inputToValue : 0,
          {
            from: AccountsModel.selectedAccounts?.to.currency || "",
            to: AccountsModel.selectedAccounts?.from.currency || "",
          },
        ),
      );
    }
  }, [AccountsModel.inputFromValue, AccountsModel.selectedAccounts?.to]);

  const handleFromChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      console.log("from value", value);
      AccountsModel.updateInputFromValue(value);
      if (
        AccountsModel.selectedAccounts?.from &&
        AccountsModel.selectedAccounts?.to
      ) {
        AccountsModel.updateInputToValue(
          AccountsModel.convertCurrency(value ? value : 0, {
            from: AccountsModel.selectedAccounts?.from.currency || "",
            to: AccountsModel.selectedAccounts?.to.currency || "",
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
      console.log("to value", value);
      AccountsModel.updateInputToValue(value);
      if (
        AccountsModel.selectedAccounts?.to &&
        AccountsModel.selectedAccounts?.from
      ) {
        AccountsModel.updateInputFromValue(
          AccountsModel.convertCurrency(value ? value : 0, {
            from: AccountsModel.selectedAccounts?.to.currency || "",
            to: AccountsModel.selectedAccounts?.from.currency || "",
          }),
        );
      }
    }
  };

  const handleExchange = () => {
    AccountsModel.exchange();
  };

  const handleCancel = () => {
    history.push(`/dashboard/#${AccountsModel.selectedAccounts?.from?.id}`);
  };

  const handleChangeSlideFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccounts({ fromId: slideId });
    }

    console.log("selectedAccounts", AccountsModel.selectedAccounts);
    AccountsModel.updateInputToValue(
      AccountsModel.convertCurrency(
        AccountsModel.inputFromValue ? AccountsModel.inputFromValue : 0,
        {
          from: AccountsModel.selectedAccounts?.from?.currency || "",
          to: AccountsModel.selectedAccounts?.to?.currency || "",
        },
      ),
    );
  };

  const handleChangeSlideTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccounts({ toId: slideId });
    }
  };

  const onInitSwiperFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccounts({ fromId: slideId });
    }
  };

  const onInitSwiperTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccounts({ toId: slideId });
    }
  };

  // console.log("accounts", AccountsModel.accounts);
  console.log("selectedAccounts", AccountsModel.selectedAccounts);

  return AccountsModel.accounts.length !== 0 ? (
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
        <Button bg={"white"} onClick={handleExchange}>
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
      {/*{ExchangeModel.activeAccounts ? (*/}
      {/*  <div className={styles.container}>*/}
      {/*    <div className={styles.wrapper}>*/}
      {/*      <div>*/}
      {/*        <div>*/}
      {/*          <select*/}
      {/*            name="top_currency"*/}
      {/*            id="top_currency"*/}
      {/*            onChange={handleChangeTopSelect}*/}
      {/*            value={ExchangeModel.activeAccounts.from?.currency}*/}
      {/*          >*/}
      {/*            {ExchangeModel.accounts.map((account) => {*/}
      {/*              if (*/}
      {/*                account.currency !==*/}
      {/*                ExchangeModel.activeAccounts?.to?.currency*/}
      {/*              ) {*/}
      {/*                return (*/}
      {/*                  <option key={account.currency} value={account.currency}>*/}
      {/*                    {account.currency}*/}
      {/*                  </option>*/}
      {/*                );*/}
      {/*              }*/}
      {/*            })}*/}
      {/*          </select>*/}
      {/*          <label htmlFor="top">{`TOP: ${ExchangeModel.activeAccounts.from?.currency}`}</label>*/}
      {/*          -*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            id="top"*/}
      {/*            onChange={handleTopChangeValue}*/}
      {/*            value={topInputValue ? topInputValue : ""}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <p>{`Balance: ${*/}
      {/*          ExchangeModel.activeAccounts?.from &&*/}
      {/*          ExchangeModel.formatCurrency(*/}
      {/*            ExchangeModel.activeAccounts?.from?.balance,*/}
      {/*            ExchangeModel.activeAccounts?.from?.currency,*/}
      {/*          )*/}
      {/*        }`}</p>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <div>*/}
      {/*          <select*/}
      {/*            name="bottom_currency"*/}
      {/*            id="bottom_currency"*/}
      {/*            onChange={handleChangeBottomSelect}*/}
      {/*            value={ExchangeModel.activeAccounts.to?.currency}*/}
      {/*          >*/}
      {/*            {ExchangeModel.accounts.map((account) => {*/}
      {/*              if (*/}
      {/*                account.currency !==*/}
      {/*                ExchangeModel.activeAccounts?.from?.currency*/}
      {/*              ) {*/}
      {/*                return (*/}
      {/*                  <option key={account.currency} value={account.currency}>*/}
      {/*                    {account.currency}*/}
      {/*                  </option>*/}
      {/*                );*/}
      {/*              }*/}
      {/*            })}*/}
      {/*          </select>*/}
      {/*          <label htmlFor="bottom">*/}
      {/*            {`BOTTOM: ${ExchangeModel.activeAccounts?.to?.currency}`}*/}
      {/*          </label>*/}
      {/*          +*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            id="bottom"*/}
      {/*            onChange={handleBottomChangeValue}*/}
      {/*            value={bottomInputValue ? bottomInputValue : ""}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <p>{`Balance: ${*/}
      {/*            ExchangeModel.activeAccounts?.to &&*/}
      {/*            ExchangeModel.formatCurrency(*/}
      {/*              ExchangeModel.activeAccounts?.to?.balance,*/}
      {/*              ExchangeModel.activeAccounts?.to?.currency,*/}
      {/*            )*/}
      {/*          }`}</p>*/}
      {/*          ------*/}
      {/*          <p>*/}
      {/*            Rate:{" "}*/}
      {/*            {ExchangeModel.activeAccounts?.to &&*/}
      {/*              `${ExchangeModel.formatCurrency(*/}
      {/*                1,*/}
      {/*                ExchangeModel.activeAccounts?.to?.currency,*/}
      {/*              )} = ${*/}
      {/*                ExchangeModel.activeAccounts?.from?.currency*/}
      {/*              } ${ExchangeModel.convertCurrency(1, {*/}
      {/*                from: ExchangeModel.activeAccounts?.to?.currency || "",*/}
      {/*                to: ExchangeModel.activeAccounts?.from?.currency || "",*/}
      {/*              })}`}*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      onClick={handleExchange}*/}
      {/*      disabled={!topInputValue && !bottomInputValue}*/}
      {/*    >*/}
      {/*      Exchange*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div>Loading...</div>*/}
      {/*)}*/}
    </div>
  ) : (
    <div>Loading...</div>
  );
});
