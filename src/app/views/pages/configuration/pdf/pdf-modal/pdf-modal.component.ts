import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pdf-add-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.css']
})
export class PdfModalComponent implements OnInit {

  @Input() public customer_info: any;

  @ViewChild("file_chosen") file_label: ElementRef | undefined

  name: any;
  image_client: any;

  box = [
    {
      id: 5624362436,
      name: "Pinza",
      page: 3,
      x:  7.22,
      y: 20.31,
      width: (32.96 - 7.22),
      height: (44.16 - 20.31)
    },
    {
      "id": 56243643643,
      "name": "header",
      "page": 2,
      "x": 7.75,
      "y": 7.02,
      "width": 83.17,
      "height": 8.48
    },
    {
      "id": 78685545,
      "name": "Caixa",
      "page": 6,
      "x": 39.79739507959479,
      "y": 54.75946775844422,
      "width": 21.273516642547033,
      "height": 17.502558853633573
    },
    {
      "id": 768575,
      "name": "Raspador",
      "page": 9,
      "x": 9.84081041968162,
      "y": 18.11668372569089,
      "width": 17.80028943560058,
      "height": 14.636642784032754
    },
    {
      "id": 534675455,
      "name": "Raspador Grande",
      "page": 9,
      "x": 48.04630969609262,
      "y": 63.561924257932446,
      "width": 42.6917510853835,
      "height": 14.227226202661209
    },
    {
      "id": 45959743978298,
      "name": "Tampao",
      "page": 10,
      "x": 14.182344428364688,
      "y": 17.09314227226203,
      "width": 20.40520984081042,
      "height": 20.777891504605936
    },
    {
      "id": 4624656433,
      "name": "xule",
      "page": 13,
      "x": 47.467438494934875,
      "y": 47.799385875127946,
      "width": 27.062228654124457,
      "height": 31.115660184237463
    }
  ]

  keyword = 'name';

  constructor(public activeModal: NgbActiveModal) { }


  selectEvent(item: any) {
    // do something with selected item
    // console.log(this.products_input)
    this.getFromAutocomplete(item.name)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.getFromAutocomplete(val)
  }

  onFocused(e: any){
    // do something when input is focused
    // console.log(this.products)
  }


  getFromAutocomplete(name: string){
    console.log(name)
    this.name = name;
  }

  onFocusOut(input: any){
    // console.log(input)
    // console.log(input.query.data)
    // console.log(input.query)
  }


  closeModal() {
    if(this.name){
      if(this.image_client){
        const image = this.image_client.substring(this.image_client.indexOf(",") + 1);
      }
    }
    this.activeModal.close(this.name);
  }

  ngOnInit(): void {
    console.log(this.customer_info)
  }

}
