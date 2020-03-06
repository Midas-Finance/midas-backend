import { Injectable, HttpService } from '@nestjs/common';
import { take } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { PriceResponse, PriceData, SeriesData } from 'src/models/PriceResponse';

export enum Series {
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
    switch (series) {
      case Series.Single: 
        return this.extractPrices(await this.makeWebRequest(`${this.baseUrl}/${this.version}/${this.singlePriceUrl}${this.iexApiToken}&symbols=${symbol}`));
      
      case Series.IntraDay:
        console.log(`${this.baseUrl}/${this.version}/stock/${symbol}/intraday-prices/?chartIEXOnly=true&token=${this.iexApiToken}`);
        return this.extractPrices(await this.makeWebRequest(`${this.baseUrl}/${this.version}/stock/${symbol}/intraday-prices/?chartIEXOnly=true&token=${this.iexApiToken}`));

      case Series.Month:
        return this.extractPrices(await this.makeWebRequest(`${this.baseUrl}/${this.version}/stock/${symbol}/chart/1m?token=${this.iexApiToken}`));

    }
  }

  private extractPrices(response: PriceResponse) {
    const prices = [];
    response.data.forEach((datum: PriceData & SeriesData) => {
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
