import { z } from "zod";

export const apiResponseSchema = z.object({
  status: z.enum(["success", "error"]),
  message: z.string(),
  data: z.any().nullable(),   
  errors: z.any().nullable(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;

export const createApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  apiResponseSchema.extend({
    data: schema.nullable(), 
  });