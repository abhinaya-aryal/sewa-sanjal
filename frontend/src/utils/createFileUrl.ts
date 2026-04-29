export const createFileUrl = (filename?: string | null) => {
  if (!filename) return;
  return process.env.API_URL + "/public/" + filename;
};
