import { redirect } from 'next/navigation'
 
async function fetchTeam(city) {
     console.log("city",city)
     if(city !==""){
      return city
     }
}
 
export default async function Profile({ params }) {
  const city = await fetchTeam(params.city)
  if (!city) {
    redirect('/mumbai')
  }else{
    redirect('/'+city)

  }

}