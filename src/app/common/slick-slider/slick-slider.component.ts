import { Component, Input, ElementRef, AfterViewInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'slick-slider',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./slick-slider.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SlickSliderComponent implements AfterContentInit{
    @Input() options: any;

    $element: any;

    defaultOptions: any = {};

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
        this.slick(this.options);
    }

    unslick(){
       this.$element.slick("unslick");
    }

    slick(options){
       for (var key in options) {
            this.defaultOptions[key] = this.options[key];
        }
          this.$element = jQuery(this.el.nativeElement).slick(this.defaultOptions);
    }
}