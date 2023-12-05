import { defineConfig } from 'unocss';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    // ...UnoCSS options
    presetIcons({
      /* options */
      collections: { tbl: () => import('@iconify-json/tabler/icons.json') },
    }),
  ],
});
