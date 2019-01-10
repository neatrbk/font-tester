let FontList = (function() {
  'use strict';

  let googleFontsData = [];

  function FontList() {
      this.fonts = [];
      this.pairs = [];
  }
  
  FontList.prototype.addFont = function(fontFamily, backupFont, isDisplay, order, body) {
    if(!this.fonts) {
      this.fonts = [];
    }
    let newFont = new Font(fontFamily, backupFont, isDisplay, order, body);
    this.fonts.push(newFont);
  }  

  FontList.prototype.initialize = async function(fontNames) {
    googleFontsData = await getGoogleFonts();
    let filteredFonts = filterFontData(fontNames);
    this.buildFontData(filteredFonts);
    this.buildPairData(this.fonts);
    initializeFontBodys(this);
    
    return new Promise((resolve, reject) => {
      if(this.fonts.length > 0) {
        if(this.fonts.length !== fontNames.length) {
          console.warn('WARNING: All fonts were not resolved.');
        } 
        resolve();
      }
      else {
        console.error('No fonts were returned');
        reject();
      }
    });
  }

  FontList.prototype.buildFontData = function(googleFontData) {
    googleFontData.forEach((f) => {
      this.addFont(
          f.family,
          null,
          f.category == 'display' ? true : false,
          null,
          null
        );
    });
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

  //The following methods could be useful, but need reworking

  FontList.prototype.randomize = function() {
    randomizeArray(this.fonts);
    this.applyOrder();
  }
  
  FontList.prototype.setFonts = function(fontsAr) {
    this.fonts = fontsAr; 
  } 

  //Private -- General

  function randomizeArray(ar) {
    let newAr = ar.slice();
    for(let i = newAr.length - 1; i > 0; i --) {
      let j = Math.floor(Math.random() * (i + 1));
      newAr[i], newAr[j] = newAr[j], newAr[i];
    }
  }

  function initializeFontBodys(fontList) {
    if (typeof fontList !== 'array') {
      fontList = fontList.fonts;
    }

    fontList.forEach((f) => {
      if(f.isDisplay) {
        f.setBody("MASTERMIND");
      }
      else {
        f.setBody("Aparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.");
      }
    }); 
  }

  // Private -- Google Fonts specific
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
    let names = fontsAr.map((f) => {
      return f.toLowerCase();
    });

    let filteredFonts = googleFontsData.filter((f) => {
      return names.indexOf(f.family.toLowerCase()) !== -1;
    }); 
    return filteredFonts;
  }

  return FontList;
})();
