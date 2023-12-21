import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetWind from "@unocss/preset-wind";

export default defineConfig({
  presets: [
    // ...UnoCSS options
    presetWind({}),
    presetIcons({
      // prefix: "i-",
      collections: {
        tabler: () => import("@iconify-json/tabler/icons.json"),
      },
    }),
  ],
  safelist: [
    "bg-white",
    "flex-row",
    "flex-col",
    "gap-1",
    "gap-2",
    "gap-3",
    "justify-normal",
    "justify-start",
    "justify-end",
    "justify-center",
    "justify-between",
    "justify-around",
    "justify-evenly",
    "justify-stretch",
    "items-start",
    "items-end",
    "items-center",
    "items-baseline",
    "items-stretch",
  ],
});
