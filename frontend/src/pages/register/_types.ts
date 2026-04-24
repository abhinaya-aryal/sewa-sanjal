import { api } from "@/src/services/api";
import { Treaty } from "@elysiajs/eden";

export type RegisterBody = Treaty.Data<typeof api.auth.register.post>;
