const FONTS_API_KEY = 'AIzaSyChIENACvOODK1DcDg41prx1IxZ3EwpP0s';
const FONTS_API_BASEURL = 'https://www.googleapis.com/webfonts/v1/webfonts?key=';

const fonts = [
    {fontFamily: "Kumar One Outline", backupFont: "sans-serif", isDisplay: true , order: null, body: null}, 
    {fontFamily: "Unlock", backupFont: "sans-serif", isDisplay: true, order: null, body: null}, 
    {fontFamily: "Monoton", backupFont: "sans-serif", isDisplay: true, order: null, body: null},
    {fontFamily: "Hammersmith One", backupFont: "sans-serif", isDisplay: true, order: null, body: null},
    {fontFamily: "Shrikhand", backupFont: "sans-serif", isDisplay: true, order: null, body: null},
    {fontFamily: "Roboto", backupFont: "sans-serif", isDisplay: false, order: null, body: null},
    {fontFamily: "Montserrat", backupFont: "sans-serif", isDisplay: false, order: null, body: null},
    {fontFamily: "Slabo 27px", backupFont: "serif", isDisplay: false, order: null, body: null},
    {fontFamily: "Text Me One", backupFont: "sans-serif", isDisplay: false, order: null, body: null},
    {fontFamily: "Crimson Text", backupFont: "serif", isDisplay: false, order: null, body: null},
    {fontFamily: "Arvo", backupFont: "serif", isDisplay: false, order: null, body: null},
    ];

//let fontData = dataBuilder.createFontData(fonts);
//
//async function testRandomization() {
//  await console.log(fontData);
//  await fontData.randomize();
//  console.log(fontData);
//} 

function testFontLoader() {
  const WebFontConfig = {
    google: {
      families: ['Droid Sans']
    },
    timeout: 6000,
    loading: function() {
      console.log('fonts are loading');
    },
    active: function() {
      let el = document.createElement('h1');
      let root = document.querySelector('body');
      el.innerHTML = 'test';
      el.style.fontFamily = 'Droid Sans';
      root.appendChild(el);
    }
  }
  WebFont.load(WebFontConfig);
}

