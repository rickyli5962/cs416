// initialise fullpage.js
new fullpage('#fullpage', {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  anchors: ['charts'],
  sectionsColor: ['#ADD8E6'],
  autoScrolling: true,
  fitToSection: true,
  slidesNavigation: true,
  slidesNavPosition: 'bottom',

  scrollOverflow: true,

  // events
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


// use local object to cache json response
charts.storage = {};
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
