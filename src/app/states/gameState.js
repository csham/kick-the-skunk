define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;

            var DEBUG_MODE = false;
            var WORLD_GRAVITY = 1200;
            var BOOT_MASS = 5;

            var _skunk = null;
            var _boot = null;
            var _mouseBody = null;
            var _mouseConstraint = null;

            var _mouseClick = function(pointer) {
                _boot.body.x = pointer.position.x;
                _boot.body.y = pointer.position.y + 82;
                _mouseConstraint = self.game.physics.p2.createRevoluteConstraint(_mouseBody, [0, 0], _boot, [16, -82]);
                _boot.body.static = false;
            };
            var _mouseRelease = function() {
                self.game.physics.p2.removeConstraint(_mouseConstraint);
                _boot.body.setZeroVelocity();
                _boot.body.setZeroRotation();
                _boot.body.static = true;
            };
            var _mouseMove = function(pointer) {
                _mouseBody.position[0] = self.game.physics.p2.pxmi(pointer.position.x);
                _mouseBody.position[1] = self.game.physics.p2.pxmi(pointer.position.y);
            };

            self.create = function() {
                var isDebugMode = DEBUG_MODE;
                var physicsEnabledObjects = [];
                self.game.input.onDown.add(_mouseClick, this);
                self.game.input.onUp.add(_mouseRelease, this);
                self.game.input.addMoveCallback(_mouseMove, this);

                self.game.physics.startSystem(Phaser.Physics.P2JS);
                self.game.physics.p2.restitution = 0.1;
                self.game.physics.p2.gravity.y = WORLD_GRAVITY;

                self.game.add.sprite(0, 0, 'background');
                self.game.add.sprite(0, 0, 'foreground');

                var rockCollisionGroup = self.game.physics.p2.createCollisionGroup();
                var rock = self.game.add.sprite(750, 611, 'rock');
                physicsEnabledObjects.push(rock);

                var bootCollisionGroup = self.game.physics.p2.createCollisionGroup();
                _boot = self.game.add.sprite(930, 210, 'boot');
                physicsEnabledObjects.push(_boot);


                var skunkBaseXPos = 666;
                var skunkBaseYPos = 210;
                var skunkCollisionGroup = self.game.physics.p2.createCollisionGroup();

                _skunk = self.game.add.group();

                var skunkTail = _skunk.create(skunkBaseXPos, skunkBaseYPos, 'skunk-tail');
                physicsEnabledObjects.push(skunkTail);

                var skunkBody = _skunk.create(skunkBaseXPos + 30, skunkBaseYPos + 77, 'skunk-body');
                physicsEnabledObjects.push(skunkBody);

                var skunkHead = _skunk.create(skunkBaseXPos + 27, skunkBaseYPos + 47, 'skunk-head');
                physicsEnabledObjects.push(skunkHead);

                self.game.physics.p2.updateBoundsCollisionGroup();
                self.game.physics.p2.enable(physicsEnabledObjects);
                self.game.physics.p2.setImpactEvents(true);

                _boot.body.debug = isDebugMode;
                _boot.body.clearShapes();
                _boot.body.loadPolygon('physicsData', 'boot');
                _boot.body.mass = BOOT_MASS;
                _boot.body.static = true;
                _boot.body.setCollisionGroup(bootCollisionGroup);
                _boot.body.collides(skunkCollisionGroup);

                rock.body.debug = isDebugMode;
                rock.body.clearShapes();
                rock.body.loadPolygon('physicsData', 'rock');
                rock.body.static = true;
                rock.body.setCollisionGroup(rockCollisionGroup);
                rock.body.collides(skunkCollisionGroup);

                _mouseBody = new p2.Body();
                self.game.physics.p2.world.addBody(_mouseBody);

                skunkTail.body.debug = isDebugMode;
                skunkTail.body.mass = 1;
                skunkTail.body.setCollisionGroup(skunkCollisionGroup);
                skunkTail.body.collides(bootCollisionGroup);
                skunkTail.body.collides(rockCollisionGroup);

                skunkBody.body.debug = isDebugMode;
                skunkBody.body.mass = 1;
                skunkBody.body.setCollisionGroup(skunkCollisionGroup);
                skunkBody.body.collides(bootCollisionGroup);
                skunkBody.body.collides(rockCollisionGroup);
                //skunkBody.body.static = true;

                skunkHead.body.debug = isDebugMode;
                skunkHead.body.mass = 1;
                skunkHead.body.setCollisionGroup(skunkCollisionGroup);
                skunkHead.body.collides(bootCollisionGroup);
                skunkHead.body.collides(rockCollisionGroup);

                // May need to add/replace with a spring for tail connection
                var skunkBodyTailRevoluteConstraint = self.game.physics.p2.createRevoluteConstraint(skunkBody, [-2, 60], skunkTail, [0, 100]);
                var skunkTailLowerRotationLimit = Phaser.Math.degToRad(-10);
                var skunkTailUpperRotationLimit = Phaser.Math.degToRad(10);
                skunkBodyTailRevoluteConstraint.setLimits(skunkTailLowerRotationLimit, skunkTailUpperRotationLimit);

                var skunkBodyHeadRevoluteConstraint = self.game.physics.p2.createRevoluteConstraint(skunkBody, [-2, -60], skunkHead, [0, 0]);
                var skunkHeadLowerRotationLimit = Phaser.Math.degToRad(-20);
                var skunkHeadUpperRotationLimit = Phaser.Math.degToRad(20);
                skunkBodyHeadRevoluteConstraint.setLimits(skunkHeadLowerRotationLimit, skunkHeadUpperRotationLimit);
            };

            self.update = function() {
            }
        };
});
