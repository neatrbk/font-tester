let dataParser = (function() {

  let googleFontsData = [];
  let processedFontData = [];

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

  function randomizeArray(ar) {
    let newAr = ar.slice();
    for(let i = newAr.length - 1; i > 0; i --) {
      let j = Math.floor(Math.random() * (i + 1));
      newAr[i], newAr[j] = newAr[j], newAr[i];
    }
  }

  function processFontData(googleFontsData) {
    googleFontsData.forEach((f, i) => {
      processedFontData.push(
        {
          fontFamily: f.family,
          backupFont: null, 
          isDisplay: (f.category == 'display') ? true : false,
          order: i, 
          body: null
        }
      );
    })
    return processedFontData;
  }

  function pairFonts(processedFontData) {
    let pairData = [];

    processedFontData.forEach((f) => {
      const prop = f.isDisplay ? 'display' : 'text';

      if(pairData[f.order]) {
        let halfPair = pairData[f.order];
        halfPair[prop] = f;
      }
      else {
        pairData[f.order] = new Object;
        pairData[f.order][prop] = f;
      }
    });

    return pairData;
  }

  async function getData(fontNames) {
      let data = [];

      googleFontsData = await getGoogleFonts();
      googleFontsData = filterFontData(fontNames);
      data = processFontData(googleFontsData);
      data = pairFonts = pairFonts();
    
      return processedFonts;
    }

    console.log(getData(['Roboto', 'Unlock']));
})();

