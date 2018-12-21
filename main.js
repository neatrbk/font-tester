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

