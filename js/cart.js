const btnAddToCartList = document.getElementsByName("addToCart");
const cartAmountIcon = document.getElementById("cartAmount");
const cartView = document.getElementById('cart');

let cart = null;

if (!sessionStorage.cart) {
    cart = new Map();
    sessionStorage.cart = JSON.stringify([...cart]);
} else {
    cart = new Map(JSON.parse(sessionStorage.cart));
}

//UPDATE CART WHEN PAGE LOAD 1st time
if (cartAmountIcon && cartView) {
    updateCartView(); //CONTENT INSDIE CART
    updateQuantity(getAmount(cart)); //CART AMOUNT
}

function traverseToParent(target) {
    while (1) {
        if (target.classList.contains('product') || target.classList.contains('products__item'))
            return target;
        else
            target = target.parentNode;
    }
}


//GET INFO EACH CLICK

btnAddToCartList.forEach((btn) => {
    btn.addEventListener("click", updateItem);
    btn.addEventListener("click", () => {
        Swal.fire({
            icon: 'success',
            title: 'Thêm nhanh 1 sản phẩm thành công',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3ab54a',
            cancelButtonColor: '#3ab54a',
            confirmButtonText: "<a href='/cart.html' class='text-light'>Tới giỏ hàng của bạn</a>",
            confirmButtonAriaLabel: 'Tới giỏ hàng của bạn',
            cancelButtonText: 'Tiếp tục mua hàng',
            cancelButtonAriaLabel: 'Tiếp tục mua hàng',
        })
    });
});

function extractProductInfo(product) {
    const id = product.id;
    const name = product.querySelector('.product__name').innerText;
    const price = product.querySelector('.product__price').innerText
    const img = product.querySelector('img').src;

    return {
        id: id,
        name: name,
        price: +price.replace(/[,|₫]/gi, ""),
        img: img,
    };
}

function getProductInfo(event) {
    const { target } = event;
    const extractedProduct = extractProductInfo(traverseToParent(target));
    return extractedProduct;
}

//UPDATE CART 
function updateItem(event) {
    debugger;
    const { name, price, img } = getProductInfo(event) || getProductInfo(event);

    if (cart.has(name)) {
        const { price, quantity, totalPrice, img } = cart.get(name);
        cart.set(name, {
            img: img,
            price: price,
            totalPrice: totalPrice + price,
            quantity: quantity + 1,
            description: ''
        })
    } else {
        cart.set(name, { img: img, price: price, totalPrice: price, quantity: 1, description: '' });
    }

    console.log(cart);
    setCart(cart);
}


function setCart(cart) {
    sessionStorage.cart = JSON.stringify([...cart]);
    cart = new Map(JSON.parse(sessionStorage.cart));
    updateQuantity(getAmount(cart));
    updateCartView();
}

//UPDATE NUMBER OF ITEMS IN OF CART
function updateQuantity(cartAmount) {
    cartAmountIcon.innerText = cartAmount;
}

//GET  NUMER OF PRODUCTS IN CART
function getAmount(cart) {
    if (!cart.size) {
        return 0;
    } else {
        let totalQuantity = 0;
        cart.forEach(({ quantity }) => { totalQuantity += quantity });
        return totalQuantity;
    }
}

//UPDATE CART VIEW ON top-bar

function updateCartView() {
    let content = ``;
    if (!getAmount(cart)) {
        content = '<span class="text-muted small p-0">Giỏ hàng hiện đang trống</span>'
    } else {
        content += [...cart].map((item) => {
            const name = item[0];
            const { img, price, quantity } = item[1];
            return `<div class="cart-dropdown__menu__item">
                    <img src="${img}">
                    <a href="./productDetail.html" class="text-success">${name}</a>
                    <span>${quantity}</span>
                    <span>${formatCurrency(price)}</span>
                </div>`
        }).join('');

        content += `
                <div class="cart-dropdown__menu__item">
                    <h5 class="text-success mr-auto">TỔNG TIỀN: </h5>
                    <h4 class="product__price ml-auto">${formatCurrency(getCost(cart))}</h4>
                </div>    
                <div class="cart-dropdown__menu__btns">
                    <a href="./checkout.html" class="btn btn-success btn-sm">Thanh toán</a>
                    <a href="./cart.html" class="btn btn-success btn-sm">Giỏ hàng</a>
                </div>`
    }

    cartView.children[1].innerHTML = content;
}

//TOTAL PRICE IN CART

function getCost(cart) {
    return [...cart.values()].reduce((totalCost, { price, quantity }) => totalCost + (price * quantity), 0)
}

//REMOVE FROM CART 
function removeItem(name) {
    cart.delete(name);
    setCart(cart);
    console.log(cart)
}

/*FORMAT CURRENCY*/

function formatCurrency(amount) {
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(amount).slice(1) + '₫';
}
