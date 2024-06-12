interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_CLOUDINARY_CLOUD_NAME: string;
    // Thêm các biến môi trường khác tại đây nếu cần
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}