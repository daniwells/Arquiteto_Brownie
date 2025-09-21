/*
import { NextResponse } from "next/server";

const BASE_URL = "https://router.hereapi.com/v8/routes";

export async function POST(req: Request) {
  try {
    const { origin, destination } = await req.json(); 

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "Origem e destino são obrigatórios" },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}?transportMode=car&origin=${origin}&destination=${destination}&return=summary&apikey=${process.env.HERE_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erro ao consultar Here API");
    }

    const data = await res.json();

    const distanceMeters = data.routes[0].sections[0].summary.length;
    const distanceKm = distanceMeters / 1000;

    const price = 5 + distanceKm * 2.5;

    return NextResponse.json({
      distance_km: distanceKm.toFixed(2),
      price: price.toFixed(2),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
*/

import { NextResponse } from "next/server";

const ROUTER_URL = "https://router.hereapi.com/v8/routes";
const GEOCODE_URL = "https://geocode.search.hereapi.com/v1/geocode";

async function geocodeCEP(cep: string) {
  const res = await fetch(`${GEOCODE_URL}?q=${cep}&apikey=${process.env.HERE_API_KEY}`);
  if (!res.ok) throw new Error("Erro ao consultar Geocoding API");

  const data = await res.json();
  if (!data.items || data.items.length === 0) {
    throw new Error(`CEP não encontrado: ${cep}`);
  }

  const { lat, lng } = data.items[0].position;
  return `${lat},${lng}`;
}

export async function POST(req: Request) {
  try {
    const { originCEP, destinationCEP } = await req.json(); 

    if (!originCEP || !destinationCEP) {
      return NextResponse.json(
        { error: "CEP de origem e destino são obrigatórios" },
        { status: 400 }
      );
    }

    const originCoords = await geocodeCEP(originCEP);
    const destinationCoords = await geocodeCEP(destinationCEP);

    const url = `${ROUTER_URL}?transportMode=car&origin=${originCoords}&destination=${destinationCoords}&return=summary&apikey=${process.env.HERE_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Erro ao consultar Here Routing API");
    }

    const data = await res.json();
    const distanceMeters = data.routes[0].sections[0].summary.length;
    const distanceKm = distanceMeters / 1000;
    const price = 5 + distanceKm * 2.5;

    return NextResponse.json({
      distance_km: distanceKm.toFixed(2),
      price: price.toFixed(2),
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
