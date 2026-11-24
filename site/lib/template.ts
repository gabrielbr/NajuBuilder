/**
 * Starter content for Naju's academic site. Everything here is placeholder text in [brackets]
 * that she replaces in the editor. Blocks are flat lists linked by `_parent`.
 */
type Block = Record<string, unknown> & { _id: string; _type: string; _parent?: string };

export const NEWSREADER_THEME = {
  fontFamily: { heading: "Newsreader", body: "Inter" },
  borderRadius: "8px",
  colors: {
    background: ["#FBFAF7", "#111315"],
    foreground: ["#1C1F23", "#ECEAE6"],
    primary: ["#1F4E5F", "#7FB8C9"],
    "primary-foreground": ["#FFFFFF", "#0B1D24"],
    secondary: ["#EFECE5", "#22262A"],
    "secondary-foreground": ["#1C1F23", "#ECEAE6"],
    muted: ["#EFECE5", "#22262A"],
    "muted-foreground": ["#5E6369", "#A3A7AC"],
    accent: ["#E6EFF1", "#1B2F36"],
    "accent-foreground": ["#1F4E5F", "#CFE6EE"],
    destructive: ["#B42318", "#7F1D1D"],
    "destructive-foreground": ["#FFFFFF", "#FFFFFF"],
    border: ["#E2DED5", "#2E3338"],
    input: ["#E2DED5", "#2E3338"],
    ring: ["#1F4E5F", "#7FB8C9"],
    card: ["#FFFFFF", "#181B1E"],
    "card-foreground": ["#1C1F23", "#ECEAE6"],
    popover: ["#FFFFFF", "#181B1E"],
    "popover-foreground": ["#1C1F23", "#ECEAE6"],
  },
};

const s = (classes: string) => `#styles:,${classes}`;

/** Tiny builder so the page lists below stay readable. */
function tree(prefix: string) {
  let n = 0;
  const out: Block[] = [];
  const id = () => `${prefix}${(n++).toString(36)}`;
  const add = (b: Omit<Block, "_id">, parent?: string) => {
    const _id = id();
    out.push({ ...b, _id, ...(parent ? { _parent: parent } : {}) } as Block);
    return _id;
  };
  const box = (classes: string, parent?: string, tag = "div", name = "Box") =>
    add({ _type: "Box", _name: name, tag, styles: s(classes), backgroundImage: "" }, parent);
  const heading = (text: string, tag: string, classes: string, parent?: string) =>
    add({ _type: "Heading", tag, content: text, styles: s(classes) }, parent);
  const para = (html: string, classes: string, parent?: string) =>
    add({ _type: "Paragraph", content: html, styles: s(classes) }, parent);
  const link = (text: string, href: string, classes: string, parent?: string) =>
    add({ _type: "Link", content: text, link: { href, type: "url", target: "_self" }, styles: s(classes), prefetchLink: false }, parent);
  /** Images fill a sized wrapper (Next.js "fill" mode), so the wrapper carries the shape. */
  const image = (src: string, alt: string, frameClasses: string, parent?: string) => {
    const frame = box(`relative overflow-hidden ${frameClasses}`, parent, "div", "Moldura da imagem");
    return add({ _type: "Image", image: src, alt, styles: s("object-cover") }, frame);
  };
  return { out, box, heading, para, link, image };
}

const H1 = "font-heading text-4xl sm:text-5xl font-medium tracking-tight text-foreground";
const H2 = "font-heading text-2xl sm:text-3xl font-medium tracking-tight text-foreground";
const H3 = "font-heading text-xl font-semibold text-foreground";
const BODY = "text-base leading-7 text-muted-foreground";
const SECTION = "mx-auto w-full max-w-4xl px-6 py-12 sm:py-16";
const PHOTO = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=70";

export function headerBlocks(): Block[] {
  const t = tree("h");
  const bar = t.box("border-b border-border bg-background/90 backdrop-blur sticky top-0 z-40", undefined, "header", "Cabeçalho");
  const inner = t.box("mx-auto flex max-w-4xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between", bar);
  t.link("Anna Júlia [Sobrenome]", "/", "font-heading text-xl font-semibold text-foreground", inner);
  const nav = t.box("flex flex-wrap gap-x-5 gap-y-1 text-sm", inner, "nav", "Menu");
  for (const [label, href] of [
    ["Início", "/"],
    ["Pesquisa", "/pesquisa"],
    ["Publicações", "/publicacoes"],
    ["Fotografia", "/fotografia"],
    ["Currículo", "/cv"],
  ]) {
    t.link(label, href, "text-muted-foreground hover:text-primary", nav);
  }
  return t.out;
}

export function footerBlocks(): Block[] {
  const t = tree("f");
  const foot = t.box("mt-8 border-t border-border", undefined, "footer", "Rodapé");
  const inner = t.box("mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between", foot);
  t.para("<p>© 2026 Anna Júlia [Sobrenome] · Universidade Federal de Viçosa</p>", "", inner);
  const links = t.box("flex gap-4", inner);
  t.link("E-mail", "mailto:seu-email@ufv.br", "hover:text-primary", links);
  t.link("Lattes", "https://lattes.cnpq.br/", "hover:text-primary", links);
  return t.out;
}

function homeBlocks(): Block[] {
  const t = tree("i");
  const hero = t.box(`${SECTION} grid gap-10 sm:grid-cols-[1fr_220px] sm:items-center`, undefined, "section", "Apresentação");
  const text = t.box("flex flex-col gap-5", hero);
  t.para("<p>Graduanda em [Curso] · Universidade Federal de Viçosa</p>", "text-sm font-medium uppercase tracking-wider text-primary", text);
  t.heading("Anna Júlia [Sobrenome]", "h1", H1, text);
  t.para(
    "<p>Pesquiso [tema principal — por exemplo, cartografia social e mapeamento participativo]. Meu trabalho combina [métodos] para entender [pergunta de pesquisa]. Também sou fotógrafa.</p>",
    `${BODY} text-lg`,
    text,
  );
  const ctas = t.box("flex flex-wrap gap-3 pt-2", text);
  t.link("Conheça minha pesquisa", "/pesquisa", "rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90", ctas);
  t.link("Currículo", "/cv", "rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary", ctas);
  t.image("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=70", "Foto de Anna Júlia", "aspect-square w-full rounded-2xl", hero);

  const interests = t.box(`${SECTION} border-t border-border`, undefined, "section", "Interesses de pesquisa");
  t.heading("Interesses de pesquisa", "h2", `${H2} mb-6`, interests);
  const grid = t.box("grid gap-6 sm:grid-cols-3", interests);
  for (const [title, body] of [
    ["[Tema 1]", "Uma ou duas frases sobre este tema e por que ele importa para você."],
    ["[Tema 2]", "Uma ou duas frases sobre este tema e por que ele importa para você."],
    ["[Tema 3]", "Uma ou duas frases sobre este tema e por que ele importa para você."],
  ]) {
    const card = t.box("rounded-xl border border-border bg-card p-5", grid);
    t.heading(title, "h3", `${H3} mb-2`, card);
    t.para(`<p>${body}</p>`, "text-sm leading-6 text-muted-foreground", card);
  }

  const news = t.box(`${SECTION} border-t border-border`, undefined, "section", "Novidades");
  t.heading("Novidades", "h2", `${H2} mb-6`, news);
  const list = t.box("flex flex-col divide-y divide-border", news);
  for (const [date, body] of [
    ["out 2026", "Apresentei meu trabalho de mapas no [nome do simpósio]."],
    ["out 2026", "Comecei estágio em [instituição/laboratório]."],
  ]) {
    const row = t.box("grid gap-1 py-4 sm:grid-cols-[120px_1fr]", list);
    t.para(`<p>${date}</p>`, "text-sm font-medium text-primary", row);
    t.para(`<p>${body}</p>`, BODY, row);
  }
  return t.out;
}

function researchBlocks(): Block[] {
  const t = tree("p");
  const intro = t.box(SECTION, undefined, "section", "Introdução");
  t.heading("Pesquisa", "h1", `${H1} mb-4`, intro);
  t.para("<p>Um parágrafo geral sobre sua linha de pesquisa, orientador(a) e laboratório/grupo.</p>", BODY, intro);

  for (const [title, meta] of [
    ["[Título do projeto de mapas]", "Iniciação científica · [ano] – atual · Orientação: [nome]"],
    ["[Título de outro projeto]", "[Tipo de projeto] · [ano]"],
  ]) {
    const proj = t.box(`${SECTION} border-t border-border grid gap-8 sm:grid-cols-[1fr_1fr] sm:items-start`, undefined, "section", "Projeto");
    t.image(PHOTO, "Imagem do projeto", "aspect-[4/3] w-full rounded-xl", proj);
    const txt = t.box("flex flex-col gap-3", proj);
    t.heading(title, "h2", H2, txt);
    t.para(`<p>${meta}</p>`, "text-sm text-primary", txt);
    t.para(
      "<p>Objetivo, métodos e principais resultados, em linguagem acessível. Cite dados, área de estudo e ferramentas (por exemplo QGIS).</p>",
      BODY,
      txt,
    );
  }
  return t.out;
}

function publicationsBlocks(): Block[] {
  const t = tree("b");
  const sec = t.box(SECTION, undefined, "section", "Publicações");
  t.heading("Publicações e apresentações", "h1", `${H1} mb-8`, sec);
  for (const [group, items] of [
    [
      "Apresentações em eventos",
      ["[SOBRENOME, A. J.] [Título do trabalho]. In: [Nome do simpósio], Viçosa, 2026."],
    ],
    ["Resumos e artigos", ["[SOBRENOME, A. J.; COAUTOR, X.] [Título]. [Revista/anais], v. X, p. X–Y, [ano]. DOI: [doi]"]],
  ] as const) {
    t.heading(group, "h2", `${H3} mt-8 mb-3`, sec);
    const list = t.box("flex flex-col gap-3", sec, "ul");
    for (const item of items) {
      t.para(`<p>${item}</p>`, "border-l-2 border-primary/40 pl-4 text-base leading-7 text-foreground", list);
    }
  }
  return t.out;
}

function photographyBlocks(): Block[] {
  const t = tree("g");
  const sec = t.box(SECTION, undefined, "section", "Fotografia");
  t.heading("Fotografia", "h1", `${H1} mb-4`, sec);
  t.para("<p>Uma seleção de fotos. Clique em uma imagem no editor para trocar pela sua.</p>", `${BODY} mb-8`, sec);
  const grid = t.box("grid grid-cols-2 gap-3 sm:grid-cols-3", sec);
  for (const id of [
    "photo-1500530855697-b586d89ba3ee",
    "photo-1470071459604-3b5ec3a7fe05",
    "photo-1441974231531-c6227db76b6e",
    "photo-1501854140801-50d01698950b",
    "photo-1469474968028-56623f02e42e",
    "photo-1426604966848-d7adac402bff",
  ]) {
    t.image(`https://images.unsplash.com/${id}?w=800&q=70`, "Fotografia", "aspect-square w-full rounded-lg", grid);
  }
  return t.out;
}

function cvBlocks(): Block[] {
  const t = tree("c");
  const sec = t.box(SECTION, undefined, "section", "Currículo");
  t.heading("Currículo", "h1", `${H1} mb-4`, sec);
  t.para('<p>Versão completa no <a href="https://lattes.cnpq.br/">Currículo Lattes</a>.</p>', `${BODY} mb-6`, sec);
  for (const [title, rows] of [
    ["Formação", [["[ano] – atual", "Graduação em [Curso], Universidade Federal de Viçosa"]]],
    ["Experiência", [["out 2026 – atual", "Estágio em [instituição]"], ["[ano]", "Iniciação científica em [laboratório]"]]],
    ["Habilidades", [["Ferramentas", "[QGIS, R, fotografia, …]"], ["Idiomas", "Português (nativo), [inglês, espanhol…]"]]],
  ] as const) {
    t.heading(title, "h2", `${H3} mt-8 mb-3`, sec);
    const list = t.box("flex flex-col divide-y divide-border", sec);
    for (const [when, what] of rows) {
      const row = t.box("grid gap-1 py-3 sm:grid-cols-[160px_1fr]", list);
      t.para(`<p>${when}</p>`, "text-sm font-medium text-primary", row);
      t.para(`<p>${what}</p>`, "text-foreground", row);
    }
  }
  const contact = t.box(`${SECTION} border-t border-border`, undefined, "section", "Contato");
  t.heading("Contato", "h2", `${H2} mb-3`, contact);
  t.para("<p>E-mail: [seu-email]@ufv.br<br>Departamento de [departamento], UFV — Viçosa, MG</p>", BODY, contact);
  return t.out;
}

const seo = (title: string, description: string) => ({ title, ogTitle: title, description, ogDescription: description });

export const pages = [
  { key: "i", name: "Início", slug: "/", blocks: homeBlocks, seo: seo("Anna Júlia [Sobrenome]", "Pesquisa acadêmica e fotografia — UFV") },
  { key: "p", name: "Pesquisa", slug: "/pesquisa", blocks: researchBlocks, seo: seo("Pesquisa — Anna Júlia", "Projetos de pesquisa") },
  { key: "b", name: "Publicações", slug: "/publicacoes", blocks: publicationsBlocks, seo: seo("Publicações — Anna Júlia", "Publicações e apresentações") },
  { key: "g", name: "Fotografia", slug: "/fotografia", blocks: photographyBlocks, seo: seo("Fotografia — Anna Júlia", "Fotografias") },
  { key: "c", name: "Currículo", slug: "/cv", blocks: cvBlocks, seo: seo("Currículo — Anna Júlia", "Formação, experiência e contato") },
];
