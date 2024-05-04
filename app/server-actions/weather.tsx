"use server";

import { createStreamableUI } from "ai/rsc";
import LoadingSkeleton from "../loading";
import { Product } from "../models/product";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import ServerImage from "./server-image";

export async function getWeather() {
  const weatherUI = createStreamableUI();
  weatherUI.update(<LoadingSkeleton />);

  const response = await fetch(
    "https://beauty.alvocatfresh.co.ke/api/products"
  );
  const result = await response.json();
  const products = result?.data as Product[];

  weatherUI.done(
    products?.map((product) => {
      return (
        <Card key={product.id} className="m-5 py-3">
          <CardContent>
            <Suspense fallback="loading">{/* <ServerImage /> */}</Suspense>
            <p>{product.name}</p>
          </CardContent>
        </Card>
        // <div key={product.id} className="mb-5">
        //   {product.name}
        // </div>
      );
    })
  );

  return weatherUI.value;
}
