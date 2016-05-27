define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;
            var ballMaterial = null;
            var cursorKeys = null;
            var boot = null;

            var kickBall = function(pointer) {
                var bodyClicked = self.game.physics.p2.hitTest(pointer.position);

                if (bodyClicked.length === 0) {
                    var ball = self.game.add.sprite(pointer.position.x, pointer.position.y, 'ball');
                    self.game.physics.p2.enable(ball);
                    ball.body.setMaterial(ballMaterial);
                    ball.body.setCircle(50);
                } else {
                    bodyClicked[0].parent.sprite.kill();
                }
            };

            var addConstraint = function(part1, part1JointPosition, part2, part2JointPosition) {
                var constraint = self.game.physics.p2.createRevoluteConstraint(part1, part1JointPosition, part2, part2JointPosition, 200);
                constraint.collideConnected = false;
            };

            var buildSkunk = function() {
                var skunk = {};
                skunk.tail = self.game.add.sprite(370, 150, 'skunk-tail');
                skunk.legLeft = self.game.add.sprite(446, 342, 'skunk-leg-left');
                skunk.legRight = self.game.add.sprite(416, 342, 'skunk-leg-right');
                skunk.footLeft = self.game.add.sprite(450, 352, 'skunk-foot-left');
                skunk.footRight = self.game.add.sprite(400, 352, 'skunk-foot-right');
                skunk.armLeft = self.game.add.sprite(446, 275, 'skunk-arm-left');
                skunk.armRight = self.game.add.sprite(400, 275, 'skunk-arm-right');
                skunk.handLeft = self.game.add.sprite(462, 240, 'skunk-hand-left');
                skunk.handRight = self.game.add.sprite(384, 240, 'skunk-hand-right');
                skunk.torso = self.game.add.sprite(400, 240, 'skunk-body');
                skunk.head = self.game.add.sprite(400, 200, 'skunk-head', 0);

                self.game.physics.p2.enable([skunk.tail, skunk.legLeft, skunk.legRight, skunk.footLeft, skunk.footRight, skunk.armLeft, skunk.armRight, skunk.handLeft, skunk.handRight, skunk.torso, skunk.head]);

                addConstraint(skunk.torso, [0, -40], skunk.head, [0, 0]);
                addConstraint(skunk.torso, [8, 51], skunk.legLeft, [0, 0]);
                addConstraint(skunk.torso, [-8, 51], skunk.legRight, [0, 0]);
            };

            self.preload = function() {

            };

            self.create = function() {
                self.game.physics.startSystem(Phaser.Physics.P2JS);
                self.game.physics.p2.gravity.y = 750;

                buildSkunk();
            };

            self.update = function() {

            }
        };
});
