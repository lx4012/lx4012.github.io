const servant_count = 43;

var opt = [
	["Servants that I:", "Download as PNG", "Stats for Masochists"],
	"Don't have but REALLY WANT",
	"Already have and REALLY WANT TO NP+",
	"Don't have but they'll be welcome",
	"Already have and don't mind a copy",
	"Don't have and I REALLY don't want",
	"Already have and DON'T WANT MORE"
];

var opt_es = [
	["Servants que yo:", "Descargar como PNG", "Estadisticas para Masoquistas"],
	"No tengo PERO REALMENTE QUIERO",
	"Ya tengo Y QUIERO SUBIR SUS NP",
	"No tengo pero igual seran bienvenidos",
	"Ya tengo y no me molesta otra copia",
	"No tengo y realmente NO LOS QUIERO",
	"Ya tengo y NO QUIERO OTRO"
];

window.onload = function () {

	if ( location.search.toLowerCase() == "?lang=es" ) {
		
		opt = opt_es;
	}

	$("#wachadoing").text(opt[0][0]);
	$("#download").text(opt[0][1]);
	$("#didnt-read-the-VN").text(opt[0][2]);
	
	let container = $("#options");

	for (let i=1; i<opt.length; i++) {
		
		container.append('<div class="walker" for="whoami' + i + '"><input name="whoami" value="' + i + '" type="radio" id="whoami' + i + '" /> <label class="color' + i + '" for="whoami' + i + '">' + opt[i] + '</label></div>');
		
		if ( i % 2 == 0 ) {
			
			container.append('<br />');
		}
	}

	$("#statistics").hide();
	$("#whoami1").attr("checked", true);
	$("#site").text(location.href);
	$("#site").hide();

	container = $("#servants");

	for (let i=1; i<=servant_count; i++) {

		container.append( $('<div class="servant" onclick="I_want_to_lick_Consort_Yu_armpits(event, this)"><img src="static/assets/icons/' + i + '.png"></div>') );
	}
	
	console.log("YEET");
};

var colors = ['#01c569', '#ffd451', '#ea381e', '#02a8f9'];

function I_want_to_lick_Consort_Yu_armpits(event, node) {

	event.preventDefault();

	node = $(node);
	
	let classIndex = $("input[type='radio'][name='whoami']:checked").val();
	let currentClass = node.attr('class');
	let selectedClass = "color" + classIndex;

	if ( currentClass.search(selectedClass) == -1 && currentClass.search("ghost") != -1 ) {

		node.removeClass();
		node.addClass("servant ghost " + selectedClass);
	}
	else {

		node.toggleClass("ghost " + selectedClass);
	}
	
	there_is_no_tsukihime_remake();
}

function step_on_me_yu_senpai() {

	$("#wachadoing").toggle();
	$("#actions").toggle();
	$("#site").toggle();

	$(".walker label").each(function (a, b) {
		$(b).toggleClass("wacamole");
	});

	$(".walker input").each(function (a, b) {
		$(b).toggleClass("mononoke");
	});
}

function tamago_no_mae() {
	
	let selected = $(".ghost").length;
	
	if ( selected == servant_count || confirm("You've only selected " + selected + " of " + servant_count + " servants. Continue?")) {
		
		// https://www.reddit.com/r/FGOmemes/comments/g447m0

		step_on_me_yu_senpai();

		html2canvas(document.querySelector('#content')).then(function(canvas) {

			canvas.toBlob(function (blob) {

				saveAs(blob, 'GSSR-2021-picks.png');

				step_on_me_yu_senpai();
			});
		});
	}
}

function fus_ro_dah() {

	there_is_no_tsukihime_remake();
	$("#statistics").toggle();
}

function there_is_no_tsukihime_remake() {
	
	let stats = [1, 2, 3, 4, 5, 6].map( x => "<b>" + opt[x] + ":</b> " + ( ( ( $(".color" + x).length - 1 ) / servant_count ) * 100 ).toFixed(2) + "%" )
	$("#statistics").html(stats.join("<br />") + "<br /><br />");
}
