var cName = document.getElementById("cName");
var forces = document.getElementById("forces");

let nameAdder = function () {
    return new Promise(function (resolve, reject) {
        fetch("https://data.police.uk/api/crime-categories").then(function (res) {
            return res.json();
        }).then(function (res) {
            resolve(res)
        })
    })
}

nameAdder().then(function (res) {
    for (var i = 0; i < res.length; i++) {
        var options = document.createElement("option");
        options.setAttribute("value", res[i].url);
        options.innerHTML = res[i].name;
        cName.appendChild(options)
    }
});



let forceAdder = function () {
    return new Promise(function (resolve, reject) {
        fetch("https://data.police.uk/api/forces").then(function (res) {
            return res.json();
        }).then(function (res) {
            resolve(res)
        })
    })
}

forceAdder().then(function (res) {
    for (var i = 0; i < res.length; i++) {
        var options = document.createElement("option");
        options.setAttribute("value", res[i].id);
        options.innerHTML = res[i].name;
        forces.appendChild(options)
    }
})


let onSubmit = () => {

    ///  load
    var div = document.getElementById("results");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    var img = document.createElement("img");
    img.id = "img";
    img.src = "images/loading.gif";
    img.alt = "Responsive image";
    img.className = "img-fluid";
    var loadDiv = document.getElementById("load");
    loadDiv.appendChild(img);

    let selectedName = document.getElementById("selectedName").value;
    let selectedForce = document.getElementById("selectedForce").value;
    var url = "https://data.police.uk/api/crimes-no-location?category=" + selectedName + "&force=" + selectedForce;
    let getData = function () {
        return new Promise(function (resolve, reject) {
            fetch(url).then(function (res) {
                return res.json();
            }).then(function (res) {
                resolve(res)
            })
        })
    }

    var table = document.getElementById("table");
    getData().then(function (res) {
        var div = document.getElementById("results");
        var removeImg = document.getElementById("img");
        removeImg.remove();
        if (!res.length) {
            var noResult = document.createElement("h1");
            noResult.id = "noResult"
            noResult.innerHTML = "NO RESULTS FOUND!!!"
            div.appendChild(noResult);
            return false;
        } else {
            var newTable = document.createElement("table");
            var tr = document.createElement("tr");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            var th4 = document.createElement("th");
            var th5 = document.createElement("th");
            newTable.id = "table";
            newTable.border = "1";
            th1.innerHTML = "#";
            th1.id = "index";
            th2.innerHTML = "Category"
            th2.id = "cat";
            th3.innerHTML = "Date"
            th3.id = "date";
            th4.innerHTML = "ID"
            th4.id = "id";
            th5.innerHTML = "Status"
            th5.id = "status";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            newTable.appendChild(tr);
            for (var j = 0; j < res.length; j++) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var th = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                var td4 = document.createElement("td");
                td1.innerHTML = j;
                th.innerHTML = res[j].category;
                td2.innerHTML = res[j].month;
                td3.innerHTML = res[j].id;
                if (res[j].outcome_status != null) {
                    td4.innerHTML = res[j].outcome_status.category;
                } else {
                    td4.innerHTML = "-";
                }
                td1.className = "align";
                td2.className = "align";
                td3.className = "align";
                td4.className = "align";
                th.className = "align";
                tr.appendChild(td1);
                tr.appendChild(th);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                newTable.appendChild(tr);
            }
            div.appendChild(newTable);
        }
    })


    return false
}



