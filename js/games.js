
// Find the right method, call on correct element
function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
// exit fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}


/* board for word connections game */
$.fn.connectionsBoard = function() {
    var element = this,
        $this = $(this),
        css = {
            fullscreen: 'fullscreen',
            perspective: 'perspective'
        };

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
            // add board and cards based on requested size
            var board = $('<div class="board"> </div>'),
                card = $('<div class="card"> </div>'),
                controls = $('<div class="controls"> </div>');
            for (var i = 0; i < $this.data("settings").size; i++) {
                card.clone().appendTo(board);
            }
            board.appendTo($this);
            // add buttons to a controls div
            // - randomize board
            var random = $('<button id="randomize-board" class="btn">randomize <i class="fa fa-random"></i></button>');
            random.on('click.connectionsBoard', function(event) {
                $this.trigger('connectionsBoard:randomize');
            });
            random.appendTo(controls);
            // - toggle full screen
            var fullscreen = $('<button id="fullscreen" class="btn">fullscreen <i class="fa fa-arrows-alt"></i></button>');
            fullscreen.appendTo(controls);
            fullscreen.on('click.connectionsBoard', function(event) {
                $this.trigger('connectionsBoard:fullscreen');
            });

            // - toggle perspective
            var perspective = $('<button id="perspective" class="btn">perspective <i class="fa fa-road"></i></button>');
            perspective.appendTo(controls);
            perspective.on('click.connectionsBoard', function(event) {
                $this.trigger('connectionsBoard:perspective');
            });

            controls.appendTo($this);
            return connectionsBoard;
        },
        randomize: function() {
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
        },
        toggle_fullscreen: function() {
            if ($this.hasClass(css.fullscreen)) {
                // in full screen mode, exit
                $this.removeClass(css.fullscreen);
                $this.find('#fullscreen').removeClass('on');
                exitFullscreen();
            } else {
                // enter full screen mode
                $this.addClass(css.fullscreen);
                $this.find('#fullscreen').addClass('on');
                launchFullscreen($this.get(0));
            }
        },
        toggle_perspective: function() {
            if ($this.hasClass(css.perspective)) {
                // turn off
                $this.removeClass(css.perspective);
                $this.find('#perspective').removeClass('on');
            } else {
                // turn on
                $this.addClass(css.perspective);
                $this.find('#perspective').addClass('on');
            }
        }

    };

    // initialize and draw the board with initial random set
    connectionsBoard.init().draw_board().randomize();
    // when button is clicked, randomize again
    $this.on('connectionsBoard:randomize', function(event) { connectionsBoard.randomize() });
    $this.on('connectionsBoard:fullscreen', function(event) { connectionsBoard.toggle_fullscreen() });
    $this.on('connectionsBoard:perspective', function(event) { connectionsBoard.toggle_perspective() });

    // if user exits via esc or back button, remove fullscreen classes
    function escFullscreen(event) {
        if (document.fullscreen == false || document.webkitIsFullScreen == false ||
            document.mozFullScreen == false || document.msFullscreenElement == false ) {
            $this.removeClass(css.fullscreen);
            $this.find('#fullscreen').removeClass('on');
        }
        // continue processing normally
        return true;
    }
    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', escFullscreen);
        document.addEventListener('mozfullscreenchange', escFullscreen);
        document.addEventListener('fullscreenchange', escFullscreen);
        document.addEventListener('MSFullscreenChange', escFullscreen);
    }

    return connectionsBoard;
};

$( document ).ready(function() {
    $('.word-connections').connectionsBoard();

    // spreadsheet url for json data from google form for adding new rules
    var url = 'https://spreadsheets.google.com/feeds/list/1g5hqNfD0pnd4Mxq9KTpdfQuPif6HHo2IclJOovBHx0s/1/public/full?alt=json';
    $.getJSON(url, function(data) {
        var entry = data.feed.entry;
        $(entry).each(function(){
            $('#new-luio-rules').append('<li>' + this.gsx$enteryournewrule.$t + '</li>');
        });
    });
});
