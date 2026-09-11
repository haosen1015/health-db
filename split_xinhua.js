import fs from 'fs'
import path from 'path'

const txtPath = path.resolve('xinhua.txt')
const outputDir = path.resolve('articles/xinhua')

if (!fs.existsSync(txtPath)) {
  console.log('未找到 xinhua.txt 文件！')
  process.exit(1)
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const content = fs.readFileSync(txtPath, 'utf-8')
// 正则切割每篇文章：匹配 "文章 1："、"文章12" 或 "第X篇"
const articles = content.split(/(?=(?:文章\s*\d+|第\d+篇))/g).filter(Boolean)

articles.forEach(art => {
  const numMatch = art.match(/(?:文章|第)\s*(\d+)/)
  if (!numMatch) return

  const num = numMatch[1].padStart(2, '0') // 统一补齐为两位数：01, 02... 12
  
  // 提取链接
  const urlMatch = art.match(/https?:\/\/[^\s]+/)
  const url = urlMatch ? urlMatch[0] : '#'

  // 提取标题 (提取第一行中的标题部分)
  const firstLine = art.trim().split('\n')[0] || ''
  let rawTitle = firstLine.replace(/https?:\/\/[^\s]+/, '').replace(/(?:文章|第)\s*\d+[:：]?/, '').trim()
  
  // 提取核心内容与关键字
  const mainContentMatch = art.match(/(?:内容分析|核心内容概述|核心内容|主要内容)[：:]?\s*([\s\S]*?)(?=(?:关键词|关键字|核心关键字)|$)/)
  const mainContent = mainContentMatch ? mainContentMatch[1].trim() : art.trim()

  const keywordsMatch = art.match(/(?:关键词|关键字|核心关键字)[：:]?\s*(.*)/)
  const keywords = keywordsMatch ? keywordsMatch[1].trim() : ''

  // 提取简短的文件名主题 (最多取8位)
  let topicTitle = rawTitle.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').slice(0, 10)
  if (!topicTitle) {
    const cleanSummary = mainContent.replace(/\s+/g, '')
    const titleMatch = cleanSummary.match(/[^。，！,]{2,8}/)
    topicTitle = titleMatch ? titleMatch[0] : `健康科普`
  }

  const fileName = `${num}-${topicTitle}.md`
  const filePath = path.join(outputDir, fileName)

  const mdContent = `---
title: "文章${num}: ${topicTitle}"
source: "新华社"
---

# 文章${num}: ${topicTitle}

> **原文链接**：[点击查看微信原文](${url})

---

## 📌 核心内容

${mainContent}

---

**核心关键词**：${keywords}
`

  fs.writeFileSync(filePath, mdContent, 'utf-8')
  console.log(`重新解析并更新成功: ${fileName}`)
})