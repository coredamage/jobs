/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
	$BODY = $('body'),
	$MENU_TOGGLE = $('#menu_toggle'),
	$SIDEBAR_MENU = $('#sidebar-menu'),
	$SIDEBAR_FOOTER = $('.sidebar-footer'),
	$LEFT_COL = $('.left_col'),
	$RIGHT_COL = $('.right_col'),
	$NAV_MENU = $('.nav_menu'),
	$FOOTER = $('footer');

// Sidebar
$(document).ready(function() {
	// TODO: This is some kind of easy fix, maybe we can improve this
	var setContentHeight = function() {
		// reset height
		$RIGHT_COL.css('min-height', $(window).height());

		var bodyHeight = $BODY.outerHeight(),
			footerHeight = $BODY.hasClass('footer_fixed')
				? -10
				: $FOOTER.height(),
			leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
			contentHeight = bodyHeight < leftColHeight
				? leftColHeight
				: bodyHeight;

		// normalize content
		contentHeight -= $NAV_MENU.height() + footerHeight;

		$RIGHT_COL.css('min-height', contentHeight);
	};

	$SIDEBAR_MENU.find('a').on('click', function(ev) {
		var $li = $(this).parent();

		if ($li.is('.active')) {
			$li.removeClass('active active-sm');
			$('ul:first', $li).slideUp(function() {
				setContentHeight();
			});
		} else {
			// prevent closing menu if we are on child menu
			if (!$li.parent().is('.child_menu')) {
				$SIDEBAR_MENU.find('li').removeClass('active active-sm');
				$SIDEBAR_MENU.find('li ul').slideUp();
			}

			$li.addClass('active');

			$('ul:first', $li).slideDown(function() {
				setContentHeight();
			});
		}
	});

	// toggle small or large menu
	$MENU_TOGGLE.on('click', function() {
		if ($BODY.hasClass('nav-md')) {
			$SIDEBAR_MENU.find('li.active ul').hide();
			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$SIDEBAR_MENU.find('li.active-sm ul').show();
			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		}

		$BODY.toggleClass('nav-md nav-sm');

		setContentHeight();

		    $('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
	});

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

	$SIDEBAR_MENU.find('a').filter(function() {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		setContentHeight();
	}).parent().addClass('active');

	// recompute content when resizing
	$(window).smartresize(function() {
		setContentHeight();
	});

	setContentHeight();

	// fixed sidebar
	if ($.fn.mCustomScrollbar) {
		$('.menu_fixed').mCustomScrollbar({
			autoHideScrollbar: true,
			theme: 'minimal',
			mouseWheel: {
				preventDefault: true
			}
		});
	}
});
// /Sidebar

// Panel toolbox
$(document).ready(function() {
	$('.collapse-link').on('click', function() {
		var $BOX_PANEL = $(this).closest('.x_panel'),
			$ICON = $(this).find('i'),
			$BOX_CONTENT = $BOX_PANEL.find('.x_content');

		// fix for some div with hardcoded fix class
		if ($BOX_PANEL.attr('style')) {
			$BOX_CONTENT.slideToggle(200, function() {
				$BOX_PANEL.removeAttr('style');
			});
		} else {
			$BOX_CONTENT.slideToggle(200);
			$BOX_PANEL.css('height', 'auto');
		}

		$ICON.toggleClass('fa-chevron-up fa-chevron-down');
	});

	$('.close-link').click(function() {
		var $BOX_PANEL = $(this).closest('.x-panel');

		$BOX_PANEL.remove();
	});
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip({container: 'body'});
});
// /Tooltip

// Progressbar
$(document).ready(function() {
	if ($(".progress .progress-bar")[0]) {
		$('.progress .progress-bar').progressbar();
	}
});
// /Progressbar

// Switchery
$(document).ready(function() {
	if ($(".js-switch")[0]) {
		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		elems.forEach(function(html) {
			var switchery = new Switchery(html, {color: '#26B99A'});
		});
	}
});
// /Switchery

// iCheck
$(document).ready(function() {
	if ($("input.flat")[0]) {
		$(document).ready(function() {
			$('input.flat').iCheck({checkboxClass: 'icheckbox_flat-green', radioClass: 'iradio_flat-green'});
		});
	}
});
// /iCheck

// Table
$('table input').on('ifChecked', function() {
	checkState = '';
	$(this).parent().parent().parent().addClass('selected');
	countChecked();
});
$('table input').on('ifUnchecked', function() {
	checkState = '';
	$(this).parent().parent().parent().removeClass('selected');
	countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function() {
	checkState = '';
	$(this).parent().parent().parent().addClass('selected');
	countChecked();
});
$('.bulk_action input').on('ifUnchecked', function() {
	checkState = '';
	$(this).parent().parent().parent().removeClass('selected');
	countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function() {
	checkState = 'all';
	countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function() {
	checkState = 'none';
	countChecked();
});

function countChecked() {
	if (checkState === 'all') {
		$(".bulk_action input[name='table_records']").iCheck('check');
	}
	if (checkState === 'none') {
		$(".bulk_action input[name='table_records']").iCheck('uncheck');
	}

	var checkCount = $(".bulk_action input[name='table_records']:checked").length;

	if (checkCount) {
		$('.column-title').hide();
		$('.bulk-actions').show();
		$('.action-cnt').html(checkCount + ' Records Selected');
	} else {
		$('.column-title').show();
		$('.bulk-actions').hide();
	}
}

// Accordion
$(document).ready(function() {
	$(".expand").on("click", function() {
		$(this).next().slideToggle(200);
		$expand = $(this).find(">:first-child");

		if ($expand.text() == "+") {
			$expand.text("-");
		} else {
			$expand.text("+");
		}
	});
});

// NProgress
if (typeof NProgress != 'undefined') {
	$(document).ready(function() {
		NProgress.start();
	});

	$(window).on('load', function() {
		NProgress.done();
	});
}

!function(t, e) {
	if ("function" == typeof define && define.amd)
		define([
			"moment", "jquery", "exports"
		], function(a, i, s) {
			t.daterangepicker = e(t, s, a, i)
		});
	else if ("undefined" != typeof exports) {
		var a,
			i = require("moment");
		try {
			a = require("jquery")
		} catch (s) {
			if (a = window.jQuery, !a)
				throw new Error("jQuery dependency not found")
		}
		e(t, exports, i, a)
	} else
		t.daterangepicker = e(t, {}, t.moment, t.jQuery || t.Zepto || t.ender || t.$)
}(this, function(t, e, a, i) {
	var s = function(t, e, a) {
		("object" != typeof e || null === e) && (e = {});
		var s = "";
		"string" == typeof e.calender_style && (s = e.calender_style),
		this.parentEl = "body",
		this.element = i(t),
		this.isShowing = !1;
		var n = '<div class="daterangepicker dropdown-menu ' + s + '"><div class="calendar first left"></div><div class="calendar second right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input"><label for="daterangepicker_start"></label><input class="input-mini" type="text" name="daterangepicker_start" value="" /></div><div class="daterangepicker_end_input"><label for="daterangepicker_end"></label><input class="input-mini" type="text" name="daterangepicker_end" value="" /></div><button class="applyBtn" disabled="disabled"></button>&nbsp;<button class="cancelBtn"></button></div></div></div>';
		this.parentEl = i("object" == typeof e && e.parentEl && i(e.parentEl).length
			? e.parentEl
			: this.parentEl),
		this.container = i(n).appendTo(this.parentEl),
		this.setOptions(e, a);
		var r = this.container;
		i.each(this.buttonClasses, function(t, e) {
			r.find("button").addClass(e)
		}),
		this.container.find(".daterangepicker_start_input label").html(this.locale.fromLabel),
		this.container.find(".daterangepicker_end_input label").html(this.locale.toLabel),
		this.applyClass.length && this.container.find(".applyBtn").addClass(this.applyClass),
		this.cancelClass.length && this.container.find(".cancelBtn").addClass(this.cancelClass),
		this.container.find(".applyBtn").html(this.locale.applyLabel),
		this.container.find(".cancelBtn").html(this.locale.cancelLabel),
		this.container.find(".calendar").on("click.daterangepicker", ".prev", i.proxy(this.clickPrev, this)).on("click.daterangepicker", ".next", i.proxy(this.clickNext, this)).on("click.daterangepicker", "td.available", i.proxy(this.clickDate, this)).on("mouseenter.daterangepicker", "td.available", i.proxy(this.hoverDate, this)).on("mouseleave.daterangepicker", "td.available", i.proxy(this.updateFormInputs, this)).on("change.daterangepicker", "select.yearselect", i.proxy(this.updateMonthYear, this)).on("change.daterangepicker", "select.monthselect", i.proxy(this.updateMonthYear, this)).on("change.daterangepicker", "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect", i.proxy(this.updateTime, this)),
		this.container.find(".ranges").on("click.daterangepicker", "button.applyBtn", i.proxy(this.clickApply, this)).on("click.daterangepicker", "button.cancelBtn", i.proxy(this.clickCancel, this)).on("click.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", i.proxy(this.showCalendars, this)).on("change.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", i.proxy(this.inputsChanged, this)).on("keydown.daterangepicker", ".daterangepicker_start_input,.daterangepicker_end_input", i.proxy(this.inputsKeydown, this)).on("click.daterangepicker", "li", i.proxy(this.clickRange, this)).on("mouseenter.daterangepicker", "li", i.proxy(this.enterRange, this)).on("mouseleave.daterangepicker", "li", i.proxy(this.updateFormInputs, this)),
		this.element.is("input")
			? this.element.on({
				"click.daterangepicker": i.proxy(this.show, this),
				"focus.daterangepicker": i.proxy(this.show, this),
				"keyup.daterangepicker": i.proxy(this.updateFromControl, this)
			})
			: this.element.on("click.daterangepicker", i.proxy(this.toggle, this))
	};
	s.prototype = {
		constructor: s,
		setOptions: function(t, e) {
			if (this.startDate = a().startOf("day"), this.endDate = a().endOf("day"), this.timeZone = a().zone(), this.minDate = !1, this.maxDate = !1, this.dateLimit = !1, this.showDropdowns = !1, this.showWeekNumbers = !1, this.timePicker = !1, this.timePickerSeconds = !1, this.timePickerIncrement = 30, this.timePicker12Hour = !0, this.singleDatePicker = !1, this.ranges = {}, this.opens = "right", this.element.hasClass("pull-right") && (this.opens = "left"), this.buttonClasses = [
				"btn", "btn-small btn-sm"
			], this.applyClass = "btn-success", this.cancelClass = "btn-default", this.format = "MM/DD/YYYY", this.separator = " - ", this.locale = {
				applyLabel: "Apply",
				cancelLabel: "Cancel",
				fromLabel: "From",
				toLabel: "To",
				weekLabel: "W",
				customRangeLabel: "Custom Range",
				daysOfWeek: a.weekdaysMin(),
				monthNames: a.monthsShort(),
				firstDay: a.localeData()._week.dow
			}, this.cb = function() {},
			"string" == typeof t.format && (this.format = t.format),
			"string" == typeof t.separator && (this.separator = t.separator),
			"string" == typeof t.startDate && (this.startDate = a(t.startDate, this.format)),
			"string" == typeof t.endDate && (this.endDate = a(t.endDate, this.format)),
			"string" == typeof t.minDate && (this.minDate = a(t.minDate, this.format)),
			"string" == typeof t.maxDate && (this.maxDate = a(t.maxDate, this.format)),
			"object" == typeof t.startDate && (this.startDate = a(t.startDate)),
			"object" == typeof t.endDate && (this.endDate = a(t.endDate)),
			"object" == typeof t.minDate && (this.minDate = a(t.minDate)),
			"object" == typeof t.maxDate && (this.maxDate = a(t.maxDate)),
			"string" == typeof t.applyClass && (this.applyClass = t.applyClass),
			"string" == typeof t.cancelClass && (this.cancelClass = t.cancelClass),
			"object" == typeof t.dateLimit && (this.dateLimit = t.dateLimit),
			"object" == typeof t.locale && ("object" == typeof t.locale.daysOfWeek && (this.locale.daysOfWeek = t.locale.daysOfWeek.slice()), "object" == typeof t.locale.monthNames && (this.locale.monthNames = t.locale.monthNames.slice()), "number" == typeof t.locale.firstDay && (this.locale.firstDay = t.locale.firstDay), "string" == typeof t.locale.applyLabel && (this.locale.applyLabel = t.locale.applyLabel), "string" == typeof t.locale.cancelLabel && (this.locale.cancelLabel = t.locale.cancelLabel), "string" == typeof t.locale.fromLabel && (this.locale.fromLabel = t.locale.fromLabel), "string" == typeof t.locale.toLabel && (this.locale.toLabel = t.locale.toLabel), "string" == typeof t.locale.weekLabel && (this.locale.weekLabel = t.locale.weekLabel), "string" == typeof t.locale.customRangeLabel && (this.locale.customRangeLabel = t.locale.customRangeLabel)),
			"string" == typeof t.opens && (this.opens = t.opens),
			"boolean" == typeof t.showWeekNumbers && (this.showWeekNumbers = t.showWeekNumbers),
			"string" == typeof t.buttonClasses && (this.buttonClasses = [t.buttonClasses]),
			"object" == typeof t.buttonClasses && (this.buttonClasses = t.buttonClasses),
			"boolean" == typeof t.showDropdowns && (this.showDropdowns = t.showDropdowns),
			"boolean" == typeof t.singleDatePicker && (this.singleDatePicker = t.singleDatePicker, this.singleDatePicker && (this.endDate = this.startDate.clone())),
			"boolean" == typeof t.timePicker && (this.timePicker = t.timePicker),
			"boolean" == typeof t.timePickerSeconds && (this.timePickerSeconds = t.timePickerSeconds),
			"number" == typeof t.timePickerIncrement && (this.timePickerIncrement = t.timePickerIncrement),
			"boolean" == typeof t.timePicker12Hour && (this.timePicker12Hour = t.timePicker12Hour),
			0 != this.locale.firstDay)
				for (var s = this.locale.firstDay; s > 0;)
					this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),
					s--;
		var n,
				r,
				o;
			if ("undefined" == typeof t.startDate && "undefined" == typeof t.endDate && i(this.element).is("input[type=text]")) {
				var h = i(this.element).val(),
					l = h.split(this.separator);
				n = r = null,
				2 == l.length
					? (n = a(l[0], this.format), r = a(l[1], this.format))
					: this.singleDatePicker && "" !== h && (n = a(h, this.format), r = a(h, this.format)),
				null !== n && null !== r && (this.startDate = n, this.endDate = r)
			}
			if ("string" == typeof t.timeZone || "number" == typeof t.timeZone
				? (this.timeZone = t.timeZone, this.startDate.zone(this.timeZone), this.endDate.zone(this.timeZone))
				: this.timeZone = a(this.startDate).zone(), "object" == typeof t.ranges) {
				for (o in t.ranges)
					n = "string" == typeof t.ranges[o][0]
						? a(t.ranges[o][0], this.format)
						: a(t.ranges[o][0]),
					r = "string" == typeof t.ranges[o][1]
						? a(t.ranges[o][1], this.format)
						: a(t.ranges[o][1]),
					this.minDate && n.isBefore(this.minDate) && (n = a(this.minDate)),
					this.maxDate && r.isAfter(this.maxDate) && (r = a(this.maxDate)),
					this.minDate && r.isBefore(this.minDate) || this.maxDate && n.isAfter(this.maxDate) || (this.ranges[o] = [n, r]);
				var c = "<ul>";
				for (o in this.ranges)
					c += "<li>" + o + "</li>";
				c += "<li>" + this.locale.customRangeLabel + "</li>",
				c += "</ul>",
				this.container.find(".ranges ul").remove(),
				this.container.find(".ranges").prepend(c)
			}
			if ("function" == typeof e && (this.cb = e), this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.endOf("day")), this.singleDatePicker
				? (this.opens = "right", this.container.addClass("single"), this.container.find(".calendar.right").show(), this.container.find(".calendar.left").hide(), this.timePicker
					? this.container.find(".ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input").hide()
					: this.container.find(".ranges").hide(), this.container.find(".calendar.right").hasClass("single") || this.container.find(".calendar.right").addClass("single"))
				: (this.container.removeClass("single"), this.container.find(".calendar.right").removeClass("single"), this.container.find(".ranges").show()), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.oldChosenLabel = this.chosenLabel, this.leftCalendar = {
				month: a([
					this.startDate.year(),
					this.startDate.month(),
					1,
					this.startDate.hour(),
					this.startDate.minute(),
					this.startDate.second()
				]),
				calendar: []
			}, this.rightCalendar = {
				month: a([
					this.endDate.year(),
					this.endDate.month(),
					1,
					this.endDate.hour(),
					this.endDate.minute(),
					this.endDate.second()
				]),
				calendar: []
			}, "right" == this.opens || "center" == this.opens) {
				var d = this.container.find(".calendar.first"),
					f = this.container.find(".calendar.second");
				f.hasClass("single") && (f.removeClass("single"), d.addClass("single")),
				d.removeClass("left").addClass("right"),
				f.removeClass("right").addClass("left"),
				this.singleDatePicker && (d.show(), f.hide())
			}
			"undefined" != typeof t.ranges || this.singleDatePicker || this.container.addClass("show-calendar"),
			this.container.addClass("opens" + this.opens),
			this.updateView(),
			this.updateCalendars()
		},
		setStartDate: function(t) {
			"string" == typeof t && (this.startDate = a(t, this.format).zone(this.timeZone)),
			"object" == typeof t && (this.startDate = a(t)),
			this.timePicker || (this.startDate = this.startDate.startOf("day")),
			this.oldStartDate = this.startDate.clone(),
			this.updateView(),
			this.updateCalendars(),
			this.updateInputText()
		},
		setEndDate: function(t) {
			"string" == typeof t && (this.endDate = a(t, this.format).zone(this.timeZone)),
			"object" == typeof t && (this.endDate = a(t)),
			this.timePicker || (this.endDate = this.endDate.endOf("day")),
			this.oldEndDate = this.endDate.clone(),
			this.updateView(),
			this.updateCalendars(),
			this.updateInputText()
		},
		updateView: function() {
			this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()),
			this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()),
			this.updateFormInputs()
		},
		updateFormInputs: function() {
			this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)),
			this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)),
			this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)
				? this.container.find("button.applyBtn").removeAttr("disabled")
				: this.container.find("button.applyBtn").attr("disabled", "disabled")
		},
		updateFromControl: function() {
			if (this.element.is("input") && this.element.val().length) {
				var t = this.element.val().split(this.separator),
					e = null,
					i = null;
				2 === t.length && (e = a(t[0], this.format).zone(this.timeZone), i = a(t[1], this.format).zone(this.timeZone)),
				(this.singleDatePicker || null === e || null === i) && (e = a(this.element.val(), this.format).zone(this.timeZone), i = e),
				i.isBefore(e) || (this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.startDate = e, this.endDate = i, this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.updateCalendars())
			}
		},
		notify: function() {
			this.updateView(),
			this.cb(this.startDate, this.endDate, this.chosenLabel)
		},
		move: function() {
			var t = {
					top: 0,
					left: 0
				},
				e = i(window).width();
			this.parentEl.is("body") || (t = {
				top: this.parentEl.offset().top - this.parentEl.scrollTop(),
				left: this.parentEl.offset().left - this.parentEl.scrollLeft()
			}, e = this.parentEl[0].clientWidth + this.parentEl.offset().left),
			"left" == this.opens
				? (this.container.css({
					top: this.element.offset().top + this.element.outerHeight() - t.top,
					right: e - this.element.offset().left - this.element.outerWidth(),
					left: "auto"
				}), this.container.offset().left < 0 && this.container.css({right: "auto", left: 9}))
				: "center" == this.opens
					? (this.container.css({
						top: this.element.offset().top + this.element.outerHeight() - t.top,
						left: this.element.offset().left - t.left + this.element.outerWidth() / 2 - this.container.outerWidth() / 2,
						right: "auto"
					}), this.container.offset().left < 0 && this.container.css({right: "auto", left: 9}))
					: (this.container.css({
						top: this.element.offset().top + this.element.outerHeight() - t.top,
						left: this.element.offset().left - t.left,
						right: "auto"
					}), this.container.offset().left + this.container.outerWidth() > i(window).width() && this.container.css({left: "auto", right: 0}))
		},
		toggle: function() {
			this.element.hasClass("active")
				? this.hide()
				: this.show()
		},
		show: function() {
			this.isShowing || (this.element.addClass("active"), this.container.show(), this.move(), this._outsideClickProxy = i.proxy(function(t) {
				this.outsideClick(t)
			}, this), i(document).on("mousedown.daterangepicker", this._outsideClickProxy).on("touchend.daterangepicker", this._outsideClickProxy).on("click.daterangepicker", "[data-toggle=dropdown]", this._outsideClickProxy).on("focusin.daterangepicker", this._outsideClickProxy), this.isShowing = !0, this.element.trigger("show.daterangepicker", this))
		},
		outsideClick: function(t) {
			var e = i(t.target);
			"focusin" == t.type || e.closest(this.element).length || e.closest(this.container).length || e.closest(".calendar-date").length || this.hide()
		},
		hide: function() {
			this.isShowing && (i(document).off(".daterangepicker"), this.element.removeClass("active"), this.container.hide(), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), this.oldStartDate = this.startDate.clone(), this.oldEndDate = this.endDate.clone(), this.isShowing = !1, this.element.trigger("hide.daterangepicker", this))
		},
		enterRange: function(t) {
			var e = t.target.innerHTML;
			if (e == this.locale.customRangeLabel)
				this.updateView();
			else {
				var a = this.ranges[e];
				this.container.find("input[name=daterangepicker_start]").val(a[0].format(this.format)),
				this.container.find("input[name=daterangepicker_end]").val(a[1].format(this.format))
			}
		},
		showCalendars: function() {
			this.container.addClass("show-calendar"),
			this.move(),
			this.element.trigger("showCalendar.daterangepicker", this)
		},
		hideCalendars: function() {
			this.container.removeClass("show-calendar"),
			this.element.trigger("hideCalendar.daterangepicker", this)
		},
		inputsChanged: function(t) {
			var e = i(t.target),
				s = a(e.val(), this.format);
			if (s.isValid()) {
				var n,
					r;
				"daterangepicker_start" === e.attr("name")
					? (n = s, r = this.endDate)
					: (n = this.startDate, r = s),
				this.setCustomDates(n, r)
			}
		},
		inputsKeydown: function(t) {
			13 === t.keyCode && (this.inputsChanged(t), this.notify())
		},
		updateInputText: function() {
			this.element.is("input") && !this.singleDatePicker
				? this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format))
				: this.element.is("input") && this.element.val(this.endDate.format(this.format))
		},
		clickRange: function(t) {
			var e = t.target.innerHTML;
			if (this.chosenLabel = e, e == this.locale.customRangeLabel)
				this.showCalendars();
			else {
				var a = this.ranges[e];
				this.startDate = a[0],
				this.endDate = a[1],
				this.timePicker || (this.startDate.startOf("day"), this.endDate.endOf("day")),
				this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()),
				this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()),
				this.updateCalendars(),
				this.updateInputText(),
				this.hideCalendars(),
				this.hide(),
				this.element.trigger("apply.daterangepicker", this)
			}
		},
		clickPrev: function(t) {
			var e = i(t.target).parents(".calendar");
			e.hasClass("left")
				? this.leftCalendar.month.subtract(1, "month")
				: this.rightCalendar.month.subtract(1, "month"),
			this.updateCalendars()
		},
		clickNext: function(t) {
			var e = i(t.target).parents(".calendar");
			e.hasClass("left")
				? this.leftCalendar.month.add(1, "month")
				: this.rightCalendar.month.add(1, "month"),
			this.updateCalendars()
		},
		hoverDate: function(t) {
			var e = i(t.target).attr("data-title"),
				a = e.substr(1, 1),
				s = e.substr(3, 1),
				n = i(t.target).parents(".calendar");
			n.hasClass("left")
				? this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[a][s].format(this.format))
				: this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[a][s].format(this.format))
		},
		setCustomDates: function(t, e) {
			if (this.chosenLabel = this.locale.customRangeLabel, t.isAfter(e)) {
				var i = this.endDate.diff(this.startDate);
				e = a(t).add(i, "ms")
			}
			this.startDate = t,
			this.endDate = e,
			this.updateView(),
			this.updateCalendars()
		},
		clickDate: function(t) {
			var e,
				s,
				n = i(t.target).attr("data-title"),
				r = n.substr(1, 1),
				o = n.substr(3, 1),
				h = i(t.target).parents(".calendar");
			if (h.hasClass("left")) {
				if (e = this.leftCalendar.calendar[r][o], s = this.endDate, "object" == typeof this.dateLimit) {
					var l = a(e).add(this.dateLimit).startOf("day");
					s.isAfter(l) && (s = l)
				}
			} else if (e = this.startDate, s = this.rightCalendar.calendar[r][o], "object" == typeof this.dateLimit) {
				var c = a(s).subtract(this.dateLimit).startOf("day");
				e.isBefore(c) && (e = c)
			}
			this.singleDatePicker && h.hasClass("left")
				? s = e.clone()
				: this.singleDatePicker && h.hasClass("right") && (e = s.clone()),
			h.find("td").removeClass("active"),
			i(t.target).addClass("active"),
			this.setCustomDates(e, s),
			this.timePicker || s.endOf("day"),
			this.singleDatePicker && !this.timePicker && this.clickApply()
		},
		clickApply: function() {
			this.updateInputText(),
			this.hide(),
			this.element.trigger("apply.daterangepicker", this)
		},
		clickCancel: function() {
			this.startDate = this.oldStartDate,
			this.endDate = this.oldEndDate,
			this.chosenLabel = this.oldChosenLabel,
			this.updateView(),
			this.updateCalendars(),
			this.hide(),
			this.element.trigger("cancel.daterangepicker", this)
		},
		updateMonthYear: function(t) {
			var e = i(t.target).closest(".calendar").hasClass("left"),
				a = e
					? "left"
					: "right",
				s = this.container.find(".calendar." + a),
				n = parseInt(s.find(".monthselect").val(), 10),
				r = s.find(".yearselect").val();
			this[a + "Calendar"].month.month(n).year(r),
			this.updateCalendars()
		},
		updateTime: function(t) {
			var e = i(t.target).closest(".calendar"),
				a = e.hasClass("left"),
				s = parseInt(e.find(".hourselect").val(), 10),
				n = parseInt(e.find(".minuteselect").val(), 10),
				r = 0;
			if (this.timePickerSeconds && (r = parseInt(e.find(".secondselect").val(), 10)), this.timePicker12Hour) {
				var o = e.find(".ampmselect").val();
				"PM" === o && 12 > s && (s += 12),
				"AM" === o && 12 === s && (s = 0)
			}
			if (a) {
				var h = this.startDate.clone();
				h.hour(s),
				h.minute(n),
				h.second(r),
				this.startDate = h,
				this.leftCalendar.month.hour(s).minute(n).second(r),
				this.singleDatePicker && (this.endDate = h.clone())
			} else {
				var l = this.endDate.clone();
				l.hour(s),
				l.minute(n),
				l.second(r),
				this.endDate = l,
				this.singleDatePicker && (this.startDate = l.clone()),
				this.rightCalendar.month.hour(s).minute(n).second(r)
			}
			this.updateView(),
			this.updateCalendars()
		},
		updateCalendars: function() {
			this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), this.leftCalendar.month.second(), "left"),
			this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), this.rightCalendar.month.second(), "right"),
			this.container.find(".calendar.left").empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate, "left")),
			this.container.find(".calendar.right").empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.singleDatePicker
				? this.minDate
				: this.startDate, this.maxDate, "right")),
			this.container.find(".ranges li").removeClass("active");
			var t = !0,
				e = 0;
			for (var a in this.ranges)
				this.timePicker
					? this.startDate.isSame(this.ranges[a][0]) && this.endDate.isSame(this.ranges[a][1]) && (t = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + e + ")").addClass("active").html())
					: this.startDate.format("YYYY-MM-DD") == this.ranges[a][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[a][1].format("YYYY-MM-DD") && (t = !1, this.chosenLabel = this.container.find(".ranges li:eq(" + e + ")").addClass("active").html()),
				e++;
			t && (this.chosenLabel = this.container.find(".ranges li:last").addClass("active").html(), this.showCalendars())
		},
		buildCalendar: function(t, e, i, s, n, r) {
			var o,
				h = a([e, t]).daysInMonth(),
				l = a([e, t, 1]),
				c = a([e, t, h]),
				d = a(l).subtract(1, "month").month(),
				f = a(l).subtract(1, "month").year(),
				m = a([f, d]).daysInMonth(),
				p = l.day(),
				u = [];
			for (u.firstDay = l, u.lastDay = c, o = 0; 6 > o; o++)
				u[o] = [];
			var D = m - p + this.locale.firstDay + 1;
			D > m && (D -= 7),
			p == this.locale.firstDay && (D = m - 6);
			var g,
				y,
				k = a([
					f,
					d,
					D,
					12,
					s,
					n
				]).zone(this.timeZone);
			for (o = 0, g = 0, y = 0; 42 > o; o++, g++, k = a(k).add(24, "hour"))
				o > 0 && g % 7 === 0 && (g = 0, y++),
				u[y][g] = k.clone().hour(i),
				k.hour(12),
				this.minDate && u[y][g].format("YYYY-MM-DD") == this.minDate.format("YYYY-MM-DD") && u[y][g].isBefore(this.minDate) && "left" == r && (u[y][g] = this.minDate.clone()),
				this.maxDate && u[y][g].format("YYYY-MM-DD") == this.maxDate.format("YYYY-MM-DD") && u[y][g].isAfter(this.maxDate) && "right" == r && (u[y][g] = this.maxDate.clone());
			return u
		},
		renderDropdowns: function(t, e, a) {
			for (var i = t.month(), s = t.year(), n = a && a.year() || s + 5, r = e && e.year() || s - 50, o = '<select class="monthselect">', h = s == r, l = s == n, c = 0; 12 > c; c++)
				(!h || c >= e.month()) && (!l || c <= a.month()) && (o += "<option value='" + c + "'" + (c === i
					? " selected='selected'"
					: "") + ">" + this.locale.monthNames[c] + "</option>");
			o += "</select>";
			for (var d = '<select class="yearselect">', f = r; n >= f; f++)
				d += '<option value="' + f + '"' + (f === s
					? ' selected="selected"'
					: "") + ">" + f + "</option>";
			return d += "</select>",
			o + d
		},
		renderCalendar: function(t, e, a, s, n) {
			var r = '<div class="calendar-date">';
			r += '<table class="table-condensed">',
			r += "<thead>",
			r += "<tr>",
			this.showWeekNumbers && (r += "<th></th>"),
			r += !a || a.isBefore(t.firstDay)
				? '<th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>'
				: "<th></th>";
			var o = this.locale.monthNames[t[1][1].month()] + t[1][1].format(" YYYY");
			this.showDropdowns && (o = this.renderDropdowns(t[1][1], a, s)),
			r += '<th colspan="5" class="month">' + o + "</th>",
			r += !s || s.isAfter(t.lastDay)
				? '<th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>'
				: "<th></th>",
			r += "</tr>",
			r += "<tr>",
			this.showWeekNumbers && (r += '<th class="week">' + this.locale.weekLabel + "</th>"),
			i.each(this.locale.daysOfWeek, function(t, e) {
				r += "<th>" + e + "</th>"
			}),
			r += "</tr>",
			r += "</thead>",
			r += "<tbody>";
			for (var h = 0; 6 > h; h++) {
				r += "<tr>",
				this.showWeekNumbers && (r += '<td class="week">' + t[h][0].week() + "</td>");
				for (var l = 0; 7 > l; l++) {
					var c = "available ";
					c += t[h][l].month() == t[1][1].month()
						? ""
						: "off",
					a && t[h][l].isBefore(a, "day") || s && t[h][l].isAfter(s, "day")
						? c = " off disabled "
						: t[h][l].format("YYYY-MM-DD") == e.format("YYYY-MM-DD")
							? (c += " active ", t[h][l].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && (c += " start-date "),
							t[h][l].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && (c += " end-date "))
							: t[h][l] >= this.startDate && t[h][l] <= this.endDate && (c += " in-range ", t[h][l].isSame(this.startDate) && (c += " start-date "),
							t[h][l].isSame(this.endDate) && (c += " end-date "));
					var d = "r" + h + "c" + l;
					r += '<td class="' + c.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") + '" data-title="' + d + '">' + t[h][l].date() + "</td>"
				}
				r += "</tr>"
			}
			r += "</tbody>",
			r += "</table>",
			r += "</div>";
			var f;
			if (this.timePicker) {
				r += '<div class="calendar-time">',
				r += '<select class="hourselect">';
				var m = 0,
					p = 23;
				a && ("left" == n || this.singleDatePicker) && e.format("YYYY-MM-DD") == a.format("YYYY-MM-DD") && (m = a.hour(), e.hour() < m && e.hour(m), this.timePicker12Hour && m >= 12 && e.hour() >= 12 && (m -= 12), this.timePicker12Hour && 12 == m && (m = 1)),
				s && ("right" == n || this.singleDatePicker) && e.format("YYYY-MM-DD") == s.format("YYYY-MM-DD") && (p = s.hour(), e.hour() > p && e.hour(p), this.timePicker12Hour && p >= 12 && e.hour() >= 12 && (p -= 12));
				var u = 0,
					D = 23,
					g = e.hour();
				for (this.timePicker12Hour && (u = 1, D = 12, g >= 12 && (g -= 12), 0 === g && (g = 12)), f = u; D >= f; f++)
					r += f == g
						? '<option value="' + f + '" selected="selected">' + f + "</option>"
						: m > f || f > p
							? '<option value="' + f + '" disabled="disabled" class="disabled">' + f + "</option>"
							: '<option value="' + f + '">' + f + "</option>";
				r += "</select> : ",
				r += '<select class="minuteselect">';
				var y = 0,
					k = 59;
				for (a && ("left" == n || this.singleDatePicker) && e.format("YYYY-MM-DD h A") == a.format("YYYY-MM-DD h A") && (y = a.minute(), e.minute() < y && e.minute(y)), s && ("right" == n || this.singleDatePicker) && e.format("YYYY-MM-DD h A") == s.format("YYYY-MM-DD h A") && (k = s.minute(), e.minute() > k && e.minute(k)), f = 0; 60 > f; f += this.timePickerIncrement) {
					var b = f;
					10 > b && (b = "0" + b),
					r += f == e.minute()
						? '<option value="' + f + '" selected="selected">' + b + "</option>"
						: y > f || f > k
							? '<option value="' + f + '" disabled="disabled" class="disabled">' + b + "</option>"
							: '<option value="' + f + '">' + b + "</option>"
				}
				if (r += "</select> ", this.timePickerSeconds) {
					for (r += ': <select class="secondselect">', f = 0; 60 > f; f += this.timePickerIncrement) {
						var b = f;
						10 > b && (b = "0" + b),
						r += f == e.second()
							? '<option value="' + f + '" selected="selected">' + b + "</option>"
							: '<option value="' + f + '">' + b + "</option>"
					}
					r += "</select>"
				}
				if (this.timePicker12Hour) {
					r += '<select class="ampmselect">';
					var v = "",
						C = "";
					a && ("left" == n || this.singleDatePicker) && e.format("YYYY-MM-DD") == a.format("YYYY-MM-DD") && a.hour() >= 12 && (v = ' disabled="disabled" class="disabled"'),
					s && ("right" == n || this.singleDatePicker) && e.format("YYYY-MM-DD") == s.format("YYYY-MM-DD") && s.hour() < 12 && (C = ' disabled="disabled" class="disabled"'),
					r += e.hour() >= 12
						? '<option value="AM"' + v + '>AM</option><option value="PM" selected="selected"' + C + ">PM</option>"
						: '<option value="AM" selected="selected"' + v + '>AM</option><option value="PM"' + C + ">PM</option>",
					r += "</select>"
				}
				r += "</div>"
			}
			return r
		},
		remove: function() {
			this.container.remove(),
			this.element.off(".daterangepicker"),
			this.element.removeData("daterangepicker")
		}
	},
	i.fn.daterangepicker = function(t, e) {
		return this.each(function() {
			var a = i(this);
			a.data("daterangepicker") && a.data("daterangepicker").remove(),
			a.data("daterangepicker", new s(a, t, e))
		}),
		this
	}
});
//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a) {
	function b(a, b, c) {
		switch (arguments.length) {
			case 2:
				return null != a
					? a
					: b;
			case 3:
				return null != a
					? a
					: null != b
						? b
						: c;
			default:
				throw new Error("Implement me")
		}
	}
	function c(a, b) {
		return Bb.call(a, b)
	}
	function d() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1
		}
	}
	function e(a) {
		vb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
	}
	function f(a, b) {
		var c = !0;
		return o(function() {
			return c && (e(a), c = !1),
			b.apply(this, arguments)
		}, b)
	}
	function g(a, b) {
		sc[a] || (e(b), sc[a] = !0)
	}
	function h(a, b) {
		return function(c) {
			return r(a.call(this, c), b)
		}
	}
	function i(a, b) {
		return function(c) {
			return this.localeData().ordinal(a.call(this, c), b)
		}
	}
	function j(a, b) {
		var c,
			d,
			e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
			f = a.clone().add(e, "months");
		return 0 > b - f
			? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c))
			: (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
	}
	function k(a, b, c) {
		var d;
		return null == c
			? b
			: null != a.meridiemHour
				? a.meridiemHour(b, c)
				: null != a.isPM
					? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b)
					: b
	}
	function l() {}
	function m(a, b) {
		b !== !1 && H(a),
		p(this, a),
		this._d = new Date(+ a._d),
		uc === !1 && (uc = !0, vb.updateOffset(this), uc = !1)
	}
	function n(a) {
		var b = A(a),
			c = b.year || 0,
			d = b.quarter || 0,
			e = b.month || 0,
			f = b.week || 0,
			g = b.day || 0,
			h = b.hour || 0,
			i = b.minute || 0,
			j = b.second || 0,
			k = b.millisecond || 0;
		this._milliseconds =+ k + 1e3 * j + 6e4 * i + 36e5 * h,
		this._days =+ g + 7 * f,
		this._months =+ e + 3 * d + 12 * c,
		this._data = {},
		this._locale = vb.localeData(),
		this._bubble()
	}
	function o(a, b) {
		for (var d in b)
			c(b, d) && (a[d] = b[d]);
		return c(b, "toString") && (a.toString = b.toString),
		c(b, "valueOf") && (a.valueOf = b.valueOf),
		a
	}
	function p(a, b) {
		var c,
			d,
			e;
		if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), "undefined" != typeof b._locale && (a._locale = b._locale), Kb.length > 0)
			for (c in Kb)
				d = Kb[c],
				e = b[d],
				"undefined" != typeof e && (a[d] = e);
	return a
	}
	function q(a) {
		return 0 > a
			? Math.ceil(a)
			: Math.floor(a)
	}
	function r(a, b, c) {
		for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;)
			d = "0" + d;
		return (e
			? c
				? "+"
				: ""
			: "-") + d
	}
	function s(a, b) {
		var c = {
			milliseconds: 0,
			months: 0
		};
		return c.months = b.month() - a.month() + 12 * (b.year() - a.year()),
		a.clone().add(c.months, "M").isAfter(b) && --c.months,
		c.milliseconds =+ b - + a.clone().add(c.months, "M"),
		c
	}
	function t(a, b) {
		var c;
		return b = M(b, a),
		a.isBefore(b)
			? c = s(a, b)
			: (c = s(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months),
		c
	}
	function u(a, b) {
		return function(c, d) {
			var e,
				f;
			return null === d || isNaN(+ d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f),
			c = "string" == typeof c ?+ c : c,
			e = vb.duration(c, d),
			v(this, e, a),
			this
		}
	}
	function v(a, b, c, d) {
		var e = b._milliseconds,
			f = b._days,
			g = b._months;
		d = null == d
			? !0
			: d,
		e && a._d.setTime(+ a._d + e * c),
		f && pb(a, "Date", ob(a, "Date") + f * c),
		g && nb(a, ob(a, "Month") + g * c),
		d && vb.updateOffset(a, f || g)
	}
	function w(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}
	function x(a) {
		return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
	}
	function y(a, b, c) {
		var d,
			e = Math.min(a.length, b.length),
			f = Math.abs(a.length - b.length),
			g = 0;
		for (d = 0; e > d; d++)
			(c && a[d] !== b[d] || !c && C(a[d]) !== C(b[d])) && g++;
		return g + f
	}
	function z(a) {
		if (a) {
			var b = a.toLowerCase().replace(/(.)s$/, "$1");
			a = lc[a] || mc[b] || b
		}
		return a
	}
	function A(a) {
		var b,
			d,
			e = {};
		for (d in a)
			c(a, d) && (b = z(d), b && (e[b] = a[d]));
		return e
	}
	function B(b) {
		var c,
			d;
		if (0 === b.indexOf("week"))
			c = 7,
			d = "day";
		else {
			if (0 !== b.indexOf("month"))
				return;
			c = 12,
			d = "month"
		}
		vb[b] = function(e, f) {
			var g,
				h,
				i = vb._locale[b],
				j = [];
			if ("number" == typeof e && (f = e, e = a), h = function(a) {
				var b = vb().utc().set(d, a);
				return i.call(vb._locale, b, e || "")
			},
			null != f)
				return h(f);
			for (g = 0; c > g; g++)
				j.push(h(g));
			return j
		}
	}
	function C(a) {
		var b =+ a,
			c = 0;
		return 0 !== b && isFinite(b) && (c = b >= 0
			? Math.floor(b)
			: Math.ceil(b)),
		c
	}
	function D(a, b) {
		return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
	}
	function E(a, b, c) {
		return jb(vb([
			a, 11, 31 + b - c
		]), b, c).week
	}
	function F(a) {
		return G(a)
			? 366
			: 365
	}
	function G(a) {
		return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
	}
	function H(a) {
		var b;
		a._a && -2 === a._pf.overflow && (b = a._a[Db] < 0 || a._a[Db] > 11
			? Db
			: a._a[Eb] < 1 || a._a[Eb] > D(a._a[Cb], a._a[Db])
				? Eb
				: a._a[Fb] < 0 || a._a[Fb] > 24 || 24 === a._a[Fb] && (0 !== a._a[Gb] || 0 !== a._a[Hb] || 0 !== a._a[Ib])
					? Fb
					: a._a[Gb] < 0 || a._a[Gb] > 59
						? Gb
						: a._a[Hb] < 0 || a._a[Hb] > 59
							? Hb
							: a._a[Ib] < 0 || a._a[Ib] > 999
								? Ib
								: -1, a._pf._overflowDayOfYear && (Cb > b || b > Eb) && (b = Eb), a._pf.overflow = b)
	}
	function I(b) {
		return null == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)),
		b._isValid
	}
	function J(a) {
		return a
			? a.toLowerCase().replace("_", "-")
			: a
	}
	function K(a) {
		for (var b, c, d, e, f = 0; f < a.length;) {
			for (e = J(a[f]).split("-"), b = e.length, c = J(a[f + 1]), c = c
				? c.split("-")
				: null; b > 0;) {
				if (d = L(e.slice(0, b).join("-")))
					return d;
				if (c && c.length >= b && y(e, c, !0) >= b - 1)
					break;
				b--
			}
			f++
		}
		return null
	}
	function L(a) {
		var b = null;
		if (!Jb[a] && Lb)
			try {
				b = vb.locale(),
				require("./locale/" + a),
				vb.locale(b)
			} catch (c) {}
		return Jb[a]
	}
	function M(a, b) {
		var c,
			d;
		return b._isUTC
			? (c = b.clone(), d = (vb.isMoment(a) || x(a) ?+ a :+ vb(a)) - + c, c._d.setTime(+ c._d + d), vb.updateOffset(c, !1), c)
			: vb(a).local()
	}
	function N(a) {
		return a.match(/\[[\s\S]/)
			? a.replace(/^\[|\]$/g, "")
			: a.replace(/\\/g, "")
	}
	function O(a) {
		var b,
			c,
			d = a.match(Pb);
		for (b = 0, c = d.length; c > b; b++)
			d[b] = rc[d[b]]
				? rc[d[b]]
				: N(d[b]);
		return function(e) {
			var f = "";
			for (b = 0; c > b; b++)
				f += d[b]instanceof Function
					? d[b].call(e, a)
					: d[b];
			return f
		}
	}
	function P(a, b) {
		return a.isValid()
			? (b = Q(b, a.localeData()), nc[b] || (nc[b] = O(b)), nc[b](a))
			: a.localeData().invalidDate()
	}
	function Q(a, b) {
		function c(a) {
			return b.longDateFormat(a) || a
		}
		var d = 5;
		for (Qb.lastIndex = 0; d >= 0 && Qb.test(a);)
			a = a.replace(Qb, c),
			Qb.lastIndex = 0,
			d -= 1;
		return a
	}
	function R(a, b) {
		var c,
			d = b._strict;
		switch (a) {
			case "Q":
				return _b;
			case "DDDD":
				return bc;
			case "YYYY":
			case "GGGG":
			case "gggg":
				return d
					? cc
					: Tb;
			case "Y":
			case "G":
			case "g":
				return ec;
			case "YYYYYY":
			case "YYYYY":
			case "GGGGG":
			case "ggggg":
				return d
					? dc
					: Ub;
			case "S":
				if (d)
					return _b;
				case "SS":
				if (d)
					return ac;
				case "SSS":
				if (d)
					return bc;
				case "DDD":
				return Sb;
			case "MMM":
			case "MMMM":
			case "dd":
			case "ddd":
			case "dddd":
				return Wb;
			case "a":
			case "A":
				return b._locale._meridiemParse;
			case "x":
				return Zb;
			case "X":
				return $b;
			case "Z":
			case "ZZ":
				return Xb;
			case "T":
				return Yb;
			case "SSSS":
				return Vb;
			case "MM":
			case "DD":
			case "YY":
			case "GG":
			case "gg":
			case "HH":
			case "hh":
			case "mm":
			case "ss":
			case "ww":
			case "WW":
				return d
					? ac
					: Rb;
			case "M":
			case "D":
			case "d":
			case "H":
			case "h":
			case "m":
			case "s":
			case "w":
			case "W":
			case "e":
			case "E":
				return Rb;
			case "Do":
				return d
					? b._locale._ordinalParse
					: b._locale._ordinalParseLenient;
			default:
				return c = new RegExp($(Z(a.replace("\\", "")), "i"))
		}
	}
	function S(a) {
		a = a || "";
		var b = a.match(Xb) || [],
			c = b[b.length - 1] || [],
			d = (c + "").match(jc) || [
				"-", 0, 0
			],
			e =+ (60 * d[1]) + C(d[2]);
		return "+" === d[0]
			? e
			: -e
	}
	function T(a, b, c) {
		var d,
			e = c._a;
		switch (a) {
			case "Q":
				null != b && (e[Db] = 3 * (C(b) - 1));
				break;
			case "M":
			case "MM":
				null != b && (e[Db] = C(b) - 1);
				break;
			case "MMM":
			case "MMMM":
				d = c._locale.monthsParse(b, a, c._strict),
				null != d
					? e[Db] = d
					: c._pf.invalidMonth = b;
				break;
			case "D":
			case "DD":
				null != b && (e[Eb] = C(b));
				break;
			case "Do":
				null != b && (e[Eb] = C(parseInt(b.match(/\d{1,2}/)[0], 10)));
				break;
			case "DDD":
			case "DDDD":
				null != b && (c._dayOfYear = C(b));
				break;
			case "YY":
				e[Cb] = vb.parseTwoDigitYear(b);
				break;
			case "YYYY":
			case "YYYYY":
			case "YYYYYY":
				e[Cb] = C(b);
				break;
			case "a":
			case "A":
				c._meridiem = b;
				break;
			case "h":
			case "hh":
				c._pf.bigHour = !0;
			case "H":
			case "HH":
				e[Fb] = C(b);
				break;
			case "m":
			case "mm":
				e[Gb] = C(b);
				break;
			case "s":
			case "ss":
				e[Hb] = C(b);
				break;
			case "S":
			case "SS":
			case "SSS":
			case "SSSS":
				e[Ib] = C(1e3 * ("0." + b));
				break;
			case "x":
				c._d = new Date(C(b));
				break;
			case "X":
				c._d = new Date(1e3 * parseFloat(b));
				break;
			case "Z":
			case "ZZ":
				c._useUTC = !0,
				c._tzm = S(b);
				break;
			case "dd":
			case "ddd":
			case "dddd":
				d = c._locale.weekdaysParse(b),
				null != d
					? (c._w = c._w || {}, c._w.d = d)
					: c._pf.invalidWeekday = b;
				break;
			case "w":
			case "ww":
			case "W":
			case "WW":
			case "d":
			case "e":
			case "E":
				a = a.substr(0, 1);
			case "gggg":
			case "GGGG":
			case "GGGGG":
				a = a.substr(0, 2),
				b && (c._w = c._w || {}, c._w[a] = C(b));
				break;
			case "gg":
			case "GG":
				c._w = c._w || {},
				c._w[a] = vb.parseTwoDigitYear(b)
		}
	}
	function U(a) {
		var c,
			d,
			e,
			f,
			g,
			h,
			i;
		c = a._w,
		null != c.GG || null != c.W || null != c.E
			? (g = 1, h = 4, d = b(c.GG, a._a[Cb], jb(vb(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1))
			: (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[Cb], jb(vb(), g, h).year), e = b(c.w, 1), null != c.d
				? (f = c.d, g > f && ++e)
				: f = null != c.e
					? c.e + g
					: g),
		i = kb(d, e, f, h, g),
		a._a[Cb] = i.year,
		a._dayOfYear = i.dayOfYear
	}
	function V(a) {
		var c,
			d,
			e,
			f,
			g = [];
		if (!a._d) {
			for (e = X(a), a._w && null == a._a[Eb] && null == a._a[Db] && U(a), a._dayOfYear && (f = b(a._a[Cb], e[Cb]), a._dayOfYear > F(f) && (a._pf._overflowDayOfYear = !0), d = fb(f, 0, a._dayOfYear), a._a[Db] = d.getUTCMonth(), a._a[Eb] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c)
				a._a[c] = g[c] = e[c];
			for (; 7 > c; c++)
				a._a[c] = g[c] = null == a._a[c]
					? 2 === c
						? 1
						: 0
					: a._a[c];

			24 === a._a[Fb] && 0 === a._a[Gb] && 0 === a._a[Hb] && 0 === a._a[Ib] && (a._nextDay = !0, a._a[Fb] = 0),
			a._d = (a._useUTC
				? fb
				: eb).apply(null, g),
			null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
			a._nextDay && (a._a[Fb] = 24)
		}
	}
	function W(a) {
		var b;
		a._d || (b = A(a._i), a._a = [
			b.year, b.month, b.day || b.date,
			b.hour,
			b.minute,
			b.second,
			b.millisecond
		], V(a))
	}
	function X(a) {
		var b = new Date;
		return a._useUTC
			? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()]
			: [b.getFullYear(), b.getMonth(), b.getDate()]
	}
	function Y(b) {
		if (b._f === vb.ISO_8601)
			return void ab(b);
		b._a = [],
		b._pf.empty = !0;
		var c,
			d,
			e,
			f,
			g,
			h = "" + b._i,
			i = h.length,
			j = 0;
		for (e = Q(b._f, b._locale).match(Pb) || [], c = 0; c < e.length; c++)
			f = e[c],
			d = (h.match(R(f, b)) || [])[0],
			d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && b._pf.unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length),
			rc[f]
				? (d
					? b._pf.empty = !1
					: b._pf.unusedTokens.push(f), T(f, d, b))
				: b._strict && !d && b._pf.unusedTokens.push(f);
		b._pf.charsLeftOver = i - j,
		h.length > 0 && b._pf.unusedInput.push(h),
		b._pf.bigHour === !0 && b._a[Fb] <= 12 && (b._pf.bigHour = a),
		b._a[Fb] = k(b._locale, b._a[Fb], b._meridiem),
		V(b),
		H(b)
	}
	function Z(a) {
		return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
			return b || c || d || e
		})
	}
	function $(a) {
		return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}
	function _(a) {
		var b,
			c,
			e,
			f,
			g;
		if (0 === a._f.length)
			return a._pf.invalidFormat = !0,
			void(a._d = new Date(0 / 0));
		for (f = 0; f < a._f.length; f++)
			g = 0,
			b = p({}, a),
			null != a._useUTC && (b._useUTC = a._useUTC),
			b._pf = d(),
			b._f = a._f[f],
			Y(b),
			I(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
		o(a, c || b)
	}
	function ab(a) {
		var b,
			c,
			d = a._i,
			e = fc.exec(d);
		if (e) {
			for (a._pf.iso = !0, b = 0, c = hc.length; c > b; b++)
				if (hc[b][1].exec(d)) {
					a._f = hc[b][0] + (e[6] || " ");
					break
				}
			for (b = 0, c = ic.length; c > b; b++)
				if (ic[b][1].exec(d)) {
					a._f += ic[b][0];
					break
				}
			d.match(Xb) && (a._f += "Z"),
			Y(a)
		} else
			a._isValid = !1
	}
	function bb(a) {
		ab(a),
		a._isValid === !1 && (delete a._isValid, vb.createFromInputFallback(a))
	}
	function cb(a, b) {
		var c,
			d = [];
		for (c = 0; c < a.length; ++c)
			d.push(b(a[c], c));
		return d
	}
	function db(b) {
		var c,
			d = b._i;
		d === a
			? b._d = new Date
			: x(d)
				? b._d = new Date(+ d)
				: null !== (c = Mb.exec(d))
					? b._d = new Date(+ c[1])
					: "string" == typeof d
						? bb(b)
						: w(d)
							? (b._a = cb(d.slice(0), function(a) {
								return parseInt(a, 10)
							}), V(b))
							: "object" == typeof d
								? W(b)
								: "number" == typeof d
									? b._d = new Date(d)
									: vb.createFromInputFallback(b)
	}
	function eb(a, b, c, d, e, f, g) {
		var h = new Date(a, b, c, d, e, f, g);
		return 1970 > a && h.setFullYear(a),
		h
	}
	function fb(a) {
		var b = new Date(Date.UTC.apply(null, arguments));
		return 1970 > a && b.setUTCFullYear(a),
		b
	}
	function gb(a, b) {
		if ("string" == typeof a)
			if (isNaN(a)) {
				if (a = b.weekdaysParse(a), "number" != typeof a)
					return null
			} else
				a = parseInt(a, 10);
	return a
	}
	function hb(a, b, c, d, e) {
		return e.relativeTime(b || 1, !!c, a, d)
	}
	function ib(a, b, c) {
		var d = vb.duration(a).abs(),
			e = Ab(d.as("s")),
			f = Ab(d.as("m")),
			g = Ab(d.as("h")),
			h = Ab(d.as("d")),
			i = Ab(d.as("M")),
			j = Ab(d.as("y")),
			k = e < oc.s && ["s", e] || 1 === f && ["m"] || f < oc.m && ["mm", f] || 1 === g && ["h"] || g < oc.h && ["hh", g] || 1 === h && ["d"] || h < oc.d && ["dd", h] || 1 === i && ["M"] || i < oc.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
		return k[2] = b,
		k[3] =+ a > 0,
		k[4] = c,
		hb.apply({}, k)
	}
	function jb(a, b, c) {
		var d,
			e = c - b,
			f = c - a.day();
		return f > e && (f -= 7),
		e - 7 > f && (f += 7),
		d = vb(a).add(f, "d"), {
			week: Math.ceil(d.dayOfYear() / 7),
			year: d.year()
		}
	}
	function kb(a, b, c, d, e) {
		var f,
			g,
			h = fb(a, 0, 1).getUTCDay();
		return h = 0 === h
			? 7
			: h,
		c = null != c
			? c
			: e,
		f = e - h + (h > d
			? 7
			: 0) - (e > h
			? 7
			: 0),
		g = 7 * (b - 1) + (c - e) + f + 1, {
			year: g > 0
				? a
				: a - 1,
			dayOfYear: g > 0
				? g
				: F(a - 1) + g
		}
	}
	function lb(b) {
		var c,
			d = b._i,
			e = b._f;
		return b._locale = b._locale || vb.localeData(b._l),
		null === d || e === a && "" === d
			? vb.invalid({
				nullInput: !0
			})
			: ("string" == typeof d && (b._i = d = b._locale.preparse(d)), vb.isMoment(d)
				? new m(d, !0)
				: (e
					? w(e)
						? _(b)
						: Y(b)
					: db(b), c = new m(b), c._nextDay && (c.add(1, "d"), c._nextDay = a), c))
	}
	function mb(a, b) {
		var c,
			d;
		if (1 === b.length && w(b[0]) && (b = b[0]), !b.length)
			return vb();
		for (c = b[0], d = 1; d < b.length; ++d)
			b[d][a](c) && (c = b[d]);
		return c
	}
	function nb(a, b) {
		var c;
		return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b)
			? a
			: (c = Math.min(a.date(), D(a.year(), b)), a._d["set" + (a._isUTC
					? "UTC"
					: "") + "Month"](b, c), a)
	}
	function ob(a, b) {
		return a._d["get" + (a._isUTC
				? "UTC"
				: "") + b]()
	}
	function pb(a, b, c) {
		return "Month" === b
			? nb(a, c)
			: a._d["set" + (a._isUTC
					? "UTC"
					: "") + b](c)
	}
	function qb(a, b) {
		return function(c) {
			return null != c
				? (pb(this, a, c), vb.updateOffset(this, b), this)
				: ob(this, a)
		}
	}
	function rb(a) {
		return 400 * a / 146097
	}
	function sb(a) {
		return 146097 * a / 400
	}
	function tb(a) {
		vb.duration.fn[a] = function() {
			return this._data[a]
		}
	}
	function ub(a) {
		"undefined" == typeof ender && (wb = zb.moment, zb.moment = a
			? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", vb)
			: vb)
	}
	for (var vb, wb, xb, yb = "2.9.0", zb = "undefined" == typeof global || "undefined" != typeof window && window !== global.window
		? this
		: global, Ab = Math.round, Bb = Object.prototype.hasOwnProperty, Cb = 0, Db = 1, Eb = 2, Fb = 3, Gb = 4, Hb = 5, Ib = 6, Jb = {}, Kb = [], Lb = "undefined" != typeof module && module && module.exports, Mb = /^\/?Date\((\-?\d+)/i, Nb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ob = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Pb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Qb = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Rb = /\d\d?/, Sb = /\d{1,3}/, Tb = /\d{1,4}/, Ub = /[+\-]?\d{1,6}/, Vb = /\d+/, Wb = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Xb = /Z|[\+\-]\d\d:?\d\d/gi, Yb = /T/i, Zb = /[\+\-]?\d+/, $b = /[\+\-]?\d+(\.\d{1,3})?/, _b = /\d/, ac = /\d\d/, bc = /\d{3}/, cc = /\d{4}/, dc = /[+-]?\d{6}/, ec = /[+-]?\d+/, fc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gc = "YYYY-MM-DDTHH:mm:ssZ", hc = [
		[
			"YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/
		],
		[
			"YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/
		],
		[
			"GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/
		],
		[
			"GGGG-[W]WW", /\d{4}-W\d{2}/
		],
		["YYYY-DDD", /\d{4}-\d{3}/]
	], ic = [
		[
			"HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/
		],
		[
			"HH:mm:ss", /(T| )\d\d:\d\d:\d\d/
		],
		[
			"HH:mm", /(T| )\d\d:\d\d/
		],
		["HH", /(T| )\d\d/]
	], jc = /([\+\-]|\d\d)/gi, kc = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
		Milliseconds: 1,
		Seconds: 1e3,
		Minutes: 6e4,
		Hours: 36e5,
		Days: 864e5,
		Months: 2592e6,
		Years: 31536e6
	}), lc = {
		ms: "millisecond",
		s: "second",
		m: "minute",
		h: "hour",
		d: "day",
		D: "date",
		w: "week",
		W: "isoWeek",
		M: "month",
		Q: "quarter",
		y: "year",
		DDD: "dayOfYear",
		e: "weekday",
		E: "isoWeekday",
		gg: "weekYear",
		GG: "isoWeekYear"
	}, mc = {
		dayofyear: "dayOfYear",
		isoweekday: "isoWeekday",
		isoweek: "isoWeek",
		weekyear: "weekYear",
		isoweekyear: "isoWeekYear"
	}, nc = {}, oc = {
		s: 45,
		m: 45,
		h: 22,
		d: 26,
		M: 11
	}, pc = "DDD w W M D d".split(" "), qc = "M D H h m s w W".split(" "), rc = {
		M: function() {
			return this.month() + 1
		},
		MMM: function(a) {
			return this.localeData().monthsShort(this, a)
		},
		MMMM: function(a) {
			return this.localeData().months(this, a)
		},
		D: function() {
			return this.date()
		},
		DDD: function() {
			return this.dayOfYear()
		},
		d: function() {
			return this.day()
		},
		dd: function(a) {
			return this.localeData().weekdaysMin(this, a)
		},
		ddd: function(a) {
			return this.localeData().weekdaysShort(this, a)
		},
		dddd: function(a) {
			return this.localeData().weekdays(this, a)
		},
		w: function() {
			return this.week()
		},
		W: function() {
			return this.isoWeek()
		},
		YY: function() {
			return r(this.year() % 100, 2)
		},
		YYYY: function() {
			return r(this.year(), 4)
		},
		YYYYY: function() {
			return r(this.year(), 5)
		},
		YYYYYY: function() {
			var a = this.year(),
				b = a >= 0
					? "+"
					: "-";
			return b + r(Math.abs(a), 6)
		},
		gg: function() {
			return r(this.weekYear() % 100, 2)
		},
		gggg: function() {
			return r(this.weekYear(), 4)
		},
		ggggg: function() {
			return r(this.weekYear(), 5)
		},
		GG: function() {
			return r(this.isoWeekYear() % 100, 2)
		},
		GGGG: function() {
			return r(this.isoWeekYear(), 4)
		},
		GGGGG: function() {
			return r(this.isoWeekYear(), 5)
		},
		e: function() {
			return this.weekday()
		},
		E: function() {
			return this.isoWeekday()
		},
		a: function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), !0)
		},
		A: function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), !1)
		},
		H: function() {
			return this.hours()
		},
		h: function() {
			return this.hours() % 12 || 12
		},
		m: function() {
			return this.minutes()
		},
		s: function() {
			return this.seconds()
		},
		S: function() {
			return C(this.milliseconds() / 100)
		},
		SS: function() {
			return r(C(this.milliseconds() / 10), 2)
		},
		SSS: function() {
			return r(this.milliseconds(), 3)
		},
		SSSS: function() {
			return r(this.milliseconds(), 3)
		},
		Z: function() {
			var a = this.utcOffset(),
				b = "+";
			return 0 > a && (a = -a, b = "-"),
			b + r(C(a / 60), 2) + ":" + r(C(a) % 60, 2)
		},
		ZZ: function() {
			var a = this.utcOffset(),
				b = "+";
			return 0 > a && (a = -a, b = "-"),
			b + r(C(a / 60), 2) + r(C(a) % 60, 2)
		},
		z: function() {
			return this.zoneAbbr()
		},
		zz: function() {
			return this.zoneName()
		},
		x: function() {
			return this.valueOf()
		},
		X: function() {
			return this.unix()
		},
		Q: function() {
			return this.quarter()
		}
	}, sc = {}, tc = [
		"months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"
	], uc = !1; pc.length;)
		xb = pc.pop(),
		rc[xb + "o"] = i(rc[xb], xb);
	for (; qc.length;)
		xb = qc.pop(),
		rc[xb + xb] = h(rc[xb], 2);
	rc.DDDD = h(rc.DDD, 3),
	o(l.prototype, {
		set: function(a) {
			var b,
				c;
			for (c in a)
				b = a[c],
				"function" == typeof b
					? this[c] = b
					: this["_" + c] = b;
			this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function(a) {
			return this._months[a.month()]
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function(a) {
			return this._monthsShort[a.month()]
		},
		monthsParse: function(a, b, c) {
			var d,
				e,
				f;
			for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
				if (e = vb.utc([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a))
					return d;
				if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
					return d;
				if (!c && this._monthsParse[d].test(a))
					return d
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function(a) {
			return this._weekdays[a.day()]
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function(a) {
			return this._weekdaysShort[a.day()]
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function(a) {
			return this._weekdaysMin[a.day()]
		},
		weekdaysParse: function(a) {
			var b,
				c,
				d;
			for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
				if (this._weekdaysParse[b] || (c = vb([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a))
					return b
		},
		_longDateFormat: {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY LT",
			LLLL: "dddd, MMMM D, YYYY LT"
		},
		longDateFormat: function(a) {
			var b = this._longDateFormat[a];
			return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
				return a.slice(1)
			}), this._longDateFormat[a] = b),
			b
		},
		isPM: function(a) {
			return "p" === (a + "").toLowerCase().charAt(0)
		},
		_meridiemParse: /[ap]\.?m?\.?/i,
		meridiem: function(a, b, c) {
			return a > 11
				? c
					? "pm"
					: "PM"
				: c
					? "am"
					: "AM"
		},
		_calendar: {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[Last] dddd [at] LT",
			sameElse: "L"
		},
		calendar: function(a, b, c) {
			var d = this._calendar[a];
			return "function" == typeof d
				? d.apply(b, [c])
				: d
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function(a, b, c, d) {
			var e = this._relativeTime[c];
			return "function" == typeof e
				? e(a, b, c, d)
				: e.replace(/%d/i, a)
		},
		pastFuture: function(a, b) {
			var c = this._relativeTime[a > 0
					? "future"
					: "past"];
			return "function" == typeof c
				? c(b)
				: c.replace(/%s/i, b)
		},
		ordinal: function(a) {
			return this._ordinal.replace("%d", a)
		},
		_ordinal: "%d",
		_ordinalParse: /\d{1,2}/,
		preparse: function(a) {
			return a
		},
		postformat: function(a) {
			return a
		},
		week: function(a) {
			return jb(a, this._week.dow, this._week.doy).week
		},
		_week: {
			dow: 0,
			doy: 6
		},
		firstDayOfWeek: function() {
			return this._week.dow
		},
		firstDayOfYear: function() {
			return this._week.doy
		},
		_invalidDate: "Invalid date",
		invalidDate: function() {
			return this._invalidDate
		}
	}),
	vb = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a),
		g = {},
		g._isAMomentObject = !0,
		g._i = b,
		g._f = c,
		g._l = e,
		g._strict = f,
		g._isUTC = !1,
		g._pf = d(),
		lb(g)
	},
	vb.suppressDeprecationWarnings = !1,
	vb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
		a._d = new Date(a._i + (a._useUTC
			? " UTC"
			: ""))
	}),
	vb.min = function() {
		var a = [].slice.call(arguments, 0);
		return mb("isBefore", a)
	},
	vb.max = function() {
		var a = [].slice.call(arguments, 0);
		return mb("isAfter", a)
	},
	vb.utc = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a),
		g = {},
		g._isAMomentObject = !0,
		g._useUTC = !0,
		g._isUTC = !0,
		g._l = e,
		g._i = b,
		g._f = c,
		g._strict = f,
		g._pf = d(),
		lb(g).utc()
	},
	vb.unix = function(a) {
		return vb(1e3 * a)
	},
	vb.duration = function(a, b) {
		var d,
			e,
			f,
			g,
			h = a,
			i = null;
		return vb.isDuration(a)
			? h = {
				ms: a._milliseconds,
				d: a._days,
				M: a._months
			}
			: "number" == typeof a
				? (h = {}, b
					? h[b] = a
					: h.milliseconds = a)
				: (i = Nb.exec(a))
					? (d = "-" === i[1]
						? -1
						: 1, h = {
						y: 0,
						d: C(i[Eb]) * d,
						h: C(i[Fb]) * d,
						m: C(i[Gb]) * d,
						s: C(i[Hb]) * d,
						ms: C(i[Ib]) * d
					})
					: (i = Ob.exec(a))
						? (d = "-" === i[1]
							? -1
							: 1, f = function(a) {
							var b = a && parseFloat(a.replace(",", "."));
							return (isNaN(b)
								? 0
								: b) * d
						},
						h = {
							y: f(i[2]),
							M: f(i[3]),
							d: f(i[4]),
							h: f(i[5]),
							m: f(i[6]),
							s: f(i[7]),
							w: f(i[8])
						})
						: null == h
							? h = {}
							: "object" == typeof h && ("from" in h || "to" in h) && (g = t(vb(h.from), vb(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months),
		e = new n(h),
		vb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale),
		e
	},
	vb.version = yb,
	vb.defaultFormat = gc,
	vb.ISO_8601 = function() {},
	vb.momentProperties = Kb,
	vb.updateOffset = function() {},
	vb.relativeTimeThreshold = function(b, c) {
		return oc[b] === a
			? !1
			: c === a
				? oc[b]
				: (oc[b] = c, !0)
	},
	vb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
		return vb.locale(a, b)
	}),
	vb.locale = function(a, b) {
		var c;
		return a && (c = "undefined" != typeof b
			? vb.defineLocale(a, b)
			: vb.localeData(a), c && (vb.duration._locale = vb._locale = c)),
		vb._locale._abbr
	},
	vb.defineLocale = function(a, b) {
		return null !== b
			? (b.abbr = a, Jb[a] || (Jb[a] = new l), Jb[a].set(b), vb.locale(a), Jb[a])
			: (delete Jb[a], null)
	},
	vb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
		return vb.localeData(a)
	}),
	vb.localeData = function(a) {
		var b;
		if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)
			return vb._locale;
		if (!w(a)) {
			if (b = L(a))
				return b;
			a = [a]
		}
		return K(a)
	},
	vb.isMoment = function(a) {
		return a instanceof m || null != a && c(a, "_isAMomentObject")
	},
	vb.isDuration = function(a) {
		return a instanceof n
	};
	for (xb = tc.length - 1; xb >= 0; --xb)
		B(tc[xb]);
	vb.normalizeUnits = function(a) {
		return z(a)
	},
	vb.invalid = function(a) {
		var b = vb.utc(0 / 0);
		return null != a
			? o(b._pf, a)
			: b._pf.userInvalidated = !0,
		b
	},
	vb.parseZone = function() {
		return vb.apply(null, arguments).parseZone()
	},
	vb.parseTwoDigitYear = function(a) {
		return C(a) + (C(a) > 68
			? 1900
			: 2e3)
	},
	vb.isDate = x,
	o(vb.fn = m.prototype, {
		clone: function() {
			return vb(this)
		},
		valueOf: function() {
			return + this._d - 6e4 * (this._offset || 0)
		},
		unix: function() {
			return Math.floor(+ this / 1e3)
		},
		toString: function() {
			return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate: function() {
			return this._offset
				? new Date(+ this)
				: this._d
		},
		toISOString: function() {
			var a = vb(this).utc();
			return 0 < a.year() && a.year() <= 9999
				? "function" == typeof Date.prototype.toISOString
					? this.toDate().toISOString()
					: P(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
				: P(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray: function() {
			var a = this;
			return [
				a.year(),
				a.month(),
				a.date(),
				a.hours(),
				a.minutes(),
				a.seconds(),
				a.milliseconds()
			]
		},
		isValid: function() {
			return I(this)
		},
		isDSTShifted: function() {
			return this._a
				? this.isValid() && y(this._a, (this._isUTC
					? vb.utc(this._a)
					: vb(this._a)).toArray()) > 0
				: !1
		},
		parsingFlags: function() {
			return o({}, this._pf)
		},
		invalidAt: function() {
			return this._pf.overflow
		},
		utc: function(a) {
			return this.utcOffset(0, a)
		},
		local: function(a) {
			return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(this._dateUtcOffset(), "m")),
			this
		},
		format: function(a) {
			var b = P(this, a || vb.defaultFormat);
			return this.localeData().postformat(b)
		},
		add: u(1, "add"),
		subtract: u(-1, "subtract"),
		diff: function(a, b, c) {
			var d,
				e,
				f = M(a, this),
				g = 6e4 * (f.utcOffset() - this.utcOffset());
			return b = z(b),
			"year" === b || "month" === b || "quarter" === b
				? (e = j(this, f), "quarter" === b
					? e /= 3
					: "year" === b && (e /= 12))
				: (d = this - f, e = "second" === b
					? d / 1e3
					: "minute" === b
						? d / 6e4
						: "hour" === b
							? d / 36e5
							: "day" === b
								? (d - g) / 864e5
								: "week" === b
									? (d - g) / 6048e5
									: d),
			c
				? e
				: q(e)
		},
		from: function(a, b) {
			return vb.duration({to: this, from: a}).locale(this.locale()).humanize(!b)
		},
		fromNow: function(a) {
			return this.from(vb(), a)
		},
		calendar: function(a) {
			var b = a || vb(),
				c = M(b, this).startOf("day"),
				d = this.diff(c, "days", !0),
				e = -6 > d
					? "sameElse"
					: -1 > d
						? "lastWeek"
						: 0 > d
							? "lastDay"
							: 1 > d
								? "sameDay"
								: 2 > d
									? "nextDay"
									: 7 > d
										? "nextWeek"
										: "sameElse";
			return this.format(this.localeData().calendar(e, this, vb(b)))
		},
		isLeapYear: function() {
			return G(this.year())
		},
		isDST: function() {
			return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
		},
		day: function(a) {
			var b = this._isUTC
				? this._d.getUTCDay()
				: this._d.getDay();
			return null != a
				? (a = gb(a, this.localeData()), this.add(a - b, "d"))
				: b
		},
		month: qb("Month", !0),
		startOf: function(a) {
			switch (a = z(a)) {
				case "year":
					this.month(0);
				case "quarter":
				case "month":
					this.date(1);
				case "week":
				case "isoWeek":
				case "day":
					this.hours(0);
				case "hour":
					this.minutes(0);
				case "minute":
					this.seconds(0);
				case "second":
					this.milliseconds(0)
			}
			return "week" === a
				? this.weekday(0)
				: "isoWeek" === a && this.isoWeekday(1),
			"quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
			this
		},
		endOf: function(b) {
			return b = z(b),
			b === a || "millisecond" === b
				? this
				: this.startOf(b).add(1, "isoWeek" === b
					? "week"
					: b).subtract(1, "ms")
		},
		isAfter: function(a, b) {
			var c;
			return b = z("undefined" != typeof b
				? b
				: "millisecond"),
			"millisecond" === b
				? (a = vb.isMoment(a)
					? a
					: vb(a), + this >+ a)
				: (c = vb.isMoment(a) ?+ a :+ vb(a), c <+ this.clone().startOf(b))
		},
		isBefore: function(a, b) {
			var c;
			return b = z("undefined" != typeof b
				? b
				: "millisecond"),
			"millisecond" === b
				? (a = vb.isMoment(a)
					? a
					: vb(a), + a >+ this)
				: (c = vb.isMoment(a) ?+ a :+ vb(a), + this.clone().endOf(b) < c)
		},
		isBetween: function(a, b, c) {
			return this.isAfter(a, c) && this.isBefore(b, c)
		},
		isSame: function(a, b) {
			var c;
			return b = z(b || "millisecond"),
			"millisecond" === b
				? (a = vb.isMoment(a)
					? a
					: vb(a), + this ===+ a)
				: (c =+ vb(a), + this.clone().startOf(b) <= c && c <=+ this.clone().endOf(b))
		},
		min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = vb.apply(null, arguments),
			this > a
				? this
				: a
		}),
		max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = vb.apply(null, arguments),
			a > this
				? this
				: a
		}),
		zone: f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(a, b) {
			return null != a
				? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this)
				: -this.utcOffset()
		}),
		utcOffset: function(a, b) {
			var c,
				d = this._offset || 0;
			return null != a
				? ("string" == typeof a && (a = S(a)), Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateUtcOffset()), this._offset = a, this._isUTC = !0, null != c && this.add(c, "m"), d !== a && (!b || this._changeInProgress
					? v(this, vb.duration(a - d, "m"), 1, !1)
					: this._changeInProgress || (this._changeInProgress = !0, vb.updateOffset(this, !0), this._changeInProgress = null)), this)
				: this._isUTC
					? d
					: this._dateUtcOffset()
		},
		isLocal: function() {
			return !this._isUTC
		},
		isUtcOffset: function() {
			return this._isUTC
		},
		isUtc: function() {
			return this._isUTC && 0 === this._offset
		},
		zoneAbbr: function() {
			return this._isUTC
				? "UTC"
				: ""
		},
		zoneName: function() {
			return this._isUTC
				? "Coordinated Universal Time"
				: ""
		},
		parseZone: function() {
			return this._tzm
				? this.utcOffset(this._tzm)
				: "string" == typeof this._i && this.utcOffset(S(this._i)),
			this
		},
		hasAlignedHourOffset: function(a) {
			return a = a
				? vb(a).utcOffset()
				: 0,
			(this.utcOffset() - a) % 60 === 0
		},
		daysInMonth: function() {
			return D(this.year(), this.month())
		},
		dayOfYear: function(a) {
			var b = Ab((vb(this).startOf("day") - vb(this).startOf("year")) / 864e5) + 1;
			return null == a
				? b
				: this.add(a - b, "d")
		},
		quarter: function(a) {
			return null == a
				? Math.ceil((this.month() + 1) / 3)
				: this.month(3 * (a - 1) + this.month() % 3)
		},
		weekYear: function(a) {
			var b = jb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
			return null == a
				? b
				: this.add(a - b, "y")
		},
		isoWeekYear: function(a) {
			var b = jb(this, 1, 4).year;
			return null == a
				? b
				: this.add(a - b, "y")
		},
		week: function(a) {
			var b = this.localeData().week(this);
			return null == a
				? b
				: this.add(7 * (a - b), "d")
		},
		isoWeek: function(a) {
			var b = jb(this, 1, 4).week;
			return null == a
				? b
				: this.add(7 * (a - b), "d")
		},
		weekday: function(a) {
			var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
			return null == a
				? b
				: this.add(a - b, "d")
		},
		isoWeekday: function(a) {
			return null == a
				? this.day() || 7
				: this.day(this.day() % 7
					? a
					: a - 7)
		},
		isoWeeksInYear: function() {
			return E(this.year(), 1, 4)
		},
		weeksInYear: function() {
			var a = this.localeData()._week;
			return E(this.year(), a.dow, a.doy)
		},
		get: function(a) {
			return a = z(a),
			this[a]()
		},
		set: function(a, b) {
			var c;
			if ("object" == typeof a)
				for (c in a)
					this.set(c, a[c]);
		else
				a = z(a),
				"function" == typeof this[a] && this[a](b);
			return this
		},
		locale: function(b) {
			var c;
			return b === a
				? this._locale._abbr
				: (c = vb.localeData(b), null != c && (this._locale = c), this)
		},
		lang: f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(b) {
			return b === a
				? this.localeData()
				: this.locale(b)
		}),
		localeData: function() {
			return this._locale
		},
		_dateUtcOffset: function() {
			return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
		}
	}),
	vb.fn.millisecond = vb.fn.milliseconds = qb("Milliseconds", !1),
	vb.fn.second = vb.fn.seconds = qb("Seconds", !1),
	vb.fn.minute = vb.fn.minutes = qb("Minutes", !1),
	vb.fn.hour = vb.fn.hours = qb("Hours", !0),
	vb.fn.date = qb("Date", !0),
	vb.fn.dates = f("dates accessor is deprecated. Use date instead.", qb("Date", !0)),
	vb.fn.year = qb("FullYear", !0),
	vb.fn.years = f("years accessor is deprecated. Use year instead.", qb("FullYear", !0)),
	vb.fn.days = vb.fn.day,
	vb.fn.months = vb.fn.month,
	vb.fn.weeks = vb.fn.week,
	vb.fn.isoWeeks = vb.fn.isoWeek,
	vb.fn.quarters = vb.fn.quarter,
	vb.fn.toJSON = vb.fn.toISOString,
	vb.fn.isUTC = vb.fn.isUtc,
	o(vb.duration.fn = n.prototype, {
		_bubble: function() {
			var a,
				b,
				c,
				d = this._milliseconds,
				e = this._days,
				f = this._months,
				g = this._data,
				h = 0;
			g.milliseconds = d % 1e3,
			a = q(d / 1e3),
			g.seconds = a % 60,
			b = q(a / 60),
			g.minutes = b % 60,
			c = q(b / 60),
			g.hours = c % 24,
			e += q(c / 24),
			h = q(rb(e)),
			e -= q(sb(h)),
			f += q(e / 30),
			e %= 30,
			h += q(f / 12),
			f %= 12,
			g.days = e,
			g.months = f,
			g.years = h
		},
		abs: function() {
			return this._milliseconds = Math.abs(this._milliseconds),
			this._days = Math.abs(this._days),
			this._months = Math.abs(this._months),
			this._data.milliseconds = Math.abs(this._data.milliseconds),
			this._data.seconds = Math.abs(this._data.seconds),
			this._data.minutes = Math.abs(this._data.minutes),
			this._data.hours = Math.abs(this._data.hours),
			this._data.months = Math.abs(this._data.months),
			this._data.years = Math.abs(this._data.years),
			this
		},
		weeks: function() {
			return q(this.days() / 7)
		},
		valueOf: function() {
			return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * C(this._months / 12)
		},
		humanize: function(a) {
			var b = ib(this, !a, this.localeData());
			return a && (b = this.localeData().pastFuture(+ this, b)),
			this.localeData().postformat(b)
		},
		add: function(a, b) {
			var c = vb.duration(a, b);
			return this._milliseconds += c._milliseconds,
			this._days += c._days,
			this._months += c._months,
			this._bubble(),
			this
		},
		subtract: function(a, b) {
			var c = vb.duration(a, b);
			return this._milliseconds -= c._milliseconds,
			this._days -= c._days,
			this._months -= c._months,
			this._bubble(),
			this
		},
		get: function(a) {
			return a = z(a),
			this[a.toLowerCase() + "s"]()
		},
		as: function(a) {
			var b,
				c;
			if (a = z(a), "month" === a || "year" === a)
				return b = this._days + this._milliseconds / 864e5,
				c = this._months + 12 * rb(b),
				"month" === a
					? c
					: c / 12;
			switch (b = this._days + Math.round(sb(this._months / 12)), a) {
				case "week":
					return b / 7 + this._milliseconds / 6048e5;
				case "day":
					return b + this._milliseconds / 864e5;
				case "hour":
					return 24 * b + this._milliseconds / 36e5;
				case "minute":
					return 24 * b * 60 + this._milliseconds / 6e4;
				case "second":
					return 24 * b * 60 * 60 + this._milliseconds / 1e3;
				case "millisecond":
					return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
				default:
					throw new Error("Unknown unit " + a)
			}
		},
		lang: vb.fn.lang,
		locale: vb.fn.locale,
		toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
			return this.toISOString()
		}),
		toISOString: function() {
			var a = Math.abs(this.years()),
				b = Math.abs(this.months()),
				c = Math.abs(this.days()),
				d = Math.abs(this.hours()),
				e = Math.abs(this.minutes()),
				f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
			return this.asSeconds()
				? (this.asSeconds() < 0
					? "-"
					: "") + "P" + (a
					? a + "Y"
					: "") + (b
					? b + "M"
					: "") + (c
					? c + "D"
					: "") + (d || e || f
					? "T"
					: "") + (d
					? d + "H"
					: "") + (e
					? e + "M"
					: "") + (f
					? f + "S"
					: "")
				: "P0D"
		},
		localeData: function() {
			return this._locale
		},
		toJSON: function() {
			return this.toISOString()
		}
	}),
	vb.duration.fn.toString = vb.duration.fn.toISOString;
	for (xb in kc)
		c(kc, xb) && tb(xb.toLowerCase());
	vb.duration.fn.asMilliseconds = function() {
		return this.as("ms")
	},
	vb.duration.fn.asSeconds = function() {
		return this.as("s")
	},
	vb.duration.fn.asMinutes = function() {
		return this.as("m")
	},
	vb.duration.fn.asHours = function() {
		return this.as("h")
	},
	vb.duration.fn.asDays = function() {
		return this.as("d")
	},
	vb.duration.fn.asWeeks = function() {
		return this.as("weeks")
	},
	vb.duration.fn.asMonths = function() {
		return this.as("M")
	},
	vb.duration.fn.asYears = function() {
		return this.as("y")
	},
	vb.locale("en", {
		ordinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function(a) {
			var b = a % 10,
				c = 1 === C(a % 100 / 10)
					? "th"
					: 1 === b
						? "st"
						: 2 === b
							? "nd"
							: 3 === b
								? "rd"
								: "th";
			return a + c
		}
	}),
	Lb
		? module.exports = vb
		: "function" == typeof define && define.amd
			? (define(function(a, b, c) {
				return c.config && c.config() && c.config().noGlobal === !0 && (zb.moment = wb),
				vb
			}), ub(!0))
			: ub()
}).call(this);
/**
 * Resize function without multiple trigger
 *
 * Usage:
 * $(window).smartresize(function(){
 *     // code here
 * });
 */
(function($, sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function(func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this,
				args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			}

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};

	// smartresize
	jQuery.fn[sr] = function(fn) {
		return fn
			? this.bind('resize', debounce(fn))
			: this.trigger(sr);
	};

})(jQuery, 'smartresize');
