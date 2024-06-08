// components/ClientScrollEffect.js
"use client"
import { useState, useEffect } from 'react';

const ClientScrollEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const bannerElements = document.getElementsByClassName('banner-img');
    for (let i = 0; i < bannerElements.length; i++) {
      const element = bannerElements[i];
      element.style.transform = `translateY(-${scrollPosition * (i == 2 ? 0 : 0.5)}px)`;
    }
  }, [scrollPosition]);

  return null;
};

export default ClientScrollEffect;
