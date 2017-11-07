import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
import { Observable } from "rxjs/Observable";
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
  selectedColor: SelectColor;
  selectedColorPath: string;

  //category
  categoryName: string = "";
  parentCategoryName: string = "";

  public shoppingCartItems$: Observable<CartItem[]>;
  public shoppingCartItems: CartItem[] = [];
  public subtotal$: Observable<number>;
  public subtotal: number = 0;

  @ViewChild('myModal') myModal:ElementRef;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private cartSvc: CartService,
    private dialogService: DialogService
  ) { 
    this.shoppingCartItems$ = this
      .cartSvc
      .getItems();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
  }

  ngOnInit() {
    this.subtotal$ = this.cartSvc.getTotalAmount();
    this.subtotal$.subscribe(_ => this.subtotal = _);
    let code = this.route.snapshot.params['code'];
    this.route.data
      .subscribe((data: { product: Product }) => {
        this.myProduct = data.product;
        this.selectedImage = this.myProduct.images[0];

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

        //get category info
        this.productSvc.findCategoryByProductId(this.myProduct.id)
          .subscribe(c => this.categoryName = c.name);

        this.parentCategoryName = this.productSvc.getParentCategory(this.myProduct.parentId);
      });

    this.shoppingCartItems$ = this.cartSvc.getItems();
    this.shoppingCartItems$.subscribe(_ => _);
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

  public getImagePath(item: CartItem) {
    return environment.FILE_HOST_URL + "/" + item.product.parentId + "/thumb/" + item.colorPath;
  }

  public UpQty(itemIndex: number) {
    let newQty = ++this.shoppingCartItems[itemIndex].quantity;
    this.cartSvc.updateQuantity(itemIndex, newQty);
  }

  public DownQty(itemIndex: number) {
    if (this.shoppingCartItems[itemIndex].quantity > 1) {
      let newQty = --this.shoppingCartItems[itemIndex].quantity;
      this.cartSvc.updateQuantity(itemIndex, newQty);
    }
  }

  public UpdateQty(itemIndex: number) {
    this.cartSvc.updateQuantity(itemIndex, this.shoppingCartItems[itemIndex].quantity);
  }

  public itemSubTotal(item: CartItem) {
    return item.quantity * item.product.price;
  }

  public numOfItems() {
    let count = this.shoppingCartItems.length;
    return count + " item" + ((count > 1) ? "s" : "");
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
    // this.selectedColor = (item.selected) ? item.description : "";
    // this.selectedColorPath = (item.selected) ? item.filename : "";
    this.selectedColor = (item.selected) ? item : null;
  }

  qtyUp() {
    this.quantity++;
  }

  qtyDown() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  public removeItem(itemIndex: number): void {
    this.cartSvc.removeItem(itemIndex);
  }
  
  public addToCart() {
    if (this.selectedSize && this.selectedColor) {
      //assign property to new cart item
      let newCartItem = new CartItem({
        product: this.myProduct,
        quantity: this.quantity,
        size: this.selectedSize,
        color: this.selectedColor.description,
        colorPath: this.selectedColor.filename,
        unitPrice: this.myProduct.price
      });
      this.cartSvc.addItemToCart(newCartItem);
      $(this.myModal.nativeElement).modal('show');
    } else {
      //show warning dialog
      this.showAlert('', 'Ban phai chon day du size va mau de tiep tuc');
      //$(this.myModal.nativeElement).modal('show');
    }

  }

  ngAfterViewInit() {
    $('.zoomContainer').remove();
    let t = this;
    $('#zoom_01').data('zoom-image', t.myProduct.images[0].filepath);
    $('#gal1').find('a').each(function (i, ele) {
      $(this).data('image', t.myProduct.images[i].thumbnail);
      $(this).data('zoom-image', t.myProduct.images[i].filepath);
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

    // setTimeout(function () {
    //   $('.zoomWrapper').height($('.zoomWrapper').width());
    // }, 1000);


  }


  showAlert(title, message) {
    this.dialogService
      .addDialog(AlertComponent, { title: title, message: message },{ closeByClickingOutside:true ,backdropColor: 'rgba(0, 0, 0, 0.5)' });
  }

}
