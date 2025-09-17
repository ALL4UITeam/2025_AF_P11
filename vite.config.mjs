// 파일: vite.config.mjs
import glob from 'fast-glob'
import fs from 'fs'
import Hbs from 'handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 📌 pageData.json 읽기 (없으면 빈 객체)
let pageData = {}
const pageDataPath = path.resolve(__dirname, 'src/pageData.json')
if (fs.existsSync(pageDataPath)) {
  pageData = JSON.parse(fs.readFileSync(pageDataPath, 'utf-8'))
}

// ── Handlebars helpers
const hbsHelpers = {
  eq: (a, b) => String(a) === String(b),
  ne: (a, b) => String(a) !== String(b),
  gt: (a, b) => Number(a) > Number(b),
  lt: (a, b) => Number(a) < Number(b),
  and() { return [...arguments].slice(0, -1).every(Boolean) },
  or()  { return [...arguments].slice(0, -1).some(Boolean) },
  add: (a, b) => Number(a) + Number(b),
  sub: (a, b) => Number(a) - Number(b)
}

// ── 모든 페이지 자동 수집 + pageData 병합
function collectPages() {
  const pagesPath = path.resolve(__dirname, 'src')
  const pageFiles = fs.readdirSync(pagesPath).filter(f => f.endsWith('.html'))

  return pageFiles.map(file => {
    const base = {
      name: file,
      title: path.basename(file, '.html'),
      note: '',
      created: '',
      updated: ''
    }
    return Object.assign(base, pageData[file] || {})
  })
}
const allPages = collectPages()

// ── 레이아웃 적용 플러그인
const applyLayoutPlugin = {
  name: 'apply-layout',
  enforce: 'pre',
  transformIndexHtml(html, ctx) {
    const match = html.match(/@layout\s+([^\s]+)\s*-->/)
    if (!match) return html

    const layoutRel = match[1]
    const layoutPath = path.resolve(__dirname, 'src', layoutRel)
    if (!fs.existsSync(layoutPath)) return html

    const layout = fs.readFileSync(layoutPath, 'utf-8')

    // body 추출
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
    const bodyContent = bodyMatch ? bodyMatch[1] : html

    // partials 등록
    const partialsDir = path.resolve(__dirname, 'src/partials')
    if (fs.existsSync(partialsDir)) {
      fs.readdirSync(partialsDir).forEach(f => {
        const name = path.basename(f, '.html')
        const content = fs.readFileSync(path.join(partialsDir, f), 'utf-8')
        Hbs.registerPartial(name, content)
      })
    }

    // 현재 파일 이름으로 context 찾기
    const name = path.basename(ctx.filename)
    const context = {
      body: bodyContent,
      ...(pageData[name] || {})
    }

    const template = Hbs.compile(layout)
    return { html: template(context), tags: [] }
  }
}

export default defineConfig(() => {
  return {
    root: 'src',
    base: './',
    publicDir: '../public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('src/*.html').map(file => {
            const name = path.basename(file, '.html')
            return [name, path.resolve(__dirname, file)]
          })
        ),
        output: {
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          assetFileNames: ({ name }) => {
            if (/\.(css)$/.test(name ?? '')) {
              return 'assets/css/[name][extname]'
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]'
            }
            return 'assets/[name][extname]'
          }
        }
      }
    },
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'src/components'),
        helpers: hbsHelpers,
        context: (filename) => {
          const name = path.basename(filename)
          if (name === 'index.html') {
            return { pages: allPages } // index.html 전용 → 전체 페이지 목록
          }
          return pageData[name] || {} // 나머지는 pageData에서
        }
      }),
      applyLayoutPlugin,
      {
        name: 'no-css-minify',
        generateBundle(_, bundle) {
          for (const fileName in bundle) {
            if (fileName.endsWith('.css')) {
              const chunk = bundle[fileName]
              if ('code' in chunk) {
                chunk.code = chunk.code.replace(/}/g, '}\n')
              }
            }
          }
        }
      },
      {
        name: 'cleanup-html',
        closeBundle() {
          const distPath = path.resolve(__dirname, 'dist')
          const htmlFiles = fs.readdirSync(distPath).filter(f => f.endsWith('.html'))

          htmlFiles.forEach(file => {
            const filePath = path.join(distPath, file)
            let content = fs.readFileSync(filePath, 'utf-8')
            content = content.replace(/ crossorigin/g, '')
            content = content.replace(/<link rel="modulepreload" [^>]+?>/g, '')
            fs.writeFileSync(filePath, content)
          })

          console.log('빌드 후 modulepreload & crossorigin 제거 완료')
        }
      }
    ]
  }
})
