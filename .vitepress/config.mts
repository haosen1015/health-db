import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 自动获取指定文件夹下的所有 md 文件并按文件名排序生成 sidebar 菜单
function getSidebarItems(dirName: string) {
  // 用 process.cwd() 准确定位项目根目录
  const dirPath = path.resolve(process.cwd(), `articles/${dirName}`)
  if (!fs.existsSync(dirPath)) return []

  const files = fs.readdirSync(dirPath)
  return files
    .filter(file => file.endsWith('.md'))
    .sort() // 按 001, 002, 003 顺序排列
    .map(file => {
      const fileNameWithoutExt = file.replace(/\.md$/, '')
      return {
        text: fileNameWithoutExt,
        link: `/articles/${dirName}/${fileNameWithoutExt}`
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
        link: getSidebarItems('xinhua')[0] 
          ? `/articles/xinhua/${getSidebarItems('xinhua')[0].text}` 
          : '/' 
      },
      { 
        text: '人民日报文章', 
        link: getSidebarItems('renmin')[0] 
          ? `/articles/renmin/${getSidebarItems('renmin')[0].text}` 
          : '/' 
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