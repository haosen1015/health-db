import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  themeConfig: {
    // 顶部导航栏：对应三个独立板块
    nav: [
      { text: '首页', link: '/' },
      { text: '宏观分析报告', link: '/reports/01-人民日报分类分析报告' },
      { text: '新华社文章', link: '/articles/xinhua/001-优质蛋白质' },
      { text: '人民日报文章', link: '/articles/renmin/01-人民日报分类分析报告' } // 请确保这是你人民日报文件夹里的真实第一篇文章名
    ],
    
    // 侧边栏：为三个不同路径分别配置专属菜单
    sidebar: {
      // 1. 综合报告板块 (读取 reports 文件夹)
      '/reports/': [
        {
          text: '宏观分析报告',
          items: [
            { text: '01-人民日报分类分析报告', link: '/reports/01-人民日报分类分析报告' },
            { text: '02-新华社综合分析报告', link: '/reports/02-新华社综合分析报告' }
          ]
        }
      ],
      
      // 2. 人民日报板块 (读取 articles/renmin 文件夹)
      '/articles/renmin/': [
        {
          text: '人民日报文章列表',
          items: [
            // 请在这里填入你人民日报拆分出来的具体文章
            { text: '01-人民日报分类分析报告', link: '/articles/renmin/01-人民日报分类分析报告' }
          ]
        }
      ],

      // 3. 新华社板块 (读取 articles/xinhua 文件夹)
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: [
            // 把你刚才写好的 001 到 026 的新华社列表完整粘贴到这里
            { text: '001-优质蛋白质', link: '/articles/xinhua/001-优质蛋白质' }
            // ... 补充剩下的 25 篇
          ]
        }
      ]
    }
  }
})