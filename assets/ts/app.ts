/// <reference path="mithril.d.ts" />

import m = require('mithril');

class Todo {
	description:_mithril.MithrilProperty<string>;
	done:_mithril.MithrilProperty<boolean>;

	constructor(params) {
		this.description = m.prop(params.description);
		this.done = m.prop(false);
	}
}

class TodoController implements _mithril.MithrilController {
	list:Todo[];
	description:_mithril.MithrilProperty<string>;
	add:() => void;

	constructor() {
		this.description = m.prop('');
		this.list = [];

		this.add = () => {
			if (this.description()) {
				this.list.push(new Todo({description: this.description()}));
				this.description('');
			}
		}
	}
}

var todoControllerFunction:_mithril.MithrilControllerFunction = function () {
	return new TodoController();
};


var todoView:_mithril.MithrilView<TodoController> = function (ctrl:TodoController) {
	return m("html", [
		m("body", [
			m("input", {onchange: m.withAttr("value", ctrl.description), value: ctrl.description()}),
			m("button", {onclick: ctrl.add}, "Add"),
			m("table", [
				ctrl.list.map(function (task, index) {
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
};

var todoComponent:_mithril.MithrilComponent<TodoController> = {
	controller: todoControllerFunction,
	view: todoView
};

m.mount(document, todoComponent);
