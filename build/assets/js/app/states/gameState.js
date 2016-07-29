define(['constants/stateConstants',
        'Phaser'],
    function(StateConstants, Phaser) {
        return function() {
            var self = this;

            var DEBUG_MODE = false;
            var WORLD_GRAVITY = 1200;
            var BOOT_MASS = 10;

            var _skunk = null;
            var _boot = null;
            var _mouseBody = null;
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

            var _setupSkunkBodyPhysics = function(skunkBodyPart, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup, physicsDataElement) {
                skunkBodyPart.body.debug = DEBUG_MODE;
                skunkBodyPart.body.mass = 1;

                if (physicsDataElement) {
                    skunkBodyPart.body.clearShapes();
                    skunkBodyPart.body.loadPolygon('physicsData', physicsDataElement);
                }

                skunkBodyPart.body.setCollisionGroup(skunkCollisionGroup);
                skunkBodyPart.body.collides(bootCollisionGroup);
                skunkBodyPart.body.collides(rockCollisionGroup);
            };

            var _setupSkunkBodyRotationalConstraint = function(options) {
                var constraint = self.game.physics.p2.createRevoluteConstraint(options.bodyA, options.bodyAPivotPointOffset, options.bodyB, options.bodyBPivotPointOffset);
                var lowerRotationLimit = Phaser.Math.degToRad(options.minRotationDegrees);
                var upperRotationLimit = Phaser.Math.degToRad(options.maxRotationDegrees);
                constraint.setLimits(lowerRotationLimit, upperRotationLimit);
            };

            var _enableSkunkRigid = function() {
                for (var i=0; i < _skunk.children.length; i++) {
                    _skunk.children[i].body.static = true;
                }
            };

            var _disableSkunkRigid = function() {
                for (var i=0; i < _skunk.children.length; i++) {
                    _skunk.children[i].body.static = false;
                }
            };

            self.create = function() {
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


                var skunkBaseXPos = 740;
                var skunkBaseYPos = 416;
                var skunkCollisionGroup = self.game.physics.p2.createCollisionGroup();

                _skunk = self.game.add.group();
                _skunk.enableBody = true;
                _skunk.physicsBodyType = Phaser.Physics.P2JS;

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

                _boot.body.debug = DEBUG_MODE;
                _boot.body.clearShapes();
                _boot.body.loadPolygon('physicsData', 'boot');
                _boot.body.mass = BOOT_MASS;
                _boot.body.static = true;
                _boot.body.setCollisionGroup(bootCollisionGroup);
                _boot.body.collides(skunkCollisionGroup);

                rock.body.debug = DEBUG_MODE;
                rock.body.clearShapes();
                rock.body.loadPolygon('physicsData', 'rock');
                rock.body.static = true;
                rock.body.setCollisionGroup(rockCollisionGroup);
                rock.body.collides(skunkCollisionGroup);

                _mouseBody = new p2.Body();
                self.game.physics.p2.world.addBody(_mouseBody);

                _setupSkunkBodyPhysics(skunkTail, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup, 'skunkTail');
                _setupSkunkBodyPhysics(skunkLeftArm, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftHand, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightArm, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightHand, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftLeg, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkLeftFoot, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightLeg, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkRightFoot, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup);
                _setupSkunkBodyPhysics(skunkBody, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup, 'skunkBody');
                _setupSkunkBodyPhysics(skunkHead, skunkCollisionGroup, bootCollisionGroup, rockCollisionGroup, 'skunkHead');

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

                _enableSkunkRigid();

                _boot.body.onBeginContact.add(function(bodyA, bodyB, shapeA, shapeB, equation) {
                    if (bodyA && bodyA.sprite.key.substr(0, 5) === "skunk") {
                        _disableSkunkRigid();
                    }
                }, this);
            };

            self.update = function() {
            }
        };
});
