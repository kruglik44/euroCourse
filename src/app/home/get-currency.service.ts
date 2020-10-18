import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(private http: HttpClient) { }
  jsonResult;
  xmLResult;
  getCurrencyJSON(){
    this.jsonResult = this.http.get("https://www.cbr-xml-daily.ru/daily_json.js");
    return this.jsonResult;
  }
  getCurrencyXML(){
    this.xmLResult = fetch("https://www.cbr-xml-daily.ru/daily_utf8.xml");
    return this.xmLResult;
  }
}
