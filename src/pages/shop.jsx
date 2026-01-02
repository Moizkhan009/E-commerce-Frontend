import React from 'react'
import CategoryBreadcrumb from '../components/shopComponents/CategoryBreadcrumb'
import Header from '../components/header'
import ProductsGridPage from '../components/shopComponents/ProductsGridPage'
import Newsletter from '../components/shopComponents/newsletter'

const shop = () => {
  return (
    <div>
        {/* <Header/> */}
      <CategoryBreadcrumb/>
      <ProductsGridPage/>
      <Newsletter/>

    </div>
  )
}

export default shop
