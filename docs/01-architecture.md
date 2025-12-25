# 架构设计

## 概述

Turbo Print Var 是一个采用模块化架构的 VS Code 扩展，为 20+ 种编程语言提供智能日志语句插入、管理和可视化功能。

## 核心模块

### 1. 配置层 (`src/config/`)

- **settings.ts**: 配置管理，与 VS Code 工作区设置集成
- **defaults.ts**: 默认配置值

核心配置项：

- `prefix`: 日志消息前缀（默认：🚀）
- `suffix`: 变量名后缀（默认：:）
- `separator`: 日志元素分隔符（默认：~）
- `logFunction`: 每种语言的自定义日志函数（对象类型）
- `quote`: 字符串引号样式（"、'、`）
- `includeFileInfo`: 是否包含文件名和行号（默认：true）
- `addSemicolon`: 是否添加分号（默认：undefined，使用语言默认）
- `emptyLineBefore`: 日志前插入空行（默认：false）
- `emptyLineAfter`: 日志后插入空行（默认：false）
- `enableCodeLens`: 启用 CodeLens 功能（默认：false）
- `enableTreeView`: 启用 TreeView 统计面板（默认：false）

### 2. 核心逻辑 (`src/core/`)

#### 语言支持 (`languages/`)

定义 20+ 种语言配置，包含：

- `defaultLogFn`: 默认日志函数
- `commentSyntax`: 单行/多行注释语法
- `defaultStringQuote`: 引号偏好
- `needsSemicolon`: 语句结束符

支持的语言：TypeScript、JavaScript、Python、Java、Go、Rust、C/C++、C#、PHP、Ruby、Swift、Kotlin、Dart、Scala、Groovy、Perl、R、Shell、Lua、CoffeeScript 等。

#### 日志构建器 (`log-builder.ts`)

构建特定语言的日志语句，包含：

- 上下文信息（文件名、行号）
- 变量追踪
- 自定义格式化
- 支持空行插入
- 语句结束符处理

#### 日志解析器 (`log-parser.ts`)

使用模式匹配进行智能日志识别：

- 通过匹配 **logFunction + prefix + separator** 三个标志识别生成的日志
- 支持注释状态检测
- 行号提取和更新

### 3. 编辑器集成 (`src/editor/`)

- **selection.ts**: 多光标变量提取
- **insertion.ts**: 智能日志插入与缩进处理
- **document.ts**: 文档分析和日志管理

### 4. 命令 (`src/commands/`)

核心命令：

1. `insertLog`: 在光标/选中位置插入日志
2. `updateLineNumbers`: 更新所有日志中的行号
3. `commentLogs`: 注释所有生成的日志
4. `uncommentLogs`: 取消注释所有日志
5. `deleteLogs`: 删除所有生成的日志
6. `updateSingleLog`: 更新单个日志的行号（CodeLens）
7. `toggleComment`: 切换单个日志的注释状态（CodeLens）
8. `deleteSingleLog`: 删除单个日志（CodeLens）
9. `refreshTree`: 刷新统计面板（TreeView）

### 5. 可视化组件 (`src/providers/`)

#### CodeLens Provider (`log-codelens-provider.ts`)

为每个日志语句提供内联操作按钮：

- **Update**: 更新行号
- **Comment/Uncomment**: 切换注释状态
- **Delete**: 删除日志

特性：
- 自动检测日志语句
- 1 秒防抖刷新（文档编辑时）
- 只在当前活动文档中显示
- 支持所有语言

#### TreeView Provider (`log-tree-provider.ts`)

侧边栏统计面板，显示日志统计信息：

- **Current File**: 当前文件的日志统计（总数、活跃、已注释）
- **Workspace**: 工作区所有已打开文件的日志列表

特性：
- 10 秒防抖刷新（文档编辑时）
- 只扫描已打开的文件
- 限制显示最多 50 个文件
- 按日志数量排序

### 6. 工具函数 (`src/utils/`)

- **text.ts**: 文本处理辅助函数
- **validation.ts**: 输入验证
- **logger.ts**: 扩展日志记录
- **utils.ts**: 通用工具函数（防抖、变量名处理等）
- **vscode-utils.ts**: VS Code API 辅助函数

## 数据流

```
用户操作 → 命令
    ↓
加载配置
    ↓
变量检测（编辑器层）
    ↓
日志构建（核心层）
    ↓
文档插入（编辑器层）
```

## 核心设计原则

1. **关注点分离**: 清晰的模块边界
2. **语言无关核心**: 可扩展的语言支持
3. **基于模式的识别**: 可靠的日志识别
4. **类型安全**: 完整的 TypeScript 严格模式
5. **性能优化**: 高效的多光标批量操作
