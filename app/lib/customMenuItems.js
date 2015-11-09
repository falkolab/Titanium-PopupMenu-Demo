module.exports = function() {
	return _.map(_.range(1,11), function(num) {
		return {
			title: "Item title #" + num,
			description: "description #" + num
		};
	}); 
};
