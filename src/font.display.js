const display = (function() {

    const DefaultFont = 'sans-serif';

    function buildFontElement(font) {
        const elType = (font.isDisplay) ? 'h1' : 'p';
        const classification = (font.isDisplay) ? 'display--font' : 'text--font';

        let el = document.createElement(elType);
        el.style.fontFamily = font.fontFamily;
        el.classList.add(classification);
        el.innerHTML = (font.body) ? font.body : 'testing';

        return el;
    } 

    function displayStandard(fontPair, containerSelector) {
        if(!fontPair.text || !fontPair.display) {
            console.warn('Warning: the font pair only contains a single font. A default font will be used.');
        }

        const displayElement = (fontPair.display) ? buildFontElement(fontPair.display) : 
                                                    buildFontElement(new Font(DefaultFont, null, true, null, null));

        const textElement = (fontPair.text) ? buildFontElement(fontPair.text) : 
                                              buildFontElement(new Font(DefaultFont, null, false, null, null));
        
        const parentElement = document.querySelector(containerSelector);

        parentElement.appendChild(displayElement); 
        parentElement.appendChild(textElement);
    }

    function displayOffset(fontPair, containerSelector) {
        displayStandard(fontPair, containerSelector);
        document.querySelector('.text--font').style.paddingLeft = '2.7em';
    }

    async function displayStacked(fontList, containerSelector) {
        await loadFonts(fontList);
        const parentContainer = document.querySelector(containerSelector);
        let containerRows = 0;
        let containerCols = 2;
        parentContainer.style.display = 'grid';

        fontList.pairs.forEach((p) => {
            if(!p.text || !p.display) {
                console.warn('Warning: the font pair only contains a single font. A default font will be used.');
            }

            const displayElement = (p.display) ? buildFontElement(p.display) :
                                                 buildFontElement(new Font(DefaultFont, null, true, null, 'no body specified'));
        
            const textElement = (p.text) ? buildFontElement(p.text) :
                                           buildFontElement(new Font(DefaultFont, null, false, null, 'no body specified'));

            displayElement.style.padding = '0';
            parentContainer.appendChild(displayElement); 
            parentContainer.appendChild(textElement);

            containerRows ++;
        });

        parentContainer.style.gridTemplateColumns = `repeat(${containerCols}, 1fr)`;
        parentContainer.style.gridTemplateRows = `repeat(${containerRows}, 1fr)`;
        parentContainer.style.columnGap = '3em';
        parentContainer.style.rowGap = '3em';
    }

    async function loadFonts(fontData) {
        if(typeof fontData !== 'array') {
            fontData = fontData.fonts;
        }
        const fontNames = fontData.map((f) => {
            return f.fontFamily;
        });

        const WebFontConfig = {
            google: {
                families: fontNames
            },
            timeout: 6000,
            loading: function() {
                console.log('fonts are loading, however this console message should be replaced by a loader');
            },
            active: function () {
                console.log('fonts have been loaded');
            }
        }
        WebFont.load(WebFontConfig);
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
        standard: displayStandard,
        offset: displayOffset,
        stacked: displayStacked
    }

})();