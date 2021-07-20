
window.onload = function () {

	let grid;
	let turn;
	let visual = $(".square");

	function random_int(min, max) {

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function innit() {

		grid = [];
		turn = random_int(0, 99) % 2;

		for (var i=0; i<visual.length; i++) {

			grid.push(0);
			visual[i].innerHTML = '&nbsp;';

			$(visual[i]).removeClass("disabled");
			$(visual[i]).click(function (a) {

				player_move(a.target);
			});
		}

		if (turn == 0) {

			$("#turno").val( "Paimon's turn" );
			paimon_move();
		}
		else {

			$("#turno").val( "Your turn" );
		}

		$("#wombat").hide();
	}

	function is_finished() {

		for (var i=0; i<grid.length; i++) {
		
			if ( grid[i] == 0 ) {

				return false;
			}
		}

		return true;
	}

	function get_grid_index(node) {

		for (var i=0; i<visual.length; i++) {
		
			if ( node == visual[i]) {
			
				return i;
			}
		}
	}

	function player_move(n) {

		if (turn == 0) {
		
			return;
		}

		let index = get_grid_index(n);

		if ( grid[index] != 0 ) {

			return;
		}

		grid[index] = 2;
		turn = 1-turn;
		visually_update(index, "⭕");


		if ( !chicken_winner() ) {
		
			paimon_move();
		}
	}

	function check_horizontal(index) {

		return grid[index] != 0 && grid[index] == grid[index+1] && grid[index+1] == grid[index+2];
	}

	function check_vertical(index) {

		return grid[index] != 0 && grid[index] == grid[index+3] && grid[index+3] == grid[index+6];
	}

	function finish_game(result){

		setTimeout(function () {

			$("#turno").text( ["Tie", "Paimon won", "You won"][result] );
			$("#wombat").show();

		}, 50);
	}

	function chicken_winner() {

		// Horizontal && Vertical
		for (var i=0; i<3; i++) {

			if ( check_horizontal(i * 3) ) {

				finish_game(grid[i * 3]);
				return true;
			}

			if ( check_vertical(i) ) {

				finish_game(grid[i]);
				return true;
			}
		}	

		// Diagonal
		if ( grid[0] != 0 && grid[0] == grid[4] && grid[4] == grid[8] ) {

			finish_game(grid[0]);
			return true;
		}
		if ( grid[2] != 0 && grid[2] == grid[4] && grid[4] == grid[6] ) {

			finish_game(grid[2]);
			return true;
		}
		
		// Default

		if ( is_finished() ) {

			finish_game(0);
			return true;
		}
		
		return false;
	}

	function visually_update(index, value) {

		let node = $( visual[index] );

		node.toggleClass("disabled");
		node.text(value);

		$("#turno").val( ["Paimon's", "Your"][turn] + " turn" );
	}

	function paimon_move() {

		let index;

		do {

			index = random_int(0, 8);
		}
		while ( grid[index] != 0 );

		grid[index] = 1;
		animate_paimon(index);

		setTimeout(function () {

			turn = 1-turn;
			visually_update(index, "❌");
			chicken_winner();

		}, 1100);
	}

	function animate_paimon(index) {

		let origin = $("#baimon")[0].getBoundingClientRect();
		let target = visual[index].getBoundingClientRect();

		perform_move(origin, target, 1);
	}

	function perform_move(origin, target, percent) {

		let node = $("#baimon");

		if ( percent > 0 ) 
		{
			node.css("top", (origin.top*percent) + target.top - 100);
			node.css("left", (origin.left*percent) + target.left -50);

			setTimeout(function () {
			
				perform_move(origin, target, percent-0.01);

			}, 10);
		}
		else {

			node.css("top", "");
			node.css("left", "");
		}
	}

	$("#wombat").click(function () {
		innit();
	});

	innit();
};