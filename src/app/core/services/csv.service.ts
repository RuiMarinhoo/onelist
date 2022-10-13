import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Papa} from "ngx-papaparse";

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  type: number = 0;
  colTitle = []
  userArray: any = [];

  constructor(private http: HttpClient, private papa: Papa) { }

  setCSV(csv: any, type: number){
    this.type = type;
    this.papa.parse(csv,{
      complete: (result) => {
        console.log('Parsed: ', result);
        this.colTitle = result.data[0]

        for(let i = 1; i < result.data.length; i++){
          this.userArray.push(result.data[i])
        }
        console.log(this.userArray)
      }
    });
  }

  setCSV2(csv: any, type: number){
    this.type = type;
    let csvToRowArray = csv.split("\n");
    this.colTitle = csvToRowArray[0].split(";")
    for (let index = 1; index < csvToRowArray.length - 1; index++) {
      let row = csvToRowArray[index].split(";");
      console.log(row)
      let toAdd: any = {};
      for (const [key, value] of Object.entries(row)) {
        console.log(key + " - " + value)
        if(value){
          // @ts-ignore
          toAdd[this.colTitle[key].toLowerCase().trim().replaceAll(' ', '_')] = value
        }
        else {
          // @ts-ignore
          toAdd[this.colTitle[key].toLowerCase().trim().replaceAll(' ', '_')] = ""
        }
      }
      // console.log(row)
      this.userArray.push(toAdd);
    }
    console.log(this.userArray)
  }

  getCSVCols(){
    return this.colTitle;
  }

  getCSV(){
    return this.userArray;
  }

  cleanCSVData(){
    this.type = 0;
    this.colTitle = []
    this.userArray= [];
  }

}
