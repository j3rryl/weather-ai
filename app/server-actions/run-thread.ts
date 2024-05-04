"use server";

import { createStreamableValue } from "ai/rsc";
import { Product } from "../models/product";

export const runThread = async () => {
  const streamableStatus = createStreamableValue("thread.init");
  streamableStatus.update("Loading...");
  // const result = await response.json();
  // const products = result?.data as Product[];
  // streamableStatus.done(products);

  try {
    const response = await fetch(
      "https://beauty.alvocatfresh.co.ke/api/products12"
    );

    // Check if the request was successful
    if (!response.ok) {
      streamableStatus.done("Response not okay");
    }

    const result = await response.json();
    const products = result?.data as Product[];

    // Update status to indicate success and provide the fetched data
    streamableStatus.done(products);
  } catch (error) {
    // Update status to indicate failure
    // streamableStatus.error(error.message);
    streamableStatus.done("Error");
  }

  return {
    status: streamableStatus.value,
  };
};
