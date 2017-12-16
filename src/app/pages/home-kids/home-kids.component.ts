import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/products.service";

@Component({
  selector: 'home-kids',
  templateUrl: './home-kids.component.html',
  styleUrls: ['./home-kids.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeKidsComponent implements OnInit {

  kidProducts: Product[] = [];
  girlIcons: any[] = [
    { id: "5a1b8c5850a7e177459200eb", name: "Áo thun", srcIcon: "../../assets/images/icons/g-pull.png" },
    { id: "5a1b8c6750a7e177459200ec", name: "Áo kiểu + sơmi", srcIcon: "../../assets/images/icons/g-shirt.png" },
    { id: "5a1b8c7450a7e177459200ed", name: "Áo khoác", srcIcon: "../../assets/images/icons/g-jacket.png" },
    { id: "5a1b8c8350a7e177459200ee", name: "Đầm", srcIcon: "../../assets/images/icons/g-dress2.png" },
    { id: "5a1b8c9550a7e177459200ef", name: "Quần + Váy", srcIcon: "../../assets/images/icons/g-skirt.png" },
    { id: "5a1b8ca150a7e177459200f0", name: "Set + Đồ bộ", srcIcon: "../../assets/images/icons/g-set.png" }
  ];
  boyIcons: any[] = [
    { id: "5a1bb44450a7e177459200fb", name: "Áo thun", srcIcon: "../../assets/images/icons/b-shirt.png" },
    { id: "5a1bb44e50a7e177459200fc", name: "Áo sơmi", srcIcon: "../../assets/images/icons/b-shirt2.png" },
    { id: "5a1bb45850a7e177459200fd", name: "Áo khoác", srcIcon: "../../assets/images/icons/b-jacket.png" },
    { id: "5a1bb46150a7e177459200fe", name: "Quần", srcIcon: "../../assets/images/icons/b-short.png" },
    { id: "5a1bb46b50a7e177459200ff", name: "Đồ bộ", srcIcon: "../../assets/images/icons/b-set.png" }
  ]
  constructor(private _router: Router, private productSvc: ProductService) { }

  ngOnInit() {
    this.fetchProducts(3, 8);
  }

  gotoKids(cateId: string) {
    this._router.navigate(['kids', cateId]);
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number, top: number) {
    this.productSvc.getProductsByParentId(parentId, top)
      .subscribe((products) => {
        this.kidProducts = products;
      });
  }

}
