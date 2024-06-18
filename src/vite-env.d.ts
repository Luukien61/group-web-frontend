interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_CLOUDINARY_CLOUD_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}