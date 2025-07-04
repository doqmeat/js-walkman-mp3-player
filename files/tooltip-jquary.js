//style-my-tootltips by malihu (http://manos.malihu.gr)
//plugin home http://manos.malihu.gr/style-my-tooltips-jquery-plugin

!(function (a) {
	var b = {
		init: function (b) {
			function e(a) {
				var b = a.pageX,
					c = a.pageY;
				d.style_my_tooltips("position", {
					smtCursorCoordsX: b,
					smtCursorCoordsY: c,
				});
			}
			var c = {
					tip_follows_cursor: !1,
					tip_delay_time: 700,
					tip_fade_speed: 300,
					attribute: "title",
				},
				b = a.extend(c, b);
			0 === a("#s-m-t-tooltip").length &&
				a("body").append("<div id='s-m-t-tooltip'><div></div></div>");
			var d = a("#s-m-t-tooltip");
			return (
				d
					.css({ position: "absolute", display: "none" })
					.data("smt-z-index", d.css("z-index"))
					.children("div")
					.css({ width: "100%", height: "100%" }),
				a(document).on(
					"mouseout mousedown click",
					".smt-current-element",
					function () {
						var c = a(this);
						clearTimeout(smtTooltip_delay),
							d.style_my_tooltips("hide", { speed: c.data("smt-fade-speed") }),
							a(document).unbind("mousemove"),
							c.removeClass("smt-current-element"),
							"" === c.attr(b.attribute) &&
								c.attr(b.attribute, c.data("smt-title"));
					}
				),
				this.on("mouseover", function () {
					var f = a(this),
						g = f.attr(b.attribute);
					f
						.addClass("smt-current-element")
						.data({ "smt-title": g, "smt-fade-speed": b.tip_fade_speed })
						.attr(b.attribute, ""),
						d.style_my_tooltips("update", {
							title: g,
							speed: b.tip_fade_speed,
							delay: b.tip_delay_time,
							tip_follows_cursor: b.tip_follows_cursor,
						}),
						a(document).bind("mousemove", function (a) {
							e(a);
						});
				})
			);
		},
		update: function (b) {
			var c = a(this);
			c
				.stop()
				.css({ display: "none", "z-index": c.data("smt-z-index") })
				.children("div")
				.text(b.title),
				(smtTooltip_delay = setTimeout(function () {
					c.style_my_tooltips("show", {
						speed: b.speed,
						tip_follows_cursor: b.tip_follows_cursor,
					});
				}, b.delay));
		},
		show: function (b) {
			var c = a(this);
			c.stop().fadeTo(b.speed, 1),
				b.tip_follows_cursor || a(document).unbind("mousemove");
		},
		hide: function (b) {
			var c = a(this);
			c.stop().fadeTo(b.speed, 0, function () {
				c.css({ "z-index": "-1" });
			});
		},
		position: function (b) {
			var c = a(this),
				d = a(window).scrollLeft(),
				e = a(window).scrollTop(),
				f = c.outerWidth(!0),
				g = c.outerHeight(!0),
				h = b.smtCursorCoordsX + f - d,
				i = b.smtCursorCoordsY + g - e;
			if (h <= a(window).width() && h <= a(document).width())
				c.css("left", b.smtCursorCoordsX);
			else {
				var j = b.smtCursorCoordsX - f;
				j >= d ? c.css("left", j) : c.css("left", d);
			}
			if (i <= a(window).height() && i <= a(document).height())
				c.css("top", b.smtCursorCoordsY);
			else {
				var k = b.smtCursorCoordsY - g;
				k >= e ? c.css("top", k) : c.css("top", e);
			}
		},
	};
	a.fn.style_my_tooltips = function (c) {
		return b[c]
			? b[c].apply(this, Array.prototype.slice.call(arguments, 1))
			: "object" !== typeof c && c
			? void a.error("Method " + c + " does not exist")
			: b.init.apply(this, arguments);
	};
})(jQuery);
