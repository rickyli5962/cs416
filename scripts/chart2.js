var finalDataChart2 = [];

// initialise layout variables
const marginChart2 = {top: 50, right: 20, bottom: 50, left: 60};
const widthChart2 = 600;
const heightChart2 = 400;

// initialise charts
const svg = d3.select('#svg2')
    .attr('width', widthChart2 + marginChart2.left + marginChart2.right)
    .attr('height', heightChart2 + marginChart2.top + marginChart2.bottom)
    .append('g')
    .attr('transform', 'translate(' + marginChart2.left + ',' + marginChart2.top + ')')
    .attr('id', 'svg-2-parent-g');



  // get data
  const file = 'data/NetflixOriginals.json';
  d3.cachedJson(file, 'chart1', function(data) {
    data.forEach(function(d) {
      d.date = parseDateTime(d.Premiere);
    });
    data = data.filter(d => d.date != null);
    const dataGroupedByYear = Array.from(d3.group(data, d => d.date.getFullYear()));
    const finalDataChart2 = dataGroupedByYear.map(
         function (item) {
          var sumScores = 0;
          item[1].forEach(d => sumScores += d["IMDB Score"]);
          return {
            year: item[0],
            averageScore: sumScores / item[1].length
          };
        }
    ).sort((a, b) => (a.year > b.year) ? 1 : -1);

    drawChart2(finalDataChart2);
  });


function drawChart2(data) {
  d3.select('#svg-2-parent-g').selectAll('*').remove();
  svg.selectAll('rect').remove();

  const x = d3.scaleBand()
      .range([0, widthChart2])
      .domain(data.map(function (d) {
        return d.year;
      }))
      .padding(0.2);
  svg.append("g")
      .attr("transform", "translate(0," + heightChart2 + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
      .domain([0, 7])
      .range([heightChart2, 0]);
  svg.append("g")
      .call(d3.axisLeft(y));


  svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.year); })
      .attr("y", function(d) { return y(d.averageScore); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return heightChart2 - y(d.averageScore); })
      .attr("fill", "#69b3a2")

  const annotations = [
    {
      note: {
        label: "While Netflix produces more original content year over year, the ratings are declining"
      },
      connector: {
        end: "arrow"
      },
      type: d3.annotationLabel,
      x: 615,
      y: 100,
      dx: 0,
      dy: -25
    }
  ]

    const makeAnnotations = d3.annotation()
        .annotations(annotations);
    d3.select("#svg2")
        .append("g")
        .attr('id', 'svg-2-annotations')
        .call(makeAnnotations);
}
}

