# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## VlogEdit composition

`src/Vlog/` is a first-pass stylized edit ("early-2000s internet diary meets
fashion campaign") built against placeholder footage. Preview it with
`npm run dev` and selecting the **VlogEdit** composition.

- `effects/` — Grain, Bloom, ChromaticAberration, FlashTransition, LightLeak
- `graphics/` — TitleCard, Sparkles, Scribble, Timestamp, LocationTag, OneWordOverlay, BrowserChrome
- `scenes/` — the individual beats (intro, b-roll, photo, dialogue, freeze-moment, outro)
- `VlogEdit.tsx` — stitches the scenes together with flash-pop cuts

**Swapping in real footage/photos:** drop files into `public/footage/` or
`public/photos/` (both gitignored — see `.gitignore`) and replace the
`<PlaceholderShot>` / `<PhotoMoment>` calls in the relevant scene with
`<OffthreadVideo src={staticFile("footage/your-clip.mp4")} />` or
`<Img src={staticFile("photos/your-photo.jpg")} />`.

**Known gaps in this first pass:** fonts are system font-stacks, not the
real Bebas Neue/Space Grotesk/Caveat (see `src/Vlog/fonts.ts` for how to
switch to `@remotion/google-fonts` or a self-hosted `.woff2`); there's no
music or SFX wired in yet (add files under `public/audio/` and drop
`<Audio>` tags where the flash-pop cuts / freeze moment are); grain/bloom/
chromatic-aberration are CSS/SVG approximations rather than real
color-graded footage.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
