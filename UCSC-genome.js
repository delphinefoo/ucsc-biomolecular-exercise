var Cases = new Mongo.Collection('cases');

if (Meteor.isClient) {

    var patients = [
      {
          name: "patient1",
          disease: "liver cancer",
          location: "ohsu",
      },

      {
          name: "patient2",
          disease: "kidney cancer",
          location: "ucla",
      },


      {
          name: "patient3",
          disease: "lung cancer",
          location: "ucsf",
      },


      {
          name: "patient4",
          disease: "lung cancer",
          location: "mskcc",
      },

      {
          name: "patient5",
          disease: "kidney cancer",
          location: "ohsu",
      },

      {
          name: "patient6",
          disease: "lung cancer",
          location: "ucla",
      },


      {
          name: "patient7",
          disease: "lymphoma cancer",
          location: "ucsf",
      },


      {
          name: "patient8",
          disease: "lung cancer",
          location: "mskcc",
      }
    ];

    var totalCounts = {};
    var dataSet = [];
    var divByLoc = {};

    patients.forEach(function(patient) {
      totalCounts[patient.disease] = totalCounts[patient.disease] + 1 || 1;
    });

    console.log(totalCounts);

    for (var key in totalCounts) {
      var obj = {};
      obj.disease = key;
      obj.qty = totalCounts[key];
      patients.forEach(function(patient) {
        if (patient.disease === key) {
          obj[patient.location] = obj[patient.location] + 1 || 1;
        }
      });
      dataSet.push(obj);
    }

    console.log(dataSet);

    dataSet.forEach(function(cancerType) {
      cancerType.locations = [];
      for (var key in cancerType) {
        if (key !== 'disease' && key !== 'qty' && key !== 'locations') {
          var obj = {};
          obj[key] = cancerType[key];
          cancerType.locations.push(obj);
        }
      }
    });

    console.log(dataSet);

  Template.cancerCount.onRendered(function() {
    var value_color_scale =  ["red", "green", "blue", "orange", "black", "yellow"];
    var value_color_scale_i = 0;
    var value_color_map = {};

    function color_map(attribute, value) {
      //create a key identified by the attribute and value
      var key = attribute+";"+value;
      //if the key exists in the object
      if (!(key in value_color_map)) {
        //set the value to the element at index found by incrementing color scale modulo length of array
        value_color_map[attribute+";"+value] = value_color_scale[ value_color_scale_i++ % value_color_scale.length];
      }
      //return this value, which is the color in the array
      return value_color_map[key];
    }


    var h = 300;
    var w = 450;

    var svg = d3.select('#barChart')
                .attr('width', w)
                .attr('height', h);

    var bars = svg.selectAll('rect')
                   .data(dataSet)
                   .enter()
                   .append('rect')
                   .attr('class', function(d) {
                    return d.disease;
                   })
                   .attr('x', function(d, i) {
                    return i * 71;
                   })
                   .attr('y', function(d) {
                    return h - d.qty * 50;
                   })
                   .attr('width', 70)
                   .attr('height', function(d) {
                    return d.qty * 50;
                   })
                   .attr('fill', function(d) {
                      return color_map(d.disease, d.qty);
                   })
                   .append('svg:title')
                   .text(function(d) {
                    return d.disease;
                   });

    var labelDiv = d3.select('body')
                     .append('div')
                     .attr('id', 'labels')

    var labels = d3.select('#labels')
                   .selectAll('div')
                    .data(dataSet)
                    .enter()
                    .append('div')
                    .style({'margin': '10px', 'display': 'inline-block', 'width': '50px'})
                    .text(function(d) {
                      return d.disease + ': ' + d.qty + (d.qty > 1 ? ' cases' : ' case');
                    });
  });

}