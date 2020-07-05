var data = {
	records: [
		{ empid: 1, fname: "X", lname: "Y" },
		{ empid: 2, fname: "A", lname: "Y" },
		{ empid: 3, fname: "B", lname: "Y" },
		{ empid: 4, fname: "C", lname: "Y" },
		{ empid: 5, fname: "C", lname: "Y" },
	],
};
var empIds = [1];
var filteredArray = data.records.filter(function (itm) {
	return empIds.indexOf(itm.empid) > -1;
});

filteredArray = { records: filteredArray };

console.log(filteredArray);
