# HTML & Markdown 预览器

一个现代化的在线HTML和Markdown预览工具，支持实时编辑和预览，部署在Cloudflare Pages上。

## 🚀 功能特性

### ✅ 已实现功能（第一阶段）

- **📝 双格式支持**: 支持Markdown和HTML格式切换
- **👁️ 实时预览**: 编辑内容时实时显示渲染效果
- **🎨 现代化界面**: 响应式设计，支持桌面和移动设备
- **🔒 安全渲染**: HTML内容在沙盒iframe中安全渲染
- **🌈 语法高亮**: 代码块支持多语言语法高亮
- **⌨️ 快捷键支持**:
  - `Ctrl/Cmd + K`: 清空内容
  - `Ctrl/Cmd + Enter`: 切换预览模式
  - `Ctrl/Cmd + Shift + F`: 全屏预览
  - `Esc`: 退出全屏

### 🎯 界面功能

- **分屏布局**: 左侧编辑器，右侧实时预览
- **格式切换**: 支持Markdown和HTML格式
- **预览模式**: 隐藏编辑器，专注预览内容
- **全屏预览**: 模态框全屏显示预览内容
- **状态栏**: 显示字数、行数和当前格式
- **清空功能**: 一键清空编辑器内容

## 🛠 技术栈

- **前端**: 原生HTML5 + CSS3 + JavaScript (ES6+)
- **Markdown解析**: [Marked.js](https://marked.js.org/)
- **代码高亮**: [Prism.js](https://prismjs.com/)
- **图标**: [Font Awesome](https://fontawesome.com/)
- **部署**: Cloudflare Pages

## 📦 项目结构

```
html-markdown/
├── index.html          # 主页面
├── styles/
│   └── main.css        # 主样式文件
├── scripts/
│   └── main.js         # 主JavaScript逻辑
├── FEATURES.md         # 功能需求文档
└── README.md           # 项目说明
```

## 🚀 本地开发

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd html-markdown
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8000

   # 或使用Node.js
   npx serve .

   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问应用**
   打开浏览器访问 `http://localhost:8000`

## 🌐 部署到Cloudflare Pages

### 方法一：Git集成（推荐）

1. 将代码推送到GitHub仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Pages** 部分
4. 点击 **Create a project**
5. 选择 **Connect to Git**
6. 选择你的GitHub仓库
7. 配置构建设置：
   - **Build command**: 留空（静态站点）
   - **Build output directory**: `/`
8. 点击 **Save and Deploy**

### 方法二：直接上传

1. 登录 Cloudflare Dashboard
2. 进入 **Pages** 部分
3. 点击 **Upload assets**
4. 上传项目文件
5. 设置项目名称并部署

### 自定义域名（可选）

1. 在Cloudflare Pages项目中点击 **Custom domains**
2. 添加你的域名
3. 按照提示配置DNS记录

## 📱 使用说明

1. **选择格式**: 在编辑器上方选择Markdown或HTML格式
2. **编写内容**: 在左侧编辑器中输入内容
3. **实时预览**: 右侧会实时显示渲染效果
4. **切换模式**: 点击"预览模式"按钮隐藏编辑器
5. **全屏预览**: 点击预览区域的全屏按钮
6. **清空内容**: 点击"清空"按钮重新开始

## 🎨 自定义样式

项目使用CSS变量定义主题，可以轻松自定义：

```css
:root {
    --primary-color: #2563eb;    /* 主色调 */
    --bg-primary: #ffffff;       /* 主背景色 */
    --text-primary: #1e293b;     /* 主文字色 */
    /* 更多变量... */
}
```

## 🔧 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 联系

如有问题或建议，请创建Issue或联系开发者。
