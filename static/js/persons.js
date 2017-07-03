// global properties
var Properties = (function() {
	var module = {};
	module.API = "https://jsonplaceholder.typicode.com/users"; // API URL for fetching the JSON user data (in case of sensitive data, the fetch should be done server side)
	module.names = [];
	module.emails = [];
	module.names_emails_hash = {}; // for getting the correct email for sorted names list
	module.selectedNames = []; // checkbox was checked on these names (rows)
	module.numberOfSelectedNames = 0;
	module.PERSONS_BODY = "#personsTable tbody";
	return module;
}());

(function() {
	$(document).ready(function() {
		Get.fetchPersonsBatch(); // fetch person data immediately when the document is ready & loaded
	});
})();


// REST Get for fetching data from the third party API
var Get = (function() {

	var module = {};

	/*
		AJAX function to fetch the data from the API (url)
		In case of sensitive data, the fetch should be done server side without revealing the URL.
	*/
	module.fetchPersonsBatch = function() {

		$.ajax({
			url: Properties.API,
			type: "GET",
			dataType: "json",
			success: this.processData,
			error: this.error
		});
	};


	/* Processes the fetched JSON data.
		 Creates arrays of names and emails in Properties and sorts the names in ASC alpha order.
		 Creates names_email_hash to keep track of (name, email) pairs after sorting.
		 Further outputs the data to the web page by adding names and email rows to the HTML table.
	*/
	module.processData = function(data) {

		$.each(data, function(idx) {
			var name = data[idx].name;
			var email = data[idx].email;
			Properties.names[idx] = name;
			Properties.emails[idx] = email;
			Properties.names_emails_hash[name] = email; // create hash for preserving order of names/emails after sorting
		});

		Properties.names.sort(); // names need to be sorted in ASCENDING order before displaying & sort(); this default sorting does it right!

		$.each(data, function(idx) {

			var name = Properties.names[idx];
			var email = Properties.names_emails_hash[name]; // get the correct email (after ASC name sort) from the hash!

			var nameRow = '<tr class="name"><td style="text-align:center; background-color:#D9D9D9; border: none" rowspan = "2"><input id="' + idx +
				'"type="checkbox" style="background-color: white" onclick="handleClick(this)" /></td><td style="text-align:left; background-color:#E9E9E9">' + name + '</td></tr>';
			$(nameRow).appendTo(Properties.PERSONS_BODY);
			var emailRow = '<tr class="email">' + '<td style="text-align:left; background-color:#FFFFFF">' + email + '</td>' + '</tr>';
			$(emailRow).appendTo(Properties.PERSONS_BODY);
			var emptyRow = '<tr class="space"><td colspan="2"></td></tr>';
			$(emptyRow).appendTo(Properties.PERSONS_BODY);
		});
	};

	// alert on errors in async AJAX data retrieving
	module.error = function(jqXHR, exception) {
		if (jqXHR.status && jqXHR.status == 400) {
			alert(jqXHR.responseText);
		} else {
			alert("Error while fetching JSON data.");
		}
	};
	return module;
}());


// if checkBox was checked, add corresponding name to the selectedNames array otherwise assign null to the array
function handleClick(cb) {
	$(".select").css({
		fontSize: 18
	});

	if (cb.checked) {
		Properties.selectedNames[cb.id] = Properties.names[cb.id];
		Properties.numberOfSelectedNames++;
	} else {
		Properties.selectedNames[cb.id] = null; // essentially remove the element from the array
		Properties.numberOfSelectedNames--;
	}
	if (Properties.numberOfSelectedNames > 0) { // if no names were selected, don't display 'X of Y selected' text
		$(".select").text("" + Properties.numberOfSelectedNames + " of " + Properties.names.length + " selected");
	} else {
		$(".select").text("");
	}
}

// output the selected names both in console & in an alert dialog
var OutputSelected = (function() {

	var module = {};

	module.output = function() {

		var selectedNames = "";

		for (var i = 0; i < Properties.selectedNames.length; i++) {

			var name = Properties.selectedNames[i];

			if (name != null && typeof name !== "undefined") {
				console.log(name);
				selectedNames = selectedNames + '\n' + name;
			}
		}
		if (Properties.numberOfSelectedNames > 0) {
			alert(selectedNames);
		} else {
			alert("No names were selected.");
		}

	};
	return module;
}());
