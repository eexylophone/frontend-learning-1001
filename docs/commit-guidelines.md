# 提交与分支规范

## 分支命名

功能开发分支统一使用 `feature/` 前缀。

示例：

```bash
feature/initial-skeleton
feature/halftone-controls
feature/export-settings
```

## 提交信息格式

提交信息使用以下格式：

```text
type(scope): summary
```

说明：

- `type` 表示改动类型。
- `scope` 表示本次修改或修复所属的模块、功能或文件区域。
- `summary` 简短说明本次改动内容。

## 常用 type

- `feat`：新增功能、功能更新、结构性能力补充。
- `debug`：问题修复、错误处理、运行异常修复。

## scope 写法

`scope` 不使用固定模板，应按本次改动所属部分填写。

示例：

```text
feat(editor): build initial skeleton
feat(halftone): add dot renderer
feat(export): add png download helper
debug(build): fix vite build on local path
debug(upload): handle image loading failure
```

## 注意事项

- 不要把 `scope` 固定写成 `process`。
- `summary` 使用英文短句，保持小写开头。
- 一次提交尽量对应一组相关改动，不要混入无关文件。
