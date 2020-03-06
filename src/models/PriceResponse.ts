import { AxiosResponse } from 'axios';

export interface PriceResponse extends AxiosResponse {
  data: Array<PriceData> | Array<SeriesData>
}

// typically only used for single requests
export interface PriceData {
    symbol: string,
    sector: string,
    securityType: string,
    bidPrice: number,
    bidSize: number,
    askPrice: number,
    askSize: number,
    lastUpdated: number,
    lastSalePrice: number,
    lastSaleSize: number,
    lastSaleTime: number,
    volume: number
}

export interface SeriesData {
  date: string,
  minute?: string,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number,
  uOpen: number,
  uClose: number,
  uHigh: number,
  uLow: number,
  uVolume: number,
  change?: number,
  changePercent?: number,
  label: string,
  changeOverTime?: number,
  notational?: number,
  numberOfTrades?: number
}