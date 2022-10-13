import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading?: boolean;

  constructor() { }

  changeLoad(state: boolean){
    this.isLoading = state;
    if(this.isLoading){
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
    }
  }

}
