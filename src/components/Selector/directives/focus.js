export default {
  mounted(el) {
    const oSelectorInput = el.querySelector(".selector-input"),
      oSelectorMenu = el.querySelector(".selector-menu");
    const oInput = oSelectorInput.querySelector("input"),
      oPlaceholder = oSelectorInput.querySelector("label"),
      oIcon = oSelectorInput.querySelector("span");

    oInput.addEventListener(
      "focus",
      function () {
        oPlaceholder.style.display = "none";
        oIcon.className = "iconfont icon-search";
        oSelectorMenu.style.display = "block";
      },
      false
    );

    oInput.addEventListener(
      "blur",
      function () {
        oPlaceholder.style.display = "block";
        oIcon.className = "iconfont icon-arrow-down";
        oSelectorMenu.style.display = "none";
      },
      false
    );
  },
};
