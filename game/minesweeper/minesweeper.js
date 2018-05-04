/*
 ** MINESWEEPER class
 ** @auther         : yazan aabed.
 ** @return         : new game called MINESWEEPER.
 ** @description    : game class using object oriented in js.
 ** @date           : 1/7/2015 
 */
var MINESWEEPER = MINESWEEPER || {};

/*
 ** SITE URL for MINESWEEPER
 */
MINESWEEPER.SITE_URL = 'http://localhost/minesweeper/';

/*
 ** @auther         : yazan aabed
 ** @return         : new content for popup game
 ** @description    : return content for user to make popup for levels and type
 */
MINESWEEPER.baseURL = function(url) {
    return MINESWEEPER.SITE_URL + url;
}

/*
 ** MINESWEEPER LEVELS
 */
MINESWEEPER.INITLEVELS = [
    [11, 7, 10],
    [25, 7, 40],
    [37, 7, 99]
];

/*
 ** MINESWEEPER COLUMNS
 */
MINESWEEPER.column;

/*
 ** MINESWEEPER ROWS
 */
MINESWEEPER.row;

/*
 ** MINESWEEPER BOMBS
 */
MINESWEEPER.bomb;

/*
 ** MINESWEEPER X AXIS
 */
MINESWEEPER.X_axis = 0;

/*
 ** MINESWEEPER Y AXIS
 */
MINESWEEPER.Y_axis = 0;

/*
 ** MINESWEEPER 
 */
MINESWEEPER.n = 0;

/*
 ** MINESWEEPER 
 */
MINESWEEPER.x = [];

/*
 ** MINESWEEPER array to sum number of bomb around the open box
 */
MINESWEEPER.array_sum = [];


/*
 ** MINESWEEPER cacluated the visted nodes that have zero type
 ** zero type: the nodes that dont have bomb or calculated
 */
MINESWEEPER.visited = [];

/*
 ** MINESWEEPER.firstCLK is used to check that the first click not a bomb
 ** so using this boolean we can know if if its first click or not 
 ** if yes and the box have bomb re render the whole board using update_board method
 */
MINESWEEPER.firstCLK = false;

/*
 ** MINESWEEPER.level_var global parameter to know the level of this game
 ** in this minesweeper we have 3 levels 
 ** level1, level2, level3
 */
MINESWEEPER.level_var = false;

/*
 ** MINESWEEPER.level_tool_tip this param to set a default value for the level if the user dosent
 ** change any select value in the select value 
 ** $(finalChoice).val();
 */
MINESWEEPER.level_tool_tip = 1;

/*
 ** MINESWEEPER.levels this is an array to make the level hint for the amazing minesweeper
 ** if the level is 1 so its for beginer hint 
 ** level1 : 8 rounded box are open
 * * *
 * * *
 * * *
 ** level2 : 7 rounded box are open 
 *
 * * *
 * * *
 *
 ** level3 : 5 rounded box are open
 * *
 * *
 * 
 */
MINESWEEPER.levels = [
    [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ],
    [
        [-1, -1],
        [0, -1],
        [2, 1],
        [1, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [1, -1],
        [-1, 0],
        [-1, 1],
        [1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [-1, 1]
    ],
    [
        [-1, -1],
        [-2, -2],
        [-1, 1],
        [-2, 2],
        [1, -1],
        [2, -1],
        [1, 1],
        [2, 1]
    ],
    [
        [-1, 1],
        [-2, -2],
        [-1, 1],
        [-2, 2],
        [-1, 2],
        [0, -1],
        [1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],
    [
        [1, -1],
        [-1, -2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -1],
        [-1, 1],
        [2, 1]
    ],

    [
        [-5, 10],
        [5, -10]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 6],
        [4, -6],
        [-4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
    [
        [-4, 8],
        [4, -8],
        [4, -6],
        [-4, 6]
    ],
];

/*
 ** MINESWEEPER.rp is a row clicked to show the level hints in the close neighbors function
 */
MINESWEEPER.rp;

/*
 ** MINESWEEPER.cp is a column clicked to show the level hints in the close neighbors function
 */
MINESWEEPER.cp;

/*
 ** MINESWEEPER.stop is to make sure that the game is stop or not
 ** so if it has value of 0 so the game still playing if the value 1 so the player is lose
 ** default is 0
 */
MINESWEEPER.stop = 0;

/*
 **
 */

/*
 ** MINESWEEPER.initGame is the function to make the initial value for the game
 ** like build boarder this function called one time in the first
 */
MINESWEEPER.initGame = function(levelvar) {
    var self = MINESWEEPER;

    self.firstCLK = true;

    self.stop = 0;

    // stop watch blugin you can find it in the public path in js files
    // mainFolder/public/js/plugins/jquery-stopwatch
    $('.ui-time-play').stopwatch();


    var finalChoice = "#LevelChoice" + levelvar;


    var levelChoice = $(finalChoice).val();

    self.level_tool_tip = levelChoice;

    self.column = self.INITLEVELS[levelvar][1];
    self.row = self.INITLEVELS[levelvar][0];
    self.bomb = self.INITLEVELS[levelvar][2];

    $('.ui-number-bomb').text(self.bomb);

    var array = Array((self.column * self.row));
    var i = 0;
    var j = 0;

    for (i = 0; i < (self.column * self.row); i++) {
        array[i] = 0;
    }

    i = 0;

    var index = 0;

    while (i < self.bomb) {
        index = Math.floor((Math.random() * (self.column * self.row)));
        if (array[index] == 0) {
            array[index] = 1;
            i++;
        }
    }

    index = 0;

    self.x = new Array(self.row);
    self.array_sum = new Array(self.row);
    for (var i = 0; i < self.row; i++) {
        self.x[i] = new Array(self.column);
        self.array_sum[i] = new Array(self.column);
    }

    for (i = 0; i < self.row; i++) {
        for (j = 0; j < self.column; j++) {
            if (array[index] == 1) {

                self.x[i][j] = 1;
            } else {

                self.x[i][j] = 0;
            }
            index++;
        }
    }

    self.appendDiv();
};

/*
 ** MINESWEEPER.appendDiv is the function to start build the responsive table for the game and 
 ** calculate the sum of bomb and set bombs
 ** floorhtml string to make the table html using the html jquery method
 ** $('.floor').find('table').html(floorHtml);
 */
MINESWEEPER.appendDiv = function() {
    var self = MINESWEEPER;

    var sum = 0;
    var counter = 0;
    var level = self.levels[self.level_tool_tip - 1];
    var floorHtml = '';


    for (var i = 0; i < self.row; i++) {
        floorHtml += '<tr>';
        sum = 0;
        for (var j = 0; j < self.column; j++) {
            sum = 0;
            if (self.x[i][j] == 0) {
                for (var z = 0; z < level.length; z++) {
                    if (i + level[z][0] >= 0 && i + level[z][0] < self.row && j + level[z][1] >= 0 && j + level[z][1] < self.column)
                        if (self.x[i + level[z][0]][j + level[z][1]] == 1) {
                            sum++;
                        }
                }

                self.array_sum[i][j] = sum;
                if (sum == 1) {

                    floorHtml += " <td style='color:green' cnt=" + counter;
                    floorHtml += " class='opened close open ' row = " + i + " column= " + j + "  f ='0'>";
                    floorHtml += " <span class='showText'>" + self.array_sum[i][j] + "</span></td>";

                } else if (sum == 2) {

                    floorHtml += " <td style='color:red' cnt=" + counter;
                    floorHtml += " class='opened close open ' row = " + i + " column= " + j + "  f ='0'>";
                    floorHtml += " <span class='showText'>" + self.array_sum[i][j] + "</span></td>";

                } else {
                    floorHtml += " <td style='color:blue' cnt=" + counter;
                    floorHtml += " class='opened close open ' row = " + i + " column= " + j + "  f ='0'>";
                    floorHtml += " <span class='showText'>" + self.array_sum[i][j] + "</span></td>";
                }
            } else {
                self.array_sum[i][j] = -1;

                floorHtml += " <td cnt=" + counter;
                floorHtml += " class=' opened close bomb ' row = " + i + " column= " + j + "  f ='0'>";
                floorHtml += " <span class='showText'>" + self.array_sum[i][j] + "</span></td>";
            }
            counter = counter + 1;
        }
        floorHtml += '</tr>';
    }

    $('.floor').find('table').html(floorHtml);

    return;
};

/*
 ** MINESWEEPER.appendDiv is the function after click game type if beginer or expert etc
 ** this function start by default but after start the game its called from img for levels
 ** <img src="" onclick="insert_number(0);">
 */
MINESWEEPER.insert_number = function(levelvar) {
    var self = MINESWEEPER;


    self.level_var = levelvar;
    self.stop = 0;

    $('.ui-time-play').text('00:00:00');
    if ($('.ui-time-play').stopwatch()) {
        $('.ui-time-play').stopwatch('stop').stopwatch('reset');
    }

    $(".floor").find('table').empty();

    self.initGame(levelvar);
};

/*
 ** MINESWEEPER.updateBoard this function called if the box clicked for the first click have a bomb
 ** in the swiperight event function 
 **     if (firstCLK) {
 **          $('.ui-time-play').stopwatch('start');
 **          if ($(this).hasClass('bomb')) {
 **              updateBoard($(this), level_var);
 **          }
 **          firstCLK = false;
 **      }
 ** after the first click and no bomb this function never called
 */
MINESWEEPER.updateBoard = function(obj, levelvar) {
    var self = MINESWEEPER;

    var finalChoice = "#LevelChoice" + levelvar;

    var levelChoice = $(finalChoice).val();

    self.level_tool_tip = levelChoice;

    var sum = 0;
    var level = self.levels[levelChoice - 1];

    self.column = self.INITLEVELS[levelvar][1];
    self.row = self.INITLEVELS[levelvar][0];
    self.bomb = self.INITLEVELS[levelvar][2];

    var array = Array((self.column * self.row));
    var i = 0;
    var j = 0;

    $('.ui-number-bomb').text(self.bomb);

    for (i = 0; i < (self.column * self.row); i++) {
        array[i] = 0;
    }

    i = 0;

    var index = 0;

    while (i < self.bomb) {
        index = Math.floor((Math.random() * (self.column * self.row)));
        if ($(obj).attr('cnt') != index) {
            if (array[index] == 0) {
                array[index] = 1;
                i++;
            }
        }
    }

    self.x = new Array(self.row);
    self.array_sum = new Array(self.row);
    for (var i = 0; i < self.row; i++) {
        self.x[i] = new Array(self.column);
        self.array_sum[i] = new Array(self.column);
    }

    index = 0;
    for (i = 0; i < self.row; i++) {
        for (j = 0; j < self.column; j++) {
            if (array[index] == 1) {
                self.x[i][j] = 1;
            } else {
                self.x[i][j] = 0;
            }
            index++;
        }
    }

    var i = 0;
    var j = 0;
    var z = 0;

    for (i = 0; i < self.row; i++) {
        sum = 0;
        for (j = 0; j < self.column; j++) {
            sum = 0;
            if (self.x[i][j] == 0) {
                for (z = 0; z < level.length; z++) {
                    if (i + level[z][0] >= 0 && i + level[z][0] < self.row && j + level[z][1] >= 0 && j + level[z][1] < self.column)
                        if (self.x[i + level[z][0]][j + level[z][1]] == 1) {
                            sum++;
                        }
                }

                self.array_sum[i][j] = sum;

                if (sum == 1) {
                    $("[row='" + i + "'][column='" + j + "']").find('span').text(sum).css({
                        'color': 'green'
                    });
                    $("[row='" + i + "'][column='" + j + "']").removeClass();
                    $("[row='" + i + "'][column='" + j + "']").addClass("opened close open");
                } else if (sum == 2) {
                    $("[row='" + i + "'][column='" + j + "']").find('span').text(sum).css({
                        'color': 'red'
                    });
                    $("[row='" + i + "'][column='" + j + "']").removeClass();
                    $("[row='" + i + "'][column='" + j + "']").addClass("opened close open");
                } else {
                    $("[row='" + i + "'][column='" + j + "']").find('span').text(sum).css({
                        'color': 'blue'
                    });
                    $("[row='" + i + "'][column='" + j + "']").removeClass();
                    $("[row='" + i + "'][column='" + j + "']").addClass("opened close open");
                }
            } else {
                self.array_sum[i][j] = -1;
                $("[row='" + i + "'][column='" + j + "']").find('span').remove();
                $("[row='" + i + "'][column='" + j + "']").removeClass();
                $("[row='" + i + "'][column='" + j + "']").addClass("opened close bomb");
            }
        }
    }

    self.firstCLK = false;
};

/*
 **  MINESWEEPER.reveal for swiperight function as click function in normal pc not touch device
 **  if (number == 0) {
 **      reveal();
 **  }
 ** reveal when the box have zero not bomb or somthing else
 */
MINESWEEPER.reveal = function(j, i) {
    self = MINESWEEPER;

    var neighbors = [
        [],
        []
    ];

    self.n = 0;
    self.visited = new Array(self.row);
    for (var index1 = 0; index1 < self.row; index1++) {
        self.visited[index1] = new Array(self.column);
        for (var index2 = 0; index2 < self.column; index2++) {
            self.visited[index1][index2] = 0;
        }
    }

    var d = $("[row='" + i + "'][column='" + j + "']");
    $(d).removeClass("close");

    self.getNeighbors(i, j, neighbors);


    for (var nieghor = 0; nieghor < neighbors.length; nieghor++) {
        var i = neighbors[nieghor][0];
        var j = neighbors[nieghor][1];

        self.getNeighbors(i, j, neighbors);

        var d = $("[row='" + i + "'][column='" + j + "']");
        var isBomb = $(d).hasClass("bomb");
        var isFlag = $(d).hasClass("flag");

        if (!isBomb && !isFlag) {
            $(d).removeClass("close");
            $(d).removeClass("opened");
            self.getNeighbors(i, j, neighbors);
        }
    }
};

/*
 ** MINESWEEPER,getNeighbors is function to get the neighbors for every element
 ** so when we need to open a box in the grid we need to know what the 
 ** neighbors for it.
 */
MINESWEEPER.getNeighbors = function(i, j, neighbors) {
    var self = MINESWEEPER;
    var x;
    var y;
    var z;

    var level = self.levels[self.level_tool_tip - 1];


    for (z = 0; z < level.length; z++) {
        x = parseInt(i) + level[z][0];
        y = parseInt(j) + level[z][1];


        if (x < self.row && y < self.column && x >= 0 && y >= 0) {
            var isVisted = self.visited[x][y];
            var d = $("[row='" + (x) + "'][column='" + (y) + "']");
            f = $(d).attr('f');
            if ((self.array_sum[x][y] != 0 && f == 0 && !$(d).hasClass("bomb"))) {
                $(d).children(".showText").css("display", "block");
                $(d).removeClass("close");
                $(d).removeClass("opened");
                $(d).attr('f', '1');
            }

            if (self.array_sum[x][y] == 0 && isVisted == 0) {
                neighbors[self.n] = [];
                neighbors[self.n][0] = x;
                neighbors[self.n][1] = y;
                self.n = self.n + 1;
                self.visited[x][y] = 1;
            }

        }
    }
};

/*
 ** MINESWEEPER.open_neighbour function to open the box grid that reveal in it
 ** using get neighbors function the open it if its value equal to zero
 */
MINESWEEPER.open_neighbour = function(i, j) {
    var self = MINESWEEPER;

    var x;
    var y;
    var z;

    var level = self.levels[self.level_tool_tip - 1];

    var d = $("[row='" + i + "'][column='" + j + "']");
    if ($(d).hasClass("bomb")) {
        $(d).addClass("close2");
        $(d).removeClass("close");
    } else {
        $(d).removeClass("close");
    }

    for (z = 0; z < level.length; z++) {
        x = parseInt(i) + level[z][0];
        y = parseInt(j) + level[z][1];
        d = $("[row='" + x + "'][column='" + y + "']");

        if (x < self.row && y < self.column && x >= 0 && y >= 0) {

            if ($(d).hasClass("bomb")) {
                $(d).addClass("close2");
                $(d).removeClass("close");
            } else {
                $(d).removeClass("close");
            }
        }

    }
};

/*
 **  MINESWEEPER.close_neighbour this function to make open level tip life more easy
 **  by open all box around the tab holded box using the levels array
 */
MINESWEEPER.close_neighbour = function(i, j) {
    var self = MINESWEEPER;
    var x;
    var y;
    var z;


    var level = self.levels[self.level_tool_tip - 1];

    var d = $("[row='" + i + "'][column='" + j + "']");
    if ($(d).hasClass("opened") && !$(d).hasClass("bomb")) {
        $(d).addClass("close");
        $(d).addClass("opened");
    }

    if ($(d).hasClass("close2") && $(d).hasClass("bomb")) {

        $(d).removeClass("close2");
        if (!self.findExp())
            $(d).addClass("close");
    }

    for (z = 0; z < level.length; z++) {
        x = parseInt(i) + level[z][0];
        y = parseInt(j) + level[z][1];
        d = $("[row='" + x + "'][column='" + y + "']");

        if (x < self.row && y < self.column && x >= 0 && y >= 0) {

            if ($(d).hasClass("opened") && !$(d).hasClass("bomb")) {
                $(d).addClass("close");
                $(d).addClass("opened");
            }

            if ($(d).hasClass("close2")) {
                $(d).removeClass("close2");
                if (!self.findExp())
                    $(d).addClass("close");
            }
        }

    }
};


/*
 **  MINESWEEPER.findExp this function make sure that their is no bomb in this box
 **  if found return true.
 */
MINESWEEPER.findExp = function() {
    var self = MINESWEEPER;

    for (i = 0; i < self.row; i++) {
        for (j = 0; j < self.column; j++) {
            var d = $("[row='" + i + "'][column='" + j + "']");
            if ($(d).hasClass("explosion"))
                return true;
        }

    }

    return false;
};

/*
**  MINESWEEPER.tabhold cehck if this element is tab hold clicked in the mobile 
*/
MINESWEEPER.tabhold = false;

/*
 **  MINESWEEPER.INIT start the game :))
 */
MINESWEEPER.INIT = function() {

    console.log($(this))

    var self = MINESWEEPER;

    self.insert_number(0);
    
    var contentHeight = ($.mobile.getScreenHeight() - $(document).find('[data-role="header"]').height() - $(document).find('[data-role="footer"]').height());

    $(document).find('[data-role="main"]').height(contentHeight);

    $(window).on("orientationchange", function(event) {
        var contentHeight = ($.mobile.getScreenHeight() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
        $(this).find('[data-role="content"]').height(contentHeight);
    });

    $(document).on('swipeleft', 'td', function(e) {
        if (self.stop == 1) {
            return;
        }

        if ($(this).hasClass("flag")) {
            if ($(this).hasClass("close")) {
                $(this).toggleClass("flag");
            }
            return;
        } else {
            if ($(this).hasClass("close")) {
                $(this).toggleClass("flag");
            }
            return;
        }
    });

    $(document).on('swiperight', 'td', function(e) {
        if (self.stop == 1) {
            return;
        }

        if ($(this).hasClass("flag")) {
            return;
        }

        if (self.firstCLK) {
            $('.ui-time-play').stopwatch('start');
            if ($(this).hasClass('bomb')) {
                self.updateBoard($(this), self.level_var);
            }
            self.firstCLK = false;
        }

        if ($(this).hasClass("open")) {
            var number = $(this).find('span').html();
            var j = $(this).attr("column");
            var i = $(this).attr("row");

            if (number != 0) {
                if ($(this).hasClass("bomb") || $(this).hasClass("close") || $(this).hasClass("opened")) {
                    $(this).children(".showText").css("display", "block");
                    $(this).removeClass("close");
                }
            } else if (number == 0) {
                self.reveal(j, i);
                return;
            }
        } else if ($(this).hasClass("bomb")) //open all mines
        {
            self.stop = 1;
            $('.ui-time-play').stopwatch('stop');
            $(this).toggleClass("explosion");
            for (i = 0; i < self.row; i++) {
                for (j = 0; j < self.column; j++) {
                    if (self.array_sum[i][j] == -1) {
                        var d = $("[row='" + i + "'][column='" + j + "']");
                        $(d).removeClass("close");
                    }
                }
            }
        }

        $(this).removeClass("close");
        $(this).removeClass("opened");

    });

    $(document).on("taphold", "td", function() {
        if (self.stop == 1)
            return;

        self.tabhold = true;

        var ele = $(this);

        if (!ele.hasClass('close'))
            return;

        var c = $(this).attr("column");
        var r = $(this).attr("row");
        self.open_neighbour(r, c);
        self.rp = r;
        self.cp = c;
    });

    $(document).on("vmouseup", "td", function() {
        if (self.stop == 1)
            return;

        if (!self.tabhold)
            return;

        var c;
        var r;
        if (self.rp >= 0 && self.cp >= 0) {
            self.close_neighbour(self.rp, self.cp);
        } {
            c = self.Y_axis;
            r = self.X_axis;
            self.close_neighbour(r, c);
        }
    });

    $(document).on("vmouseup", "td", function() {
        if (self.stop == 1)
            return;

        if (!self.tabhold)
            return;

        var c;
        var r;
        if (self.rp >= 0 && self.cp >= 0) {
            self.close_neighbour(self.rp, self.cp);
        } {
            c = self.Y_axis;
            r = self.X_axis;
            self.close_neighbour(r, c);
        }
    });

    $(document).on("vmouseout", "td", function() {
        if (self.stop == 1)
            return;

        if (!self.tabhold)
            return;
        var c = self.Y_axis;
        var r = self.X_axis;
        self.close_neighbour(r, c);

        self.tabhold = false;
    });
};