
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
    $this.on('connectionsBoard:randomize', function(event) { connectionsBoard.randomize(); });
    $this.on('connectionsBoard:fullscreen', function(event) { connectionsBoard.toggle_fullscreen(); });
    $this.on('connectionsBoard:perspective', function(event) { connectionsBoard.toggle_perspective(); });

    // if user exits via esc or back button, remove fullscreen classes
    function escFullscreen(event) {
        if (document.fullscreen === false || document.webkitIsFullScreen === false ||
            document.mozFullScreen === false || document.msFullscreenElement === false ) {
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

// spreadsheet url for json data from google form for adding new rules
var newrules_url = 'https://spreadsheets.google.com/feeds/list/1g5hqNfD0pnd4Mxq9KTpdfQuPif6HHo2IclJOovBHx0s/1/public/full?alt=json';
var newrules_lastmodified;

function loadLiuORules() {
    // function to periodically reload custom rules from the google spreadsheet

    $.getJSON(newrules_url, function(data, status, jqxhr) {
        if (newrules_lastmodified == jqxhr.getResponseHeader('Last-Modified')) {
            // no rules have changed, nothing to do
            return;
        }
        // store the current last modified date
        newrules_lastmodified = jqxhr.getResponseHeader('Last-Modified');
        var entry = data.feed.entry;
        var rule_list = $('#new-liuo-rules');
        rule_list.find('li').remove();  // remove existing entries for referch
        $(entry).each(function(){
            rule_list.append('<li>' + this.gsx$enteryournewrule.$t + '</li>');
        });
    });

    // setTimeout(loadLiuORules, 5000); // time in ms (5 seconds) for testing
    setTimeout(loadLiuORules, 1000 * 60 * 5); // time in ms (5 minutes)
}

/* logic for nasaga game inventor card selection */
$.fn.gameInventor = function() {
    var element = this,
        $this = $(this),
        $cardview_img = $('.card-view img'),
        $share = $('.game-inventor-share'),
        /** NOTE: doesn't currently account for site base url config */
        base_path = '/images/nasaga/cards/',
        ext = '.png',
        sm = '_sm',
        cards = {
            'type': ['01_Cardgame', '02_ModernBoardGames', '03_Gameshow',
            '04_Party_Games', '05_Trivia', '06_Metaphors', '07_Simulations',
            '08_Icebreakers', '09_Socialchange', '10_ScavengerHunt',
            '11_Debriefing', '12_Jolt', '13_Mobilegames'
            ],
            'mechanism': ['14_AreaControl', '15_Deckbuilding', '16_WorkerPlacement',
            '17_RollandMove', '18_Dexterity', '19_Auction', '20_Role_Selection',
            '21_SetCollection', '22_Tileplacement', '23_Cooperation', '24_Puzzle',
            '25_PressYourLuck', '26_RealTimeStrategy'],
            'audience': ['27_ExecutiveDirector', '28_MadScientist', '29_BoardChair',
            '30_Authors', '31_Gardener', '32_Organizer', '33_InstructionalDesigner',
            '34_Professor', '35_Keynote', '36_Facilitator', '37_GameDesigner',
            '38_Entertainer', '39_Attendee'],
            'theme': ['40_Space', '41_TheKing', '42_Egyptians', '43_Dance',
            '44_Laughter', '45_Friendships', '46_Mummy', '47_Fountain', '48_Monkeys',
            '49_Diamonds', '50_FunnyFaces', '51_Awards', '52_Promises']
        },
        baraja = $('#game-inventor-cards').baraja(),
        baraja_opts = {  // based on linear spread from baraja.js demo
            direction: 'left',
            center: false,
            origin: {x: 0, y: 0},
            translation: 150,
            range: 20,
        },
        fanned = false,
        current = [],
        hash = window.location.hash.substr(1),
        query = window.location.search.substring(1);
        // tap to view or go full screen with single card?

    var gameInventor =  {
        init : function(options) {
            // build control panel buttons
            var controls = $('<div class="controls"> </div>');
            var regenerate = $('<button id="new" class="btn">regenerate <i class="fa fa-repeat"></i></button>');
            regenerate.on('click.gameInventor', function(event) {
                $this.trigger('gameInventor:pick-cards');
            });
            regenerate.appendTo(controls);
            var share = $('<button id="new" class="btn">share <i class="fa fa-share"></i></button>');
            share.on('click.gameInventor', function(event) {
                $this.trigger('gameInventor:share');
            });
            share.appendTo(controls);
            controls.insertAfter($this);

            // click logic: when selected, show card in full-screen mode
            $cardview_img.on('click', function(){ $(this).parent().hide(); });
            // share url close button
            $share.find('.close').on('click', function(){
                $(this).parent().parent().hide();
                // undo push state hash url
                history.back();
            });
            // share url copy to clipboard button
            $share.find('.copy').on('click', function() {
                clipboard.copy($share.find('input').attr('value'));
            });
            // NOTE: would be nice to support esc to exit cardview mode,
            // and also back button for android
            $this.find('picture').on('click', function() {
                var pic = $(this);
                $cardview_img.attr('src', pic.find('img').attr('src'));
                $cardview_img.parent().show();
                return false;
            });

            var modal = $('.modal');
            $(document).bind('keydown', function(e) {
                if (modal.is(":visible")) {
                    if (e.keyCode == 27) { // escape key
                        e.preventDefault();
                        modal.hide();
                        // undo push state hash url
                        history.back();
                        return false;
                    }
                }
            });
            window.onpopstate = function(event) {
                event.preventDefault();
                if (modal.is(":visible")) {
                    event.preventDefault();
                    modal.hide();
                    return false;
                }
            };

            if (hash == 'game-inventor') {
                // ensure section is opened
                $('#game-inventor-toggle').attr('checked', 'checked');
                // get values when loaded via shared url
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == 'id') {
                        current = pair[1].split(',');
                    }
                }
            }

            return gameInventor;
        },
        pick_cards: function() {
            var pic, card, idx, use_indexes = [];
            // if current is already set, load those cards
            if (current.length) {
                use_indexes = current.slice(0);  // clone current array
                current = [];
            }
            for (var mode in cards) {
                pic = $this.find('picture[class=' + mode + ']');
                // use requested index if set
                if (use_indexes.length) {
                    idx = use_indexes.shift();
                } else {
                // otherwise grab random card from list (logic via stackoverflow)
                    idx = Math.floor(Math.random()*cards[mode].length);
                }
                current.push(idx);
                card = cards[mode][idx];
                // set image source
                pic.find('img').attr('src', base_path + card + ext);
                pic.find('source').attr('srcset', base_path + card + sm + ext);
            }
            // only fan the cards once, otherwise it's disorienting
            if (! fanned) {
                baraja.fan(baraja_opts);
                fanned = true;
            }
            return gameInventor;
        }
    };

    // TODO: randomize/regenerate button, share button to generate link
    // share - maybe store indexes for each mode? then load them via
    // querystring or anchor text on page load  (maybe encode?)

    $this.on('gameInventor:pick-cards', function(event) {
        current = [];
        gameInventor.pick_cards();
    });

    $this.on('gameInventor:share', function(event) {
        // get current url without any hash or query string params
        // TODO use tiny url if configured
        var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
        url +=  '?id=' + current.join(',') + '#game-inventor';
        $share.find("input").attr('value', url);
        $share.show();
        $share.find("input").select();
        // push new state so we back button can be used to close modal
        window.history.pushState(null, null, '#share');
    });


    // initial random set
    gameInventor.init().pick_cards();
    return gameInventor;
};



$( document ).ready(function() {
    $('.word-connections').connectionsBoard();
    loadLiuORules();

    $('#game-inventor-cards').gameInventor();
});
