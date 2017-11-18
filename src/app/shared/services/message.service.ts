import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { PriceRange } from "../models/priceRange";

@Injectable()
export class MessageService {
    private price$ = new Subject<PriceRange>();
    //private cid$ = new Subject<string>();
    private cid$: BehaviorSubject<string> = new BehaviorSubject("");

    constructor() {
        this.cid$.subscribe(_ =>  _);
    }

    sendPriceRange(range: PriceRange) {
        this.price$.next(range);
    }

    clearPriceRange() {
        this.price$.next();
    }

    getPriceRange(): Observable<PriceRange> {
        return this.price$.asObservable();
    }

    sendCID(id: string) {
        this.cid$.next(id);
    }

    getCID(): Observable<string> {
        return this.cid$.asObservable();
    }
}