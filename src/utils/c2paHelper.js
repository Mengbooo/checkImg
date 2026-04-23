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
