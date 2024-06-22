function escapeHTML (str) {
  return str.replace(/[&<>'"]/g, (tag) => {
    const charsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return charsToReplace[tag] || tag;
  });
};

export default escapeHTML;