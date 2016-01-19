(function ($) {
    'use strict';
    function SmoothSort(el, options) {
        var that = this,
            defaults = {
                itemSelector: 'li',
                itemHeight: 'auto',
                itemHeightStatic: true,
                animate: 250,
                attrSort: 'data-sort'
            };

        that.element = el;
        that.el = $(el);
        that.items = [];
        that.height = 0;
        that.eventSort = false;
        that.options = $.extend({}, defaults, options);

        that.initialize();
    }

    $.SmoothSort = SmoothSort;

    SmoothSort.prototype = {

        initialize: function () {
            var that = this,
                options = that.options;

            that.el.css({
                position: 'relative',
                'overflow-y': 'hidden',
                outline: 'none',
                transition: 'height ' + options.animate + 'ms ease-out'
            });
            that.setHeight(that.setItems(that.el.find(options.itemSelector)))
            that.el.height(that.height);
            that.sort();
        },

        setSort: function (data) {
            var that = this;
            var el = data.el,
                sort = data.sort;

            $.each(that.items, function (i, item) {
                if (item.el[0] === el[0] && item.sort != sort) {
                    item.sort = Math.floor(sort);
                    that.eventSort = true;
                }
            });
        },

        remove: function (el) {
            var that = this;

            if (typeof el !== "undefined") {
                var index = undefined;
                $.each(that.items, function (i, item) {
                    if (item.el[0] === el[0]) {
                        index = i;
                    }
                });
                if (typeof index !== "undefined") {
                    that.setHeight([that.items[index]], true);
                    that.items[index].el.remove();
                    that.items.splice(index, 1);
                    that.eventSort = true;
                    that.el.height(that.height);
                }
            } else {
                that.height = 0;
                that.eventSort = true;
                $.each(that.items, function (i, item) {
                    item.el.remove();
                    that.items.slice(i, 1);
                });
                that.el.height(that.height);
            }
        },

        setItems: function (items) {
            var that = this,
                options = that.options;

            var push = [];
            items.each(function (i, el) {
                var item = {
                    sort: Math.floor($(el).attr(options.attrSort)),
                    height: options.itemHeightStatic ? $(el).height() : null,
                    el: $(el).css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        visibility: 'visible',
                        transition: 'transform ' + options.animate + 'ms ease-out, opacity ' + options.animate + 'ms ease-out',
                        opacity: 1
                    })
                };
                that.items.push(item);
                push.push(item);
                that.eventSort = true;
            });
            return push;
        },

        add: function (items) {
            var that = this,
                options = that.options;

            var $items = $(items);
            that.el.append($items);

            that.setHeight(that.setItems($items.filter(options.itemSelector)));
            that.el.height(that.height);
        },

        sort: function () {
            var that = this,
                options = that.options;

            if (that.eventSort) {
                that.items.sort(function (a, b) {
                    if (a.sort > b.sort) return 1;
                    if (a.sort < b.sort) return -1;
                });
                var height = 0;
                if (options.itemHeight === 'auto') {
                    if (options.itemHeightStatic) {
                        $.each(that.items, function (i, item) {
                            item.el.css('transform', 'translate3d(0px, ' + height + 'px, 0px) scale3d(1, 1, 1)');
                            height += item.height;
                        });
                    } else {
                        $.each(that.items, function (i, item) {
                            item.el.css('transform', 'translate3d(0px, ' + height + 'px, 0px) scale3d(1, 1, 1)');
                            height += item.el.height();
                        });
                    }
                } else {
                    $.each(that.items, function (i, item) {
                        item.el.css('transform', 'translate3d(0px, ' + height + 'px, 0px) scale3d(1, 1, 1)');
                        height += options.itemHeight;
                    });
                }
                that.eventSort = false;
            }
        },

        setHeight: function (items, remove) {
            var that = this,
                options = that.options;

            var height = 0;
            if (options.itemHeight === 'auto') {
                if (options.itemHeightStatic) {
                    $.each(items, function (i, item) {
                        height += item.height;
                    });
                } else {
                    $.each(items, function (i, item) {
                        height += item.el.height();
                    });
                }
            } else {
                height = options.itemHeight * items.length
            }
            if (typeof remove !== "undefined" && remove) {
                that.height -= height;
            } else {
                that.height += height;
            }
        }
    };

    $.fn.smoothSort = function (options, args) {
        var dataKey = 'smoothSort';
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                instance = new SmoothSort(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
})(jQuery);