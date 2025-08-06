/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_DOGS_API_KEY: string
  // add more variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
