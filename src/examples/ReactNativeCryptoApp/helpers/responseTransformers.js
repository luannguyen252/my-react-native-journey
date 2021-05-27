export const transformSymbolsFormat = symbols => {
  return symbols.map(symbol => ({
    ...symbol,
    changePercent24Hr: symbol.changePercent24Hr > 0
      ? `+${Number(symbol.changePercent24Hr).toFixed(2)}`
      : Number(symbol.changePercent24Hr).toFixed(2),
    vwap24Hr: Number(symbol.vwap24Hr).toFixed(),
    maxSupply: Number(symbol.maxSupply).toFixed(),
    supply: Number(symbol.supply).toFixed(),
    priceUsd: Number(symbol.priceUsd).toFixed(2),
    marketCapUsd: Number(symbol.marketCapUsd).toFixed(2),
    volumeUsd24Hr: Number(symbol.volumeUsd24Hr).toFixed(2),
    histories: symbol.histories.map((data, idx) => ({
      timestamp: data.time,
      x: idx,
      y: data.priceUsd,
    })),
  }));
};