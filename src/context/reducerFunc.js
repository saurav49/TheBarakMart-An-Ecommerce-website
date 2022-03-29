export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_BRAND_TO_FILTER":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          brand: [...state.filterStates.brand, action.payload],
        },
      };
    case "REMOVE_BRAND_FROM_FILTER":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          brand: state.filterStates.brand.filter(
            (brandName) => brandName !== action.payload
          ),
        },
      };
    case "ADD_CATEGORY_TO_CATEGORY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          category: [...state.filterStates.category, action.payload],
        },
      };
    case "REMOVE_CATEGORY_FROM_CATEGORY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          category: state.filterStates.category.filter(
            (categoryName) => categoryName !== action.payload
          ),
        },
      };
    case "FILTER_ALL_BRANDS":
      return {
        ...state,
        productBrand: addProductBrand(action.payload),
      };
    case "FILTER_ALL_CATEGORY":
      return {
        ...state,
        productCategory: addProductCategory(action.payload),
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: action.payload,
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishList: action.payload };

    case "ADD_TO_PRODUCT":
      const updateProductStatus = (products) => {
        return updateProductsWithWishListAndCartStatus(
          products,
          state.wishList.wishListItems,
          state.cartList.cartItems
        );
      };

      return { ...state, productList: updateProductStatus(action.payload) };

    case "ADD_PRODUCT_TO_WISHLIST":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInWishList: true }
            : { ...product }
        ),

        wishList: {
          ...state.wishList,
          ...action.payload,
        },
      };

    case "REMOVE_PRODUCT_FROM_WISHLIST":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInWishList: false }
            : { ...product }
        ),
        wishList: {
          ...state.wishList,
          wishListItems: state.wishList.wishListItems.filter(
            ({ _id }) => _id._id !== action.productId
          ),
        },
      };

    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cartList: { ...state.cartList, ...action.payload },
        // cartList: {
        //   ...state.cartList,
        //   cartItems: [
        //     ...state.cartList.cartItems,
        //     { ...action.payload, isInCartList: true },
        //   ],
        // },
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInCartList: true }
            : { ...product }
        ),
      };

    case "REMOVE_PRODUCT_FROM_CART":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInCartList: false }
            : { ...product }
        ),
        cartList: {
          ...state.cartList,
          cartItems: state.cartList.cartItems.filter(
            ({ _id }) => _id._id !== action.productId
          ),
        },
      };

    case "UPDATE_PRODUCT_QUANTITY_IN_CART":
      return {
        ...state,
        cartList: {
          ...state.cartList,
          cartItems: state.cartList.cartItems.map(({ _id, quantity }) =>
            _id._id === action.productId
              ? {
                  _id: {
                    ..._id,
                  },
                  quantity: action.payload,
                }
              : { _id: { ..._id }, quantity: quantity }
          ),
        },
      };

    case "DISPLAY_COMPONENT":
      return { ...state, displayComponent: action.payload };

    case "SORT":
      return {
        ...state,
        filterStates: { ...state.filterStates, sortBy: action.payload },
      };

    case "TOGGLE_AVAILABILITY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          includeOutOfStock: !state.filterStates.includeOutOfStock,
        },
      };

    case "TOGGLE_DELIVERY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          includeFastDelivery: !state.filterStates.includeFastDelivery,
        },
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filterStates: {
          sortBy: null,
          includeFastDelivery: false,
          includeOutOfStock: false,
          brand: [],
          category: [],
        },
      };

    default:
      console.log("something went wrong");
      return state;
  }
};

const handleCheckingStatus = (list, product) => {
  if (list) {
    return (
      list.find(({ _id }) => _id === product._id || _id._id === product._id) !==
      undefined
    );
  }
};

export const updateProductsWithWishListAndCartStatus = (
  productList,
  wishList,
  cartList
) => {
  if (wishList && productList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(wishList.wishListItems, product)) {
        return { ...product, isInWishList: true };
      } else {
        return { ...product, isInWishList: false };
      }
    });
  }

  if (cartList && productList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(cartList.cartItems, product)) {
        return { ...product, isInCartList: true };
      } else {
        return { ...product, isInCartList: false };
      }
    });
  }

  return productList;
};

export const updateWishListProductWithCartStatus = (wishList, cartList) => {
  let list = [];

  if (wishList.hasOwnProperty("userId") && cartList.hasOwnProperty("userId")) {
    if (wishList.wishListItems.length > 0 && cartList.cartItems.length > 0) {
      if (wishList.wishListItems[0]._id.hasOwnProperty("name")) {
        list = wishList.wishListItems.map(({ _id }) => {
          if (handleCheckingStatus(cartList.cartItems, _id)) {
            return { _id: { ..._id, isInCartList: true, isInWishList: true } };
          } else {
            return { _id: { ..._id, isInCartList: false, isInWishList: true } };
          }
        });
      }
    }
  }

  return list;
};

const addProductBrand = (productList) => {
  let brands = [];

  for (let product of productList) {
    if (!brands.includes(product.brandName)) {
      brands.push(product.brandName);
    }
  }
  return brands;
};

const addProductCategory = (productList) => {
  let category = [];

  for (let product of productList) {
    if (!category.includes(product.category)) {
      category.push(product.category);
    }
  }
  return category;
};
