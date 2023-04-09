
// 获取依赖的cdn
const getCdnJs = function (CURRENT_ENV) {
  let cdnJS = '';
  if (CURRENT_ENV.ENV.PACK_ENV === '"prod"') {
    cdnJS = `
      <script src=""></script>
    `;
  } else {
    cdnJS = `
      <script src=""></script>
    `;
  }

  return cdnJS;
}

module.exports = {
  getCdnJs: getCdnJs
}


