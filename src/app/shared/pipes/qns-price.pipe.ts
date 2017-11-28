import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Pipe({name: 'vnd'})
export class QnsPricePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    var currencyPipe = new DecimalPipe("vi-VN");
    return currencyPipe.transform(value) + ' đ';
  }
}