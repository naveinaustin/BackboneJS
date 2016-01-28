(function($) {
	function SingleLineSearch() {
		this._defaults = {
			ids: ["name", "term", "emailId"],
	    	operator: ["LIKE","="],
	       	joinOperator: ["AND", "OR"],
	       	availableTags: ["value", "value2"]
		};
	}

	$.extend(SingleLineSearch.prototype, {
	    _split: function ( val ) {
	      return val.split( / \s*/ );
	    },
	    
	    _extractLast: function( term ) {
	      return $.singleLineSearch._split( term ).pop();
	    },

        _registerEvents : function(inst) {
        	$(inst).bind( "keydown", function( event ) {
		        if ( event.keyCode === $.ui.keyCode.TAB &&
		            $( this ).data( "ui-autocomplete" ).menu.active ) {
		          event.preventDefault();
		        }
		    });
        },

        _attachAutcomplete: function(inst, settings) {
        	settings.availableTags = settings.ids;
        	$(inst).autocomplete({
		        minLength: 0,
		        source: function( request, response ) {
		          // delegate back to autocomplete, but extract the last term
		          var params = request.term.split(" ");
		          var lastIndex = params.length - 1;

		          var tempParams = params.filter(function(n){ return n; });
		          if(params[lastIndex] === "") {

		            lastIndex = tempParams.length;
		       
		            if(lastIndex % 4 === 0) {
		              settings.availableTags = settings.ids;
		            } else if(lastIndex % 4 === 1) {
		              settings.availableTags = settings.operator;
		            } else if(lastIndex % 4 === 2) {
		              settings.availableTags = [];
		            } else if(lastIndex % 4 === 3) {
		              settings.availableTags = settings.joinOperator;
		            }
		          }
		          response( $.ui.autocomplete.filter(
		            settings.availableTags, $.singleLineSearch._extractLast( request.term ) ) );
		        },
		        focus: function() {
		          // prevent value inserted on focus
		          return false;
		        },
		        select: function( event, ui ) {
		          var terms = $.singleLineSearch._split( this.value );
		          var temp = terms;
		          // remove the current input_
		          terms.pop();
		          // add the selected item
		          terms.push( ui.item.value );
		          // add placeholder to get the comma-and-space at the end
		          //terms.push( "" );
		          this.value = terms.join( " " );
		          return false;
		        }
		    });
        }
    });

	$.fn.singleLineSearch = function(options) {
		var settings = $.extend($.singleLineSearch._defaults, options);
		return this.each(function() {
			$.singleLineSearch._registerEvents(this);
			$.singleLineSearch._attachAutcomplete(this, settings);
		});
	}

	$.singleLineSearch = new SingleLineSearch();

})(jQuery);