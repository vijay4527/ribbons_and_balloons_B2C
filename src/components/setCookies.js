// setCookies.js
"use client"
import React from 'react';
import Cookies from 'js-cookie';

const SetCookies = ({ city }) => {
  React.useEffect(() => {
    if (city) {
      Cookies.set('city', city);
    }
  }, [city]);

  return null;
};

export default SetCookies;
