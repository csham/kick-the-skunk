requirejs.config({
    paths: {
        'Phaser': '/build/assets/lib/phaser.min'
    }
});

define(['Phaser',
        'states/bootState',
        'states/preloaderState',
        'states/mainMenuState',
        'states/gameState',
        'constants/stateConstants'],
    function (Phaser, BootStateConstructor, PreloaderStateConstructor, MainMenuStateConstructor, GameStateConstructor, StateConstants) {
        var game = new Phaser.Game(1440, 700, Phaser.AUTO, "gameBox");

        game.state.add(StateConstants.BOOT, new BootStateConstructor());
        game.state.add(StateConstants.PRELOADER, new PreloaderStateConstructor());
        game.state.add(StateConstants.MAINMENU, new MainMenuStateConstructor());
        game.state.add(StateConstants.GAME, new GameStateConstructor());

        game.state.start(StateConstants.BOOT);
});
