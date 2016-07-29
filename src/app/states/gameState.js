define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;

            var _skunk = null;
            var _boot = null;
            var _bootIsSwinging = true;
            var _cursors = null;

            self.create = function() {
                var isDebugMode = true;
                _cursors = self.game.input.keyboard.createCursorKeys();

                self.game.physics.startSystem(Phaser.Physics.P2JS);
                self.game.physics.p2.restitution = 0.1;
                self.game.physics.p2.gravity.y = 100;

                self.game.add.sprite(0, 0, 'background');
                self.game.add.sprite(0, 0, 'foreground');

                var bootCollisionGroup = self.game.physics.p2.createCollisionGroup();
                _boot = self.game.add.sprite(930, 210, 'boot');


                var skunkBaseXPos = 666;
                var skunkBaseYPos = 210;
                var skunkCollisionGroup = self.game.physics.p2.createCollisionGroup();

                _skunk = self.game.add.group();

                //var skunkTail = _skunk.create(skunkBaseXPos, skunkBaseYPos, 'skunk-tail');
                var skunkBody = _skunk.create(skunkBaseXPos + 30, skunkBaseYPos + 77, 'skunk-body');
                var skunkHead = _skunk.create(skunkBaseXPos + 27, skunkBaseYPos + 47, 'skunk-head');

                self.game.physics.p2.updateBoundsCollisionGroup();
                self.game.physics.p2.enable([skunkHead, skunkBody, _boot]);
                self.game.physics.p2.setImpactEvents(true);

                _boot.body.debug = isDebugMode;
                _boot.body.clearShapes();
                _boot.body.loadPolygon('physicsData', 'boot');
                _boot.body.setCollisionGroup(bootCollisionGroup);
                _boot.body.collides(skunkCollisionGroup);

                //skunkTail.body.debug = isDebugMode;
                //skunkTail.body.mass = 1;
                //skunkTail.body.setCollisionGroup(skunkCollisionGroup);
                //skunkTail.body.collides(bootCollisionGroup);


                skunkBody.body.debug = isDebugMode;
                skunkBody.body.mass = 1;
                skunkBody.body.setCollisionGroup(skunkCollisionGroup);
                skunkBody.body.collides(bootCollisionGroup);
                //skunkBody.body.static = true;

                skunkHead.body.debug = isDebugMode;
                skunkHead.body.mass = 1;
                skunkHead.body.setCollisionGroup(skunkCollisionGroup);
                skunkHead.body.collides(bootCollisionGroup);

                //Spring(world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB)
                //var skunkBodyTailSpring = self.game.physics.p2.createSpring(skunkBody, skunkTail, 0, 10, 50);
                var skunkBodyHeadSpring = self.game.physics.p2.createSpring(skunkBody, skunkHead, 1, 150, 50);

                //PrismaticConstraint(world, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce)
                //var skunkBodyHeadConstraint = self.game.physics.p2.createPrismaticConstraint(skunkBody, skunkTail, false, [-2,-220], [0,0], [0,1]);
                var skunkBodyHeadConstraint = self.game.physics.p2.createPrismaticConstraint(skunkBody, skunkHead, false, [-2,-220], [0,0], [0,1]);

                //var skunkBodyTailConstraint = self.game.physics.p2.createDistanceConstraint(skunkBody, skunkTail, 0, [0, 0], [0, 0], 1)

                skunkBodyHeadConstraint.lowerLimitEnabled = true;
                skunkBodyHeadConstraint.lowerLimit = -8;
                //skunkBodyHeadConstraint.upperLimitEnabled = true;
                //skunkBodyHeadConstraint.upperLimit = -1;

            };

            self.update = function() {
                //_boot.update();
                //_skunk.update();

                _boot.body.setZeroVelocity();

                if (_cursors.left.isDown) {
                    _boot.body.moveLeft(400);
                } else if (_cursors.right.isDown) {
                    _boot.body.moveRight(400);
                }

                if (_cursors.up.isDown) {
                    _boot.body.moveUp(400);
                } else if (_cursors.down.isDown) {
                    _boot.body.moveDown(400);
                }
            }
        };
});
