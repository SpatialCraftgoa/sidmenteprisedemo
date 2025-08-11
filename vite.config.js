import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for all assets
  server: {
    host: '0.0.0.0', // Allow connections from local network
    port: 5173, // Port number for your Vite server
  },
  build: {
    outDir: 'dist', // Specify the output directory for build
    assetsDir: '',  // Place assets at the root of the dist directory
    sourcemap: true // Generate source maps for better debugging
  }
});
