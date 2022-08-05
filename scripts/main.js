new fullpage('#fullpage', {
  anchors: ['charts'],
  sectionsColor: ['#ffffff'],
  autoScrolling: true,
  fitToSection: true,
  slidesNavigation: true,
  slidesNavPosition: 'top',

  scrollOverflow: true,

  afterSlideLoad: function(section, origin, destination, direction) {
    var numberOfIntroduction = 2;
    if (destination.index <= numberOfIntroduction || destination.index > numberOfIntroduction + 3) {
      return;
    }

    var chartFunc = charts['chart' + (destination.index - numberOfIntroduction)];
    chartFunc();
  },
  onSlideLeave: function(section, origin, destination, direction) {
    if (destination.index === 6) {

    }
  }
});

// fullpage_api.setAllowScrolling(false);

charts.storage = {};
// @param callback: a function that works on k, i.e. of the form function(k) {}
d3.cachedJson = function(url, key, callback) {
	if (charts.storage[key]) {
		callback(JSON.parse(charts.storage[key]));
	} else {
		d3.json(url, function(json) {
      charts.storage[key] = JSON.stringify(json);
      callback(json);
    });
	}
}
