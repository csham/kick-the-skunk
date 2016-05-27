define(['constants/stateConstants'],
    function(StateConstants) {
        return function() {
            var self = this;

            self.preload = function() {
                self.game.stage.backgroundColor = "#e8edfb";

                var preloaderBar = self.game.add.sprite(self.game.width/2, self.game/2, 'preloaderBar');
                self.game.load.setPreloadSprite(preloaderBar);

                self.load.image('skunk-arm-left', '/assets/images/skunk/arm_left.png');
                self.load.image('skunk-arm-right', '/assets/images/skunk/arm_right.png');
                self.load.image('skunk-body', '/assets/images/skunk/body.png');
                self.load.image('skunk-foot-left', '/assets/images/skunk/foot_left.png');
                self.load.image('skunk-foot-right', '/assets/images/skunk/foot_right.png');
                self.load.image('skunk-hand-left', '/assets/images/skunk/hand_left.png');
                self.load.image('skunk-hand-right', '/assets/images/skunk/hand_right.png');
                self.load.image('skunk-leg-left', '/assets/images/skunk/leg_left.png');
                self.load.image('skunk-leg-right', '/assets/images/skunk/leg_right.png');
                self.load.image('skunk-tail', '/assets/images/skunk/tail.png');

                self.game.load.spritesheet('skunk-head', '/assets/images/skunk/head_sprite.png', 73, 47);
            };

            self.create = function() {

            };

            self.update = function() {
                self.game.state.start(StateConstants.MAINMENU);
            }
        };
});
