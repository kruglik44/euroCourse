import { Component, OnInit } from '@angular/core';
import { GetCurrencyService } from './get-currency.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  xmlEuro: string;
  jsonEuro: string;
  time: Date;
  showXml = false;
  showJSON = true;

  constructor(private getService: GetCurrencyService) {}
  
  recieveValue(){
    this.getService.getCurrencyJSON().subscribe(data => {
      //console.log(data);
      this.jsonEuro = data.Valute.EUR.Value;
      this.time = data.Date;
    }, error => {
      console.log(error);
      this.jsonEuro = "Ошибка";
      this.showJSON = false;
      this.showXml = true;
    })
  }

  recieveXML(){
    this.getService.getCurrencyXML()
      .then(response => response.text())
      .then(data => {
        let xml = new DOMParser().parseFromString(data,"application/xml" );
        this.xmlEuro = xml.getElementsByTagName("Valute")[11].getElementsByTagName("Value")[0].innerHTML;
      }, error => {
        console.log(error);
        this.xmlEuro = "Ошибка";
        this.showXml = false;
        this.showJSON = true;
      })  
  }

  changeSource(){
    this.showJSON = !this.showJSON;
    this.showXml = !this.showXml;
  }
 
  ngOnInit(){
    this.recieveValue();
    this.recieveXML();
    setInterval(() => {this.recieveValue()}, 3000);
    setInterval(() => {this.recieveXML()}, 3000);
  } 
}

