$(document).ready(function (){
    $('#result').hide();
    $('#btndeconnexion').hide();
	
    /*  */
	$.ajax({
		dataType:"json",
		url:"images.json"
	})
	.done(function (data){
		var carouselIndicators = 
		$('<ol />', { "class":"carousel-indicators" }).append(
			$('<li />', { 'data-target':"#carousel-example-generic", 'data-slide-to':"0", 'class':"active"}),
			$('<li />', { "data-target":"#carousel-example-generic", 'data-slide-to':"1"}),
			$('<li />', { "data-target":"#carousel-example-generic", 'data-slide-to':"2"})
		);

		var carouselInner = 		
			$('<div />', {'class':"carousel-inner", 'style':"max-width: 900px; margin: 0 auto"});
	
		var leftCarouselContrl =
			$('<a />', {'class':"left carousel-control",  'href':"#carousel-example-generic", 'data-slide':"prev"}).append(
				$('<span />', {'class':"glyphicon glyphicon-chevron-left"})
			);
	
		var rightCarouselContrl =
			$('<a />', {'class':"right carousel-control", 'href':"#carousel-example-generic", 'data-slide':"next"}).append(
				$('<span />', {'class':"glyphicon glyphicon-chevron-right"})
			);
	
		for (var i in data) {
			carouselInner.append(creeItem(data[i]));
		}
	
		$('#banniere-centrale').html(
			$('<div />', { 'id': "carousel-example-generic", 'class':"carousel slide", 'data-ride':"carousel" }).append(
				carouselIndicators,
				carouselInner,
				leftCarouselContrl,
				rightCarouselContrl
			)
		);

	});
					
    $('ul.nav').children('li').click(function() {
        $('ul.nav').children('li').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('id');
        switch (id) {
			case "home":
                $.ajax({
                    url: "index.html",
                })
                .done(function (data){
                    var d=data;
                    $("#banniere-centrale").fadeOut(function() {
                        $(this).html(d).fadeIn();
                    });
                })
                .error(function(obj){
                    $("#banniere-centrale").html("Erreur de chargement");
                });
                break;
            case "accueil":
                $.ajax({
                    url: "accueil.html",
                })
                .done(function (data){
                    var d=data;
                    $("#banniere-centrale").fadeOut(function() {
                        $(this).html(d).fadeIn();
                    });
                })
                .error(function(obj){
                    $("#banniere-centrale").html("Erreur de chargement");
                });
                break;
			case "equipes":
				$.ajax({
					url: "equipes.html",
				})
				.done(function (data){
					var d=data;
					$("#banniere-centrale").fadeOut(function() {
						$(this).html(d).fadeIn();
					});
				})
				.error(function(obj){
					$("#banniere-centrale").html("Erreur de chargement");
                });
				break;
			case "boutique":
				$.ajax({
					url: "boutique.html",
				})
				.done(function (data){
					var d=data;
					$("#banniere-centrale").fadeOut(function() {
						$(this).html(d).fadeIn();
					});
				})
				.error(function(obj){
					$("#banniere-centrale").html("Erreur de chargement");
                });
				break;

        }
    });

	function creeItem(obj) {
		var item=$('<div />', { 'class': 'item' }).append(
			$('<img />', { 'src': obj.imgSrc, 'alt': obj.imgAlt })
		);
		if (obj.carouselCaption!='') {
			item.append(
				$('<div />', { 'class': 'carousel-caption' }).html(
					obj.carouselCaption
				)
			)
		}
		if (obj.active) {
			item.addClass("active");
		}
		return item;
	}
	
	$("#enregistrement").submit (function() {
		$(this).prop("disabled", true);
        $(this).hide();
        $.ajax({
            type: $(this).attr("method"),
            url: "enregistrer.html"
        })
        .done(function (data){
			var d=data;
			$("#banniere-centrale").fadeOut(function() {
				$(this).html(d).fadeIn(function () {
					//$("#alert-success").hide();
					console.log($("#form-enregistrer"));
					$('#form-enregistrer').submit(function (){
						$(this).hide();
						$.ajax({
							type: $(this).attr("method"),
							url: $(this).attr("action"),
							data: $(this).serialize()
						})
						.done(function (data){
							console.log(data);
							if (data.result==true) {
								$("#result").html(data.message).fadeIn();
								//$("#alert alert-success").fadeIn();
								//$('#btndeconnexion').fadeIn();
							} else {
								$("#result").html(data.message).show();
								//$("#connection").fadeIn();
							}
						})
						.error(function(obj){
							console.log(obj);
						});
						return false;
					});
				});
			});
        })
        .error(function(obj){
            console.log(obj);
        });
        return false;
    });

    $("#connection").submit(function (){
		$(this).prop("disabled", true);
		$("#enregistrement").prop("disabled", true);
        $(this).hide();
		$("#enregistrement").hide();
        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: $(this).serialize()
        })
        .done(function (data){
            if (data.result==true) {
                $("#result").html(data.message).fadeIn(5);
                //$("#result").html(data.message).fadeOut();
                $('#btndeconnexion').fadeIn();
            } else {
                $("#result").html(data.message).fadeIn();
                $("#connection").fadeIn();
				$("#enregistrement").fadeIn();
            }
        })
        .error(function(obj){
            console.log(obj);
        });
        return false;
    });
});