import { Injectable, HttpService } from '@nestjs/common';
import { take } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PriceResponse, PriceData, SeriesData } from 'src/models/PriceResponse';

export enum Series {
  OHLC = 'ohlc',
  Single = 'Single',
  IntraDay = 'IntraDay',
  Month = 'Month',
  Year = 'Year',
  FiveYear = 'FiveYear'
}

@Injectable()
export class PricingService {

  private iexApiToken: string;
  private baseUrl: string;
  private timeSeriesUrl: string;
  private intraDaySeriesUrl: string;
  private singlePriceUrl: string;
  private version: string;

  // 
  // https://sandbox.iexapis.com/stable/stock/twtr/intraday-prices/?chartIEXOnly=true&token=Tsk_62fb8360cc1d4f4d8c9b992ec821f1f7
  constructor(private readonly httpService: HttpService) {
    // To do: populate apiToken and urls using config service
    this.iexApiToken = 'Tpk_256419cd0a5b4b5cb6ef3022e8207de0';
    this.baseUrl = 'https://sandbox.iexapis.com/';
    this.intraDaySeriesUrl = '';
    this.timeSeriesUrl = 'tops?token=';
    this.singlePriceUrl = 'tops?token=';
    this.version = 'stable'
  }
  
  async getStockPrices(symbol: string, series: Series) {
    let requestURL;
    const url = `${this.baseUrl}/${this.version}`;

    switch (series) {
      case Series.Single: 
        requestURL = `${url}/${this.singlePriceUrl}${this.iexApiToken}&symbols=${symbol}`;
        break;

      case Series.IntraDay:
        requestURL = `${url}/stock/${symbol}/intraday-prices/?chartIEXOnly=true&token=${this.iexApiToken}`;
        break;

      case Series.Month:
        requestURL = `${url}/stock/${symbol}/chart/1m?token=${this.iexApiToken}`;
        break;

      case Series.OHLC: 
        requestURL = `${url}/stock/${symbol}/ohlc?token=${this.iexApiToken}`;
        break;         
    }
    return this.extractPrices(await this.makeWebRequest(requestURL));
  }

  private extractPrices(response: PriceResponse) {
    const prices = [];
    let data = response.data;

    // If it isn't an array, it's not series data so we don't need to parse it. Just return the whole object
    if (!Array.isArray(data)) {
      return data;
    }
    data.forEach((datum: PriceData & SeriesData) => {
      if ((datum as PriceData).lastSalePrice) {
        prices.push((datum as PriceData).lastSalePrice);
      } else {
        
        prices.push({ minute: (datum as SeriesData).minute, value: (datum as SeriesData).close});
      }
    })
    return prices;
  }

  private async makeWebRequest(url) {
    const response: Observable<AxiosResponse> = this.httpService.get(url);
    return response.pipe(take(1)).toPromise();
  }

}
