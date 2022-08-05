charts.chart1 = function() {
  const margin = {top: 50, right: 50, bottom: 50, left: 50};
  const width = 500;
  const height = 300;
  const parseDateTime = d3.timeParse("%B %d, %Y");
  const svg = d3.select('#svg1')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  const file = 'data/NetflixOriginals.json';
  
  d3.cachedJson(file, 'chart1', function(data) {
    data.forEach(function(d) {
      d.date = parseDateTime(d.Premiere);
    });
    data = data.filter(d => d.date != null);
    const dataGroupedByYear = Array.from(d3.group(data, d => d.date.getFullYear()));
    const finalData = dataGroupedByYear.map(
        function (item) {
          return {
            year: item[0],
            numOriginals: item[1].length
          };
        }
    ).sort((a, b) => (a.year > b.year) ? 1 : -1);

    draw(finalData);
  });

  function draw(data) {
    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) {
          return d.year;
        }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    const y = d3.scaleLinear()
        .domain([0, 200])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.year); })
        .attr("y", function(d) { return y(d.numOriginals); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.numOriginals); })
        .attr("fill", "#E50914")

    const annotations = [
      {
        note: {
          label: "The data is on upward trends since 2014"
        },
        connector: {
          end: "arrow"
        },
        type: d3.annotationLabel,
        x: 450,
        y: 85,
        dx: 0,
        dy: -25
      }
    ]

    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    d3.select("#svg1")
        .append("g")
        .call(makeAnnotations)
  }
}
