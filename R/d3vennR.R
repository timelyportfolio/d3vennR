#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
d3vennR <- function(message, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd3vennR',
    x,
    width = width,
    height = height,
    package = 'd3vennR'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
d3vennROutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'd3vennR', width, height, package = 'd3vennR')
}

#' Widget render function for use in Shiny
#'
#' @export
renderD3vennR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, d3vennROutput, env, quoted = TRUE)
}
