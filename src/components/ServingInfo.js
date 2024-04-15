import React, { useState, useEffect } from 'react';
import styles from "@/app/[city]/p/[productbyname]/page.module.css";


export default function ServingInfo() {
  return (
    <>
      <div className={styles.pdp_shortInfo_Box}>
        <h5 className={styles.pdp_shortInfo_Icon}>
        Serving info
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" clipPath="url(#clip0_4555_10382)"><path d="M8 14.667A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333ZM8 10.667V8M8 5.333h.006"/></g><defs><clipPath id="clip0_4555_10382"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
        </span>
        </h5>
        <div className={styles.pdp_shortInfo_BoxItem}>
        <h5>Serving Information</h5>
        <ul>
            <li><h4>0.5Kg</h4><p>4 - 6 Persons</p></li>
            <li><h4>1Kg</h4><p>10 - 12 Persons</p></li>
            <li><h4>1.5Kg</h4><p>14 - 16 Persons</p></li>
            <li><h4>2Kg</h4><p>20 - 22 Persons</p></li>
        </ul>
        </div>
    </div>
    </>
  );
}
