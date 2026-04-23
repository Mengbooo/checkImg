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