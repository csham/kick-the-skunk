define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;

            var _skunk = null;
            var _boot = null;
            var _bootIsSwinging = true;
            var _cursors = null;
            var _isDebugMode = false;

            var _setupSkunkBodyPhysics = function(skunkBodyPart, skunkCollisionGroup, bootCollisionGroup) {
                skunkBodyPart.body.debug = _isDebugMode;
                skunkBodyPart.body.mass = 1;
                skunkBodyPart.body.setCollisionGroup(skunkCollisionGroup);
                skunkBodyPart.body.collides(bootCollisionGroup);
            };

            var _setupSkunkBodyRotationalConstraint = function(options) {
                var constraint = self.game.physics.p2.createRevoluteConstraint(options.bodyA, options.bodyAPivotPointOffset, options.bodyB, options.bodyBPivotPointOffset);
                var lowerRotationLimit = Phaser.Math.degToRad(options.minRotationDegrees);
                var upperRotationLimit = Phaser.Math.degToRad(options.maxRotationDegrees);
                constraint.setLimits(lowerRotationLimit, upperRotationLimit);
            };

            self.create = function() {
                var physicsEnabledObjects = [];
                _cursors = self.game.input.keyboard.createCursorKeys();

                self.game.physics.startSystem(Phaser.Physics.P2JS);
                self.game.physics.p2.restitution = 0.1;
                self.game.physics.p2.gravity.y = 100;

                self.game.add.sprite(0, 0, 'background');
                self.game.add.sprite(0, 0, 'foreground');

                var bootCollisionGroup = self.game.physics.p2.createCollisionGroup();
                _boot = self.game.add.sprite(930, 210, 'boot');
                physicsEnabledObjects.push(_boot);


                var skunkBaseXPos = 666;
                var skunkBaseYPos = 210;
                var skunkCollisionGroup = self.game.physics.p2.createCollisionGroup();

                _skunk = self.game.add.group();

                var skunkTail = _skunk.create(skunkBaseXPos + 7, skunkBaseYPos - 40, 'skunk-tail');
                physicsEnabledObjects.push(skunkTail);

                var skunkLeftArm = _skunk.create(skunkBaseXPos + 20, skunkBaseYPos - 3, 'skunk-arm-left');
                physicsEnabledObjects.push(skunkLeftArm);

                var skunkLeftHand = _skunk.create(skunkBaseXPos + 36, skunkBaseYPos - 26, 'skunk-hand-left');
                physicsEnabledObjects.push(skunkLeftHand);

                var skunkRightArm = _skunk.create(skunkBaseXPos - 20, skunkBaseYPos - 3, 'skunk-arm-right');
                physicsEnabledObjects.push(skunkRightArm);

                var skunkRightHand = _skunk.create(skunkBaseXPos - 38, skunkBaseYPos - 26, 'skunk-hand-right');
                physicsEnabledObjects.push(skunkRightHand);

                var skunkLeftLeg = _skunk.create(skunkBaseXPos + 14, skunkBaseYPos + 54, 'skunk-leg-left');
                physicsEnabledObjects.push(skunkLeftLeg);

                var skunkLeftFoot = _skunk.create(skunkBaseXPos + 25, skunkBaseYPos + 64, 'skunk-foot-left');
                physicsEnabledObjects.push(skunkLeftFoot);

                var skunkRightLeg = _skunk.create(skunkBaseXPos - 14, skunkBaseYPos + 54, 'skunk-leg-right');
                physicsEnabledObjects.push(skunkRightLeg);

                var skunkRightFoot = _skunk.create(skunkBaseXPos - 25, skunkBaseYPos + 64, 'skunk-foot-right');
                physicsEnabledObjects.push(skunkRightFoot);

                var skunkBody = _skunk.create(skunkBaseXPos, skunkBaseYPos, 'skunk-body');
                physicsEnabledObjects.push(skunkBody);

                var skunkHead = _skunk.create(skunkBaseXPos - 2, skunkBaseYPos - 59, 'skunk-head');
                physicsEnabledObjects.push(skunkHead);

                self.game.physics.p2.updateBoundsCollisionGroup();
                self.game.physics.p2.enable(physicsEnabledObjects);
                self.game.physics.p2.setImpactEvents(true);

                _boot.body.debug = _isDebugMode;
                _boot.body.clearShapes();
                _boot.body.loadPolygon('physicsData', 'boot');
                _boot.body.mass = 1;
                _boot.body.setCollisionGroup(bootCollisionGroup);
                _boot.body.collides(skunkCollisionGroup);

                _setupSkunkBodyPhysics(skunkTail, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftArm, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftHand, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightArm, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightHand, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftLeg, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftFoot, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightLeg, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightFoot, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkBody, skunkCollisionGroup, bootCollisionGroup);
                _setupSkunkBodyPhysics(skunkHead, skunkCollisionGroup, bootCollisionGroup);

                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkLeftArm, bodyAPivotPointOffset: [14, -4], bodyBPivotPointOffset: [-11, 4], minRotationDegrees: -50, maxRotationDegrees: 90});
                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkRightArm, bodyAPivotPointOffset: [-14, -4], bodyBPivotPointOffset: [11, 4], minRotationDegrees: -90, maxRotationDegrees: 50});

                _setupSkunkBodyRotationalConstraint({bodyA: skunkLeftArm, bodyB: skunkLeftHand, bodyAPivotPointOffset: [9, -5], bodyBPivotPointOffset: [-5, 17], minRotationDegrees: -45, maxRotationDegrees: 90});
                _setupSkunkBodyRotationalConstraint({bodyA: skunkRightArm, bodyB: skunkRightHand, bodyAPivotPointOffset: [-9, -5], bodyBPivotPointOffset: [5, 17], minRotationDegrees: -90, maxRotationDegrees: 45});

                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkLeftLeg, bodyAPivotPointOffset: [15, 48], bodyBPivotPointOffset: [-1, -7], minRotationDegrees: -70, maxRotationDegrees: 70});
                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkRightLeg, bodyAPivotPointOffset: [-15, 48], bodyBPivotPointOffset: [1, -7], minRotationDegrees: -70, maxRotationDegrees: 70});

                _setupSkunkBodyRotationalConstraint({bodyA: skunkLeftLeg, bodyB: skunkLeftFoot, bodyAPivotPointOffset: [1, 6], bodyBPivotPointOffset: [-10, -3], minRotationDegrees: -45, maxRotationDegrees: 25});
                _setupSkunkBodyRotationalConstraint({bodyA: skunkRightLeg, bodyB: skunkRightFoot, bodyAPivotPointOffset: [-1, 6], bodyBPivotPointOffset: [10, -3], minRotationDegrees: -25, maxRotationDegrees: 45});

                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkHead, bodyAPivotPointOffset: [-2, -60], bodyBPivotPointOffset: [0, 0], minRotationDegrees: -20, maxRotationDegrees: 20});
                _setupSkunkBodyRotationalConstraint({bodyA: skunkBody, bodyB: skunkTail, bodyAPivotPointOffset: [5, 46], bodyBPivotPointOffset: [-3, 88], minRotationDegrees: -15, maxRotationDegrees: 15});

            };

            self.update = function() {
                _skunk.children[9].body.setZeroVelocity();
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
