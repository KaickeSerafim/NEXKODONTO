import z from "zod";
import { createApiResponseSchema } from "../response/apiResponse";


export const userMeSchema = z.object({
  id: z.number(),
  foto: z.string().nullable().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email(),
  roles: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
});

export const userMeResponse = createApiResponseSchema(userMeSchema);

export type UserMeResponse = z.infer<typeof userMeResponse>;
