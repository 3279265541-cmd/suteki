# 糯米鸡 · 深夜频道

一个不用安装任何软件、双击就能打开的个人网站。

它包含：首页、作品集、文章列表、文章详情、音乐播放器、关于页，还有手机端菜单。整站只有一个 CSS 文件、三个 JS 文件，没有框架、没有数据库、没有统计代码。

---

## 先看效果

双击 `index.html`，用 Chrome / Edge / Safari 打开即可。

> 如果双击后打开的是代码编辑器，右键 `index.html` →「打开方式」→ 选择 Chrome 或 Edge。

- 首页：`index.html`
- 作品：`works.html`
- 文章：`blog.html`
- 音乐：`music.html`
- 关于：`about.html`

> 建议用较新的浏览器。手机菜单使用了原生 `<dialog>`，2022 年之后的浏览器都支持。

---

## 文件地图

```
nuomiji/
├─ index.html              首页
├─ works.html              作品集
├─ blog.html               文章列表
├─ music.html              音乐播放器
├─ about.html              关于
├─ 404.html                找不到页面时显示
├─ favicon.svg             浏览器标签页小图标
├─ README.md               就是你正在看的这份说明
│
├─ posts/                  文章正文
│  ├─ _template.html       新文章模板（复制它来写新文章）
│  ├─ a-programme-for-days.html
│  ├─ the-city-at-2am.html
│  ├─ still-playing-records.html
│  └─ a-small-radio-station.html
│
└─ assets/
   ├─ css/style.css        全站样式（颜色、字号、布局都在这里）
   ├─ js/
   │  ├─ data.js           站点信息、音乐、作品、文章目录
   │  ├─ site.js           导航、页脚、列表、筛选、弹窗
   │  └─ player.js         两个播放器
   ├─ img/                 所有图片
   └─ audio/               三段示例音乐（WAV）
```

**最重要的一个文件是 `assets/js/data.js`。** 名字、邮箱、作品、文章目录都在里面，改它就等于改了半个网站。

---

## 5 分钟改成你自己的

### 1. 改名字、简介、邮箱

打开 `assets/js/data.js`，最上面的 `window.SITE`：

```js
window.SITE = {
  name: "糯米鸡",
  latin: "NUOMIJI",
  tagline: "不普通的人",
  description: "糯米鸡的个人网站：写字、拍照、做点东西，还有一个给深夜的电台。",
  email: "hello@nuomiji.fm",   // ← 改成你的邮箱
  since: 2026,
  location: "某座不睡的城市",
  socials: []
};
```

- `name`：网站上的名字
- `tagline`：一句话标签，会出现在页脚和浏览器标题里
- `description`：给搜索引擎和分享卡片看的一句话
- `email`：联系邮箱，页脚的「写信给我」和关于页都会用它
- `socials`：社交主页。填上后会出现在页脚；格式在文件里有注释示例

改完保存，刷新页面就能看到。

### 2. 改首页那几句话

打开 `index.html`，搜索 `一个人，一间很小的深夜电台`，改成你自己的介绍。  
首页大标题 `糯米鸡`、标签 `不普通的人` 也在这个文件里。

### 3. 换作品

**最简单的方法：保持文件名不变，直接覆盖图片。**

把准备好的图片改成这些名字，放进 `assets/img/`：

| 文件名 | 用在哪里 | 建议尺寸 |
| --- | --- | --- |
| `work-night.jpg` | 作品「夜航」+ 首页精选 | 1200 × 900 |
| `work-poster.jpg` | 作品「不普通的人」 | 1200 × 900 |
| `work-city.jpg` | 作品「城市夜行」 | 1200 × 900 |
| `work-site.jpg` | 作品「糯米鸡小站」 | 1200 × 900 |
| `work-zine.jpg` | 作品「写给三十岁前的信」 | 1200 × 900 |
| `work-rain.jpg` | 作品「雨声采样」 | 1200 × 900 |

然后修改 `data.js` 里的 `window.WORKS`：标题、分类、年份、描述、标签、详情页文案。  
每件作品长这样：

```js
{
  id: "poster",
  title: "不普通的人",
  category: "视觉",
  year: "2026",
  cover: "assets/img/work-poster.jpg",
  desc: "显示在卡片上的一句话。",
  detail: "点开卡片后看到的详细说明。",
  tags: ["海报", "字体"],
  href: "",              // 可留空；填了会在弹窗里出现按钮
  hrefLabel: "去看看"
}
```

- `id` 必须唯一，不能重复。
- 想加作品：复制一整段，用英文逗号隔开。
- 分类会自动出现在作品页的筛选按钮里，不需要另外设置。

### 4. 换音乐

1. 把你的音频放进 `assets/audio/`，推荐 MP3（文件小、加载快）。
2. 修改 `data.js` 里的 `window.TRACKS`：

```js
{
  id: "night-flight",
  no: "01",
  title: "夜航",
  en: "NIGHT FLIGHT",
  duration: "00:30",                        // 显示用，写成实际时长
  src: "assets/audio/night-flight.wav",     // ← 换成你的文件
  cover: "assets/img/track-night.jpg",      // 封面图
  episode: "EP.01 · SIDE A",
  note: "给还没睡的人。"
}
```

示例音乐是 30 秒的 WAV，可以自由替换或删除。  
如果换成 MP3，把 `src` 的后缀改成 `.mp3`，并把 `duration` 改成实际时长（例如 `"03:42"`）。

### 5. 写新文章

1. 复制 `posts/_template.html`，改名成一个英文短名，例如 `my-first-post.html`。
2. 用记事本或 VS Code 打开，改标题、日期、标签、正文。
3. 打开 `assets/js/data.js`，在 `window.POSTS` 的**最上面**加一条：

```js
{
  slug: "my-first-post",
  title: "文章标题",
  date: "2026-11-01",
  display: "2026.11.01",
  tag: "随笔",
  minutes: 5,
  excerpt: "列表里显示的两行摘要。",
  file: "posts/my-first-post.html"
}
```

4. 保存，刷新 `blog.html`，文章就出现了。

文章正文支持：小标题 `<h2>`、段落 `<p>`、引用 `<blockquote>`、图片 `<figure>`。模板里有示例。

---

## 发布到网上

### 方案 A：GitHub Pages（免费，适合长期用）

1. 打开 [github.com](https://github.com) 注册账号。
2. 右上角 `+` → **New repository**。
3. 仓库名填 `<你的用户名>.github.io`。例如你的 GitHub 用户名是 `xiaoming`，就填 `xiaoming.github.io`。
   **注意：这里填的是 GitHub 用户名，不是网站名「糯米鸡」。**
   只有仓库名和用户名完全一致，网址才会是 `https://<你的用户名>.github.io/`。
   如果创建页面上有 **Add README** 开关，把它关掉（后面要上传网站自带的 `README.md`，避免重名）。
   可见性选 **Public**，点 **Create repository**。
4. 点 **uploading an existing file**，把 `nuomiji` 文件夹**里面的所有内容**拖进去：
   `index.html`、`assets`、`posts`、`favicon.svg`、`404.html`。
   注意：不要把 `nuomiji` 这个文件夹本身拖进去，否则网址会多一层。
5. 点 **Commit changes**。
6. 进入仓库的 **Settings → Pages**。
7. **Source** 选 **Deploy from a branch**，Branch 选 **main**，目录选 **/(root)**，点 **Save**。
8. 等 1–2 分钟，访问 `https://<你的用户名>.github.io`。

以后更新：重复第 4 步上传覆盖，等一分钟即可。

> 如果仓库名不是 `<用户名>.github.io`，网址会是 `https://<用户名>.github.io/<仓库名>/`。本站所有路径都是相对的，放在子目录里也能正常显示。

### 方案 B：Netlify Drop（最快，拖一下就好）

1. 打开 [app.netlify.com/drop](https://app.netlify.com/drop)。
2. 把整个 `nuomiji` 文件夹拖进网页。
3. 等几秒，会得到一个 `https://xxxx.netlify.app` 的网址。
4. 注册后可以改名字、绑定自己的域名。

### 方案 C：Vercel / Cloudflare Pages

同样支持直接上传静态文件。选择 “Upload” 或连接 Git 仓库即可，不需要构建命令。

> 国内访问 GitHub Pages 有时较慢。如果主要给国内朋友看，可以考虑 Cloudflare Pages，或者购买国内服务器并备案。先用免费的试，够用再说。

---

## 发布前检查清单

- [ ] 把 `hello@nuomiji.fm` 换成自己的邮箱（`data.js` 和 `about.html` 里都有）
- [ ] 把示例作品图换成自己的图片
- [ ] 把示例文章换成自己写的，或至少改掉署名和日期
- [ ] 确认音乐没有版权问题；示例音乐是程序合成的，可以保留
- [ ] 页脚和关于页的社交链接（`data.js` 的 `socials`）
- [ ] 发布后把 `og:image` 改成完整网址，例如 `https://你的域名/assets/img/og.jpg`，分享到微信/微博时才有封面图
- [ ] 用手机打开一次，点开菜单、播放器、作品弹窗

---

## 想让网站更好看

### 改颜色

打开 `assets/css/style.css`，最上面：

```css
:root {
  --bg: #0b0a09;        /* 背景 */
  --text: #efe6d8;      /* 主文字 */
  --amber: #f2b872;     /* 强调色 */
  --red: #d4553f;       /* 直播小圆点 */
}
```

改这几个值，全站配色会一起变。建议只改 `--amber` 和 `--bg`，最容易出效果。

### 改字体

同样在 `style.css` 里：

```css
--serif: "Noto Serif SC", "Songti SC", "STSong", Georgia, serif;
--sans: "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
```

标题用 `--serif`，正文用 `--sans`。系统里没有的字体，会自动用后面的备选。

### 改导航

打开 `assets/js/site.js`，找到 `var NAV = [...]`，增删条目即可。五个页面的导航和页脚会一起更新，不需要逐页改。

### 加一个新页面

1. 复制 `about.html`，改名成 `guestbook.html`。
2. 把 `<body data-page="about">` 改成 `data-page="guestbook"`。
3. 改中间的内容。
4. 在 `site.js` 的 `NAV` 里加一行：

```js
{ id: "guestbook", label: "留言", href: "guestbook.html" }
```

导航、页脚、手机菜单都会自动出现这一项。

---

## 常见问题

**双击后页面空白？**  
多半是 `data.js` 里少了逗号、引号不配对。按 `F12` 打开浏览器控制台，红色报错会指出行号。改完刷新。

**图片不显示？**  
检查文件名大小写是否完全一致（`Work-Night.jpg` 和 `work-night.jpg` 不是一回事），以及图片是否在 `assets/img/` 里。

**音乐不播放？**  
浏览器不允许自动播放，必须点一下播放键；这是正常的。如果点了还没声音，检查 `data.js` 里 `src` 的路径和文件后缀，以及音频格式是否是浏览器支持的 MP3 / WAV / M4A。

**发布后样式丢了？**  
上传时漏了 `assets` 文件夹，或者把 `nuomiji` 文件夹本身放进了仓库根目录。保证 `index.html` 和 `assets` 在同一层。

**中文乱码？**  
所有文件都要保存为 UTF-8 编码。记事本另存为时选择 UTF-8；VS Code 默认就是。

**手机菜单打不开？**  
确认浏览器不是特别旧的版本。菜单使用了 `<dialog>`，Chrome / Edge / Safari 15.4+ 都支持。

**想加留言板 / 评论？**  
这个站是纯静态的，没有后端。可以接 Giscus（基于 GitHub Discussions）或 Utterances，但需要改代码；建议先把内容写起来，再考虑评论。

---

## 关于素材

- 所有图片、封面、示例音乐都是为这个项目生成的，可以自由使用或替换。
- 音乐是程序合成的氛围音，不是商业歌曲，没有版权问题。
- 字体使用系统自带字体，不额外加载网络字体，所以打开很快，也不依赖墙外服务。
- 站内没有统计代码、没有 Cookie、没有第三方请求。

---

## 最后一句话

这个网站最值钱的部分不是代码，是你往里放的东西。

先把名字和邮箱改掉，发一篇文章，传一张照片。剩下的，慢慢来。

—— 晚安，频道还亮着。
