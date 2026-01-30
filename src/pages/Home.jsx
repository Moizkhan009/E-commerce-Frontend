import React from 'react'
import Header from '../components/header'
import HeroSection from '../components/heroSection'
import FeaturedCategories from '../components/featuredCategories'
import PopularProducts from '../components/popularProducts'
import DailyBestSells from '../components/dailyBestSale'
import ProductTabsSection from '../components/productTabSection'
import NewsletterBanner from '../components/newsletterBanner'
import Footer from '../components/footer'
import FeaturesSection from '../components/featureSection'
import ProductCard from './Cards'

function Home() {
  return (
    <div>
   <Header/>
   <HeroSection/>
   <FeaturedCategories/>
   <PopularProducts/>
   <DailyBestSells/>
   <ProductTabsSection/>
   <NewsletterBanner/>
   <FeaturesSection/>
   <ProductCard/>
   <Footer/>


    </div>
  )
}

export default Home
