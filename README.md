# Field_Reservation_Platform
华中科技大学操场预约平台（可直接部署到 Vercel）。

## 本地运行（真实 API）
这个版本不再是纯静态假数据，`preview/index.html` 会调用同仓库下的 `api/` 接口。

```bash
cd /workspace/Field_Reservation_Platform
vercel dev
```

启动后访问：
- `http://localhost:3000/`（自动重写到 `preview/index.html`）
- `http://localhost:3000/api/state`

## Vercel 部署
1. 将仓库推送到 GitHub。
2. 在 Vercel 中 `Add New Project` 并导入本仓库。
3. Framework Preset 选择 `Other`（或保持自动）。
4. 直接点击 `Deploy`。

部署后：
- 首页即预约页面。
- `/api/state`、`/api/reserve` 为线上接口。

## 当前实现
- `preview/`：前端页面（预约表单 + 状态展示 + 公告列表）
- `api/state.js`：读取当前场地预约状态
- `api/reserve.js`：提交预约并更新公告
- `api/_store.js`：服务端内存数据模型（演示用途）

> 说明：当前数据存储在函数实例内存中，适合演示与预览。若要生产可用，建议接入 PostgreSQL / MySQL / Redis。
