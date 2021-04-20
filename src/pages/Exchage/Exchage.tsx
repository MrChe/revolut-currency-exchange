import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { AccountModel } from "../../models/AccountModel";

import styles from "./Exchage.module.scss";
import SwiperClass from "swiper/types/swiper-class";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel, AccountsModel } = useStore();

  const [fromInputValue, setFromInputValue] = useState<number | string>(null);
  const [toInputValue, setToInputValue] = useState<number | string>(null);

  const [accountFrom, setAccountFrom] = useState<AccountModel | null>(null);
  const [accountTo, setAccountTo] = useState<AccountModel | null>(null);

  useEffect(() => {
    if (AccountsModel.accounts.length === 0) {
      AccountsModel.init();
    }
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (AccountsModel.ratesData) {
      ExchangeModel.init(AccountsModel.ratesData);
    }
  }, [AccountsModel.ratesData]);

  useEffect(() => {
    if (accountTo && accountFrom && fromInputValue) {
      setToInputValue(
        ExchangeModel.convertCurrency(fromInputValue ? fromInputValue : 0, {
          from: accountFrom.currency || "",
          to: accountTo.currency || "",
        }),
      );
    }
  }, [toInputValue, accountFrom]);

  useEffect(() => {
    if (accountTo && accountFrom && toInputValue) {
      setFromInputValue(
        ExchangeModel.convertCurrency(toInputValue ? toInputValue : 0, {
          from: accountTo.currency || "",
          to: accountFrom.currency || "",
        }),
      );
    }
  }, [fromInputValue, accountTo]);

  const handleFromChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      console.log("handleFromChangeValue", value);
      setFromInputValue(value ? value : "");
      if (accountFrom && accountTo) {
        setToInputValue(
          ExchangeModel.convertCurrency(value ? value : 0, {
            from: accountFrom.currency || "",
            to: accountTo.currency || "",
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
      console.log("handleToChangeValue", value);
      setToInputValue(value ? value : "");
      if (accountTo && accountFrom) {
        setFromInputValue(
          ExchangeModel.convertCurrency(value ? value : 0, {
            from: accountTo.currency || "",
            to: accountFrom.currency || "",
          }),
        );
      }
    }
  };

  // const handleExchange = () => {
  //   if (topInputValue && bottomInputValue) {
  //     ExchangeModel.exchange(Number(topInputValue), Number(bottomInputValue));
  //   }
  // };

  // console.log("accounts", ExchangeModel?.accounts);
  // console.log("activeAccounts", ExchangeModel?.activeAccounts);

  const handleCancel = () => {
    history.push(`/dashboard/#${AccountsModel.selectedAccount?.id}`);
  };

  const handleChangeSlideFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
      setAccountFrom(AccountsModel.getAccountById(slideId));
    }
  };

  const handleChangeSlideTo = (swiper: SwiperClass) => {
    console.log("handleChangeSlideTo", swiper);
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      setAccountTo(AccountsModel.getAccountById(slideId));
    }
  };

  const onInitSwiperFrom = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
      setAccountFrom(AccountsModel.getAccountById(slideId));
    }
  };

  const onInitSwiperTo = (swiper: SwiperClass) => {
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      setAccountTo(AccountsModel.getAccountById(slideId));
    }
  };

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
          history={true}
          data={AccountsModel.accountsAsArray}
          id={"from_account_slider"}
          onSlideChange={handleChangeSlideFrom}
          onSwiper={onInitSwiperFrom}
          editMode={true}
          sign={"-"}
          onInputChange={handleFromChangeValue}
          inputValue={fromInputValue ? fromInputValue : ""}
        />
      </div>
      <div className={styles.ExchangeControlDivider}>
        <Button bg={"white"}>Exchange</Button>
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
          inputValue={toInputValue ? toInputValue : ""}
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
