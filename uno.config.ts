import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetIcons({
      /* options */
      collections: {
        tabler: () =>
          import('@iconify-json/tabler/icons.json').then((i) => i.default),
      },
    }),
  ],
});
