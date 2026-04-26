import { randomUUIDv7 } from "bun";
import { extname, join } from "path";

export const upload = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Provided file type is not supported");
  }

  const extension = extname(file.name) || "";
  const filename = `${randomUUIDv7()}${extension}`;
  const filepath = join(process.cwd(), "public", filename);

  const buffer = await file.arrayBuffer();
  await Bun.write(filepath, buffer);

  return filename;
};

export const createUploadLink = (filename: string | null) => {
  if (!filename) return;
  return process.env.API_URL + "/public/" + filename;
};
