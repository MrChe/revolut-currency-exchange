import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel } = useStore();

  useEffect(() => {
    ExchangeModel.getLatestRates();
    console.log("RATES", ExchangeModel.rates);
  }, [ExchangeModel.rates]);

  return <div>Exchange</div>;
});
