$(function () {
	var pageNum = 0;

	for (var i = 0; i < $('.runPage').length; i++) {
		$('.runPage').eq(i).css('z-index', 7 - 2 * i);
		$('.runPage').eq(i).children('div').css('z-index', 7 - 2 * i);
		$('.runPage').eq(i).children('img').css('z-index', 6 - 2 * i);
	};

	// $('.nextBtn').bind('click', function () {
	$(document).on("click", ".nextBtn", function () {
		if (pageNum <= 2) {
			runNext(pageNum);
			pageNum++;
		};
		console.log(pageNum);
	});

	function runNext(index) {
		$('.runPage').eq(index).addClass('runClass');
		zIndexNext(index, $('.runPage').eq(index));
	}

	function zIndexNext(index, element) {
		if (index >= 1) {
			element.css('z-index', 3 + 2 * index);
		};
		setTimeout(function () {
			if (index == 0) {
				element.css('z-index', 3 + 2 * index);
			};
			element.children('div').css('z-index', 2 + 2 * index);
			element.children('img').css('z-index', 3 + 2 * index);
		}, 1000);
	}

	// $('.lastBtn').bind('click', function () {
	$(document).on("click", ".lastBtn", function () {
		if (pageNum >= 1) {
			pageNum--;
			runLast(pageNum);
		};
		console.log(pageNum);
	});

	function runLast(index) {
		$('.runPage').eq(index).removeClass('runClass');
		zIndexLast(index, $('.runPage').eq(index));
	}

	function zIndexLast(index, element) {
		if (index == 0) {
			element.css('z-index', 7 - 2 * index);
		};
		setTimeout(function () {
			element.css('z-index', 7 - 2 * index);
			element.children('div').css('z-index', 7 - 2 * index);
			element.children('img').css('z-index', 6 - 2 * index);
		}, 1000);
	}
	var imgUrl = ["", "img/01.jpg", "img/02.jpg", "img/03.jpg", "img/04.jpg", "img/05.jpg", ""]
	var imgHTML = "";
	for (let i = 0; i < imgUrl.length; i++) {
		if (i === 0) {
			imgHTML += `<div class="bookPage frist">
			<img src="img/start.jpg" />
		</div>`
		} else if (i === imgUrl.length - 1) {
			imgHTML += `<div class="bookPage last">
			<img src="img/end.jpg" />
		</div>`
		} else {

		}
		imgHTML += `<div class="bookPage runPage">
				<img src="${imgUrl[i]}" />
			</div>`
	}
	$("#bookBox").html(
		`<a class="lastBtn">
				&lt;
			</a>
			<a class="nextBtn">
				&gt;
			</a>
			${imgHTML}`
	)
});