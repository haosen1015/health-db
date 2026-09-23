import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 自动获取指定文件夹下的所有 md 文件并按文件名排序生成 sidebar 菜单
function getSidebarItems(dirName: string) {
  const dirPath = path.resolve(__dirname, `../articles/${dirName}`)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md'))
    .sort() // 确保按 001, 002, 003 顺序排列
    .map(file => {
      const fileNameWithoutExt = file.replace(/\.md$/, '')
      return {
        text: fileNameWithoutExt, // 显示的文件名（如：001-优质蛋白质）
        link: `/articles/${dirName}/${fileNameWithoutExt}` // 修复点：保证前缀带有斜杠 /
      }
    })
}

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '新华社文章', 
        link: getSidebarItems('xinhua')[0] ? `/articles/xinhua/${getSidebarItems('xinhua')[0].text}` : '/articles/xinhua/' 
      },
      { 
        text: '人民日报文章', 
        link: getSidebarItems('renmin')[0] ? `/articles/renmin/${getSidebarItems('renmin')[0].text}` : '/articles/renmin/' 
      }
    ],
    sidebar: {
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: getSidebarItems('xinhua')
        }
      ],
      '/articles/renmin/': [
        {
          text: '人民日报文章列表',
          items: getSidebarItems('renmin')
        }
      ]
    }
  }
})