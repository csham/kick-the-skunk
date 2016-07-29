define(['constants/stateConstants'],
    function(StateConstants) {
        return function() {
            var self = this;

            self.create = function() {
                self.game.add.sprite(0, 0, 'background');
                self.game.add.sprite(0, 0, 'foreground');

                var startButton = self.game.add.group();

                var bar = self.game.add.graphics(0, 0);
                bar.beginFill(0x000000, 0.2);
                bar.drawRect(0, 0, 300, 100);
                startButton.add(bar);

                var style = {
                    font: "bold 32px Arial",
                    fill: "#fff",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                };

                var text = self.game.add.text(0, 0, "Click To Start!", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 0, 300, 100);
                startButton.add(text);

                startButton.x = 570;
                startButton.y = 200;
            };

            self.update = function() {
                if (self.game.input.activePointer.isDown === true) {
                    self.game.state.start(StateConstants.GAME);
                }
            };
        };
});
