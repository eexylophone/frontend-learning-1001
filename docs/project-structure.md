# 半调网屏与印刷效果生成器项目结构文档

## 项目目标

本项目为一个 **local-first、纯前端、本地图像处理** 的轻量印刷效果编辑器。

它不是单一的半调算法演示，而是一个**类似 PS 少功能简化版**的本地工具，聚焦：
- 半调网屏效果
- 基础印刷风格效果
- 本地实时预览
- 本地导出
- 可扩展的参数化编辑

本项目必须完整支持两条主线：

1. **预设后细调**
2. **从头搭建效果**

所以项目结构不能只围绕“预设展示”去设计，也不能只做“手工参数面板”，而要同时支持这两种使用方式。

---

## 一、推荐技术结构

推荐技术栈：
- React
- TypeScript
- Vite
- Canvas 2D

如果初期希望更轻量，也可以先用：
- HTML
- CSS
- JavaScript
- Canvas 2D

---

## 二、推荐目录结构

```text
halftone-screen-creator/
├─ public/
│  ├─ examples/
│  │  ├─ portrait.jpg
│  │  ├─ poster.jpg
│  │  └─ texture-paper.png
│  └─ favicon.ico
│
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ routes.ts
│  │  └─ providers.tsx
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ AppLayout.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ Sidebar.tsx
│  │  │
│  │  ├─ workflow/
│  │  │  ├─ WorkflowEntry.tsx
│  │  │  ├─ PresetFlowEntry.tsx
│  │  │  └─ BuildFromScratchEntry.tsx
│  │  │
│  │  ├─ controls/
│  │  │  ├─ UploadPanel.tsx
│  │  │  ├─ BaseAdjustPanel.tsx
│  │  │  ├─ HalftonePanel.tsx
│  │  │  ├─ PrintEffectPanel.tsx
│  │  │  ├─ PresetPanel.tsx
│  │  │  ├─ ExportPanel.tsx
│  │  │  └─ ModeSwitch.tsx
│  │  │
│  │  ├─ preview/
│  │  │  ├─ PreviewCanvas.tsx
│  │  │  ├─ BeforeAfterView.tsx
│  │  │  └─ EmptyState.tsx
│  │  │
│  │  └─ common/
│  │     ├─ Slider.tsx
│  │     ├─ Select.tsx
│  │     ├─ Toggle.tsx
│  │     ├─ Button.tsx
│  │     └─ Section.tsx
│  │
│  ├─ core/
│  │  ├─ image/
│  │  │  ├─ loadImage.ts
│  │  │  ├─ getImageData.ts
│  │  │  ├─ resizeImage.ts
│  │  │  └─ imageTypes.ts
│  │  │
│  │  ├─ adjustments/
│  │  │  ├─ grayscale.ts
│  │  │  ├─ brightness.ts
│  │  │  ├─ contrast.ts
│  │  │  ├─ saturation.ts
│  │  │  ├─ invert.ts
│  │  │  └─ threshold.ts
│  │  │
│  │  ├─ sampling/
│  │  │  ├─ gridSampler.ts
│  │  │  ├─ averageLuminance.ts
│  │  │  ├─ rotatedSampling.ts
│  │  │  └─ samplingTypes.ts
│  │  │
│  │  ├─ halftone/
│  │  │  ├─ circleHalftone.ts
│  │  │  ├─ squareHalftone.ts
│  │  │  ├─ lineHalftone.ts
│  │  │  ├─ halftoneFactory.ts
│  │  │  └─ halftoneTypes.ts
│  │  │
│  │  ├─ print/
│  │  │  ├─ paperTexture.ts
│  │  │  ├─ grain.ts
│  │  │  ├─ duotone.ts
│  │  │  ├─ inkSpread.ts
│  │  │  └─ printEffectTypes.ts
│  │  │
│  │  ├─ pipeline/
│  │  │  ├─ applyBaseAdjustments.ts
│  │  │  ├─ applyHalftone.ts
│  │  │  ├─ applyPrintEffects.ts
│  │  │  ├─ renderPipeline.ts
│  │  │  └─ pipelineTypes.ts
│  │  │
│  │  ├─ render/
│  │  │  ├─ drawCircle.ts
│  │  │  ├─ drawSquare.ts
│  │  │  ├─ drawLine.ts
│  │  │  ├─ drawBackground.ts
│  │  │  └─ renderToCanvas.ts
│  │  │
│  │  └─ export/
│  │     ├─ exportPNG.ts
│  │     ├─ exportJPEG.ts
│  │     └─ downloadFile.ts
│  │
│  ├─ presets/
│  │  ├─ newspaper.ts
│  │  ├─ comic.ts
│  │  ├─ poster.ts
│  │  ├─ retroPrint.ts
│  │  └─ index.ts
│  │
│  ├─ hooks/
│  │  ├─ useImageLoader.ts
│  │  ├─ useEditorWorkflow.ts
│  │  ├─ useRenderPipeline.ts
│  │  ├─ usePreviewScale.ts
│  │  └─ useExport.ts
│  │
│  ├─ store/
│  │  ├─ editorStore.ts
│  │  ├─ workflowStore.ts
│  │  ├─ adjustmentStore.ts
│  │  ├─ halftoneStore.ts
│  │  ├─ printEffectStore.ts
│  │  └─ presetStore.ts
│  │
│  ├─ types/
│  │  ├─ image.ts
│  │  ├─ adjustments.ts
│  │  ├─ halftone.ts
│  │  ├─ printEffects.ts
│  │  ├─ preset.ts
│  │  ├─ pipeline.ts
│  │  └─ workflow.ts
│  │
│  ├─ utils/
│  │  ├─ math.ts
│  │  ├─ clamp.ts
│  │  ├─ debounce.ts
│  │  ├─ canvas.ts
│  │  └─ file.ts
│  │
│  ├─ workers/
│  │  └─ renderPipeline.worker.ts
│  │
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ variables.css
│  │
│  └─ main.tsx
│
├─ docs/
│  ├─ learning-path.md
│  ├─ project-structure.md
│  ├─ version-roadmap.md
│  └─ design-notes.md
│
├─ README.md
├─ LICENSE
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## 三、结构设计思路

### 1. `components/workflow/`
负责两条主线的入口与切换。

职责：
- 告诉用户当前有哪两条主线
- 进入“预设后细调”流程
- 进入“从头搭建效果”流程

为什么必须单独拆出来：
- 因为这不是一个普通参数页，而是一个有明确编辑路径的工具
- 两条主线是产品结构的一部分，不应只藏在按钮文案里

---

### 2. `components/controls/`
负责编辑器的控制面板。

职责：
- 图片上传
- 基础调整
- 半调参数调整
- 印刷效果参数调整
- 预设选择
- 导出操作

设计要求：
- 预设入口和手动参数入口同时存在
- 预设应用后，参数面板仍然保持可编辑
- 从头搭建效果时，所有核心参数都能直接访问

---

### 3. `core/adjustments/`
负责基础调图能力。

职责：
- 灰度
- 亮度
- 对比度
- 饱和度
- 阈值
- 反相

为什么重要：
- 因为你的产品不是“只生成半调”，而是“先调图，再生成印刷效果”
- 这是从单一效果器转向轻量编辑器的关键一步

---

### 4. `core/halftone/`
负责半调网屏核心算法。

职责：
- 圆点半调
- 方点半调
- 线条半调
- 不同模式选择
- 不同参数映射

要求：
- 支持被预设调用
- 也支持被空白参数流直接调用

---

### 5. `core/print/`
负责基础印刷感效果。

职责：
- 纸张纹理
- 颗粒
- 双色处理
- 轻量油墨扩散感

为什么需要独立：
- 半调只是效果链的一部分
- 你想做的是“半调 + 印刷效果生成器”，不是单一半调生成器

---

### 6. `core/pipeline/`
负责组织整体效果链。

建议顺序：
1. 导入原图
2. 基础调整
3. 半调生成
4. 印刷风格效果叠加
5. 输出到预览或导出

这是整个项目里最关键的“编辑器骨架”。

为什么必须有：
- 因为两条主线最后都会汇入同一套渲染链
- 区别只在于参数来源不同：
  - 预设后细调：参数先由预设填充，再被用户修改
  - 从头搭建效果：参数从默认空白值开始逐步建立

---

### 7. `presets/`
负责项目内置预设。

示例预设：
- Newspaper
- Comic
- Poster
- Retro Print

用途：
- 帮用户快速入门
- 作为“预设后细调”主线的起点
- 作为 README 演示案例来源

注意：
- 预设只是参数模板
- 不能把预设做成不可编辑的黑盒结果

---

### 8. `store/`
负责编辑器状态。

建议管理内容：
- 当前图片
- 当前主线类型
- 当前基础调整参数
- 当前半调参数
- 当前印刷效果参数
- 当前预设
- 当前导出设置

结构重点：
- 要支持“默认空白参数”
- 要支持“应用预设后写入参数”
- 要支持“用户继续覆盖参数”

也就是说，状态结构必须天然支持两条主线，而不是临时拼凑。

---

### 9. `workers/`
负责较重的渲染与导出任务。

用途：
- 处理大图
- 避免主线程卡顿
- 为后续高级印刷效果扩展留空间

第一版可以只预留接口，但结构上建议现在就留好。

---

## 四、从产品角度看，这个结构为什么合适

因为它同时满足了 4 件事：

1. 支持本地运行
2. 支持两条主线
3. 支持“基础调图 + 半调 + 印刷效果”完整链路
4. 支持以后继续迭代，而不是写成一次性的 demo

---

## 五、最小可行结构建议

如果你第一版想先轻量起步，可以先只保留这些核心模块：

```text
src/
  components/
    workflow/
    controls/
    preview/
  core/
    image/
    adjustments/
    sampling/
    halftone/
    pipeline/
    export/
  presets/
  store/
  types/
  utils/
```

这样就已经足够支撑：
- 预设后细调
- 从头搭建效果
- 本地导出

后面再继续加 `print/`、`workers/`、更复杂的视觉层。
