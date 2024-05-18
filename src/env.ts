import z from 'zod';

const envVariables = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string()
});

envVariables.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
