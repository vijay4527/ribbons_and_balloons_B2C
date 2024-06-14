
  export async function getCities() {
    try {
      const apiUrl = process.env.API_URL
      const responseData  = await fetch('https://rnbapi.alphadigitall.com/api/RNBCity/GetAllRNBCity',{ cache: "force-cache", next: { revalidate: 180 } });
      const response = await responseData.json()
      return response; 
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; 
    }
  }