let showLoader = () => {};
let hideLoader = () => {};

let requestCount = 0;

export const loaderService = {
  register(show: () => void, hide: () => void) {
    showLoader = show;
    hideLoader = hide;
  },

  show() {
    requestCount++;

    if (requestCount === 1) {
      showLoader();
    }
  },

  hide() {
    requestCount--;

    if (requestCount <= 0) {
      requestCount = 0;
      hideLoader();
    }
  },
};