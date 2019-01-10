let fonts = new FontList();
fonts.initialize(['staatliches', 'lobster', 'roboto', 'lato', 'ovo'])
                    .then(() => {
                        display.stacked(fonts, '.container');
                    });


