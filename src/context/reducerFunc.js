export const reducerFunc = (state, action) => {
  switch (action.type) {
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
  if (wishList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(wishList.wishListItems, product)) {
        return { ...product, isInWishList: true };
      } else {
        return { ...product, isInWishList: false };
      }
    });
  }

  if (cartList) {
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

// const addWishlistItemStatus = (wishList) => {
//   return wishList.map((product) => {
//     return { ...product, isInCartList: false };
//   });
// };

// const updateCartPageProductWithPrice = (cartList) => {
//   return cartList.map((product) => {
//     return {
//       ...product,
//       price: product.price * product.quantity,
//     };
//   });
// };

// const updatePrice = (productList, cartList, productId, updateType) => {
//   return updateType === "INCREMENT"
//     ? parseFloat(
//         cartList.find(({ _id: { _id } }) => _id === productId)._id.price
//       ) +
//         parseFloat(
//           productList.find((product) => product._id === productId).price
//         )
//     : parseFloat(
//         (
//           parseFloat(
//             cartList.find(({ _id: { _id } }) => _id === productId)._id.price
//           ) -
//           parseFloat(
//             productList.find((product) => product._id === productId).price
//           )
//         ).toFixed(2)
//       );
// };

// const removeDuplicateProductFromCart = (cartList, productToBeAdded) => {
//   const { productId } = productToBeAdded;

//   let newCartList = [
//     ...cartList,
//     { ...productToBeAdded, quantity: 1, isInCartList: true },
//   ];

//   if (newCartList.length > 0) {
//     newCartList = cartList.map((product) => {
//       if (productId === product["productId"]) {
//         return {
//           ...product,
//           quantity: product["quantity"] + 1,
//           isInCartList: true,
//         };
//       } else {
//         return {
//           ...product,
//         };
//       }
//     });
//   }

//   return newCartList;
// };

// if (cartList.length === 0) {
//   newCartList.push({ ...productToBeAdded, quantity: 1, isInCartList: true });

// } else {
//   cartList.forEach((product) => {
//     if (productId === product["productId"]) {

//       newCartList.push({
//         ...product,
//         qunatity: product["product"] + 1,
//         isInCartList: true
//       });
//     } else {

//       newCartList.push({
//         ...productToBeAdded,
//         quantity: 1,
//         isInCartList: true
//       });
//     }
//   });
// }

// return newCartList;
