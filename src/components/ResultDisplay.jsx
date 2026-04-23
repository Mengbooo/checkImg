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