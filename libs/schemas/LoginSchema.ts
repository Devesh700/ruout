import * as Z from 'zod';
export const LoginSchema = Z.object({
    pin:Z.string()
})
export type loginSchemaType = Z.infer<typeof LoginSchema>;