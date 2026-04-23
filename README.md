# checkImg

通过 C2PA 元数据检测图片是否为 AI 生成。

## 功能

- 拖拽或上传图片，自动检测 C2PA 元数据
- 判断图片是否携带 AI 生成痕迹
- 支持 JPEG、PNG、WebP 格式
- 显示详细的 C2PA 元数据信息

## 重要说明

**本工具只能检测携带 C2PA 元数据的图片。**

C2PA (Coalition for Provenance and Authenticity) 是一种图片元数据标准，用于标记图片的来源和生成方式。只有在图片编辑软件或 AI 生成工具支持 C2PA 标准时，图片才会携带相关元数据。

**这意味着：**
- 如果一张图片有 C2PA 元数据且显示为"AI 生成"，则说明该图片在生成时被软件嵌入了 AI 标记
- 如果一张图片没有 C2PA 元数据，**不代表它是原创图片**，可能只是生成工具不支持 C2PA 标记

本工具无法检测**所有** AI 生成图片，只能检测**携带 C2PA 元数据**的 AI 生成图片。也就是**原图**，如果用了类似img2img工具处理后的 AI 生成图片，那就只能靠我的眼睛就是尺了。

## 技术栈

- Vite + React 18
- @contentauth/c2pa-web
- Paper Design

## 本地运行

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```
## License

MIT
