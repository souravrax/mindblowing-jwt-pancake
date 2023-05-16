import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default ({ mode }) => {
    console.log(process.env.BASE_URL);
    return defineConfig({
        plugins: [react()],
        define: {
            "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
            "process.env.ACCESS_TOKEN_EXPIRY": JSON.stringify(
                process.env.ACCESS_TOKEN_EXPIRY
            ),
        },
    });
};
