import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {CsvService} from "../../../../core/services/csv.service";
import {Router} from "@angular/router";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, OnDestroy {

  validationForm1?: FormGroup;
  validationForm2?: FormGroup;

  isForm1Submitted?: Boolean;
  isForm2Submitted?: Boolean;

  @ViewChild('wizardForm') wizardForm?: BaseWizardComponent;

  type: any = ""
  csvCols: any = []
  csv: any = []

  dbInfo: any = []
  objectKeys = Object.keys;

  dataToSaveOnBD: any = []

  keepOrder = (a: any, b: any) => {
    return a;
  }

  constructor(public formBuilder: FormBuilder, private router: Router, private csvService: CsvService) { }

  getType(type: number){
    switch (type){
      case 1:
        this.type = "Artículos";
        this.dbInfo = {
          "code": "",
          "name": "",
          "type": "",
          "price": ""
        }
        break;
      case 2:
        this.type = "Comerciales";
        this.dbInfo = {
          "email": "",
          "name": "",
          "phone": "",
          "role": "",
        }
        break;
      case 3:
        this.type = "Clientes";
        this.dbInfo = {
          "name": "",
          "customer_company": "",
          "email": "",
          "phone": "",
          "discount": "",
        }
        break;
    }
  }

  onChange(selectValue: any, key: any) {
    // console.log(selectValue.value);
    this.dbInfo[key] = selectValue.value;
  }

  mapAllInfo(){
    this.dataToSaveOnBD = []
    console.log(this.dbInfo)
    for(let i = 0; i < this.csv.length; i++){
      let toAdd: any = {};
      Object.keys(this.dbInfo).forEach((key) => {
        toAdd[key] = this.csv[i][this.dbInfo[key]]
      })
      this.dataToSaveOnBD.push(toAdd)
    }
    console.log(this.dataToSaveOnBD)
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  ngOnInit(): void {
    this.getType(this.csvService.type);
    this.csvCols = this.csvService.getCSVCols();
    this.csv = this.csvService.getCSV();

    if(this.csv.length <= 0){
      this.router.navigate(['/configuration'])
    }

    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName : ['', Validators.required]
    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      mobileNumber : ['', Validators.required],
      password : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

  }

  ngOnDestroy() {
    this.csvService.cleanCSVData()
    console.log(this.csvService.getCSV())
  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1?.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2?.controls;
  }

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    if(this.validationForm1?.valid) {
      this.wizardForm?.goToNextStep();
    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if(this.validationForm2?.valid) {
      this.wizardForm?.goToNextStep();
    }
    this.isForm2Submitted = true;
  }


}
