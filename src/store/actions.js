import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";
export default {
  addCart(context,payload) {
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    console.log(oldProduct);
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
    }
  }
}
