# C2PA 图片检测工具 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个纯前端的响应式网页工具，通过 C2PA 元数据解析判断上传图片是否为 AI 生成。

**Architecture:** Vite + React 18 单页应用，c2pa npm 包在浏览器端解析图片，前端仅负责图片读取和结果展示，不涉及后端服务。

**Tech Stack:** Vite, React 18, c2pa, Paper Design CSS

---

## 文件结构

```
checkImg/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ImageUploader.jsx
│   │   └── ResultDisplay.jsx
│   ├── hooks/
│   │   └── useC2PA.js
│   └── utils/
│       └── c2paHelper.js
```

---

### Task 1: 初始化项目

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "checkimg",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "c2pa": "^0.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>checkImg - AI 图片检测</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: 安装依赖**

Run: `npm install`

---

### Task 2: 创建入口文件和样式基础

**Files:**
- Create: `src/main.jsx`
- Create: `src/App.css`
- Create: `src/App.jsx`

- [ ] **Step 1: 创建 src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 2: 创建 src/App.css (Paper Design 基础样式)**

```css
:root {
  --primary: #111111;
  --secondary: #8B5CF6;
  --success: #16A34A;
  --danger: #DC2626;
  --warning: #D97706;
  --surface: #FFFFFF;
  --text: #111827;
  --text-secondary: #6B7280;
  --border: #E5E7EB;
  --bg: #F9FAFB;

  --font-primary: 'Roboto', sans-serif;
  --font-display: 'Montserrat', sans-serif;
  --font-mono: 'PT Mono', monospace;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 640px;
}
```

- [ ] **Step 3: 创建 src/App.jsx (基础结构)**

```jsx
import Header from './components/Header'
import ImageUploader from './components/ImageUploader'
import ResultDisplay from './components/ResultDisplay'
import { useState } from 'react'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageSelect = async (file) => {
    setLoading(true)
    // TODO: 实现 C2PA 解析
    setLoading(false)
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <ImageUploader onImageSelect={handleImageSelect} />
        <ResultDisplay result={result} loading={loading} />
      </div>
    </div>
  )
}

export default App
```

- [ ] **Step 4: 提交**

```bash
git add package.json vite.config.js index.html src/
git commit -m "feat: initialize Vite + React project"
```

---

### Task 3: 创建 Header 组件

**Files:**
- Create: `src/components/Header.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: 创建 src/components/Header.jsx**

```jsx
function Header() {
  return (
    <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--primary)',
        marginBottom: 'var(--space-2)'
      }}>
        checkImg
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '14px'
      }}>
        通过 C2PA 元数据检测 AI 生成图片
      </p>
    </header>
  )
}

export default Header
```

- [ ] **Step 2: 更新 src/App.css 添加卡片样式**

在 App.css 末尾添加：

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}
```

- [ ] **Step 3: 提交**

```bash
git add src/components/Header.jsx src/App.css
git commit -m "feat: add Header component"
```

---

### Task 4: 创建 ImageUploader 组件

**Files:**
- Create: `src/components/ImageUploader.jsx`

- [ ] **Step 1: 创建 src/components/ImageUploader.jsx**

```jsx
import { useRef } from 'react'

function ImageUploader({ onImageSelect }) {
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImageSelect(file)
    }
  }

  return (
    <div
      className="card"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      style={{
        border: '2px dashed var(--border)',
        background: 'var(--bg)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        textAlign: 'center',
        padding: 'var(--space-8)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--secondary)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <div style={{
        width: '48px',
        height: '48px',
        margin: '0 auto var(--space-4)',
        border: '2px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" fill="var(--text-secondary)" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/>
        </svg>
      </div>
      <p style={{ color: 'var(--text)', fontWeight: 500 }}>
        拖拽图片到这里，或点击选择文件
      </p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: 'var(--space-1)' }}>
        支持 JPEG、PNG、WebP
      </p>
    </div>
  )
}

export default ImageUploader
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ImageUploader.jsx
git commit -m "feat: add ImageUploader component"
```

---

### Task 5: 创建 C2PA 解析工具

**Files:**
- Create: `src/utils/c2paHelper.js`
- Create: `src/hooks/useC2PA.js`

- [ ] **Step 1: 创建 src/utils/c2paHelper.js**

```js
/**
 * C2PA 检测结果类型
 * @typedef {'ai_generated' | 'authentic' | 'no_metadata' | 'error'} C2PAStatus
 */

/**
 * 解析 C2PA 结果并返回标准化判断
 * @param {Object} manifest - c2pa 库返回的 manifest
 * @returns {{ status: C2PAStatus, details: Object|null }}
 */
export function parseC2PAResult(manifest) {
  if (!manifest) {
    return { status: 'no_metadata', details: null }
  }

  try {
    const assertions = manifest.assertions || []
    const hasAIGeneration = assertions.some(assertion => {
      // 检查是否是 AI 生成相关的数据
      const label = assertion.label || ''
      return label.includes('ai') ||
             label.includes('generated') ||
             label.includes('stabilityai') ||
             label.includes('midjourney') ||
             label.includes('dalle')
    })

    return {
      status: hasAIGeneration ? 'ai_generated' : 'authentic',
      details: {
        vendor: manifest.vendor,
        version: manifest.version,
        assertions: assertions.map(a => ({
          label: a.label,
          data: a.data,
        })),
      },
    }
  } catch (error) {
    return { status: 'error', details: null }
  }
}
```

- [ ] **Step 2: 创建 src/hooks/useC2PA.js**

```js
import { useState } from 'react'
import { createC2PA } from 'c2pa'
import { parseC2PAResult } from '../utils/c2paHelper'

export function useC2PA() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyzeImage = async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const c2pa = await createC2PA()
      const arrayBuffer = await file.arrayBuffer()

      const result = await c2pa.read(arrayBuffer)

      if (result.manifest) {
        const parsed = parseC2PAResult(result.manifest)
        setResult(parsed)
      } else {
        setResult({ status: 'no_metadata', details: null })
      }
    } catch (err) {
      setError(err.message)
      setResult({ status: 'error', details: null })
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return { loading, result, error, analyzeImage, reset }
}
```

- [ ] **Step 3: 提交**

```bash
git add src/utils/c2paHelper.js src/hooks/useC2PA.js
git commit -m "feat: add C2PA parsing utilities"
```

---

### Task 6: 创建 ResultDisplay 组件

**Files:**
- Create: `src/components/ResultDisplay.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 创建 src/components/ResultDisplay.jsx**

```jsx
import { useState } from 'react'

const statusConfig = {
  ai_generated: {
    label: 'AI 生成',
    color: 'var(--danger)',
    bgColor: '#FEE2E2',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  authentic: {
    label: '原创/已知来源',
    color: 'var(--success)',
    bgColor: '#DCFCE7',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  no_metadata: {
    label: '无 C2PA 元数据',
    color: 'var(--text-secondary)',
    bgColor: '#F3F4F6',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
  },
  error: {
    label: '解析错误',
    color: 'var(--warning)',
    bgColor: '#FEF3C7',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
  },
}

function ResultDisplay({ result, loading, error }) {
  const [showDetails, setShowDetails] = useState(false)

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--secondary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto',
        }} />
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)' }}>
          正在解析图片...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!result && !error) {
    return null
  }

  const displayResult = error ? { status: 'error' } : result
  const config = statusConfig[displayResult.status] || statusConfig.error

  return (
    <div className="card">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        background: config.bgColor,
        borderRadius: 'var(--radius-md)',
        marginBottom: showDetails ? 'var(--space-4)' : 0,
      }}>
        <span style={{ color: config.color }}>{config.icon}</span>
        <span style={{ fontWeight: 600, color: config.color }}>
          {config.label}
        </span>
      </div>

      {result?.details && (
        <>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              padding: 0,
            }}
          >
            {showDetails ? '收起详情' : '查看详情'}
          </button>

          {showDetails && (
            <div style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-4)',
              background: 'var(--bg)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              <p style={{ marginBottom: 'var(--space-2)', fontWeight: 600 }}>
                C2PA 元数据
              </p>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}

      {error && (
        <p style={{ marginTop: 'var(--space-3)', color: 'var(--danger)', fontSize: '14px' }}>
          错误: {error}
        </p>
      )}
    </div>
  )
}

export default ResultDisplay
```

- [ ] **Step 2: 更新 src/App.jsx 集成 useC2PA**

```jsx
import Header from './components/Header'
import ImageUploader from './components/ImageUploader'
import ResultDisplay from './components/ResultDisplay'
import { useC2PA } from './hooks/useC2PA'

function App() {
  const { loading, result, error, analyzeImage } = useC2PA()

  const handleImageSelect = async (file) => {
    await analyzeImage(file)
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <ImageUploader onImageSelect={handleImageSelect} />
        <ResultDisplay result={result} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default App
```

- [ ] **Step 3: 提交**

```bash
git add src/components/ResultDisplay.jsx src/App.jsx
git commit -m "feat: add ResultDisplay component and integrate C2PA"
```

---

### Task 7: 最终测试

- [ ] **Step 1: 构建项目**

Run: `npm run build`

- [ ] **Step 2: 启动开发服务器测试**

Run: `npm run dev`

- [ ] **Step 3: 测试上传图片（准备一张有 C2PA 元数据的测试图）**

预期：
- 拖拽/选择图片后显示 loading
- 解析完成显示判断结果
- 点击"查看详情"展开元数据

- [ ] **Step 4: 提交**

```bash
git add -A
git commit -m "feat: complete C2PA image detection tool"
```

---

## 实施检查清单

| 任务 | 状态 |
|------|------|
| Task 1: 初始化项目 | ☐ |
| Task 2: 入口文件和样式 | ☐ |
| Task 3: Header 组件 | ☐ |
| Task 4: ImageUploader 组件 | ☐ |
| Task 5: C2PA 解析工具 | ☐ |
| Task 6: ResultDisplay 组件 | ☐ |
| Task 7: 测试验证 | ☐ |
