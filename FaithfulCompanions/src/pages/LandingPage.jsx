import React from 'react';
import Navbar from '../components/Navbar';   
import MainBanner from '../components/MainBanner'; 
import CategoryButtons from '../components/CategoryButtons';    
import Footer from '../components/Footer';   
import SignUpButton from '../components/SignUpButton';     
import Midsection from '../components/MidSection';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <MainBanner />
      <SignUpButton />
      <Midsection />
      <CategoryButtons />
      <Testimonial />
      <Newsletter />
      <Footer />
     
    </>
  );
};

export default LandingPage;
