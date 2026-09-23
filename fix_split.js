const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'articles', 'renmin', '01-添加糖.md');
const outputDir = path.join(__dirname, 'articles', 'renmin');

if (!fs.existsSync(targetFile)) {
    console.error('未找到目标文件：', targetFile);
    process.exit(1);
}

const rawContent = fs.readFileSync(targetFile, 'utf-8');

// 按 "第 X 篇" 进行切分
const parts = rawContent.split(/(?=第\s*\d+\s*篇)/g);

let count = 0;

parts.forEach((part) => {
    const trimmed = part.trim();
    if (!trimmed) return;

    // 1. 匹配篇号（如 111）
    const matchNum = trimmed.match(/^第\s*(\d+)\s*篇/);
    if (matchNum) {
        const articleIndex = matchNum[1].padStart(3, '0');
        
        let title = '';

        // 2. 优先尝试提取“关键词”中的第一个词作为文件名
        const kwMatch = trimmed.match(/关键词[：:]\s*([^、,，\n\r]+)/);
        if (kwMatch && kwMatch[1].trim()) {
            title = kwMatch[1].trim();
        } else {
            // 3. 如果没有关键词，尝试提取“内容分析”中的第一个词
            const contentMatch = trimmed.match(/内容分析[：:]\s*([^、,，\n\r]+)/);
            if (contentMatch && contentMatch[1].trim()) {
                title = contentMatch[1].trim();
            } else {
                title = '文章';
            }
        }

        // 过滤文件名中不合法的特殊字符
        title = title.replace(/[\\/:*?"<>|]/g, '');

        // 拼成新文件名，例如：111-春季运动.md
        const fileName = `${articleIndex}-${title}.md`;
        const filePath = path.join(outputDir, fileName);

        // 如果之前生成过 old "xxx-文章.md" 且现在有新名字，先清理旧文件
        const oldFilePath = path.join(outputDir, `${articleIndex}-文章.md`);
        if (fs.existsSync(oldFilePath) && fileName !== `${articleIndex}-文章.md`) {
            fs.unlinkSync(oldFilePath);
        }

        // 写入新文件
        fs.writeFileSync(filePath, trimmed, 'utf-8');
        console.log(`✅ 成功生成: ${fileName}`);
        count++;
    }
});

console.log(`\n🎉 处理完成！共成功拆分并重命名 ${count} 篇文章。`);