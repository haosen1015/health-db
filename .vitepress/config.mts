import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 1. 按照数字前缀排序的辅助函数（兼容 01, 001, 161 等文件名格式）
function sortByNumber(a: string, b: string) {
  const numA = parseInt(a.match(/^\d+/)?.[0] || '0', 10)
  const numB = parseInt(b.match(/^\d+/)?.[0] || '0', 10)
  return numA - numB
}

// 2. 通用自动读取函数：传入相对根目录的文件夹路径（如 'articles/xinhua' 或 'reports'）
function getSidebarByDir(dirRelativePath: string) {
  const dirPath = path.resolve(process.cwd(), dirRelativePath)
  if (!fs.existsSync(dirPath)) return []

  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .sort(sortByNumber)
    .map(file => {
      const fileName = file.replace(/\.md$/, '')
      return {
        text: fileName,
        link: `/${dirRelativePath}/${fileName}`
      }
    })
}

// 快速获取各板块的第一篇文章链接，用于导航栏和主页按钮跳转（防止死链接 404）
const xinhuaList = getSidebarByDir('articles/xinhua')
const renminList = getSidebarByDir('articles/renmin')
const reportsList = getSidebarByDir('reports')

const xinhuaFirstLink = xinhuaList[0]?.link || '/'
const renminFirstLink = renminList[0]?.link || '/'
const reportsFirstLink = reportsList[0]?.link || '/'

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  
  // 核心：防止打错字死链直接导致网页崩溃
  ignoreDeadLinks: true,

  themeConfig: {
    // 顶部导航栏（保持整体性，精准跳转到对应板块第一篇）
    nav: [
      { text: '首页', link: '/' },
      { text: '综合分析报告', link: reportsFirstLink },
      { text: '新华社文章', link: xinhuaFirstLink },
      { text: '人民日报文章', link: renminFirstLink }
    ],

    // 侧边栏：三大板块完全隔离，各司其职
    sidebar: {
      // 综合分析报告板块
      '/reports/': [
        {
          text: '宏观分析报告',
          items: reportsList
        }
      ],

      // 新华社文章板块
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: xinhuaList
        }
      ],

      // 人民日报文章板块
      '/articles/renmin/': [
        {
          text: '人民日报文章列表',
          items: renminList
        }
      ]
    }
  }
})