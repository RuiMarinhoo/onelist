import { Component, OnInit } from '@angular/core';

import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample", {
      lengthMenu: [5, 10, -1],
      perPageSelect: [5,10, "All"],
      pageLength: 5
    });
    console.log(dataTable)
  }

}
