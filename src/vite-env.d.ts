/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_OPENAI_ENDPOINT: string
  readonly VITE_AZURE_API_KEY: string
  readonly VITE_AZURE_DEPLOYMENT_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}