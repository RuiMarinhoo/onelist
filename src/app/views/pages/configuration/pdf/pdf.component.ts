import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  Input,
  ViewChild,
  ElementRef,
  Output, EventEmitter
} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PdfModalComponent} from "./pdf-modal/pdf-modal.component";
import {ActivatedRoute} from "@angular/router";
import {PdfService} from "../../../../core/services/pdf.service";
import * as feather from 'feather-icons';

interface item {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-pdf-add',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit, AfterViewInit {

  @ViewChild('pdfAddBox') component: ElementRef | undefined;

  @Input() file!: any;
  // @Input() box!: any;
  @Output() newItemEvent = new EventEmitter<string>();

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // pdfSrc: any;
  // pdfSrc = "../../assets/pdf-teste.pdf";
  // pdfSrc = "./assets/pdf/invoice.pdf";

  pageVariable = 1
  pagesRendered = 0

  mouse_down = false;
  toSend: any = {}

  data: any = {}

  startX = 0;
  startY = 0;

  zoom = 0.35


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

  constructor(@Inject(DOCUMENT) private document: HTMLDocument, private modalService: NgbModal, private route: ActivatedRoute, private pdf: PdfService) { }

  zoomIn() {
    if (this.zoom < 0.95){
      this.zoom = Math.round((this.zoom + 0.2) * 100) / 100;
    }
  }
  zoomOut() {
    if (this.zoom > 0.35){
      this.zoom = Math.round((this.zoom - 0.2) * 100 ) / 100;
    }
  }

  pagechanging(n: string){
    this.toSend.page = parseInt(n);
    console.log(n); // the page variable
  }

  loadBoxes(){
    console.log("entra")
    for(let i = 1; i <= this.pagesRendered; i++){
      let element = this.component?.nativeElement.querySelector('div[data-page-number="'+i+'"]');
      if(!element.querySelector(".boxes")){
        const boxes = document.createElement('div');
        boxes.className = "boxes"
        boxes.style.position = "absolute";
        boxes.style.left = "0";
        boxes.style.top = "0";
        boxes.style.right = "0";
        boxes.style.bottom = "0";
        boxes.style.overflow = "hidden";
        element.appendChild(boxes)
      }

      console.log(this.box)

      const areas = this.box.filter( (b: any) => {
        return b.page == i
      });
      areas.forEach( (area: any) => {
        console.log(area.id)
        if(!element.querySelector('[data-id="' +area.id +'"]')){
          this.addBoxArea(element, area, area.id, area.x, area.y, area.width, area.height)
        }
      });
    }
  }

  pageRendered(e: any) {
    // console.log('(page-rendered)', e);
    console.log(e.pageNumber);
    this.pagesRendered = e.pageNumber
    const page = e.pageNumber;
    let element = this.component?.nativeElement.querySelector('div[data-page-number="'+page+'"]');

    if(!element.querySelector(".marcar")){
      const canvas = document.createElement('canvas');
      canvas.className = "marcar";
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      console.log(element)
      canvas.addEventListener('mousedown', (e) => {

        // save the starting x/y of the rectangle
        this.startX = e.offsetX;
        this.startY = e.offsetY;

        this.data.page = page;
        this.data.startX = e.offsetX
        this.data.startY = e.offsetY

        // set a flag indicating the drag has begun
        this.mouse_down = true;
      });
      canvas.addEventListener('mousemove', (e:any) => {
        if (!this.mouse_down) {
          return;
        }
        const ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.strokeStyle = "#0c1427";
        // @ts-ignore
        ctx.lineWidth = 2;


        // get the current mouse position
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        // clear the canvas
        // @ts-ignore
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // calculate the rectangle width/height based
        // on starting vs current mouse position
        const width = mouseX - this.data.startX;
        const height = mouseY - this.data.startY;

        console.log(this.data.page)
        // console.log(width)

        // draw a new rect from the start position
        // to the current mouse position
        if(this.data.page === page){
          // @ts-ignore
          ctx.strokeRect(this.startX, this.startY, width, height);
        }
        else {
          // @ts-ignore
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
      canvas.addEventListener('mouseup', (e) => {
        this.data.endX = e.offsetX
        this.data.endY = e.offsetY

        if(this.data.endX > this.data.startX){
          this.data.x = (this.data.startX * 100) / canvas.offsetWidth;
          const width = this.data.endX - this.data.startX
          this.data.width = (width * 100) / canvas.offsetWidth;
        }
        else {
          this.data.x = (this.data.endX * 100) / canvas.offsetWidth;
          const width =  this.data.startX - this.data.endX
          this.data.width = (width * 100) / canvas.offsetWidth;
        }
        if(this.data.endY > this.data.startY){
          this.data.y = (this.data.startY * 100) / canvas.offsetHeight;
          const height = this.data.endY - this.data.startY
          this.data.height = (height * 100) / canvas.offsetHeight;
        }
        else {
          this.data.y = (this.data.endY * 100) / canvas.offsetHeight;
          const height = this.data.startY - this.data.endY
          this.data.height = (height * 100) / canvas.offsetHeight;
        }
        // console.log("------------")
        console.log(this.data.page)
        // console.log("------------ px")
        // console.log(this.data.startX)
        // console.log(this.data.startY)
        // console.log(this.data.endX)
        // console.log(this.data.endY)
        // console.log("------------ %")
        // console.log(this.data.x)
        // console.log(this.data.y)
        // console.log((e.offsetX * 100) / canvas.offsetWidth)
        // console.log((e.offsetY * 100) / canvas.offsetHeight)
        // console.log("------------")
        // console.log(this.data.width)
        // console.log(this.data.height)

        const ctx = canvas.getContext("2d");

        // set a flag indicating the drag has begun
        this.mouse_down = false;
        console.log(this.data.width)
        if(this.data.width > 10 && this.data.height > 10){
          if(this.data.page === page){
            this.addCustomer(ctx, canvas, element)
          }
          else {
            let firstPage = this.data.page;
            while (firstPage <= page) {
              console.log("entra no " + firstPage)
              let element = this.component?.nativeElement.querySelector('div[data-page-number="'+firstPage+'"]');
              const canvas = element.querySelector(".marcar");
              console.log(canvas)
              const ctx = canvas.getContext("2d");
              // @ts-ignore
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              firstPage++
            }
          }
        }
        else {
          // @ts-ignore
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
      element.appendChild(canvas);
    }
    this.loadBoxes()
  }

  show() {
    console.log("funfaaa");
  }

  addNewItem() {
    this.toSend.id = (Math.floor(Math.random()*90000) + 10000).toFixed();
    this.newItemEvent.emit(this.toSend);
  }
  addNewItem2(ctx: any, canvas: any, element: any, text: any) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.addBox(element)
    const to_send = {
      id: text,
      page: this.data.page,
      x:  this.data.x,
      y: this.data.y,
      width: this.data.width,
      height: this.data.height
    }
    console.log(to_send)
    // @ts-ignore
    this.newItemEvent.emit(to_send);
  }

  afterLoadComplete(e: any){
    // pdfViewer
  }

  addBoxArea(element: any, area:any, id: any, x: any, y: any, width: any, height: any){
    // console.log(element.offsetWidth)
    let layer = element.querySelector('.boxes');
    const divToAdd = `<div class="add-product" data-id="${id}" style="display: flex; top:${y}%; left:${x}%; width: calc(${width}%); height: calc(${height}%);">
                        <div class="close">
                            <i data-feather="x" appFeatherIcon></i>
                            <i class="mdi mdi-close-circle"></i>
                        </div>
                        <div style="align-self: center; padding: 0 10px; max-height: 40px; font-size: 24px; margin: auto; background-color: rgb(255 255 255 / 80%); text-align-last: center;">${area.name}</div>
                      </div>`;
    const div = document.createElement('div');
    div.innerHTML = divToAdd.trim();
    // @ts-ignore
    div.firstElementChild.firstElementChild.addEventListener('click', (e) => {
      this.removeBoxArea(id);
      this.loadBoxes();
    });
    layer.appendChild(div.firstElementChild);
    feather.replace();
  }
  removeBoxArea(id: any){
    this.box = this.box.filter(box => box.id != id)
    const ele = document.querySelector('[data-id="' + id +'"]')
    if(ele){
      ele.remove()
    }
  }

  addBox(element: any){
    const x = this.data.x;
    const y = this.data.y;
    const width = this.data.width;
    const height = this.data.height;
    let layer = element.querySelector('.boxes');
    const divToAdd = '<div class="add-product" style="position: absolute; top: ' + y + '%; left: ' + x + '%; width: calc(' + width + '% - 5px); height: calc(' + height + '% - 5px); border: 2px solid #0c1427; z-index: 1"></div>';
    const div = document.createElement('div');
    div.innerHTML = divToAdd.trim();
    layer.appendChild(div.firstElementChild);
  }

  addCustomer(ctx: any, canvas: any, element: any) {
    const customer_modal = this.modalService.open(PdfModalComponent,
      {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
        windowClass: 'modal-zindex'
      })
    customer_modal.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;

      // console.log(result)

      if(result){
        console.log(result)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // this.addBox(element)
        this.box.push({
          id: Math.floor(100000 + Math.random() * 900000),
          name: result,
          page: this.data.page,
          x:  this.data.x,
          y: this.data.y,
          width: this.data.width,
          height: this.data.height
        });
        this.loadBoxes()
        // const to_send = {
        //   id: 5364343774,
        //   name: result,
        //   page: this.data.page,
        //   x:  this.data.x,
        //   y: this.data.y,
        //   width: this.data.width,
        //   height: this.data.height
        // }
        // console.log(to_send)
        // @ts-ignore
        // this.newItemEvent.emit(to_send);
      }
      else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

    }, (reason) => {
      // console.log(reason)
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.pdfSrc = this.pdf.files[params['id']]
      console.log(params['id'])
    });
  }

  ngAfterViewInit(){
    // you'll get your through 'elements' below code
    setTimeout(() => {
      // @ts-ignore
      let elements = this.component?.nativeElement.querySelectorAll('.page');
      elements.forEach( (element: any) => {
        // @ts-ignore
        element.addEventListener('mousedown', (e) => {
          // @ts-ignore
          // this.pagechanging(element.attributes['data-page-number'].value);
          // @ts-ignore
          const x = (e.offsetX * 100) / element.offsetWidth;
          // console.log(x)
          // @ts-ignore
          const y = (e.offsetY * 100) / element.offsetHeight;
          // console.log(y)
          this.toSend.x = x;
          this.toSend.y = y;

          this.mouse_down = true;
        });
        // @ts-ignore
        element.addEventListener('mouseup', (e) => {
          // @ts-ignore
          this.pagechanging(element.attributes['data-page-number'].value);
          // @ts-ignore
          const x = (e.offsetX * 100) / element.offsetWidth;
          // console.log(x)
          // @ts-ignore
          const y = (e.offsetY * 100) / element.offsetHeight;
          // console.log(y)
          this.toSend.width = x - this.toSend.x;
          this.toSend.height = y - this.toSend.y;
          // this.addNewItem()

          this.mouse_down = false;
        });

        element.addEventListener('mousemove', (e:any) => {
          if (!this.mouse_down) {
            return;
          }
          // const canvas = element.getElementsByTagName("canvas")[0]
          // const ctx = canvas.getContext("2d");
          // ctx.strokeStyle = "blue";
          // ctx.lineWidth = 3;
          // const offsetX = element.offsetWidth;
          // const offsetY = element.offsetHeight;
          //
          // // get the current mouse position
          // const mouseX = e.clientX - offsetX;
          // const mouseY = e.clientY - offsetY;
          // // clear the canvas
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          //
          // // calculate the rectangle width/height based
          // // on starting vs current mouse position
          // const width = mouseX - this.toSend.x;
          // const height = mouseY - this.toSend.y;
          //
          // // draw a new rect from the start position
          // // to the current mouse position
          // ctx.strokeRect(this.toSend.x, this.toSend.y, width, height);
        });
      })
    }, 1000)
  }

}
