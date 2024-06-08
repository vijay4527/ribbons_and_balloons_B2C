// // app/components/MyClientComponent.jsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const MyClientComponent = () => {
//   const router = useRouter();
//   const [city, setCity] = useState('');

//   useEffect(() => {
//     const extractCityFromPath = (path) => {
//       const parts = path.split('/');
//       return parts.length > 2 ? parts[2].replace(/-/g, ' ') : '';
//     };

//     const path = router.asPath;
//     const cityName = extractCityFromPath(path);
//     console.log("city",city)
//     setCity(cityName);
//   }, [router.asPath]);

//   return (
//     <div>
//       <p>City: {city}</p>
//     </div>
//   );
// };

// export default MyClientComponent;
