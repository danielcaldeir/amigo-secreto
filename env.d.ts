declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      DEFAULT_TOKEN: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
      NEXT_SECRET_STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET_KEY: string;
      NEXTAUTH_SECRET: string;
      HOST_URL: string;
    }
}