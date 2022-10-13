import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Router} from "@angular/router";
import {CsvService} from "../../../core/services/csv.service";
import {PdfService} from "../../../core/services/pdf.service";
import {LoadingService} from "../../../core/services/loading.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  preserveWhitespaces: true
})
export class ConfigurationComponent implements OnInit {

  csvText: any;

  @ViewChild('pdf') pdf_input?:ElementRef;
  pdf: any;
  pdfName: string = ""

  constructor(private router: Router, private loading: LoadingService, private csvService: CsvService, public pdfService: PdfService) {}

  async getCsvInfo(event:any){
    const file: File = event.target.files[0];
    this.csvText = await file.text();
  }

  getCSVInfo(type: number){
    this.csvService.setCSV(this.csvText, type)
    this.router.navigate(['/configuration/map-information'])
  }

  loadPDF(event: any){
    this.pdf = event.target.files[0];
  }

  uploadPDF() {
    this.pdfService.setPDF(this.pdf, this.pdfName);
    this.pdfService.pdfObservable.subscribe(()=> {
      this.loading.changeLoad(false)
      // console.log(this.pdfService.pdf_base64)
      if(this.pdf_input){
        this.pdf_input.nativeElement.value = null;
      }
      this.pdf = null;
      this.pdfName = ""
      this.router.navigate(['/configuration/pdf'], { queryParams: {id: 0}})
    })
  }

  ngOnInit(): void { }
}
