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
