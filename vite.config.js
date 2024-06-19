import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/img/icons', // путь к вашей папке с иконками
          dest: 'src/img/'    // путь в dist куда будет копироваться папка
        }
      ]
    })
  ],

  build: {
    outDir: "dist",
    assetsDir: "src",
    rollupOptions: {
       output: {
          chunkFileNames: "src/js/[name]-[hash].js",
          entryFileNames: "src/js/[name]-[hash].js",

          assetFileNames: ({ name }) => {
             if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
                return "src/img/[name]-[hash][extname]";
             }

             if (/\.css$/.test(name ?? "")) {
                return "src/css/[name]-[hash][extname]";
             }

             return "src/[name]-[hash][extname]";
          },
       },
    },
 },
})
