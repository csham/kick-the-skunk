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

            var buildSkunk = function(positionX, positionY) {
                var skunk = {};
                //skunk.tail = self.game.add.sprite(positionX - 30, positionY - 90, 'skunk-tail');
                //self.game.physics.p2.enableBody(skunk.tail);

                skunk.legLeft = self.game.add.sprite(positionX + 46, positionY + 102, 'skunk-leg-left');
                self.game.physics.p2.enableBody(skunk.legLeft);

                skunk.legRight = self.game.add.sprite(positionX + 16, positionY + 102, 'skunk-leg-right');
                self.game.physics.p2.enableBody(skunk.legRight);

                skunk.footLeft = self.game.add.sprite(positionX + 50, positionY + 112, 'skunk-foot-left');
                self.game.physics.p2.enableBody(skunk.footLeft);

                skunk.footRight = self.game.add.sprite(positionX, positionY + 112, 'skunk-foot-right');
                self.game.physics.p2.enableBody(skunk.footRight);

                skunk.armLeft = self.game.add.sprite(positionX + 46, positionY + 35, 'skunk-arm-left');
                self.game.physics.p2.enableBody(skunk.armLeft);

                skunk.armRight = self.game.add.sprite(positionX, positionY + 35, 'skunk-arm-right');
                self.game.physics.p2.enableBody(skunk.armRight);

                skunk.handLeft = self.game.add.sprite(positionX + 62, positionY, 'skunk-hand-left');
                self.game.physics.p2.enableBody(skunk.handLeft);

                skunk.handRight = self.game.add.sprite(positionX - 16, positionY, 'skunk-hand-right');
                self.game.physics.p2.enableBody(skunk.handRight);

                skunk.torso = self.game.add.sprite(positionX, positionY, 'skunk-body');
                self.game.physics.p2.enableBody(skunk.torso);

                skunk.head = self.game.add.sprite(positionX, positionY - 40, 'skunk-head', 0);
                self.game.physics.p2.enableBody(skunk.head);

                //skunk.tail.revolute = self.game.physics.p2.createLockConstraint(skunk.tail, skunk.torso, [0, -50]);

                skunk.head.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.head, [0, 0], skunk.torso, [-3, -60]);
                skunk.head.revolute.collideConnected = false;
                skunk.head.revolute.lowerLimitEnabled = true;
                skunk.head.revolute.upperLimitedEnabled = true;
                skunk.head.revolute.lowerLimit = -0.7;
                skunk.head.revolute.upperLimit = 0.7;

                skunk.armLeft.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.armLeft, [-9, 2], skunk.torso, [13, -4]);
                skunk.armLeft.revolute.collideConnected = false;
                skunk.armLeft.revolute.lowerLimitEnabled = true;
                skunk.armLeft.revolute.upperLimitedEnabled = true;
                skunk.armLeft.revolute.lowerLimit = -0.7;
                skunk.armLeft.revolute.upperLimit = 0.7;

                skunk.armRight.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.armRight, [9, 2], skunk.torso, [-13, -4]);
                skunk.armRight.revolute.collideConnected = false;
                skunk.armRight.revolute.lowerLimitEnabled = true;
                skunk.armRight.revolute.upperLimitedEnabled = true;
                skunk.armRight.revolute.lowerLimit = -0.7;
                skunk.armRight.revolute.upperLimit = 0.7;

                skunk.legLeft.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.legLeft, [0, -6], skunk.torso, [15, 48]);
                skunk.legLeft.revolute.collideConnected = false;
                skunk.legLeft.revolute.lowerLimitEnabled = true;
                skunk.legLeft.revolute.upperLimitedEnabled = true;
                skunk.legLeft.revolute.lowerLimit = -0.7;
                skunk.legLeft.revolute.upperLimit = 0.7;

                skunk.legRight.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.legRight, [0, -6], skunk.torso, [-15, 48]);
                skunk.legRight.revolute.collideConnected = false;
                skunk.legRight.revolute.lowerLimitEnabled = true;
                skunk.legRight.revolute.upperLimitedEnabled = true;
                skunk.legRight.revolute.lowerLimit = -0.7;
                skunk.legRight.revolute.upperLimit = 0.7;

                skunk.handLeft.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.handLeft, [-6, 15], skunk.armLeft, [9, -6]);
                skunk.handLeft.revolute.collideConnected = false;
                skunk.handLeft.revolute.lowerLimitEnabled = true;
                skunk.handLeft.revolute.upperLimitedEnabled = true;
                skunk.handLeft.revolute.lowerLimit = -0.7;
                skunk.handLeft.revolute.upperLimit = 0.7;

                skunk.handRight.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.handRight, [-6, 15], skunk.armRight, [-9, -6]);
                skunk.handRight.revolute.collideConnected = false;
                skunk.handRight.revolute.lowerLimitEnabled = true;
                skunk.handRight.revolute.upperLimitedEnabled = true;
                skunk.handRight.revolute.lowerLimit = -0.7;
                skunk.handRight.revolute.upperLimit = 0.7;

                skunk.footLeft.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.footLeft, [12, -3], skunk.legLeft, [1, -6]);
                skunk.footLeft.revolute.collideConnected = false;
                skunk.footLeft.revolute.lowerLimitEnabled = true;
                skunk.footLeft.revolute.upperLimitedEnabled = true;
                skunk.footLeft.revolute.lowerLimit = -0.7;
                skunk.footLeft.revolute.upperLimit = 0.7;

                skunk.footRight.revolute = self.game.physics.p2.createRevoluteConstraint(skunk.footRight, [12, -3], skunk.legRight, [-1, -6]);
                skunk.footRight.revolute.collideConnected = false;
                skunk.footRight.revolute.lowerLimitEnabled = true;
                skunk.footRight.revolute.upperLimitedEnabled = true;
                skunk.footRight.revolute.lowerLimit = -0.7;
                skunk.footRight.revolute.upperLimit = 0.7;

                skunk.torso.body.static = true;

                setTimeout(function() {
                    skunk.torso.body.static = false;
                }, 2000);
            };

            self.preload = function() {

            };

            self.create = function() {
                self.game.physics.startSystem(Phaser.Physics.P2JS);
                self.game.physics.p2.gravity.y = 750;

                var rock = self.game.add.sprite(300, 500, 'rock');
                self.game.physics.p2.enableBody(rock);
                rock.body.addPolygon({}, [[0, 156], [18, 57], [48, 49], [62, 15], [99, 0], [169, 13], [185, 72], [205.95, 75.7], [227.92, 155.26], [173, 181], [105, 181], [84, 159], [24, 169], [0, 156]]);
                rock.body.static = true;

                buildSkunk(410, 400);
            };

            self.update = function() {

            }
        };
});
