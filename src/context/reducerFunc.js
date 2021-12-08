export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: updateCartPageProductWithPrice(action.payload),
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishList: action.payload };

    case "ADD_TO_PRODUCT":
      const updateProductStatus = (products) => {
        return updateProductsWithWishListAndCartStatus(
          products,
          state.wishList,
          state.cartList
        );
      };

      return { ...state, productList: updateProductStatus(action.payload) };

    case "ADD_PRODUCT_TO_WISHLIST":
      console.log("ADD_PRODUCT_TO_WISHLIST", action);
      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInWishList: true }
            : { ...product }
        ),
        wishList: [
          ...state.wishList,
          { ...action.payload, isInWishList: true },
        ],
      };

    case "REMOVE_PRODUCT_FROM_WISHLIST":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product._id === action.productId
            ? { ...product, isInWishList: false }
            : { ...product }
        ),
        wishList: state.wishList.filter(
          (item) => item._id !== action.productId
        ),
      };

    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cartList: [
          ...state.cartList,
          { ...action.payload, isInCartList: true },
        ],
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
        cartList: state.cartList.filter(
          (product) => product._id !== action.productId
        ),
      };

    case "UPDATE_PRODUCT_QUANTITY_IN_CART":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product._id === action.productId
            ? {
                ...product,
                quantity: action.payload,
                price: updatePrice(
                  state.productList,
                  state.cartList,
                  action.productId,
                  action.updateType,
                  action.payload
                ),
              }
            : { ...product }
        ),
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
  return list.find((item) => item._id === product._id) !== undefined;
};

export const updateProductsWithWishListAndCartStatus = (
  productList,
  wishList,
  cartList
) => {
  if (wishList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(wishList, product)) {
        return { ...product, isInWishList: true };
      } else {
        return { ...product, isInWishList: false };
      }
    });
  }

  if (cartList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(cartList, product)) {
        return { ...product, isInCartList: true };
      } else {
        return { ...product, isInCartList: false };
      }
    });
  }

  return productList;
};

const updateCartPageProductWithPrice = (cartList) => {
  return cartList.map((product) => {
    return { ...product, price: product.price * product.quantity };
  });
};

const updatePrice = (productList, cartList, productId, updateType) => {
  return updateType === "INCREMENT"
    ? parseFloat(
        cartList.filter((product) => product._id === productId)[0].price
      ) +
        parseFloat(
          productList.filter((product) => product._id === productId)[0].price
        )
    : (
        parseFloat(
          cartList.filter((product) => product._id === productId)[0].price
        ) -
        parseFloat(
          productList.filter((product) => product._id === productId)[0].price
        )
      ).toFixed(2);
};

const removeDuplicateProductFromCart = (cartList, productToBeAdded) => {
  const { productId } = productToBeAdded;

  let newCartList = [
    ...cartList,
    { ...productToBeAdded, quantity: 1, isInCartList: true },
  ];

  console.log("HELLO_DING_DONG", { newCartList });

  if (newCartList.length > 0) {
    newCartList = cartList.map((product) => {
      if (productId === product["productId"]) {
        return {
          ...product,
          quantity: product["quantity"] + 1,
          isInCartList: true,
        };
      } else {
        return {
          ...product,
        };
      }
    });
  }

  console.log("new_CART_LIST", newCartList);
  return newCartList;
};

// if (cartList.length === 0) {
//   newCartList.push({ ...productToBeAdded, quantity: 1, isInCartList: true });

//   console.log("ie_IFnsid", { newCartList });
// } else {
//   cartList.forEach((product) => {
//     if (productId === product["productId"]) {
//       console.log("inside_IF", { product }, { newCartList });

//       newCartList.push({
//         ...product,
//         qunatity: product["product"] + 1,
//         isInCartList: true
//       });
//     } else {
//       console.log("inside_ELSE", { product }, { newCartList });

//       newCartList.push({
//         ...productToBeAdded,
//         quantity: 1,
//         isInCartList: true
//       });
//     }
//   });
// }

// console.log("NEW_CART_LIST", { newCartList });
// return newCartList;
