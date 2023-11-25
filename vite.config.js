import { resolve } from "path";

export default {
  base: "/goit-js-hw-09/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        srcIndex: resolve(__dirname, "src/index.html"),
        colorSwitcher: resolve(__dirname, "src/01-color-switcher.html"),
        timer: resolve(__dirname, "src/02-timer.html"),
        promises: resolve(__dirname, "src/03-promises.html"),
      },
    },
  },
};
