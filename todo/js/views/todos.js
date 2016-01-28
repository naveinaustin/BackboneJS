var app = app || {};

app.TodoView = Backbone.View.extend({

	tagName: 'li',

	template: _.template( $('#item-template').html() ),

	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close',
		'click .toggle': 'toggleCompleted',
		'click .destroy': 'clear'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		this.$input = this.$('.edit');
		return this;
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function() {
		var value = this.$input.val().trim();
		if ( value ) {
			this.model.save({ title: value });
		}
		this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	},
	
	toggleCompleted: function() {
		this.model.toggle();
	},
	
	toggleVisible: function() {
		this.$el.toggleClass('hidden', this.isHidden());
	},
	
	isHidden : function () {
		var isCompleted = this.model.get('completed');
		return ( // hidden cases only
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
		);
	},
	
	clear: function() {
		this.model.destroy();
	}
});