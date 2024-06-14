async function getCities() {
    try {
      const apiUrl = process.env.API_URL
      const cities = await fetch(apiUrl+"RNBCity/GetAllRNBCity",{ next: { revalidate: 180 },});
      if (cities) {
        return cities;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        data: null,
      };
    }
  }