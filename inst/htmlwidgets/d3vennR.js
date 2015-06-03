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
    if( Object.keys(x.options).length > 0 ) {
      Object.keys(x.options).map(function(opt){
        if( !(x.options[opt]===null) && !(typeof chart[opt] === "undefined" ) ){
          chart[opt](x.options[opt]);
        }
      })
    }

    // if height and width specified then applied above
    //   however if not, we will size based on the container div bounding box
    if( x.options.height === null ){
      chart.height( el.getBoundingClientRect().height );
    }
    if( x.options.width === null ){
      chart.width( el.getBoundingClientRect().width );
    }

    // draw the chart
    d3.select(el).datum( x.data ).call(chart);

    // use expando property to add venn to the el dom
    el.venn = chart;

    // set up a container for tasks to perform after completion
    //  one example would be add callbacks for event handling
    //  styling
    if (!(typeof x.tasks === "undefined" || x.tasks === null) ){
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
