HTMLWidgets.widget({

  name: 'd3vennR',

  type: 'output',

  initialize: function(el, width, height) {

    return { }

  },

  renderValue: function(el, x, instance) {

    // delete contents of el in case of dynamic / Shiny situation
    el.innerHTML = "";

    var chart = venn.VennDiagram();

    // if options supplied then apply them to the venn diagram
    if(x.options.length > 0){
      x.options.map(function(opt){
        chart[opt] = opt;
      })
    }

    // draw the chart
    d3.select(el).datum( x.data ).call(chart);

    // set up a container for tasks to perform after completion
    //  one example would be add callbacks for event handling
    //  styling
    if (!(typeof x.tasks === "undefined") ){
      if ( (typeof x.tasks.length === "undefined") ||
       (typeof x.tasks === "function" ) ) {
         // handle a function not enclosed in array
         // should be able to remove once using jsonlite
         x.tasks = [x.tasks];
      }
      x.tasks.map(function(t){
        // for each tasks add it to the mermaid.tasks with el
        t.call(el);
      })
    }

  },

  resize: function(el, width, height, instance) {

  }

});
