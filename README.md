# Field_Reservation_Platform
华中科技大学操场预约平台（复用原 `client/` React 代码）。

## 运行方式
### 本地开发（React）
```bash
cd client
npm install
npm start
```

### 本地联调 API（Vercel）
```bash
vercel dev
```
然后访问 `http://localhost:3000`。

## Vercel 部署说明
本仓库现在由 Vercel 直接构建 `client/` React 项目，并挂载根目录 `api/` 的 Serverless 接口。

- 前端：`client/`（`craco build` 产物）
- 接口：`/api/login`、`/api/field-info`、`/api/reservation`、`/api/notice`

## 说明
- 这版已不再使用 `preview/index.html` 静态页面。
- 为了和原项目交互一致，前端请求已改为同源 `/api/*`。
- 当前数据是内存存储，重启/冷启动后会重置。
