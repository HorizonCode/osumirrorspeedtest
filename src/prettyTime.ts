const map: Record<string, number> = {
  year: 31536000000,
  month: 2592000000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
  second: 1000,
  ms: 1,
};

const short: Record<string, string> = {
  year: "y",
  month: "mo",
  day: "d",
  hour: "h",
  minute: "m",
  second: "s",
  ms: "ms",
};

export function prettytime(value: number, options?: {
  short?: boolean;
  decimals?: number;
}) {
  value = Math.abs(value);

  let unit = "";
  Object.keys(map).some(function (key) {
    const unitValue = map[key];
    unit = key;
    if (value >= unitValue) {
      value = value / unitValue;
      return true;
    }
  });

  if (options && options.short) {
    unit = short[unit];
  } else if (value > 1 && unit !== "ms") {
    unit += "s";
  }

  return [value.toFixed(options?.decimals || 0), unit].join(
    options?.short ? "" : " ",
  );
}
