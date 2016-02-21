
/* board for word connections game */

$.fn.connectionsBoard = function() {
    var $this = $(this);

    var connectionsBoard =  {
        init : function(options) {
            var settings = $.extend({
                size: 16,
                per_team: 6
            }, options);
            $this.data("settings", settings);
            // generate base list of options, to be used when
            // creating random board
            var options = [];
            var neutral = settings.size - (settings.per_team * 2);
            options.length = settings.size;
            options.fill('team1', 0, settings.per_team);
            options.fill('team2', settings.per_team, settings.per_team * 2);
            options.fill('neutral', settings.size - neutral, settings.size);
            $this.data("options", options);
            return connectionsBoard;
        },
        draw_board : function() {
            // add card divs based on requested size
            var card = $('<div class="card"> </div>');
            for (var i = 0; i < $this.data("settings").size; i++) {
                card.clone().appendTo($this);
            }
            var random = $('<button id="randomize-board" class="btn">randomize</button>');
            random.on('click.connectionsBoard', function(event) {
                $this.trigger('connectionsBoard:randomize');
            });
            random.insertAfter($this);
            return connectionsBoard;
        },
        randomize : function() {
            console.log('randomizing');
            var randomized = [],
                options = $this.data("options").slice();  // work from a copy
            while (options.length > 0) {
                var index = Math.floor(Math.random() * options.length);
                randomized.push(options.splice(index, 1)[0]);
            }
            $this.find('.card').each(function(index, element) {
                $(element).removeClass('team1 team2 neutral').addClass(randomized[index]);
            });
            return connectionsBoard;
        }

    };

    // initialize and draw the board with initial random set
    connectionsBoard.init().draw_board().randomize();
    // when button is clicked, randomize again
    $this.on('connectionsBoard:randomize', function(event) { connectionsBoard.randomize() });

    return connectionsBoard;
};

$( document ).ready(function() {
    $('.word-connections.board').connectionsBoard();
});
