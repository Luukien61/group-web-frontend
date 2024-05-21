interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    // Thêm các biến môi trường khác tại đây nếu cần
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}