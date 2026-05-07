import Elysia from "elysia";
import { getDistricts, getLocals, getProvinces } from "./service";

export const address = new Elysia({
  prefix: "/address",
  tags: ["Address"],
})
  .get("/provinces", () => {
    return getProvinces();
  })

  .get("/districts/:id", ({ params: { id } }) => {
    return getDistricts(id);
  })

  .get("/local/:id", ({ params: { id } }) => {
    return getLocals(id);
  });
