window.JST = window.JST || {}

window.JST['templateLibrary/searchBoxTemplate'] = _.template('<div id="search-options" class="search-options-section"></div><div id="search-go-1" class="search-go-section"><input type="button" value="Go" id="search-go"/></div>');
window.JST['templateLibrary/nameTemplate'] = _.template("<div>Name: <input type='text' id='name'></div>");
window.JST['templateLibrary/termTemplate'] = _.template("<div>Term: <input type='text' id='term'></div>");
window.JST['templateLibrary/idnameSearchTemplate'] = _.template('<div>		<input type="radio" name="idnameSearch" value="id">Id<input	<input type="radio" name="idnameSearch" value="name">Name</input>		<input type="radio" name="idnameSearch" value="emailId">Email Id</input><br/>		<input type="input" id="idnameSearchValue" value=""/>	</div>');