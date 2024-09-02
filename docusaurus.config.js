// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KapiMC",
  tagline:
    "A powerful, easy to use, and flexible plugin framework for Minecraft",
  favicon: "img/favicon.ico",

  url: "https://kapimc.github.io",
  baseUrl: "/docs/",
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: "KapiMC",
  projectName: "docs",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/kapicm/kapi/",
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   editUrl: "https://github.com/kapimc/kapi/",
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        // theme: {
        //   customCss: "./src/css/custom.css",
        // },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO: not sure where the card is visible
      // Replace with your project's social card
      image: "img/logo.svg",
      navbar: {
        title: "Kapi",
        logo: {
          alt: "Kapi Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            label: "Docs",
            sidebarId: "tutorialSidebar",
          },
          // { type: "docsVersionDropdown", position: "right", },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/kapimc/kapi",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Getting Started", to: "category/getting-started" },
              { label: "Features", to: "category/features" },
              { label: "Demos", to: "category/demos" },
            ],
          },
          {
            title: "Community",
            items: [
              { label: "Discord", href: "https://discord.gg/3vcQNZA8zC" },
              {
                label: "Discussions",
                href: "https://github.com/kapimc/kapi/discussions",
              },
            ],
          },
          {
            title: "More",
            items: [
              // { label: "Blog", to: "/blog", },
              { label: "GitHub", href: "https://github.com/kapimc/kapi" },
              { label: "Show your support", href: "https://patreon.com/Kyren223" },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Kyren223. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.vsLight,
        darkTheme: prismThemes.oceanicNext,
        additionalLanguages: ["groovy", "gradle", "java"],
      },
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
