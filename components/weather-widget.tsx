"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiTempHigh, CiCloud, CiLocationOn } from "react-icons/ci";

//type
interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

//states
export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<null | WeatherData>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Data Fetch
  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid Location");
      setWeather(null);
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.log("Error while fetching data ", error);
      setError("City not Found , please try again");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  }

  //helper function
  function getTempMessage(temp: number, unit: string): string {
    if (unit === "C") {
      if (temp < 0) {
        return `It's freezing at ${temp}°C! Bundle up!`;
      } else if (temp < 10) {
        return `It's quite cold at ${temp}°C. Wear warm clothes.`;
      } else if (temp < 20) {
        return `The temp is ${temp}°C. Comfortable for a light jacket.`;
      } else if (temp < 30) {
        return `It's a pleasant ${temp}°C. Enjoy the nice weather!`;
      } else {
        return `It's hot at ${temp}°C. Stay hydrated!`;
      }
    } else {
      return `${temp}°${unit}`;
    }
  }

  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella! It's raining.";
      case "thunderstorm":
        return "Thunderstorms are expected today.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  function getLocationMessage(location: string): string {
    const currentHours = new Date().getHours();
    const isNight = currentHours >= 18 && currentHours < 6;

    return `${location} ${isNight ? "at Night" : "During Time"}`;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>Weather Widget</CardTitle>
          <CardDescription>
            Search for the current weather condition in your city.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="type"
              value={location}
              placeholder="enter the city"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLocation(e.target.value);
              }}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Search"}{" "}
            </Button>
          </form>

          {error && <div className="mt-4 text-red-500">{error}</div>}
          {weather && (
            <div className="mt-4 grid gap-2">
              <div className="flex item-center gap-2">
                <CiTempHigh className="w-6 h-6" />
                <div>{getTempMessage(weather.temperature, weather.unit)}</div>
              </div>
              <div className="flex item-center gap-2">
                <CiCloud className="w-6 h-6" />
                <div>{getWeatherMessage(weather.description)}</div>
              </div>
              <div className="flex item-center gap-2">
                <CiLocationOn className="w-6 h-6" />
                <div>{getLocationMessage(weather.location)}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
