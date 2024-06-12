declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SOCKET_DOMAIN: string;
    }
  }
}
