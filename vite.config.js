import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Inline the built CSS into <style> in index.html so first paint isn't blocked
// by a separate stylesheet round-trip. The bundle is small (~8 KB gzipped), so
// inlining is a net win on slow connections and adds no build dependency.
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        let out = html
        for (const [fileName, asset] of Object.entries(ctx.bundle)) {
          if (!fileName.endsWith('.css') || asset.type !== 'asset') continue
          const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const linkRe = new RegExp(`<link[^>]*href="[^"]*${escaped}"[^>]*>`)
          out = out.replace(linkRe, `<style>${asset.source}</style>`)
          delete ctx.bundle[fileName]
        }
        return out
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  base: '/',
  server: {
    host: '127.0.0.1',
  },
})
