// HTML & Markdown 预览器主要逻辑
class PreviewApp {
    constructor() {
        this.currentFormat = 'markdown';
        this.isPreviewMode = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.configureMarked();
        this.updatePreview();
    }

    initializeElements() {
        // 主要元素
        this.editor = document.getElementById('editor');
        this.preview = document.getElementById('preview');
        this.htmlPreview = document.getElementById('htmlPreview');
        
        // 控制按钮
        this.toggleModeBtn = document.getElementById('toggleMode');
        this.clearContentBtn = document.getElementById('clearContent');
        this.fullscreenBtn = document.getElementById('fullscreenPreview');
        this.closeFullscreenBtn = document.getElementById('closeFullscreen');
        
        // 格式选择器
        this.formatRadios = document.querySelectorAll('input[name="format"]');
        
        // 状态栏元素
        this.wordCount = document.getElementById('wordCount');
        this.lineCount = document.getElementById('lineCount');
        this.formatType = document.getElementById('formatType');
        
        // 模态框
        this.fullscreenModal = document.getElementById('fullscreenModal');
        this.fullscreenContent = document.getElementById('fullscreenPreviewContent');
    }

    setupEventListeners() {
        // 编辑器输入事件
        this.editor.addEventListener('input', () => {
            this.updatePreview();
            this.updateStatus();
        });

        // 格式切换
        this.formatRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentFormat = e.target.value;
                this.updateFormatType();
                this.updatePreview();
            });
        });

        // 按钮事件
        this.toggleModeBtn.addEventListener('click', () => this.togglePreviewMode());
        this.clearContentBtn.addEventListener('click', () => this.clearContent());
        this.fullscreenBtn.addEventListener('click', () => this.openFullscreen());
        this.closeFullscreenBtn.addEventListener('click', () => this.closeFullscreen());

        // 模态框点击外部关闭
        this.fullscreenModal.addEventListener('click', (e) => {
            if (e.target === this.fullscreenModal) {
                this.closeFullscreen();
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        this.clearContent();
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this.togglePreviewMode();
                        break;
                    case 'f':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.openFullscreen();
                        }
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.closeFullscreen();
            }
        });

        // 初始状态更新
        this.updateStatus();
    }

    configureMarked() {
        // 配置 marked.js
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            },
            breaks: true,
            gfm: true
        });
    }

    updatePreview() {
        const content = this.editor.value;
        
        if (this.currentFormat === 'markdown') {
            this.renderMarkdown(content);
        } else {
            this.renderHTML(content);
        }
    }

    renderMarkdown(content) {
        try {
            const html = marked.parse(content);
            this.preview.innerHTML = html;
            this.preview.style.display = 'block';
            this.htmlPreview.style.display = 'none';
            
            // 重新应用代码高亮
            Prism.highlightAllUnder(this.preview);
        } catch (error) {
            this.preview.innerHTML = `<div class="error">Markdown 解析错误: ${error.message}</div>`;
        }
    }

    renderHTML(content) {
        try {
            // 使用 iframe 安全渲染 HTML
            const iframe = this.htmlPreview;
            iframe.style.display = 'block';
            this.preview.style.display = 'none';
            
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6; 
                            margin: 1rem; 
                            color: #1e293b;
                        }
                        img { max-width: 100%; height: auto; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    ${content}
                </body>
                </html>
            `);
            doc.close();
        } catch (error) {
            this.preview.innerHTML = `<div class="error">HTML 渲染错误: ${error.message}</div>`;
            this.preview.style.display = 'block';
            this.htmlPreview.style.display = 'none';
        }
    }

    togglePreviewMode() {
        this.isPreviewMode = !this.isPreviewMode;
        const container = document.querySelector('.main-container');
        
        if (this.isPreviewMode) {
            container.style.gridTemplateColumns = '0 1fr';
            this.toggleModeBtn.innerHTML = '<i class="fas fa-edit"></i> 编辑模式';
        } else {
            container.style.gridTemplateColumns = '1fr 1fr';
            this.toggleModeBtn.innerHTML = '<i class="fas fa-eye"></i> 预览模式';
        }
    }

    clearContent() {
        if (confirm('确定要清空所有内容吗？')) {
            this.editor.value = '';
            this.updatePreview();
            this.updateStatus();
            this.editor.focus();
        }
    }

    openFullscreen() {
        this.fullscreenContent.innerHTML = this.currentFormat === 'markdown' 
            ? this.preview.innerHTML 
            : this.htmlPreview.outerHTML;
        
        this.fullscreenModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 重新应用代码高亮
        if (this.currentFormat === 'markdown') {
            Prism.highlightAllUnder(this.fullscreenContent);
        }
    }

    closeFullscreen() {
        this.fullscreenModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    updateStatus() {
        const content = this.editor.value;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const lines = content.split('\n').length;
        
        this.wordCount.textContent = `字数: ${words}`;
        this.lineCount.textContent = `行数: ${lines}`;
    }

    updateFormatType() {
        this.formatType.textContent = `格式: ${this.currentFormat === 'markdown' ? 'Markdown' : 'HTML'}`;
        
        // 更新编辑器占位符
        this.editor.placeholder = this.currentFormat === 'markdown' 
            ? '在这里输入 Markdown 内容...'
            : '在这里输入 HTML 内容...';
    }
}

// 工具函数
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// 错误处理
window.addEventListener('error', (e) => {
    console.error('应用错误:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的 Promise 拒绝:', e.reason);
});

// 应用初始化
document.addEventListener('DOMContentLoaded', () => {
    window.previewApp = new PreviewApp();
    console.log('HTML & Markdown 预览器已启动');
});
