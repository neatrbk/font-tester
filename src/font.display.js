const display = (function() {

    const DefaultFont = 'sans-serif';
    const parentContainerSelector = '.container';

    function buildFontElement(f) {
        const elType = (f.isDisplay) ? 'h1' : 'p';
        const fontSize = (f.isDisplay) ? '7.88vw' : '3vw';
        const classification = (f.isDisplay) ? 'title' : 'text';

        let el = document.createElement(elType);
        //DO we want to style with class with js?????????????????????????????????????????????????????????????
        el.style.fontFamily = f.fontFamily;
        el.style.fontSize = fontSize;
        el.classList.add(classification);
        el.innerHTML = (f.body) ? f.body : 'testing';

        return el;
    } 

    function displayStandard(fontPair) {
        if(!fontPair.text || !fontPair.display) {
            console.warn('Warning: the font pair only contains a single font. A default font will be used.');
        }

        const displayElement = (fontPair.display) ? buildFontElement(fontPair.display) : 
                                                    buildFontElement(new Font(DefaultFont, null, true, null, null));

        const textElement = (fontPair.text) ? buildFontElement(fontPair.text) : 
                                              buildFontElement(new Font(DefaultFont, null, false, null, null));
        
        const parentElement = document.querySelector(parentContainerSelector);
        console.log(parentElement);

       parentElement.appendChild(displayElement); 
       parentElement.appendChild(textElement);
    }


    function displayFonts(fontData) {
        //to Remove, parents shouldn't be hardcoded in html, gen in module
        const displayParent = document.querySelector('.display--fonts');
        const textParent = document.querySelector('.text--fonts');
        ////////////////////////////////////////////////////////////////

        const fontNames = fontData.map((f) => {
            return f.fontFamily;
        });
        const WebFontConfig = {
            google: {
                families: fontNames 
            },
            timeout: 6000,
            loading: function() {
                console.log('fonts are loading');
            },
            active: function() {
                fontData.forEach((f, i) => {
                   let parent = f.isDisplay ? displayParent : textParent; 
                   let el = buildFontElement(f, i);
                   parent.appendChild(el);
                }); 
            }
        }
        WebFont.load(WebFontConfig);
    }

    return {
        standard: displayStandard
    }

})();