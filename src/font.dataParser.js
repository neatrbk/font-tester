let dataParser = (function() {
  'use strict';

  let googleFontsData = [];
  
  function Font(fontFamily, backupFont, isDisplay, order, body) {
      this.fontFamily = fontFamily;
      this.backupFont = backupFont;
      this.isDisplay = isDisplay;
      this.order = order;
      this.body = body;
  }

  function FontList(fontsAr, pairsAr) {
      this.fonts = fontsAr;
      this.pairs = pairsAr;
  }  

  FontList.prototype.buildFontData = function(googleFontData) {
    let fontData = [];
    googleFontData.forEach((f) => {
      let font = new Font(
          f.family,
          null,
          f.category == 'display' ? true : false,
          null,
          null
        );

      fontData.push(font);
    });
    this.fonts = fontData;
  }

  FontList.prototype.buildPairData = function() {
    let pairData = [];

    if(this.fonts.length < 1) {
      console.error('cannot build pair data without font data, use fontList.buildFontData to do so.');
    }
    
    this.fonts.forEach((f) => {
      const prop = f.isDisplay ? 'display' : 'text';

      if(f.order == null) {
        this.applyOrder();
      }

      if(pairData[f.order]) {
        let halfPair = pairData[f.order];
        halfPair[prop] = f;
      }
      else {
        pairData[f.order] = new Object;
        pairData[f.order][prop] = f;
      }
    });
   this.pairs = pairData; 
  }

  FontList.prototype.applyOrder = function() {
    let curDisplayOrder = 0;
    let curTextOrder = 0;
    this.fonts.forEach((f) => {
      if(f.isDisplay) {
        f.order = curDisplayOrder;
        curDisplayOrder ++;
      }
      else {
        f.order = curTextOrder;
        curTextOrder++;
      }
    });
  }

  FontList.prototype.randomize = function() {
    randomizeArray(this.fonts);
    this.applyOrder();
  }
  
  FontList.prototype.setFonts = function(fontsAr) {
    this.fonts = fontsAr; 
  }

  FontList.prototype.addFont = function(font) {
    this.fonts.push(font);
  }

  

  function randomizeArray(ar) {
    let newAr = ar.slice();
    for(let i = newAr.length - 1; i > 0; i --) {
      let j = Math.floor(Math.random() * (i + 1));
      newAr[i], newAr[j] = newAr[j], newAr[i];
    }
  }

  async function getGoogleFonts() {
     let fontData = {};
     try{
       fontData = await fetch(FONTS_API_BASEURL + FONTS_API_KEY);
       fontData = await fontData.json();
       fontData = fontData.items;
     }
     catch(e) {
       console.error(e);
     }
     return fontData;
  }
  
  function filterFontData(fontsAr) {
    let filteredFonts = googleFontsData.filter((f) => {
      return fontsAr.indexOf(f.family) !== -1;
    }); 

    return filteredFonts;
  }

  async function getData(fontNames) {
      googleFontsData = await getGoogleFonts();
      console.log(googleFontsData);
      let filteredFonts = filterFontData(fontNames);
      let fontData = new FontList();
      fontData.buildFontData(filteredFonts);
      fontData.buildPairData(fontData.fonts);

      console.log(fontData);
    
    }

    getData(['Roboto', 'Unlock','Monoton','Arvo', 'Bangers', 'Gruppo']);
})();
