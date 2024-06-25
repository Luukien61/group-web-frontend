interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_CLOUDINARY_CLOUD_NAME: string;
    readonly VITE_MAIL_SERVER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}