define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;

            self.preload = function() {
                self.load.image('preloaderBg', '/build/assets/images/loading-bg.png');
                self.load.image('preloaderBar', '/build/assets/images/loading-bar.png');
            };

            self.create = function() {
                self.game.stage.scaleMode = Phaser.ScaleManager.NO_SCALE;
                self.game.state.start(StateConstants.PRELOADER);
            };
        };
});
