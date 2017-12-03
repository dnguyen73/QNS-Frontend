import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { LoaderService } from "./shared/services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  showLoader: boolean;

    constructor(
        private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
  
}
