# Field_Reservation_Platform
华中科技大学操场预约平台（原版风格可预览）。

## 现在是什么状态
- 首页 `preview/index.html` 已切换为**原项目交互风格**（登录页 + 顶栏 + 左侧场地菜单 + 日期方块 + 公告区）。
- 页面不再使用静态假卡片，而是走真实接口：
  - `POST /api/login`
  - `GET /api/state`
  - `POST /api/reserve`

## 本地预览
```bash
cd /workspace/Field_Reservation_Platform
vercel dev
```
然后打开 `http://localhost:3000/`。

## Vercel 部署
1. 把仓库推到 GitHub。
2. 在 Vercel 导入该仓库并直接 Deploy。
3. 部署成功后访问域名根路径 `/` 即可看到页面。

## 目录
- `preview/index.html`：原版风格前端页面
- `api/_store.js`：预约数据内存模型
- `api/login.js`：登录接口
- `api/state.js`：状态接口
- `api/reserve.js`：预约接口
- `vercel.json`：Vercel 重写配置

> 说明：当前是演示型内存存储，函数冷启动后数据会重置。
