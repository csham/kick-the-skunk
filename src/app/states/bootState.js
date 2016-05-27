define(['constants/stateConstants'],
    function(StateConstants) {
        return function() {
            var self = this;

            self.preload = function() {
                self.load.image('preloaderBg', '/assets/images/loading-bg.png');
                self.load.image('preloaderBar', '/assets/images/loading-bar.png');
            };

            self.create = function() {
                self.game.stage.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                self.game.state.start(StateConstants.PRELOADER);
            };
        };
});
