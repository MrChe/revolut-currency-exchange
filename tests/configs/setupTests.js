jest.mock("uuid", () => {
  let value = 0;
  return {
    v4: () => value++,
  };
});

const DATE_TO_USE = new Date("2021");
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;
