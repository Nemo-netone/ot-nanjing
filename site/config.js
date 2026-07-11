window.PROJECT_CONFIG = {
  "title": "南京旅游服务平台",
  "positioning": "聚合南京景点、酒店、餐厅、路线、游记和预订的旅游服务演示系统。",
  "schema": "ot_nanjing",
  "colors": {
    "primary": "#b91c1c",
    "secondary": "#0369a1",
    "accent": "#ca8a04"
  },
  "repo": "ot-nanjing",
  "demoUrl": "https://ot-nanjing.pages.dev",
  "githubUrl": "https://github.com/Nemo-netone/ot-nanjing",
  "accounts": [
    {
      "role": "admin",
      "username": "admin",
      "password": "admin",
      "label": "平台管理员"
    },
    {
      "role": "user",
      "username": "账号1",
      "password": "123456",
      "label": "旅游用户"
    },
    {
      "role": "staff",
      "username": "景区01",
      "password": "123456",
      "label": "景区运营"
    }
  ],
  "modules": [
    {
      "key": "attraction",
      "name": "景点管理",
      "summary": "景点介绍、开放时间、门票和推荐信息"
    },
    {
      "key": "hotel",
      "name": "酒店管理",
      "summary": "酒店房型、价格、位置和预订状态"
    },
    {
      "key": "restaurant",
      "name": "餐厅管理",
      "summary": "特色餐饮、地址、评分和营业状态"
    },
    {
      "key": "route",
      "name": "旅游路线",
      "summary": "行程路线、交通方式和时间安排"
    },
    {
      "key": "diary",
      "name": "旅行游记",
      "summary": "用户游记、攻略、图片和互动数据"
    },
    {
      "key": "booking",
      "name": "旅游预订",
      "summary": "景点、酒店和餐饮预订记录"
    }
  ]
};
