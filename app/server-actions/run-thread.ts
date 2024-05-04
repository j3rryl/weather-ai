"use server";

import { createStreamableValue } from "ai/rsc";
import { Product } from "../models/product";

export const runThread = async () => {
  const streamableStatus = createStreamableValue("thread.init");

  setTimeout(async () => {
    try {
      streamableStatus.update("Loading...");
      await delay(5000);
      streamableStatus.update("Delay done");
      const response = await fetch(
        "https://beauty.alvocatfresh.co.ke/api/products"
      );

      if (!response.ok) {
        streamableStatus.done("Response not okay");
      }
      const result = await response.json();
      const products = result?.data as Product[];
      streamableStatus.done(products);
    } catch (error) {
      streamableStatus.done("Error");
    }
  }, 1000);

  return {
    status: streamableStatus.value,
  };
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
