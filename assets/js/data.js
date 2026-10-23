/* =========================================================
   站点内容都在这一个文件里
   ---------------------------------------------------------
   改名字、邮箱、社交链接 → SITE
   改音乐列表 / 音频路径     → TRACKS
   改作品列表               → WORKS
   改文章列表               → POSTS
   注意：每一项之间用英文逗号隔开，最后一项后面不要加逗号。
   ========================================================= */

window.SITE = {
  name: "糯米鸡",
  latin: "NUOMIJI",
  tagline: "您已经入互联网深海区",
  description: "糯米鸡的个人网站：博客、拍照、神秘作品，还有一些莫名其妙的推歌。",
  email: "3279265541@qq.com",
  since: 2026,
  location: "亚西亚·赛里斯·布汗",
  /* 填上主页地址后会显示在页脚；留空就先不显示 */
  socials: [
    // { label: "哔哩哔哩", href: "https://space.bilibili.com/585911725?spm_id_from=333.1007.0.0" },
    // { label: "网易云音乐", href: "https://music.163.com/#/user/home?id=7996821221" },
    // { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/6312f3cc000000000f006b38" }
  ]
};

/* 音乐：把 src 换成你自己的音频文件路径，duration 写时长 */
window.TRACKS = [
  {
    id: "night-flight",
    no: "01",
    title: "夜航",
    en: "NIGHT FLIGHT",
    duration: "00:30",
    src: "assets/audio/night-flight.wav",
    cover: "assets/img/track-night.jpg",
    episode: "EP.01 · SIDE A",
    note: "这个音乐呢其实我还没听过嘻嘻"
  },
  {
    id: "rain-window",
    no: "02",
    title: "雨窗",
    en: "RAIN WINDOW",
    duration: "00:30",
    src: "assets/audio/rain-window.wav",
    cover: "assets/img/track-rain.jpg",
    episode: "EP.01 · SIDE B",
    note: "外面在下雨，没关系。把雨声调大一点，雨声就变大了。"
  },
  {
    id: "morning-mist",
    no: "03",
    title: "晨雾",
    en: "MORNING MIST",
    duration: "00:30",
    src: "assets/audio/morning-mist.wav",
    cover: "assets/img/track-mist.jpg",
    episode: "EP.02 · SIDE A",
    note: "天亮之前的最后一段路。雾很重，因为佩索阿觉得你弱视（？）。"
  }
];

/* 作品：点开卡片会显示 detail */
window.WORKS = [
  {
    id: "night-flight",
    title: "夜巡 ·  Vol.01",
    category: "声音",
    year: "2026",
    cover: "assets/img/work-night.jpg",
    desc: "一期没有嘉宾的夜间节目：三段音乐，两段絮语，和一段很长的沉默。",
    detail: "夜巡是伦勃朗的代表作（？）",
    tags: ["电台", "环境音", "自制"],
    href: "music.html",
    hrefLabel: "点击此处进入互联网深水区"
  },
  {
    id: "poster",
    title: "poster是海报的意思",
    category: "视觉",
    year: "2026",
    cover: "assets/img/work-poster.jpg",
    desc: "一张给自己做的海报。没有客户，没有 brief，只有一句想了很久的话。",
    detail: "好像并没有做过海报。",
    tags: ["海报", "字体", "自我项目"]
  },
  {
    id: "city",
    title: "城市夜行",
    category: "摄影",
    year: "2025",
    cover: "assets/img/work-city.jpg",
    desc: "凌晨一点到四点，我在床睡得很香。",
    detail: "注意到晚上天是黑的。",
    tags: ["摄影", "城市", "胶片感"]
  },
  {
    id: "site",
    title: "糯米鸡小站",
    category: "网页",
    year: "2026",
    cover: "assets/img/work-site.jpg",
    desc: "你正在看的这个网站。手写 HTML 和 CSS，没有框架，没有统计代码。",
    detail: "做这个站花的时间比想象中久，全都是deepseek做的，我也没看说实话呢哈哈哈。",
    tags: ["网页", "手写", "个人站"],
    href: "index.html",
    hrefLabel: "回到首页"
  },
  {
    id: "zine",
    title: "写给三十岁前的信",
    category: "文字",
    year: "2025",
    cover: "assets/img/work-zine.jpg",
    desc: "一本自己印的小册子，二十封信，寄给还没到来的年纪。",
    detail: "别看了，压根没这玩意，你觉得我是会写这种东西的人吗",
    tags: ["zine", "写作", "手工"]
  },
  {
    id: "rain",
    title: "雨声采样",
    category: "声音",
    year: "2024",
    cover: "assets/img/work-rain.jpg",
    desc: "在旧房子的窗边录了四十分钟雨。后来发现最好听的是中间那段沉默。",
    detail: "麦克风放在窗台上，楼下有人在收摊，远处的车压过积水。这些声音后来成了一首曲子的底噪，也成了我对那间房子的全部记忆。",
    tags: ["采样", "环境音", "记忆"]
  }
];

/* 文章：file 指向 posts/ 里的 HTML 文件 */
window.POSTS = [
  {
    slug: "a-programme-for-days",
    title: "这个还没来得及改",
    date: "2026-10-18",
    display: "2026.10.18",
    tag: "随笔",
    minutes: 6,
    excerpt: "我不太会规划人生，但很擅长给一天排一张节目单。早上是新闻，下午是工作，晚上留给音乐和一点没用的事。",
    file: "posts/a-programme-for-days.html"
  },
  {
    slug: "the-city-at-2am",
    title: "这个还没来得及改",
    date: "2026-09-30",
    display: "2026.09.30",
    tag: "城市",
    minutes: 8,
    excerpt: "白天的城市在上班，凌晨的城市在呼吸。我带着相机走了七次同一条街，最后只留下三张照片。",
    file: "posts/the-city-at-2am.html"
  },
  {
    slug: "still-playing-records",
    title: "这个还没来得及改",
    date: "2026-08-12",
    display: "2026.08.12",
    tag: "音乐",
    minutes: 5,
    excerpt: "从第一首听到最后一首，不跳过，不随机播放。在这个什么都能切的年代，我想保留一点不方便。",
    file: "posts/still-playing-records.html"
  },
  {
    slug: "a-small-radio-station",
    title: "（必看）误入互联网藕花深处",
    date: "2026-10-22",
    display: "2026.10.22",
    tag: "序",
    minutes: 4,
    excerpt: "没有执照，没有赞助，观众可能只有你。但我还是懒得写嘿嘿嘿。",
    file: "posts/a-small-radio-station.html"
  }
];
