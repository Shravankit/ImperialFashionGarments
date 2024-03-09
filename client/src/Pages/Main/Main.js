import React from 'react';
import Layout from '../../Components/layout/Layout';
import HeroSection from './MainPageComponents/HeroSection';
import ProductSlideShow from './MainPageComponents/ProductSlideShow';
import NewArrivals from './MainPageComponents/NewArrivals';
import ExploreMoreStyles from './MainPageComponents/ExploreMoreStyles';

const Main = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductSlideShow />
      <NewArrivals />
      <ExploreMoreStyles />
    </Layout>
  )
}

export default Main