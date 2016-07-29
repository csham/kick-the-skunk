define(['Phaser'],
function(Phaser) {
    return function(game, xPosition, yPosition) {
        var self = this;
        var _game = game;
        var _baseXPosition = xPosition;
        var _baseYPosition = yPosition;
        var _bootStates = {
            "idle": "idle",
            "swinging": "swinging",
            "done": "done"
        };
        var _currentBootState = _bootStates.idle;
        var _bootTween = null;
        var _cursors = null;

        var _boot = _game.add.sprite(_baseXPosition, _baseYPosition, 'boot');
        _game.physics.p2.enable(_boot, true);
        //_boot.anchor.setTo(1, 1);

        _boot.body.clearShapes();
        _boot.body.loadPolygon('physicsData', 'boot');
        //_boot.body.mass = 150;
        //_boot.body.adjustCenterOfMass();
        //_boot.body.fixedRotation = true;
        _boot.body.damping = 0.5;

        var _onBootSwingComplete = function() {
            _currentBootState = _bootStates.idle;
        };

        _cursors = game.input.keyboard.createCursorKeys();

        self.update = function() {
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

/*
            switch (_currentBootState) {
                case _bootStates.idle:
                    if (_game.input.activePointer.isDown === true) {
                        _bootTween = _game.add.tween(_boot).to({angle: -90}, 1000, Phaser.Easing.Quadratic.In, true);
                        _currentBootState = _bootStates.swinging;
                    }
                    break;
                case _bootStates.swinging:
                    if (_game.input.activePointer.isUp === true) {
                        _bootTween.stop();
                        _currentBootState = _bootStates.done;
                    }
                    break;
                case _bootStates.done:
                    _bootTween = _game.add.tween(_boot).to({angle: 15}, 1000, Phaser.Easing.Bounce.Out, true);
                    _bootTween.onComplete.addOnce(_onBootSwingComplete, self);
                    break;
            }
*/
        };
    };
});
