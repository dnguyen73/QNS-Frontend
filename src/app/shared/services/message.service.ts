import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { PriceRange } from "../models/priceRange";
import { SizeRange } from "../models/sizeRange";

@Injectable()
export class MessageService {
    private price$ = new Subject<PriceRange>();
    private size$ = new Subject<SizeRange>();
    //private cid$ = new Subject<string>();
    private fid$: BehaviorSubject<string> = new BehaviorSubject("");
    private lid$: BehaviorSubject<string> = new BehaviorSubject("");
    private kid$: BehaviorSubject<string> = new BehaviorSubject("");
    private aid$: BehaviorSubject<string> = new BehaviorSubject("");
    private pid$: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor() {
        this.fid$.subscribe(_ =>  _);
        this.lid$.subscribe(_ =>  _);
        this.kid$.subscribe(_ =>  _);
        this.aid$.subscribe(_ =>  _);
        this.pid$.subscribe(_ =>  _);
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

    sendSizeRange(range: SizeRange) {
        this.size$.next(range);
    }

    clearSizeRange() {
        this.size$.next();
    }

    getSizeRange(): Observable<SizeRange> {
        return this.size$.asObservable();
    }

    sendFID(id: string) {
        this.fid$.next(id);
    }

    getFID(): Observable<string> {
        return this.fid$.asObservable();
    }

    sendLID(id: string) {
        this.lid$.next(id);
    }

    getLID(): Observable<string> {
        return this.lid$.asObservable();
    }

    sendKID(id: string) {
        this.kid$.next(id);
    }

    getKID(): Observable<string> {
        return this.kid$.asObservable();
    }

    sendAID(id: string) {
        this.aid$.next(id);
    }

    getAID(): Observable<string> {
        return this.aid$.asObservable();
    }

    sendPID(id: number) {
        this.pid$.next(id);
    }

    getPID(): Observable<number> {
        return this.pid$.asObservable();
    }
}