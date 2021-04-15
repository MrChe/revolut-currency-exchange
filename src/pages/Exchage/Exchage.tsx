import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";

import styles from "./Exchage.module.scss";
import SwiperClass from "swiper/types/swiper-class";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel, AccountsModel } = useStore();

  const history = useHistory();

  // useEffect(() => {
  //   if (ExchangeModel.accounts.length === 0) {
  //     ExchangeModel.getLatestRates();
  //   }
  // }, [ExchangeModel.accounts]);
  //
  // const [topInputValue, setTopInputValue] = useState<string | number | null>(
  //   null,
  // );
  // const [bottomInputValue, setBottomInputValue] = useState<
  //   string | number | null
  // >(null);
  //
  // const handleChangeTopSelect = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   ExchangeModel.setActiveAccounts({
  //     ...ExchangeModel.activeAccounts,
  //     from: ExchangeModel.findAccountByCurrency(event.target.value),
  //   });
  //   setBottomInputValue(
  //     ExchangeModel.convertCurrency(topInputValue ? topInputValue : 0, {
  //       from: ExchangeModel.activeAccounts?.to?.currency || "",
  //       to: ExchangeModel.activeAccounts?.from?.currency || "",
  //     }),
  //   );
  // };
  //
  // const handleChangeBottomSelect = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   ExchangeModel.setActiveAccounts({
  //     ...ExchangeModel.activeAccounts,
  //     to: ExchangeModel.findAccountByCurrency(event.target.value),
  //   });
  //   setTopInputValue(
  //     ExchangeModel.convertCurrency(bottomInputValue ? bottomInputValue : 0, {
  //       from: ExchangeModel.activeAccounts?.to?.currency || "",
  //       to: ExchangeModel.activeAccounts?.from?.currency || "",
  //     }),
  //   );
  // };
  //
  // const handleTopChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   const regExp = /^[0-9\b\.]+$/;
  //
  //   // if value is not blank, then test the regex
  //
  //   if (value === "" || regExp.test(value)) {
  //     setTopInputValue(value ? value : "");
  //     setBottomInputValue(
  //       ExchangeModel.convertCurrency(value ? value : 0, {
  //         from: ExchangeModel.activeAccounts?.from?.currency || "",
  //         to: ExchangeModel.activeAccounts?.to?.currency || "",
  //       }),
  //     );
  //   }
  // };
  // const handleBottomChangeValue = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const value = event.target.value;
  //   const regExp = /^[0-9\b\.]+$/;
  //
  //   // if value is not blank, then test the regex
  //
  //   if (value === "" || regExp.test(value)) {
  //     setBottomInputValue(value ? value : "");
  //     setTopInputValue(
  //       ExchangeModel.convertCurrency(value ? value : 0, {
  //         from: ExchangeModel.activeAccounts?.to?.currency || "",
  //         to: ExchangeModel.activeAccounts?.from?.currency || "",
  //       }),
  //     );
  //   }
  // };
  //
  // const handleExchange = () => {
  //   if (topInputValue && bottomInputValue) {
  //     ExchangeModel.exchange(Number(topInputValue), Number(bottomInputValue));
  //   }
  // };
  //
  // console.log("accounts", ExchangeModel?.accounts);
  // console.log("activeAccounts", ExchangeModel?.activeAccounts);

  const handleCancel = () => {
    history.push(`/dashboard/#${AccountsModel.selectedAccount?.id}`);
  };

  const handleChangeSlideFrom = (swiper: SwiperClass) => {
    console.log("handleChangeSlideFrom", swiper);
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
    }
  };

  const handleChangeSlideTo = (swiper: SwiperClass) => {
    console.log("handleChangeSlideTo", swiper);
  };

  const onInitSwiperFrom = (swiper: SwiperClass) => {
    console.log("onInitSwiperFrom", swiper);
    const slideId = swiper.slides[swiper.activeIndex].getAttribute("data-hash");
    if (slideId) {
      AccountsModel.setSelectedAccount(slideId);
    }
  };

  const onInitSwiperTo = (swiper: SwiperClass) => {
    console.log("onInitSwiperTo", swiper);
  };

  return AccountsModel.accounts.length !== 0 ? (
    <div className={styles.Exchange}>
      <button onClick={handleCancel}>Cancel</button>
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
        />
      </div>
      <div className={styles.ExchangeControlDivider}>
        <button>Exchange</button>
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
