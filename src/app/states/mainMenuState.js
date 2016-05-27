define(['constants/stateConstants'],
    function(StateConstants) {
        return function() {
            var self = this;

            self.create = function() {

            };

            self.update = function() {
                self.game.state.start(StateConstants.GAME);
            };
        };
});
