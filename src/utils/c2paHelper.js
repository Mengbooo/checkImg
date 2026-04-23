/**
 * C2PA 检测结果类型
 * @typedef {'ai_generated' | 'authentic' | 'no_metadata' | 'error'} C2PAStatus
 */

/**
 * 检测是否为 AI 生成图片
 * @param {Object} manifest - c2pa manifest 对象
 * @returns {boolean}
 */
function isAIGenerated(manifest) {
  if (!manifest) return false

  // 检查 claim_generator_info 中是否包含已知 AI 工具
  const generatorInfo = manifest.claim_generator_info || []
  const aiPatterns = [
    'midjourney',
    'dalle',
    'dall-e',
    'stable diffusion',
    'stability.ai',
    'adobe firefly',
    'firefly',
    ' bing ',
    'dall-e',
    'gpt',
    'claude',
    'stable diffusion',
    'imagen',
    ' Parti '
  ]

  for (const info of generatorInfo) {
    const name = (info.name || '').toLowerCase()
    if (aiPatterns.some(pattern => name.includes(pattern))) {
      return true
    }
  }

  // 检查 vendor
  const vendor = (manifest.vendor || '').toLowerCase()
  if (aiPatterns.some(pattern => vendor.includes(pattern))) {
    return true
  }

  // 检查 format 是否包含 AI 生成标记
  const format = (manifest.format || '').toLowerCase()
  if (format.includes('ai') || format.includes('generated')) {
    return true
  }

  return false
}

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
    const hasAIGeneration = isAIGenerated(manifest)

    return {
      status: hasAIGeneration ? 'ai_generated' : 'authentic',
      details: {
        vendor: manifest.vendor,
        format: manifest.format,
        title: manifest.title,
        claim_generator_info: manifest.claim_generator_info,
      },
    }
  } catch (error) {
    return { status: 'error', details: null }
  }
}
