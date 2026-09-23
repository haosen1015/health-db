import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "健康资讯与分析数据库",
  description: "个人健康数据与文章知识库",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '新华社文章', link: '/articles/xinhua/001-优质蛋白质' },
      { text: '人民日报文章', link: '/articles/renmin/001-优质蛋白质' }
    ],
    sidebar: {
      '/articles/xinhua/': [
        {
          text: '新华社文章列表',
          items: [
            { text: '001-优质蛋白质', link: '/articles/xinhua/001-优质蛋白质' },
            { text: '002-升糖指数', link: '/articles/xinhua/002-升糖指数' },
            { text: '003-生物年龄', link: '/articles/xinhua/003-生物年龄' },
            { text: '004-控糖黄金期', link: '/articles/xinhua/004-控糖黄金期' },
            { text: '005-烫食', link: '/articles/xinhua/005-烫食' },
            { text: '006-贴秋膘', link: '/articles/xinhua/006-贴秋膘' },
            { text: '007-厨房坏习惯', link: '/articles/xinhua/007-厨房坏习惯' },
            { text: '008-膳食多样性', link: '/articles/xinhua/008-膳食多样性' },
            { text: '009-变质调味品', link: '/articles/xinhua/009-变质调味品' },
            { text: '010-踝泵运动', link: '/articles/xinhua/010-踝泵运动' },
            { text: '011-踝泵运动', link: '/articles/xinhua/011-踝泵运动' },
            { text: '012-睡眠不好', link: '/articles/xinhua/012-睡眠不好' },
            { text: '013-控糖', link: '/articles/xinhua/013-控糖' },
            { text: '014-上班族', link: '/articles/xinhua/014-上班族' },
            { text: '015-贴秋膘', link: '/articles/xinhua/015-贴秋膘' },
            { text: '016-脑出血', link: '/articles/xinhua/016-脑出血' },
            { text: '017-零食运动', link: '/articles/xinhua/017-零食运动' },
            { text: '018-雷海潮', link: '/articles/xinhua/018-雷海潮' }
          ]
        }
      ]
    }
  }
})