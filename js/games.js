
/* board for word connections game */
(function ( $ ) {

    var methods = {
        init : function(options) {
            var settings = $.extend({
                size: 16,
                per_team: 6
            }, options);
            this.data("settings", settings);
            // generate base list of options, to be used when
            // creating random board
            var options = [];
            var neutral = settings.size - (settings.per_team * 2);
            options.length = settings.size;
            options.fill('team1', 0, settings.per_team);
            options.fill('team2', settings.per_team, settings.per_team * 2);
            options.fill('neutral', settings.size - neutral, settings.size);
            this.data("options", options);
            // draw the board
            methods.draw_board.apply(this);
            // initial random setup
            methods.randomize.apply(this);
            this.on('connectionsBoard.randomize', function() { this.randomize() });
            return this;
        },
        draw_board : function() {
            // add card divs based on requested size
            var card = $('<div class="card"> </div>');
            for (var i = 0; i < this.data("settings").size; i++) {
                card.clone().appendTo(this);
            }
            var random = $('<button id="randomize-board" class="btn">randomize</button>');
            random.on('click.connectionsBoard', random.trigger('connectionsBoard.randomize'));
            random.insertAfter(this);
        },
        randomize : function() {
            var randomized = [],
                options = this.data("options");
            while (options.length > 0) {
                var index = Math.floor(Math.random() * options.length);
                randomized.push(options.splice(index, 1)[0]);
            }
            this.find('.card').each(function(index, element) {
                $(element).removeClass('team1 team2 neutral').addClass(randomized[index]);
            });
        }
    };

    $.fn.connectionsBoard = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.connectionsBoard' );
        }
    };


}( jQuery ));

$( document ).ready(function() {
    // randomize_board();

    $('.word-connections.board').connectionsBoard();
});
