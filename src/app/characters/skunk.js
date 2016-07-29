define(['Phaser'],
function(Phaser) {
    return function(game, xPosition, yPosition) {
        var self = this;
        var _game = game;
        var _baseXPosition = xPosition;
        var _baseYPosition = yPosition;
        var _skunk = null;

        var _buildSkunk = function() {


            _skunk = _game.add.group();

            var skunkCollisionGroup = _game.physics.p2.createCollisionGroup();
            var skunkBody = _skunk.create(_baseXPosition + 30, _baseYPosition + 77, 'skunk-body');
            var skunkHead = _skunk.create(_baseXPosition + 27, _baseYPosition + 47, 'skunk-head');

            _game.physics.p2.updateBoundsCollisionGroup();

            _game.physics.p2.enable([skunkHead, skunkBody]);

            skunkBody.body.debug = true;
            skunkBody.body.mass = 1;
            skunkBody.body.setCollisionGroup(skunkCollisionGroup);
            skunkBody.body.static = true;

            skunkHead.body.debug = true;
            skunkHead.body.mass = 1;
            skunkHead.body.setCollisionGroup(skunkCollisionGroup);

            //Spring(world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB)
            var skunkBodyHeadSpring = _game.physics.p2.createSpring(skunkBody, skunkHead, 1, 150, 50,null,null,[30,0],null);

            //PrismaticConstraint(world, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce)
            var skunkBodyHeadConstraint = _game.physics.p2.createPrismaticConstraint(skunkBody, skunkHead, false,[-2,-220],[0,0],[0,1]);

            skunkBodyHeadConstraint.lowerLimitEnabled = true;
            skunkBodyHeadConstraint.upperLimitEnabled = true;
            skunkBodyHeadConstraint.upperLimit = -1;
            skunkBodyHeadConstraint.lowerLimit = -8;

            /*
            var skunkCollisionGroup = _game.physics.p2.createCollisionGroup();
            _game.physics.p2.updateBoundsCollisionGroup();
            var skunkBody = _skunk.create(_baseXPosition + 30, _baseYPosition + 77, 'skunk-body');
            _game.physics.p2.enable(skunkBody, true, true);
            //skunkBody.body.setRectangle(150,50);
            skunkBody.body.static = true;
            skunkBody.body.setCollisionGroup(skunkCollisionGroup);

            var skunkHead = _skunk.create(_baseXPosition + 27, _baseYPosition + 47, 'skunk-head');
            _game.physics.p2.enable(skunkHead, true, true);
            //skunkHead.body.setCircle(40);
            skunkHead.body.mass = 1;
            skunkHead.body.setCollisionGroup(skunkCollisionGroup);

            var skunkBodyHeadSpring = _game.physics.p2.createSpring(skunkBody, skunkHead, 1, 40, 1,null,null,[0,0],null);
            var skunkBodyHeadConstraint = _game.physics.p2.createPrismaticConstraint(skunkBody, skunkHead, false,[0,0],[0,0],[0,1]);
            skunkBodyHeadConstraint.lowerLimitEnabled = true;
            skunkBodyHeadConstraint.upperLimitEnabled = true;
            skunkBodyHeadConstraint.upperLimit = -0.1;
            skunkBodyHeadConstraint.lowerLimit = -10;
            */

            /*
            var skunkTail = _skunk.create(_baseXPosition, _baseYPosition, 'skunk-tail');
            var skunkLeftArm = _skunk.create(_baseXPosition + 73, _baseYPosition + 116, 'skunk-arm-left');
            var skunkLeftHand = _skunk.create(_baseXPosition + 89, _baseYPosition + 81, 'skunk-hand-left');
            var skunkRightArm = _skunk.create(_baseXPosition + 30, _baseYPosition + 115, 'skunk-arm-right');
            var skunkRightHand = _skunk.create(_baseXPosition + 17, _baseYPosition + 84, 'skunk-hand-right');
            var skunkLeftLeg = _skunk.create(_baseXPosition + 76, _baseYPosition + 175, 'skunk-leg-left');
            var skunkLeftFoot = _skunk.create(_baseXPosition + 77, _baseYPosition + 183, 'skunk-foot-left');
            var skunkRightLeg = _skunk.create(_baseXPosition + 48, _baseYPosition + 174, 'skunk-leg-right');
            var skunkRightFoot = _skunk.create(_baseXPosition + 28, _baseYPosition + 185, 'skunk-foot-right');

            var skunkBody = _skunk.create(_baseXPosition + 30, _baseYPosition + 77, 'skunk-body');
            var skunkHead = _skunk.create(_baseXPosition + 27, _baseYPosition + 47, 'skunk-head');

            //_skunk.enableBody = true;
            //_skunk.physicsBodyType = Phaser.Physics.P2JS;

            _game.physics.p2.enable([skunkBody, skunkHead]);
            _game.physics.p2.createSpring(skunkBody, skunkHead, 1, 40, 5);*/

        };

        _buildSkunk();
    };
});
