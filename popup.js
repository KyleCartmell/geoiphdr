document.addEventListener('DOMContentLoaded', function () {
  var backgroundPage = chrome.extension.getBackgroundPage(),
    switcher = document.querySelector("#switch"),
    header = document.querySelector("#header"),
    ipAddress = document.querySelector("#ip_address"),
    startInjecting = function () {
      backgroundPage.startInjecting(
        header.options[header.selectedIndex].value,
        ipAddress.options[ipAddress.selectedIndex].value);
    };
  if(backgroundPage.injecting) switcher.checked = true;
  header.selectedIndex = backgroundPage.headerIndex;
  ipAddress.selectedIndex = backgroundPage.ipAddressIndex;
  switcher.addEventListener("click", function (e) {
    if(switcher.checked) {
      startInjecting();
    } else {
      backgroundPage.stopInjecting();
    }
  });
  header.addEventListener("change", function (e) {
    backgroundPage.headerIndex = header.selectedIndex;
    if(switcher.checked) startInjecting();
  });
  ipAddress.addEventListener("change", function (e) {
    backgroundPage.ipAddressIndex = ipAddress.selectedIndex;
    if(switcher.checked) startInjecting();
  });
});
