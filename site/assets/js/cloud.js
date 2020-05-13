anychart.onDocumentReady(function() {
    var subjects = [
       // {"x": "religion", "value" : 14},
            {"x": "african solidarity", "value": 12},
            {"x": "afropolitanism", "value": 1},
            {"x": "aging", "value": 2},
            {"x": "anticolonialism", "value": 1},
            {"x": "beauty of Africa", "value": 3},
            {"x": "blackness", "value": 5},
            {"x": "blessedness of Africa", "value": 2},
            {"x": "brotherhood", "value": 1},
            {"x": "celebration of life", "value": 1},
            {"x": "childhood", "value": 1},
            {"x": "daughter", "value": 1},
            {"x": "death", "value": 1},
            {"x": "destiny of humankind", "value": 1},
            {"x": "dreams", "value": 1},
            {"x": "dying", "value": 1},
            {"x": "eternity", "value": 1},
            {"x": "father", "value": 1},
            {"x": "God", "value": 2},
            {"x": "gratitude", "value": 1},
            {"x": "hope", "value": 1},
            {"x": "humanity", "value": 2},
            {"x": "life", "value": 1},
            {"x": "looking back", "value": 1},
            {"x": "love", "value": 10},
            {"x": "music and society", "value": 1},
            {"x": "panafricanist ideal", "value": 1},
            {"x": "peace", "value": 1},
            {"x": "poverty", "value": 1},
            {"x": "social classes", "value": 1},
            {"x": "spiritual connection to the Earth", "value": 1},
            {"x": "Tam-Tam", "value": 1},
            {"x": "time", "value": 1},
            {"x": "women", "value": 1},
            {"x": "work", "value": 1},
            {"x": "world peace", "value": 1}
    ];
    for(i = 0; i < subjects.length; i++){
        subjects[i].value = subjects[i].value * 4;
    }
    // create a tag (word) cloud chart
    var chart = anychart.tagCloud(subjects);

    // set a chart title
    chart.title('Explore by Subject')
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    //chart.textSpacing(12);
    chart.scale(anychart.scales.log());

    // create and configure a color scale.
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(["#f57542", "#f5dd42"]);

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);

    //chart.tooltip().format("{%yPercentOfTotal}% ({%value})");
    chart.tooltip().format(function() {
        var true_value = this.getData("value")/4;
        return true_value + " poems";
    });

    // display the word cloud chart
    chart.container("container");
    chart.draw();

    chart.listen("pointClick", function(e){
        var url = "/explore/" + e.point.get("x");
        window.open(url, "_blank");
      });
});




