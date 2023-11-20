const root = am5.Root.new("chartdiv");

let oldtags = []

root.setThemes([
    am5themes_Animated.new(root)
]);

let series = root.container.children.push(am5wc.WordCloud.new(root, {
    categoryField: "tag",
    valueField: "weight",
    minFontSize: am5.percent(3),
    maxFontSize: am5.percent(17)
}));

series.labels.template.setAll({
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: "Open Sans",
    fill: am5.color(0xe7e4dc)
});

setInterval(function () {
    GetTags()
}, 5000)

function GetTags() {
    fetch("/gettags", {
        method: "GET",
    })
        .then(res => res.text())
        .then(str => {
            tagsArray = str.split(';')
            tagsArray.pop()
            if (!arrEqual(tagsArray, oldtags)) {
                const res = tagsArray.reduce((acc, i) => {
                    oldtags = [...tagsArray]
                    if (acc.hasOwnProperty(i)) {
                        acc[i] += 1;
                    } else {
                        acc[i] = 1;
                    }
                    return acc;
                }, {})
                console.log(res);
    
                updatetags = []
                Object.entries(res).forEach(([key, value]) => {
                    updatetags.push({ tag : `${key}`, weight: value*1.5})
                });
                series.data.setAll(updatetags);
            }
        })
        .catch(err => console.error(err))
}

function arrEqual(a, b) {
    if (a.length != b.length) return false
    for (let i = 0; i < a.length; i++)
        if (a[i] != b[i]) return false
    return true
}