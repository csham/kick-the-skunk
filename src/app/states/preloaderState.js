define(['constants/stateConstants'],
    function(StateConstants) {
        return function() {
            var self = this;

            self.preload = function() {
                self.game.stage.backgroundColor = "#e8edfb";

                var preloaderBar = self.game.add.sprite(self.game.width/2, self.game/2, 'preloaderBar');
                self.game.load.setPreloadSprite(preloaderBar);
            };

            self.create = function() {

            };

            self.update = function() {
                self.game.state.start(StateConstants.MAINMENU);
            }
        };
});
