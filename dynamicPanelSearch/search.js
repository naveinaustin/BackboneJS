$(document).ready(function() {
	window.SearchBox = Backbone.View.extend({
		buttonId: '',
		searchComponents: [],

        template: window.JST['templateLibrary/searchBoxTemplate'],

        searchQuery: {},

        callback: function() {},

	/*	defaults : {
			searchComponents: []
		},*/

		initialize: function(options) {
            this.$el.css('display','none');
            this.buttonId = options.buttonId;
            var searchBlock = this.$el;
            $("#" + this.buttonId).click(function(){
            	searchBlock.slideToggle("slow");
            });

            if(options.callback) {
            	this.callback = options.callback;
            }
        },

        events: {
        	"click #search-go" : "performSearch"
        },

        render: function () {
        	this.$el.html(this.template());

        	for (var i = 0; i < this.searchComponents.length; i++) {
        		var divSOs = this.$el.find('#search-options');
        		
        		var divSO = $('<div class="search-option"></div>');
        		divSO.append(this.searchComponents[i].render().el);
        		divSOs.append(divSO);
        	};
        },

        addSearchComponent : function(searchComponent) {
        	this.searchComponents.push(searchComponent);
        },

        performSearch : function () {
        	var params = {};
        	for (var i = 0; i < this.searchComponents.length; i++) {
        		var data = this.searchComponents[i].getParams();
        		if(!this.searchComponents[i].validate()) {
        			return;
        		}

        		if(!this.checkForMandatoryFields()) {
        			return;
        		}
        		var mandatory = this.searchComponents[i].mandatory;
        		for(var key in data) {
        			if((!data[key] || data[key] === "") && mandatory.indexOf(key) > -1) {
        				throw (key + " is a mandatory field");
        			}
        		}
        		$.extend(params, data);       		
        	};	
        	this.callback(params);
        },

        checkForMandatoryFields: function(data) {
        	var checkForMandatoryFields = true;
        	for(var key in data) {
    			if((!data[key] || data[key] === "") && mandatory.indexOf(key) > -1) {
    				checkForMandatoryFields = false;
    				break;
    			}
    		}
        	return checkForMandatoryFields;
        }
	}); 

	window.SearchComponentView = Backbone.View.extend({
		mandatory: [],
		getParams: function () {
			return {};
		},

		validate: function () {
			return true;
		}
	});

	window.NameSearchView = window.SearchComponentView.extend ({

		template: window.JST['templateLibrary/nameTemplate'],

		render: function() {
			//this.$el.html("<div>Name: <input type='text' id='name'></div>");
			this.$el.html(this.template());
			return this;
		},

		getParams : function () {
			return {name: this.$('#name').val()};
		},

		validate: function () {
			if(this.$('#name').val() === "") {
				console.log("Enter name else we cannot proceed");
				return false;
			}
			return true;
		}
	});

	window.TermSearchView = SearchComponentView.extend({
		template: window.JST['templateLibrary/termTemplate'],

		render: function() {
			//this.$el.html("<div>Term: <input type='text' id='term'></div>");
			this.$el.html(this.template());
			return this;
		},

		getParams : function () {
			//return {term: this.$el.find('#term').val()};
			return {term: this.$('#term').val()};
		},

		mandatory: ['term']
	});

	window.IdnameSearchView = SearchComponentView.extend({
		template: window.JST['templateLibrary/idnameSearchTemplate'],

		render: function() {
			this.$el.html(this.template());
			this.$('')
			return this;
		},

		getParams : function () {
			var variable = this.$('input[name=idnameSearch]:checked').val();
			var jsonVal = {};
			jsonVal[variable] = this.$('#idnameSearchValue').val();
			return jsonVal;
		}/*,

		mandatory: ['emailId']*/
	});

	function searchCallBack(data) {
		console.log (data);
	}

	window.searchBox = new SearchBox({el: "#search-box", buttonId: "searchButton", callback: searchCallBack });
	window.searchBox.addSearchComponent(new window.NameSearchView());
	window.searchBox.addSearchComponent(new window.TermSearchView());
	window.searchBox.addSearchComponent(new window.IdnameSearchView());
	window.searchBox.addSearchComponent(new window.NameSearchView());
	window.searchBox.addSearchComponent(new window.TermSearchView());
	window.searchBox.addSearchComponent(new window.IdnameSearchView());
	window.searchBox.render();
});