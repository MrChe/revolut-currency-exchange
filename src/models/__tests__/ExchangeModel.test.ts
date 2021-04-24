import { RootModel } from "../RootModel";
import { ratesData } from "../../../tests/mockData";
import { beforeEach } from "jest-circus";

describe("ExchangeModel", () => {
  const rootModel = new RootModel();
  const exchangeModel = rootModel.ExchangeModel;
  beforeEach(() => {
    exchangeModel.setRatesData(ratesData);
    exchangeModel.setAccounts(ratesData);
    exchangeModel.setActiveAccountFrom(exchangeModel.accounts[0].id);
    exchangeModel.setActiveAccountTo(exchangeModel.accounts[1].id);
  });
  it("test updateInputFromValue", () => {
    expect(exchangeModel.inputFromValue).toEqual("");
    exchangeModel.updateInputFromValue(10);
    expect(exchangeModel.inputFromValue).toEqual(10);
  });

  it("test updateInputToValue", () => {
    expect(exchangeModel.inputToValue).toEqual("");
    exchangeModel.updateInputToValue(10);
    expect(exchangeModel.inputToValue).toEqual(10);
  });

  it("test updateBalanceFrom", () => {
    if (exchangeModel.activeAccountFrom) {
      expect(exchangeModel.activeAccountFrom?.balance).toEqual(100);
    }

    exchangeModel.updateInputFromValue(10);
    if (exchangeModel.activeAccountFrom && exchangeModel.inputFromValue) {
      exchangeModel.updateBalanceFrom(
        exchangeModel.activeAccountFrom?.id,
        Number(exchangeModel.inputFromValue),
      );
      expect(exchangeModel.inputFromValue).toEqual(10);
      expect(exchangeModel.activeAccountFrom?.balance).toEqual(90);
    }
  });

  it("test updateBalanceTo", () => {
    if (exchangeModel.activeAccountTo) {
      expect(exchangeModel.activeAccountTo?.balance).toEqual(100);
    }

    exchangeModel.updateInputToValue(10);
    if (exchangeModel.activeAccountTo && exchangeModel.inputToValue) {
      exchangeModel.updateBalanceTo(
        exchangeModel.activeAccountTo?.id,
        Number(exchangeModel.inputToValue),
      );
      expect(exchangeModel.inputToValue).toEqual(10);
      expect(exchangeModel.activeAccountTo?.balance).toEqual(110);
    }
  });

  it("test exchange", () => {
    if (exchangeModel.activeAccountFrom && exchangeModel.activeAccountTo) {
      expect(exchangeModel.activeAccountFrom?.currency).toEqual("EUR");
      expect(exchangeModel.activeAccountFrom?.balance).toEqual(100);
      expect(exchangeModel.activeAccountTo?.currency).toEqual("GBP");
      expect(exchangeModel.activeAccountTo?.balance).toEqual(100);

      exchangeModel.updateInputFromValue(1);
      exchangeModel.updateInputToValue(0.87);
      exchangeModel.exchange();

      expect(exchangeModel.activeAccountFrom?.balance).toEqual(99);
      expect(exchangeModel.activeAccountFrom?.history).toHaveLength(1);
      expect(exchangeModel.activeAccountTo?.balance).toEqual(100.87);
      expect(exchangeModel.activeAccountTo?.history).toHaveLength(1);
    }
  });

  // Exchange to GBP - €10.00 + £8.72
  it("test updateHistory for activeAccountFrom", () => {
    if (exchangeModel.activeAccountFrom) {
      expect(exchangeModel.activeAccountFrom?.history).toHaveLength(0);
      expect(exchangeModel.inputFromValue).toEqual("");
      expect(exchangeModel.inputToValue).toEqual("");
      exchangeModel.updateInputFromValue(10);
      exchangeModel.updateInputToValue(8.72);
      exchangeModel.updateHistoryInAccount(exchangeModel.activeAccountFrom.id, {
        name: `Exchange to ${exchangeModel.activeAccountTo?.currency}`,
        from: `- ${exchangeModel.formatCurrency(
          exchangeModel.inputFromValue,
          exchangeModel.activeAccountFrom?.currency || "",
        )}`,
        to: `+ ${exchangeModel.formatCurrency(
          exchangeModel.inputToValue,
          exchangeModel.activeAccountTo?.currency || "",
        )}`,
      });
      expect(exchangeModel.inputFromValue).toEqual(10);
      expect(exchangeModel.inputToValue).toEqual(8.72);
      expect(exchangeModel.activeAccountFrom?.history).toHaveLength(1);
      expect(exchangeModel.activeAccountFrom?.history[0].from).toEqual(
        "- €10.00",
      );
      expect(exchangeModel.activeAccountFrom?.history[0].to).toEqual("+ £8.72");
      expect(exchangeModel.activeAccountFrom?.history[0].name).toEqual(
        "Exchange to GBP",
      );
    }
  });

  // Exchange from EUR + £8.72 - €10.00
  it("test updateHistory for activeAccountTo", () => {
    if (exchangeModel.activeAccountTo) {
      expect(exchangeModel.activeAccountTo?.history).toHaveLength(0);
      expect(exchangeModel.inputFromValue).toEqual("");
      expect(exchangeModel.inputToValue).toEqual("");
      exchangeModel.updateInputFromValue(10);
      exchangeModel.updateInputToValue(8.72);

      exchangeModel.updateHistoryInAccount(exchangeModel.activeAccountTo.id, {
        name: `Exchange from ${exchangeModel.activeAccountFrom?.currency}`,
        from: `+ ${exchangeModel.formatCurrency(
          exchangeModel.inputToValue,
          exchangeModel.activeAccountTo?.currency || "",
        )}`,
        to: `- ${exchangeModel.formatCurrency(
          exchangeModel.inputFromValue,
          exchangeModel.activeAccountFrom?.currency || "",
        )}`,
      });

      expect(exchangeModel.inputFromValue).toEqual(10);
      expect(exchangeModel.inputToValue).toEqual(8.72);
      expect(exchangeModel.activeAccountTo?.history).toHaveLength(1);
      expect(exchangeModel.activeAccountTo?.history[0].from).toEqual("+ £8.72");
      expect(exchangeModel.activeAccountTo?.history[0].to).toEqual("- €10.00");
      expect(exchangeModel.activeAccountTo?.history[0].name).toEqual(
        "Exchange from EUR",
      );
    }
  });

  it("test formatCurrency", () => {
    expect(exchangeModel.formatCurrency(10, "EUR")).toEqual("€10.00");
    expect(exchangeModel.formatCurrency(10.5, "UAH")).toEqual("₴10.50");
    expect(exchangeModel.formatCurrency(100.5, "USD")).toEqual("$100.50");
  });

  it("test convertCurrency", () => {
    if (exchangeModel.ratesData) {
      expect(
        exchangeModel.convertCurrency(10, {
          from: "UAH",
          to: "USD",
        }),
      ).toEqual(0.36);
      expect(
        exchangeModel.convertCurrency(10, {
          from: "USD",
          to: "UAH",
        }),
      ).toEqual(280.44);

      expect(
        exchangeModel.convertCurrency(10, {
          from: "GBP",
          to: "EUR",
        }),
      ).toEqual(11.53);
    }
  });
});
