import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {LoadingService} from "./loading.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  pdf_base64: string = "";
  public pdfObservable = new Subject<string>();

  files: any = [];
  filesInfo: any = [];

  constructor(private loading: LoadingService) { }

  setPDF(pdf: any, pdfName: string){
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      this.loading.changeLoad(true);
      this.files.push(reader.result);
      this.filesInfo.push({
        id: Math.floor(100000 + Math.random() * 900000),
        name: pdfName,
        created_date: moment().format("DD-MM-YYYY HH:mm:ss"),
        status: 0
      });
      // @ts-ignore
      this.pdf_base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(pdf);
    setTimeout(() => {
      this.pdfObservable.next(this.pdf_base64)
    }, 2000);
  }

  cleanPDFData(){
    this.pdf_base64 = ""
  }

}
