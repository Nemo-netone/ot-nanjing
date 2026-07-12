const LOCAL_IMAGE = "img/touxiang.37c3ea6b.png";
const API_TABLES = new Set([
  "config",
  "news",
  "users",
  "yonghu",
  "tianqiyubao",
  "jingdianxinxi",
  "menpiaoyuding",
  "jiudianxinxi",
  "jiudianyuding",
  "cantingxinxi",
  "cantingyuding",
  "jiaotongluxian",
  "lvxingriji",
  "lvyouguihua",
  "storeup",
  "file",
  "discussjingdianxinxi",
  "discussjiudianxinxi",
  "discusscantingxinxi",
  "discussjiaotongluxian",
  "discusslvxingriji",
]);

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(request, env) });

      if (url.pathname === "/health") {
        return json(request, env, ok({
          service: `${schema(env)}-api`,
          schema: schema(env),
          frontend: "original-vue-admin-front-dist",
          time: new Date().toISOString(),
        }));
      }

      const parts = url.pathname.replace(/^\/+/, "").split("/").filter(Boolean);
      if (!parts.length || !API_TABLES.has(parts[0])) return serveAssetOrSpa(request, env);

      const params = await requestParams(request, url);
      const payload = await handleLegacy(parts, params, env);
      return json(request, env, payload);
    } catch (error) {
      return json(request, env, fail(error.message || "服务异常"), 500);
    }
  },
};

async function serveAssetOrSpa(request, env) {
  if (!env.ASSETS) return new Response("Not found", { status: 404 });
  const response = await env.ASSETS.fetch(request);
  if (response.status !== 404) return maybeInjectApiBase(request, response);

  const accept = request.headers.get("Accept") || "";
  if (!accept.includes("text/html")) return response;

  const url = new URL(request.url);
  url.pathname = url.pathname.startsWith("/admin/") ? "/admin/index.html" : "/index.html";
  url.search = "";
  return maybeInjectApiBase(request, await env.ASSETS.fetch(new Request(url, request)));
}

async function maybeInjectApiBase(request, response) {
  const type = response.headers.get("Content-Type") || "";
  if (!type.includes("text/html")) return response;
  const origin = new URL(request.url).origin;
  const baseHref = new URL(request.url).pathname.startsWith("/admin/") ? "/admin/" : "/";
  const html = await response.text();
  const injected = html.replace("<head>", `<head><base href="${baseHref}"><script>window.NANJING_API_BASE=${JSON.stringify(origin)};</script>`);
  const headers = new Headers(response.headers);
  headers.delete("Content-Length");
  return new Response(injected, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleLegacy(parts, params, env) {
  const [table, action = "list", id] = parts;

  if (table === "file" && action === "upload") return ok({ file: LOCAL_IMAGE, data: { file: LOCAL_IMAGE } });
  if (table === "config") return handleConfig(action, id);
  if (table === "users" || table === "yonghu") return handleAccount(table, action, id, params, env);
  if (table === "news") return handleRows("news", action, id, params, env);
  if (table === "storeup") return handleStoreup(action, id, params);
  if (table.startsWith("discuss")) return handleDiscuss(table, action, id, params);

  return handleRows(table, action, id, params, env);
}

function handleConfig(action, id) {
  const rows = [
    { id: 1, name: "picture1", value: LOCAL_IMAGE },
    { id: 2, name: "picture2", value: LOCAL_IMAGE },
    { id: 3, name: "picture3", value: LOCAL_IMAGE },
  ];
  if (action === "detail" || action === "info") return ok({ data: rows.find((item) => String(item.id) === String(id)) || rows[0] });
  return page(rows);
}

async function handleAccount(table, action, id, params, env) {
  if (action === "login") {
    const username = String(params.username || params.zhanghao || "").trim();
    const password = String(params.password || params.mima || "").trim();
    const account = await findAccount(env, table, username, password);
    if (!account) return fail("账号或密码错误");
    return ok({
      token: `demo-${table}-${account.id}-${Date.now()}`,
      data: accountRecord(table, account),
    });
  }

  if (action === "session") return ok({ data: accountRecord(table, { id: 1, username: table === "users" ? "admin" : "zhanghao1" }) });
  if (action === "register" || action === "save" || action === "add" || action === "update") return ok({ msg: "操作成功", data: accountRecord(table, params) });
  if (action === "delete") return ok({ msg: "删除成功", data: null });

  const rows = [
    accountRecord("users", { id: 1, username: "admin" }),
    accountRecord("yonghu", { id: 2, username: "zhanghao1" }),
  ].filter((row) => table === "users" ? row.username === "admin" : row.zhanghao);
  if (action === "detail" || action === "info") return ok({ data: rows.find((item) => String(item.id) === String(id)) || rows[0] });
  return page(rows);
}

async function handleRows(table, action, id, params, env) {
  if (["save", "add", "update"].includes(action)) return ok({ msg: "操作成功", data: { id: params.id || Date.now(), ...params } });
  if (action === "delete") return ok({ msg: "删除成功", data: null });

  const rows = await legacyRows(table, env);
  if (action === "detail" || action === "info") return ok({ data: findById(rows, id || params.id) });
  if (action === "thumbsup" || action === "vote" || action === "remind") return ok({ data: null });
  return page(filterAndSort(rows, params), params);
}

function handleStoreup(action, id, params) {
  const rows = [{
    id: 1,
    userid: 2,
    refid: Number(params.refid || 1),
    tablename: params.tablename || "jingdianxinxi",
    name: params.name || "南京旅游收藏",
    picture: params.picture || LOCAL_IMAGE,
    type: "1",
    addtime: now(),
  }];
  if (["save", "add", "update", "delete"].includes(action)) return ok({ data: null });
  if (action === "detail" || action === "info") return ok({ data: findById(rows, id || params.id) });
  return page(rows, params);
}

function handleDiscuss(table, action, id, params) {
  const rows = [{
    id: 1,
    refid: Number(params.refid || 1),
    userid: 2,
    avatarurl: LOCAL_IMAGE,
    nickname: "游客用户",
    content: "这是一条用于作品集演示的评论。",
    reply: "",
    addtime: now(),
  }];
  if (["save", "add", "update", "delete"].includes(action)) return ok({ data: { id: Date.now(), ...params } });
  if (action === "detail" || action === "info") return ok({ data: findById(rows, id || params.id) });
  return page(rows, params);
}

async function legacyRows(table, env) {
  const direct = directRows(table);
  if (direct.length) return direct;

  const moduleKey = moduleForTable(table);
  const source = moduleKey ? await rowsFromSupabase(env, moduleKey) : [];
  if (source.length) return source.map((row, index) => mapItem(table, row, index));
  return fallbackRows(table);
}

function directRows(table) {
  if (table === "tianqiyubao") {
    return ["南京", "秦淮", "玄武", "栖霞"].map((city, index) => ({
      id: index + 1,
      chengshi: city,
      fengmian: LOCAL_IMAGE,
      tianqi: index % 2 ? "多云" : "晴",
      qiwen: `${24 + index}℃`,
      shidu: "56%",
      fengxiang: "东南风",
      fengsu: "3级",
      shiyichuxing: "适宜",
      chuanyituijian: "轻薄外套，注意补水。",
      gengxinshijian: now(),
      addtime: now(),
    }));
  }

  if (table === "news") {
    return ["南京三日游路线推荐", "秦淮夜游攻略", "博物馆预约提醒", "特色餐厅清单"].map((title, index) => ({
      id: index + 1,
      title,
      introduction: "覆盖景点、交通、住宿和美食的南京旅行攻略。",
      picture: LOCAL_IMAGE,
      content: "<p>这里展示南京旅游攻略、行程建议和注意事项。</p>",
      addtime: now(),
    }));
  }

  return [];
}

function fallbackRows(table) {
  const seeds = {
    jingdianxinxi: ["中山陵", "夫子庙", "玄武湖", "南京博物院"],
    jiudianxinxi: ["秦淮精品酒店", "玄武湖度假酒店", "新街口商务酒店", "钟山风景区民宿"],
    cantingxinxi: ["老门东餐厅", "秦淮小吃馆", "金陵盐水鸭店", "新街口融合餐厅"],
    jiaotongluxian: ["中山陵观光线", "秦淮夜游线", "博物馆文化线", "江北换乘线"],
    lvxingriji: ["秦淮河夜游记录", "钟山秋日徒步", "南京博物院半日游", "老门东美食日记"],
    menpiaoyuding: ["中山陵门票预订", "秦淮画舫预订"],
    jiudianyuding: ["秦淮精品酒店预订", "玄武湖度假酒店预订"],
    cantingyuding: ["老门东餐厅预订", "金陵盐水鸭店预订"],
    lvyouguihua: ["南京周末两日规划", "亲子三日游规划"],
  };

  return (seeds[table] || ["南京旅游演示记录"]).map((title, index) => mapItem(table, {
    id: index + 1,
    title,
    subtitle: "南京旅游服务",
    description: "用于展示原项目页面结构和核心业务列表的演示数据。",
    amount: 98 + index * 20,
    owner: "zhanghao1",
    updated_at: new Date().toISOString(),
  }, index));
}

function mapItem(table, row, index) {
  const id = Number(row.id || index + 1);
  const title = row.title || `南京旅游记录${index + 1}`;
  const text = row.description || row.subtitle || "南京旅游服务演示数据。";
  const common = {
    id,
    addtime: formatDateTime(row.created_at || row.updated_at),
    clicknum: 20 + index,
    thumbsupnum: 10 + index,
    crazilynum: index,
    picture: LOCAL_IMAGE,
  };

  const maps = {
    jingdianxinxi: {
      jingdianmingcheng: title,
      jingdiandizhi: row.subtitle || "南京市",
      jingdiandengji: "AAAAA",
      jingdiantupian: LOCAL_IMAGE,
      kaifangshijian: "08:30-17:30",
      menpiaojiage: Number(row.amount || 60),
      jingdianxiangqing: html(text),
    },
    jiudianxinxi: {
      jiudianmingcheng: title,
      jiudianleixing: row.subtitle || "舒适型",
      jiudiandizhi: "南京市核心商圈",
      jiudiantupian: LOCAL_IMAGE,
      lianxidianhua: "025-88888888",
      jiage: Number(row.amount || 299),
      jiudianjieshao: html(text),
    },
    cantingxinxi: {
      cantingmingcheng: title,
      cantingdidian: "南京市秦淮区",
      renjunxiaofei: Number(row.amount || 88),
      cantingtupian: LOCAL_IMAGE,
      cantingjieshao: html(text),
    },
    jiaotongluxian: {
      luxianmingcheng: title,
      luxianleixing: row.subtitle || "公交地铁",
      shifadi: "新街口",
      zhongdiandi: "景区入口",
      quanchengjuli: "12公里",
      luxiantupian: LOCAL_IMAGE,
      luxianxiangqing: html(text),
    },
    lvxingriji: {
      lvxingdidian: title,
      lvxingleixing: row.subtitle || "城市旅行",
      lvxingtianshu: 2 + (index % 3),
      lvxingtupian: LOCAL_IMAGE,
      zhanghao: row.owner || "zhanghao1",
      xingming: "游客用户",
      lvxingneirong: html(text),
    },
    menpiaoyuding: {
      dingdanbianhao: `MP${String(id).padStart(4, "0")}`,
      jingdianmingcheng: title,
      jingdiantupian: LOCAL_IMAGE,
      menpiaojiage: Number(row.amount || 60),
      goumaishuliang: 1,
      zongjine: Number(row.amount || 60),
      zhanghao: "zhanghao1",
      xingming: "游客用户",
      ispay: "未支付",
    },
    jiudianyuding: {
      dingdanbianhao: `JD${String(id).padStart(4, "0")}`,
      jiudianmingcheng: title,
      jiudiantupian: LOCAL_IMAGE,
      jiage: Number(row.amount || 299),
      ruzhutianshu: 1,
      zongjine: Number(row.amount || 299),
      zhanghao: "zhanghao1",
      xingming: "游客用户",
      ispay: "未支付",
    },
    cantingyuding: {
      dingdanbianhao: `CT${String(id).padStart(4, "0")}`,
      cantingmingcheng: title,
      cantingtupian: LOCAL_IMAGE,
      renjunxiaofei: Number(row.amount || 88),
      yudingrenshu: 2,
      zongjine: Number(row.amount || 176),
      zhanghao: "zhanghao1",
      xingming: "游客用户",
      ispay: "未支付",
    },
    lvyouguihua: {
      mudedi: title,
      chufashijian: now(),
      yujitianshu: 3,
      zhanghao: "zhanghao1",
      xingming: "游客用户",
      lvyouluxian: "夫子庙 - 中山陵 - 玄武湖 - 南京博物院",
      guihuaneirong: html(text),
    },
  };

  return { ...common, ...(maps[table] || { title, introduction: text, content: html(text) }) };
}

function moduleForTable(table) {
  return {
    jingdianxinxi: "attraction",
    jiudianxinxi: "hotel",
    cantingxinxi: "restaurant",
    jiaotongluxian: "route",
    lvxingriji: "diary",
    menpiaoyuding: "booking",
    jiudianyuding: "booking",
    cantingyuding: "booking",
    lvyouguihua: "booking",
  }[table];
}

async function findAccount(env, table, username, password) {
  const fallback = [
    { id: 1, role: "admin", username: "admin", password: "admin" },
    { id: 2, role: "user", username: "zhanghao1", password: "123456" },
    { id: 3, role: "user", username: "账号1", password: "123456" },
  ];
  const local = fallback.find((item) => item.username === username && item.password === password && (table === "users" ? item.role === "admin" : item.role !== "admin"));
  if (local) return local;

  const rows = await requestSupabase(env, "accounts", "GET", { username: `eq.${username}`, password: `eq.${password}`, limit: "1" }).catch(() => []);
  const account = rows[0];
  if (!account) return null;
  if (table === "users" && account.role !== "admin") return null;
  if (table === "yonghu" && account.role === "admin") return null;
  return account;
}

function accountRecord(table, account = {}) {
  const username = account.username || account.zhanghao || (table === "users" ? "admin" : "zhanghao1");
  if (table === "users") return { id: Number(account.id || 1), username, role: "管理员", addtime: now() };
  return {
    id: Number(account.id || 2),
    zhanghao: username,
    mima: "******",
    xingming: account.xingming || "游客用户",
    xingbie: "男",
    nianling: 26,
    shouji: "13800000000",
    touxiang: LOCAL_IMAGE,
    addtime: now(),
  };
}

async function rowsFromSupabase(env, moduleKey) {
  const rows = await requestSupabase(env, "items", "GET", { order: "id.asc" }).catch(() => []);
  return rows.filter((row) => row.module_key === moduleKey);
}

async function requestSupabase(env, table, method, query = {}, payload = {}) {
  const base = cleanEnv(env.SUPABASE_URL);
  const key = cleanEnv(env.SUPABASE_ANON_KEY || env.SUPABASE_SERVICE_ROLE_KEY);
  if (!base || !key) return [];
  const response = await fetch(`${base.replace(/\/$/, "")}/rest/v1/rpc/${schema(env)}_demo_rest`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_table_name: table, p_method: method, p_query: query, p_payload: payload }),
  });
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

function page(rows, params = {}) {
  const current = Math.max(Number(params.page || params.current || 1), 1);
  const size = Math.max(Number(params.limit || params.size || rows.length || 10), 1);
  const start = (current - 1) * size;
  return ok({
    data: {
      list: rows.slice(start, start + size),
      total: rows.length,
      pageSize: size,
      currPage: current,
      totalPage: Math.max(Math.ceil(rows.length / size), 1),
    },
  });
}

function filterAndSort(rows, params) {
  let result = [...rows];
  for (const [key, value] of Object.entries(params)) {
    if (!value || ["page", "limit", "sort", "order", "current", "size"].includes(key)) continue;
    result = result.filter((row) => String(row[key] || "").includes(String(value)));
  }
  if ((params.order || "").toLowerCase() === "desc") result.reverse();
  return result;
}

function findById(rows, id) {
  return rows.find((row) => String(row.id) === String(id)) || rows[0] || null;
}

async function requestParams(request, url) {
  const query = Object.fromEntries(url.searchParams.entries());
  if (request.method === "GET" || request.method === "HEAD") return query;
  const text = await request.text();
  if (!text) return query;
  try {
    return { ...query, ...JSON.parse(text) };
  } catch {
    return { ...query, ...Object.fromEntries(new URLSearchParams(text).entries()) };
  }
}

function ok(extra = {}) {
  return { code: 0, msg: "success", ...extra };
}

function fail(msg) {
  return { code: 500, msg, data: null };
}

function json(request, env, payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(request, env) },
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = String(env.CORS_ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  const allowOrigin = allowed.includes(origin) ? origin : allowed[0] || origin || "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,Token,token",
    "Access-Control-Max-Age": "86400",
  };
}

function schema(env) {
  return cleanEnv(env.SUPABASE_SCHEMA || "ot_nanjing");
}

function cleanEnv(value) {
  return String(value || "").replace(/^\uFEFF/, "").trim();
}

function now() {
  return formatDateTime(new Date().toISOString());
}

function formatDateTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function html(text) {
  return `<p>${String(text || "").replace(/[<>&]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[char]))}</p>`;
}
