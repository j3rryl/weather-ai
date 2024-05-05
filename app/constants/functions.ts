import { getPlaiceholder } from "plaiceholder";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const blurPicture = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};
