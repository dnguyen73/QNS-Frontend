import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product";
import { FileObject } from "../../shared/models/fileobject";
import { environment } from "../../../environments/environment";
import { SelectColor } from "../../shared/models/selectcolor";
import { Size } from "../../shared/models/size";
import { CartService } from "../../shared/services/cart.service";
import { CartItem } from "../../shared/models/cartitem";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from "../../common/dialog/confirm.component";
import { AlertComponent } from "../../common/dialog/alert.component";
declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  myProduct: Product = new Product();
  selectedImage: FileObject;
  sizeList: Size[] = [];
  colorList: SelectColor[] = [];
  quantity: number = 1;

  //for cart item
  selectedSize: string;
  selectedColor: string;
  selectedColorPath: string;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private cartSvc: CartService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.params['code'];
    this.route.data
      .subscribe((data: { product: Product }) => {
        this.myProduct = data.product;
        this.selectedImage = this.myProduct.images[0];
        // this.myProduct.availableSizes.map((s) => {
        //   this.sizeList.push({
        //     label: s,
        //     code: s,
        //     selected: false,
        //     activated: true
        //   })
        // });
        // this.myProduct.availableColors.map((c) => {
        //   this.colorList.push({
        //     parentId: c.parentId,
        //     filename: c.filename,
        //     description: c.description,
        //     selected: false,
        //     activated: true
        //   })
        // });
        this.myProduct.stocks.map((s) => {
          if (s.quantity > 0) {
            if (this.sizeList.filter((size) => size.code === s.size).length < 1) {
              this.sizeList.push({
                label: s.size,
                code: s.size,
                selected: false,
                activated: true
              });
            }
            if (this.colorList.filter((color) => color.filename === s.filename).length < 1) {
              this.colorList.push({
                parentId: this.myProduct.parentId,
                filename: s.filename,
                description: s.description,
                selected: false,
                activated: true
              });
            }
          }

        });
      });
  }

  //Check size or color available in stock
  checkSizeAvailInStock(size) {
    this.myProduct.stocks.filter((s) => {

    })
  }


  selectImage(img: FileObject) {
    this.selectedImage = img;
    $('#zoom_01').attr("data-zoom-image", this.selectedImage.filepath);
    $('#zoom_01').elevateZoom({
      tint: true, tintColour: '#F90', tintOpacity: 0.5, zoomWindowWidth: 500,
      zoomWindowHeight: 500
    });
  }

  getColorFilePath(color: SelectColor) {
    return environment.FILE_HOST_URL + "/" + color.parentId + "/thumb/" + color.filename;
  }

  selectSize(item: Size) {
    for (let s of this.sizeList) {
      if (s.code !== item.code) {
        s.selected = false;
      }
    }
    item.selected = !item.selected;

    //filter stock item which have selected size
    let stk = this.myProduct.stocks.filter((s) => s.size === item.code);
    for (let c of this.colorList) {
      if (stk.filter((st) => st.filename === c.filename).length > 0) {
        //enable available color
        c.activated = true;
      } else {
        //disable not available color
        c.activated = !item.selected;
      }
    }

    //set for cart item
    this.selectedSize = (item.selected) ? item.code : "";
  }

  selectColor(item: SelectColor) {
    for (let c of this.colorList) {
      if (c.filename !== item.filename) {
        c.selected = false;
      }
    }
    item.selected = !item.selected;

    //filter stock item which have selected color
    let stk = this.myProduct.stocks.filter((s) => s.filename === item.filename);
    for (let s of this.sizeList) {
      if (stk.filter((st) => st.size === s.code).length > 0) {
        //enable available size
        s.activated = true;
      } else {
        //disable not available size
        s.activated = !item.selected;
      }
    }

    //set for cart item
    this.selectedColor = (item.selected) ? item.description : "";
    this.selectedColorPath = (item.selected) ? item.filename : "";
  }

  qtyUp() {
    this.quantity++;
  }

  qtyDown() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  public addToCart() {
    if (this.selectedSize && this.selectedColor) {
      //assign property to new cart item
      let newCartItem = new CartItem({
        product: this.myProduct,
        quantity: this.quantity,
        size: this.selectedSize,
        color: this.selectedColor,
        colorPath: this.selectedColorPath,
        unitPrice: this.myProduct.price
      });
      this.cartSvc.addItemToCart(newCartItem);
    } else {
      //show warning dialog
      this.showAlert('', 'Ban phai chon day du size va mau de tiep tuc');
    }

  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
    let _this = this;
    $('#zoom_01').data('zoom-image', _this.myProduct.images[0].filepath);
    $('#gal1').find('a').each(function (i, ele) {
      $(this).data('image', _this.myProduct.images[i].thumbnail);
      $(this).data('zoom-image', _this.myProduct.images[i].filepath);
    });

    $("#zoom_01").elevateZoom({
      gallery: 'gal1',
      cursor: 'pointer',
      easing: true,
      galleryActiveClass: 'active',
      imageCrossfade: true,
      loadingIcon: 'https://www.elevateweb.co.uk/spinner.gif'
    });

    //pass the images to Fancybox
    $("#zoom_01").bind("click", function (e) {
      var ez = $('#zoom_01').data('elevateZoom');
      $.fancybox(ez.getGalleryList());
      return false;
    });

  }


  showAlert(title, message) {
    this.dialogService
      .addDialog(AlertComponent, { title: title, message: message });
  }

}
