

address(fruits[0].list);

function address(data) {
	$(".AreaCenter ul").html('');
	$.each(data, function (i, v) {
		$(".AreaCenter ul").append('<li data-id=' + i + '>' + v.name + '</li>');
	});
	$('.AreaCenter ul li').on('click', {
		data: data
	}, Areas)
	$(".AreaCenter ul li").eq(0).trigger("click");
}

function Prompt() {
	var c = $(".AreaLeft .active").text() + '--' + $(".AreaCenter .active").text() + '--' + $(this).text();
	console.log(c);
}

function Areas(data) {
	$('.AreaCenter ul li').removeClass('active')
	$(this).addClass('active');
	var data = data.data.data
	$(".AreaCenter").css({
		"width": "30%"
	});
	$(".AreaRight").show();
	var id = $(this).attr('data-id');
	$(".AreaRight ul").html('');
	$.each(data[id].list2, function (index, item) {
		$(".AreaRight ul").append('<li data-cid=' + index + '>' + item + '</li>')
	})
	$(".AreaRight ul li").on('click', Prompt)
}

$(document).on("click", ".AreaLeft ul li", function () {
	$(".AreaLeft ul li").removeClass('active')
	$(this).addClass('active');
	for (let i = 0; i < fruits.length; i++) {
		if ($(this).index() == i) {
			address(fruits[i].list);
			$(".AreaCenter").css({
				"width": "30%"
			});
		}
	}
})

var ulListHTML = "";
for (var i = 0; i < fruits.length; i++) {
	if (i === 0) {
		ulListHTML += `<li class="active">${fruits[i].name}</li>`
	} else {
		ulListHTML += `<li>${fruits[i].name}</li>`
	}
}
$("#ulList").html(ulListHTML)