"use client";
import {useState ,ChangeEvent , FormEvent} from "react";
import {Card , CardContent, CardHeader, CardDescription , CardTitle} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { CiCloudOn, CiLocationOn, CiTempHigh  } from "react-icons/ci";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";
export default function WeatherWidget(){
  //states
  const [location , setLocation] = useState<string>("");
  const [weather , setWeather] = useState<null | any>(null);
  const [error , setError] = useState<string|null>(null);
  const [isLoading , setIsLoading] = useState<boolean>(false);

  //data Fetch
  async function handleSearch(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const trimmedLocation = location.trim()
    if(trimmedLocation == ""){
      setError("Please enter a valid Location.")
      setWeather(null);
      return;
    }
    setIsLoading(true);
    setError(null)

    try {
      
      
    } catch (error) {
      console.log("Error while fetching data" , error)
      setError("City is not found...PLease try Again")
      setWeather(null)
      
    }
    finally{
      setIsLoading(true)
    }

  }
  return(
    <>
   
    </>
  )
}