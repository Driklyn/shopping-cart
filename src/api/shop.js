/**
 * Mocking client-server processing
 */
import _products from './products.json'

const TIMEOUT = 100

/*const getProducts = async (callback) => {
  const productsUrl = '{INSERT_URL_HERE}'

  try {
    const data = await fetch(productsUrl)
    let products = await data.json()

    products = products.map(product => {
      return {
        id: product.id,
        title: product.productTitle,
        price: product.price.value,
        inventory: product.inventory
      }
    })

    callback(products)
  } catch(e) {
    // TODO: failed state
  }
}*/

export default {
  //getProducts,
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
