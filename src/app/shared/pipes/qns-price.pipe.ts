import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({name: 'vnd'})
export class QnsPricePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    var currencyPipe = new CurrencyPipe("vi-VN");
    value = currencyPipe.transform(value, "VND", true);
    return value.substr(2) + ' đ';
  }
}