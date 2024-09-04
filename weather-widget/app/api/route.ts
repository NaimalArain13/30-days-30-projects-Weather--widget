// app/api/weather/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!location || !apiKey) {
    return NextResponse.json({ error: 'Missing location or API key' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return NextResponse.json(data); // Return the weather data as a JSON response
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
