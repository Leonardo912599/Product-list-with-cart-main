import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Producto, productos } from '../utils/products'
import { RootState } from './store'


interface ProductState {
  products: Producto[]
}

const loadProducts = ()=> {
  try {
    const saveState = localStorage.getItem('products')
     return saveState ? JSON.parse(saveState) : productos
  } catch (error) {
    console.log('Error al cargar los productos')
    return []
  }
}
const initialState: ProductState = {
  products:  loadProducts() 
}

const saveState = (products:Producto[]) => {
  try {
    localStorage.setItem("products",JSON.stringify(products))
  } catch (error) {
    console.log('Error al guardar cambios')
  }
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeStatusClick: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const product = state.products[index]
      if (product) {
        product.isClicked = true
        saveState(state.products)
      }
    },
    increment: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const product = state.products[index]
      if (product) {
        product.quantity++
        saveState(state.products)
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const product = state.products[index]
      if(product){
        if(product.quantity > 0) product.quantity--
        saveState(state.products)
      }
    },
    remove:(state, action:PayloadAction<string>) => {  
      const productExist = state.products.find(p => p.name === action.payload)
      if(productExist){
        productExist.isClicked = false
        saveState(state.products)
      }     
    },
    cleanOrder:(state) => {
     state.products = state.products.map(p => ({...p,quantity:0,isClicked:false}))
     saveState(state.products)
    }
  }
})

export const selectTotalCartAdded = (state:RootState) => {
  let total = 0;
  state.products.products.forEach(p => {
    if (p.isClicked) {
      total++;
    }
  });
  return total;
};

export const orderTotal = (state:RootState) => {
  let total = 0;
  state.products.products.forEach(p => {
    if(p.isClicked){
      total += p.price * p.quantity
    }
  });
  return total
}

export const { changeStatusClick, increment, decrement,remove,cleanOrder } = productSlice.actions
export default productSlice.reducer