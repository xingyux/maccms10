/*!
 * Copyright http://v.shoutu.cn
 * Email 726662013@qq.com
 */

var playerhigh = "1"; 
//是否开启播放器高度自适应，0关闭1开启（开启后将播放器设置100%关闭填写固定高度）

var stui = {
	'browser': {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	'flickity': {
		'carousel': function() {		
			$('.flickity-item').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});
		}
	},	
	'images': {
		'lazyload': function() {
			$(".lazyload").lazyload({
				effect: "fadeIn",
				threshold: 200,
				failurelimit: 15,
				skip_invisible: false
			})
		}
	},
	'common': {
		'history': function() {
			if($("#stui_history").length){
				if($.cookie("recente")){
				    var json=eval("("+$.cookie("recente")+")");
				    var list="";
				    for(i=0;i<json.length;i++){
				        list = list + "<li><div class='img'><a class='stui-vodlist__thumb' href='"+json[i].vod_url+"' style='background-image: url("+json[i].vod_img+");'></a></div><div class='data'><h3><a href='"+json[i].vod_url+"'>"+json[i].vod_name+"</a></h3><p>播放至："+json[i].vod_part+"</p><p><a class='btn btn-primary' href='"+json[i].vod_url+"'>继续观看</a></p></div></li>";
				    }
				    $("#stui_history").append(list);
				}
				else
		            $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片哦</p>");
			   
			    $(".historyclean").on("click",function(){
			    	if(window.confirm('确定要清空记录吗？')){
		                $.cookie("recente",null,{expires:-1,path: '/'});
		           	}else{
		                return false;
		            }		    	
			    });
			}
		},
		'dropdown': function() {
			$(".open-dropdown").on('click',function(){
			  	$(".dropdown-menu").toggle();
		  	});
			$(".dropdown-menu li").on('click',function(){
			    $(".dropdown-menu li.active").removeClass('active');
			    $(this).addClass('active');
			    var index = $(this).index();
			    $(".active-tab").html($(".dropdown-menu li.active").html())
				$(".tab-content .tab-pane").eq(index).addClass('active').siblings().removeClass('active');
				$(".dropdown-menu").hide();
	  		});
		},
		'popup': function() {
			$popblock = $(".popup");
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible");
				$("body").append('<div class="mask"></div>').css("overflow","hidden");
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible");
					$(".mask").remove();
					$("body").removeClass("modal-open").css("overflow","");
				});
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible");
					$(this).remove();
					$("body").removeClass("modal-open").css("overflow","");
				})
			})
		},
		'slide': function() {
			$(".type-slide").each(function(a) {
				$index = $(this).find('.active').index()*1;
				if($index > 3){
					$index = $index-3;
				}else{
					$index = 0;
				}
				$(this).flickity({
					cellAlign: 'left',
					freeScroll: true,
					contain: true,
					prevNextButtons: false,				
					pageDots: false,
					initialIndex: $index
				});
			})
		},
		'mshare': function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
				$(".mobile-share").click(function() {
					$(".mobile-share").remove();
					$("body").removeClass("modal-open")
				})
			})
		},
		'collapse': function() {
			$(".detail").on("click", ".detail-more", function() {
				$detailContent = $(".detail-content");
				$detailSketch = $(".detail-sketch");
				"none" == $detailContent.css("display") ? ($(this).html('\u6536\u8d77 <i class="icon iconfont icon-less"></i>'), $detailContent.show(), $detailSketch.hide()) : ($(this).html('\u8be6\u60c5 <i class="icon iconfont icon-moreunfold"></i>'), $detailContent.hide(), $detailSketch.show())
			})
		},
		'scrolltop': function() {
			var a = $(window);
			$scrollTopLink = $("a.backtop");
			a.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none")
			});
			$scrollTopLink.on("click", function() {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
				return !1
			})
		}
	}	
};

if(window.console&&window.console.log){  
	console.log('\u9996\u6d82\u7f51\uff08v.shoutu.cn\uff09\u539f\u521b\u4f5c\u54c1');  
	console.log('\u4f5c\u8005\uff1a\u5c0f\u4e8c\u54e5\uff0cQQ\uff1a726662013');  
	console.log("%c\u539f\u521b\u4f5c\u54c1\u8bf7\u5c0a\u91cd\u4f5c\u8005\u52b3\u52a8\u6210\u679c\uff0c\u52ff\u5012\u5356\u5206\u4eab\uff0c\u8c22\u8c22\uff01","color:red");  
}

$(document).ready(function() {	
	stui.flickity.carousel();
	stui.images.lazyload();
	stui.common.history();
	stui.common.dropdown();
	stui.common.slide();
	stui.common.popup();
	stui.common.mshare();
	stui.common.collapse();
	stui.common.scrolltop();	
});