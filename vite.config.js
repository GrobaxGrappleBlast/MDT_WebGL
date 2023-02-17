
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
// vite.config.js
export default defineConfig({
    plugins:[
        glsl()
    ]
})
