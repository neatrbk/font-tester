let fonts = new FontList();
fonts.initialize(['Unlock', 'Roboto', 'Charm', 'Roboto Condensed', 'Droid Sans'])
                    .then(() => {
                        display.standard(fonts.pairs[0]);
                    });


