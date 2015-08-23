/// <reference path="mithril.d.ts" />

import m = require('mithril');

var todo:any = {};

todo.Todo = function (data):void {
	this.description = m.prop(data.description);
	this.done = m.prop(false);
};

todo.TodoList = Array;

todo.vm = (function () {
	var vm:any = {};
	vm.init = function ():any {
		vm.list = new todo.TodoList();

		vm.description = m.prop('');

		vm.add = function () {
			if (vm.description()) {
				vm.list.push(new todo.Todo({description: vm.description()}));
				vm.description('');
			}
		}
	}

	return vm;
}());

console.log(todo.vm.description);

todo.controller = function() {
	todo.vm.init()
}

todo.view = function () {

	return m("html", [
		m("body", [
			m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
			m("button", {onclick: todo.vm.add}, "Add"),
			m("table", [
				todo.vm.list.map(function(task, index) {
					return m("tr", [
						m("td", [
							m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
						]),
						m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
					])
				})
			])
		])
	]);
}

m.mount(document, {controller: todo.controller, view: todo.view});