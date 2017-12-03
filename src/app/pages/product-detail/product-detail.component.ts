import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
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
import { Review } from "../../shared/models/review";
import { OnRatingChangeEven } from "angular-star-rating";
import { RatingService } from "../../shared/services/rating.service";
import { Category } from "../../shared/models/categories";
import { CategoryService } from "../../shared/services/category.service";
import { UIService } from "../../shared/services/ui.service";

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  myProduct: Product = new Product();
  relatedProducts: Product[] = [];
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
  parentCategory: Category;

  public shoppingCartItems$: Observable<CartItem[]>;
  public shoppingCartItems: CartItem[] = [];
  public subtotal$: Observable<number>;
  public subtotal: number = 0;

  slideConfig = {
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }
  review: Review = new Review();
  reviewList: Review[] = [];
  avgRating: number = 0;

  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('reviewModal') reviewModal: ElementRef;
  @ViewChild('myslider') myslider;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private cartSvc: CartService,
    private ratingSvc: RatingService,
    private dialogService: DialogService,
    private uiSvc: UIService
  ) {
    this.shoppingCartItems$ = this
      .cartSvc
      .getItems();

    //Get shopping cart info
    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.subtotal$ = this.cartSvc.getTotalAmount();
    this.subtotal$.subscribe(_ => this.subtotal = _);

    this.shoppingCartItems$ = this.cartSvc.getItems();
    this.shoppingCartItems$.subscribe(_ => _);

    //reload page data
    this.reloadPage();

  }

  //Default behavior: ngOnInit does not get called when navigating within same route.
  //However, route subcribe() will work every time route's param is changed.
  ngOnInit() {
    this.uiSvc.handleScrollTop();
  }

  //Check size or color available in stock
  checkSizeAvailInStock(size) {
    this.myProduct.stocks.filter((s) => {

    })
  }

  //reload page even if navigating within same route with different params
  reloadPage() {
    this.route.data
      .subscribe((data: { product: Product }) => {
        this.myProduct = data.product;
        this.selectedImage = this.myProduct.images[0];
        this.sizeList = [];
        this.colorList = [];

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

        //get sub category info
        this.productSvc.findCategoryByProductId(this.myProduct.id)
          .subscribe(c => this.categoryName = c.name);

        //Get Parent category info
        this.categorySvc.getPrimaryCategory(this.myProduct.parentId)
          .subscribe(c => this.parentCategory = c);

        //get related products
        this.productSvc.getRelatedProducts(this.myProduct.productCode, 8)
          .subscribe(products => {
            this.relatedProducts = products;
            let _thisObject = this;
            setTimeout(function () {
              _thisObject.myslider.unslick();
              _thisObject.myslider.slick(_thisObject.slideConfig);
            }, 0);
          });

        //reload gallery
        let _t = this;
        setTimeout(function () {
          _t.reloadGallery();
        }, 0);

        //Get all reviews of curent product
        this.ratingSvc.getReviewsByProductCode(this.myProduct.productCode)
          .subscribe((reviews) => {
            this.reviewList = reviews;
            let totalRating = 0;
            for(let i=0; i<this.reviewList.length; i++){
              totalRating += this.reviewList[i].rating;
            }
            this.avgRating = Math.round( (totalRating/this.reviewList.length) * 10 ) / 10;
          });

      });
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
    if (!color){
      return "";
    }
    return environment.FILE_HOST_URL + "/" + color.parentId + "/thumb/" + color.filename;
  }

  public getImagePath(item: CartItem) {
    if (!item){
      return "";
    }
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
    return item.quantity * item.unitPrice;
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

    //trigger click event on image gallery
    let imgIdx = 0;
    for (let i=0; i<this.myProduct.images.length; i++){
      if (this.myProduct.images[i].filename === item.filename){
        imgIdx = i;
        this.selectedImage = this.myProduct.images[i];
        break;
      }
    }
    $($(".gal-content").children().eq(imgIdx).find('a')[0]).trigger('click');
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
        unitPrice: (this.myProduct.isOnSale) ? this.myProduct.discountPrice: this.myProduct.price
      });
      this.cartSvc.addItemToCart(newCartItem);
      $(this.myModal.nativeElement).modal('show');
    } else {
      //show warning dialog
      this.uiSvc.showAlert('', 'Vui lòng chọn đầy đủ size và màu sản phẩm để tiếp tục !');
    }

  }
  public writeReview() {
    $(this.reviewModal.nativeElement).modal('show');
  }

  public onRatingChange = ($event: OnRatingChangeEven) => {
    this.review.rating = $event.rating;
  };

  public sendReview() {
    if (this.review.rating > 0) {
      this.review.productId = this.myProduct.id;
      this.review.productCode = this.myProduct.productCode;
      this.review.createdDate = new Date(Date.now());
      this.review.status = false;
      this.ratingSvc.submitReview(this.review)
        .subscribe((res) => {
          this.uiSvc.showAlert('', 'Cảm ơn bạn đã dành thời gian đánh giá.');
          this.review = new Review();
        })
    } else {
        this.uiSvc.showAlert('', 'Vui lòng đánh giá độ hài lòng.');
    }

  }

  //Reload gallery whenever navigating to another product within the same route
  reloadGallery() {
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
      imageCrossfade: true
      //loadingIcon: 'https://www.elevateweb.co.uk/spinner.gif'
    });

    //pass the images to Fancybox
    // $("#zoom_01").bind("click", function (e) {
    //   var ez = $('#zoom_01').data('elevateZoom');
    //   $.fancybox(ez.getGalleryList());
    //   return false;
    // });

    setTimeout(function () {
      $('.zoomWrapper').height($('.zoomWrapper').width());
    }, 500);
  }

  resizeTimeout: any;
  @HostListener('window:resize')
  onWindowResize() {
    //debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      $('.zoomWrapper').height($('.zoomWrapper').width());
    }).bind(this), 0);
  }


  // showAlert(title, message) {
  //   this.dialogService
  //     .addDialog(AlertComponent, { title: title, message: message }, { closeByClickingOutside: true, backdropColor: 'rgba(0, 0, 0, 0.5)' });
  // }

  viewDetail(product: Product) {
    this._router.navigate(['product', product.productCode]);
  }

  gotoParentCategoryPage(){
    //[routerLink]="['/female']" 
    this._router.navigate([this.parentCategory.route]);
  }

  gotoCategoryPage(){
    //[routerLink]="['/female', myProduct.categoryId]"
    this._router.navigate([this.parentCategory.route, this.myProduct.categoryId]);
  }


}
