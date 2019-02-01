# shopping-cart

This started out as a copy of the [Redux Shopping Cart Example](https://github.com/reactjs/redux/tree/master/examples/shopping-cart).

Additions added by me include:

* product removal from cart
* updating quantities of cart products
* a fully mobile-responsive design

Other code/project decisions I made and the reasons behind them are described below.

## Decision Making

1. I added the package `enzyme-to-json` to enable better [Jest snapshots for the Button component](/src/components/__snapshots__/Button.spec.js.snap).
2. I used [flex/grid](/src/containers/CartContainer.css#L15,L21) for centering DOM elements both horizontally and vertically.
3. I used [BEM naming](/src/components/Cart.css) for encapsulating CSS styles within each component and container.
4. I used [CSS variables](/src/containers/CartContainer.css#L37,L46) (where I thought useful) to control the values of multiple CSS properties simultaneously instead of adding additional packages, such as LESS, SASS, or PostCSS.
5. I used the semantically consise "boolean casting and double ampersand" approach for [optionally rendering JSX elements](/src/components/ProductItem.js#L27,L50).
