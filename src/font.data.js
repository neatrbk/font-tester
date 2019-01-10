let Font = (function() {

 function Font(fontFamily, backupFont, isDisplay, order, body) {
      this.fontFamily = fontFamily;
      this.backupFont = backupFont;
      this.isDisplay = isDisplay;
      this.order = order;
      this.body = body;
  }

  Font.prototype.setBody = function(text) {
    this.body = text;
  };

  return Font;

})();