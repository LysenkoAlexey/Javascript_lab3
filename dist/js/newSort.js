const openness = ['Открытый', 'Полуоткрытый', 'Закрытый'];
//alert("newsort")

d3.select("div.main")
     .select("table")
     .select("thead")
     .append("tr")
     .selectAll("th")
     .data(columnNames)
     .enter()
     .append('th');

d3.select("div.main")
   .select("table")
   .select("thead")
   .selectAll("th")
   .data(columnNames)
   .html( function(d){

      return `<th>${d}</th>`;
   })
   .style("display", "");

d3.select("div.main")
     .select("table")
     .select("tbody")
     .selectAll("tr")
     .data(superTable)
     .enter()
     .append('tr');

d3.select("div.main")
   .select("table")
   .select("tbody")

   .selectAll("tr")
   .data(superTable)
   .html( function(d){
     return `<td>${d.number}</td><td>${d.debut}</td><td>${d.moves}</td>
     <td>${d.parties}</td><td>${d.percent}</td><td>${d.openness}</td>`;
     })
   .style("display", "");
     
 /*
 // сформируем список дебютов

 let groupObj = d3.group(superTable, d => d.debut)
 let debut = keys = [...groupObj.keys()];

// формируем поле со списком
 d3.select("div.main")
 .select("select")
 .selectAll("option")
 .data(debut)
 .enter()
 .append('option');

 d3.select("div.main")
 .select("select")
 .selectAll("option")
 .data(debut)
 .text( function(d){
 return d;
 });
 // добавляем опцию "Все дебюты", отвечаем, что она выбрана
 d3.select("div.main")
 .select("select")
 .insert("option", "option")
 .attr("selected", "selected")
 .text("Все дебюты");
 */
 

/*
 function filter(selectDebut) {
    //alert("filtering")
 // все строки делаем видимыми
    d3.select("table")
     .select("tbody")
    .selectAll("tr")
     .style("display", "");

 //делаем невидимыми все строки, кроме нужных
 d3.select("table")
 .select("tbody")
 .selectAll("tr")
 .filter(function (d) {
    
    if(selectDebut!=='Все дебюты')
        return !(d.debut == selectDebut);
    else
        return false;
    })
 .style("display", "none");
}
*/

//let groupObj2 = d3.group(columnNames, d => columnNames)
//let namesOfColumns = keys2 = [...groupObj2.keys()];
// формируем поле со списком
d3.select("div.main")
 .select("select")
 .selectAll("option")
 .data(columnNames)
 .enter()
 .append('option');

d3.select("div.main")
 .select("select")
 .selectAll("option")
 .data(columnNames)
 .text( function(d){
 return d;
 });


 d3.select("div.main")
 .select("select")
 .selectAll("option")
 .data(columnValues)
 .property('value', function(d){
 return d;
 });

//d3.select("select").attr("name", "toFilter");

let CompareData = function (a, b, sortBy, sortBy2, ascOrDes) {

   if (ascOrDes == 'descending') {
      let c = a

      a = b
      b = c
   }

      if  (!isNumberSort[sortBy]) {
         if (a[sortBy] < b[sortBy]) return -1;
         if (a[sortBy] > b[sortBy]) return 1;
      } else {
         if (Number(a[sortBy]) < Number(b[sortBy])) return -1;
         if (Number(a[sortBy]) > Number(b[sortBy])) return 1;
      }


      if (!isNumberSort[sortBy2]) {
         return ( a[sortBy2] > b[sortBy2]) ? -1 : 1
      } else {
         return ( Number(a[sortBy2]) > Number(b[sortBy2])) ? 1 : -1
      }
   
   // else {
   //    if (a[sortBy] < b[sortBy]) return 1;
   //    if (a[sortBy] > b[sortBy]) return -1;

   //    return ( a.sortBy2 > b.sortBy2) ? 1 : -1
   // }
};

let superSort = function() {
   name1 = d3.select('input[name="quest_2"]:checked').node().value
   name2 = d3.select('input[name="quest_3"]:checked').node().value
   name3 = d3.select('input[name="quest_1"]:checked').node().value

   alert('sorting ' + name1 + ' ' + name2 + ' ' + name3)

   d3.select("table")
 .select("tbody")
 .selectAll("tr")
 //.sort(function(a,b) { return d3.ascending(a[name1], b[name1]) ||  d3.ascending(a[name1], b[name2]) })
 .sort(function(a,b) {return CompareData(a, b, name1, name2, name3)})

}

function filter() {
   let selectFilter = d3.select('select[id="toFilter"]').node().value;
   let filterText = d3.select('input[name="filterText"]').node().value;
   console.log(selectFilter);
   console.log(filterText);
   
 // все строки делаем видимыми
    d3.select("table")
     .select("tbody")
    .selectAll("tr")
     .style("display", "");

 //делаем невидимыми все строки, кроме нужных
 if (filterText!=''){
   d3.select("table")
   .select("tbody")
   .selectAll("tr")
   .filter(function (d) {
     console.log(d)
    if (isNumberSort[selectFilter]) {
      return d[selectFilter]>Number(filterText)
    }
    else {
         return !(d[selectFilter].toLowerCase().startsWith(filterText.toLowerCase()))
          }
   })
   .style("display", "none");
   }
}



function reset_filter(){
   d3.select("div.main")
   .select("input")
   .property('value','')
   
   filter()
}
/*
d3.select("table")
 .select("tbody")
 .selectAll("tr")
 .sort(superSort)
 */

let width = 500;
let height = 500;
let marginX = 50;
let marginY = 50;

let svg = d3.select("div.main")
 .append("svg")
 .attr("height", height)
 .attr("width", width)
 .style("border", "solid thin grey");

function functionGraph() {
   d3.selectAll("svg > *").remove();



let counterOp = 0;
let counterHOp = 0;
let counterCl = 0;
let arrGraphFull = [];


   for (let i = 0; i < superTable.length; i++) {
      if (superTable[i].openness == 'Открытый') {
         counterOp++;
      } else if (superTable[i].openness == 'Полуоткрытый') {
         counterHOp++;
      } else {
         counterCl++;
      }
   }

arrGraphFull.push({'x': openness[0], 'f':counterOp});
arrGraphFull.push({'x': openness[1], 'f':counterHOp});
arrGraphFull.push({'x': openness[2], 'f':counterCl});

let minMaxFFull = d3.extent(arrGraphFull.map(d => d.f));
let min = 0;//minMaxFFull[0];
let max = minMaxFFull[1];
console.log(min);
console.log(max);


let xAxisLen = width - 2 * marginX;
let yAxisLen = height - 2 * marginY;
   
    // определяем шкалы для осей
    let scaleX = d3.scaleBand()
    .domain(arrGraphFull.map(function(d) {
        return d.x;
    })
    )
    .range([0, xAxisLen],1);

    let scaleY = d3.scaleLinear()
    .domain([min, max])
    .range([yAxisLen, 0]);
    console.log(scaleX);
    console.log(scaleY);
    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная
   
    let axisY = d3.axisLeft(scaleY);// вертикальная
    console.log(axisX);
    console.log(axisY);
   
    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)";
    });
   
    // отображаем ось OY
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .attr("class", "y-axis")
    .call(axisY);
   
   
    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick")
    .append("line") // добавляем линию
    .classed("grid-line", true) // добавляем класс
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", - (yAxisLen))
   
    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLen)
    .attr("y2", 0);
    


    /*
    svg.append("g")
            .attr("transform", `translate(${ marginX + scaleX.bandwidth()/2}, ${ marginY})`)
            .selectAll(".rect")
            .data(arrGraphFull)
            .enter()
            .append("rect")
            .attr("x", function(d) { return scaleX(d.labelX) + 5; })
            .attr("width", scaleX.bandwidth() - 10)
            .attr("y", function(d) { return scaleY(d.valueMax); })
            .attr("height", function(d) { return yAxisLen - scaleY(d.valueMax); })
            .style("fill", "red")
            .style("stroke", "black")
            .style("stroke-width", "2");
            */
let color = d3.scaleOrdinal(d3.schemeCategory10);
    //создание и отрисовка столбиков гистограммы
g =svg.append("g")
 .attr("transform", `translate(${ marginX}, ${ marginY})`)
 .selectAll(".rect")
 .data(arrGraphFull)
 .enter().append("rect")
 .attr("x", function(d) { return scaleX(d.x) ; })
 .attr("width", scaleX.bandwidth())
 .attr("y", function(d) { return scaleY(d.f); })
 .attr("height", function(d) { return yAxisLen - scaleY(d.f); })
 .attr("fill", function(d) { return color(d.x); });
}

