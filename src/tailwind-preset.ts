import type {Config} from "tailwindcss";

/**
 * @42dot/ui-kit Tailwind CSS Preset
 *
 * 이 preset을 사용하려면 tailwind.config.js에서 다음과 같이 설정하세요:
 *
 * ```js
 * import uiKitPreset from "@42dot/ui-kit/tailwind-preset";
 *
 * export default {
 *   presets: [uiKitPreset],
 *   // ... 나머지 설정
 * };
 * ```
 *
 * 또는 Tailwind CSS v4를 사용하는 경우:
 * CSS 파일에서 직접 import:
 * ```css
 * @import "@42dot/ui-kit/styles/tokens.css";
 * ```
 */
const preset: Config = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default preset;
