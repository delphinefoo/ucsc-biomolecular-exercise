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

    var dataSet = {};
    patients.forEach(function(patient) {
      var key = patient['disease'] + ' - ' + patient['location'];
      dataSet[key] = dataSet[key] + 1 || 1;
    })
    console.log(dataSet);

  Template.cancerCount.onRendered(function() {
    var svg = d3.select('#barChart')
    var bars = svg.selectAll('div')
                   .data(dataSet)
                   .enter()
                   .append('div')
                   .style('width', function(d, i) {
                      console.log(d);
                   })
                   .style({'height': '50px', 'background-color': 'blue', 'margin': '10px'});


  });

}

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     var patients = [
//       {
//           name: "patient1",
//           disease: "liver cancer",
//           location: "ohsu",
//       },

//       {
//           name: "patient2",
//           disease: "kidney cancer",
//           location: "ucla",
//       },


//       {
//           name: "patient3",
//           disease: "lung cancer",
//           location: "ucsf",
//       },


//       {
//           name: "patient4",
//           disease: "lung cancer",
//           location: "mskcc",
//       },

//       {
//           name: "patient5",
//           disease: "kidney cancer",
//           location: "ohsu",
//       },

//       {
//           name: "patient6",
//           disease: "lung cancer",
//           location: "ucla",
//       },


//       {
//           name: "patient7",
//           disease: "lymphoma cancer",
//           location: "ucsf",
//       },


//       {
//           name: "patient8",
//           disease: "lung cancer",
//           location: "mskcc",
//       }
//     ];

//     if (Cases.find().count() === 0) {
//       patients.forEach(function(patient) {
//         Cases.insert(patient);
//       })
//     }
//   });
// }