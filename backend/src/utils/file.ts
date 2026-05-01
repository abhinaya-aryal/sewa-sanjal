import { randomUUIDv7 } from "bun";
import { status } from "elysia";
import { basename, extname, join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * Saves a file in "public" directory. (max size of 2 MB)
 *
 * @param file file to be saved in public directory
 * @param  remove file to be removed
 *
 * @throws if the file type is not "image/"
 */
export const uploadFile = async (
  file: File,
  remove?: string | null,
): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    throw status("Unprocessable Content", "Only image files are allowed.");
  }

  if (file.size > MAX_SIZE) {
    throw status("Unprocessable Content", "File should be max 2MB");
  }

  if (remove) {
    await deleteFile(remove);
  }

  const extension = extname(file.name) || "";
  const filename = `${randomUUIDv7()}${extension}`;
  const filepath = join(PUBLIC_DIR, filename);

  try {
    const buffer = await file.arrayBuffer();
    await Bun.write(filepath, buffer);
    return filename;
  } catch (error) {
    throw status("Internal Server Error", "Unable to upload file");
  }
};

/**
 * Delete a file from "public" directory.
 *
 * @param filename name of the file to delete
 *
 */
export const deleteFile = async (filename: string): Promise<void> => {
  const safeName = basename(filename);
  const path = join(PUBLIC_DIR, safeName);

  const file = Bun.file(path);

  if (await file.exists()) {
    await file.delete();
  }
};
