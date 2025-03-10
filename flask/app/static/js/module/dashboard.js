//送到後端程式
function postfun(url,param){
    $('button').prop("disabled", true); //按鈕關閉

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(param),
    }).then((response) => {
        return response.json();
    }).then((jsonData) => {  //完成時
        console.log(jsonData);
        alert(''+jsonData.status);
        location.reload();
    }).catch((err) => {
        console.log(err);
        alert('The Property Update Faile');
        $('#showModal').modal('toggle');     //關閉Modal
        $('button').prop("disabled", false); //按鈕關閉
    });
}

//建立新Scene彈跳視窗
function editPage(){
    //console.log(data);
    $('#ModalLabel').text('Edit Scene');
    let str = '<form>';
        str += '<div class="form-row d-flex justify-content-center">';
        //Scene Name欄位
        str += '<div class="form-group col-12">';
        str += '<label for="scene">Scene Name:</label>';
        str += '<input type="text" id="scene" class="form-control" value="'+data['scene']+'" >'; //value 帶入後端值
        str += '</div>';
        str += '</div>';
        str += '</form>';

    $('.body-content').html(str);
    $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"acteditPage('"+data['_id']+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}

//執行更新Scene 名稱
// param: db_id: scene db 索引值
function acteditPage(db_id){
    let scene = $('#scene').val();
    //console.log(scene);
    let url = '***';  //**填入API
    let param = {"scene": scene, "db_id": db_id}

    postfun(url, param);
}


//確認刪除Scene 提示訊息
// param: db_id(Page頁面的索引值)
function confirmDelModal(db_id){
    //console.log(db_id);
    $('#ModalLabel').text( 'Delete Scene' );
    $('.body-content').text( 'Confirm to delete the scene?' );
    $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"actionDelPage("+db_id+")\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}

// 刪除Scene。後端需一併刪除所有的頁籤(Tabs)
// param: db_id: scene db 索引值
function actionDelPage(db_id){
    let url = '***';  //**填入API
    let param = {"db_id": db_id}

    postfun(url, param);
}

//轉向其他頁籤
// param: db_id: tabs db 索引值
function direction(event, db_id){
    event.stopPropagation();
    location.href = '/dashboard/'+db_id;
}

//頁籤的彈跳視窗
// param: event: 點擊事件, db_id: tabs db 索引值
function editTabs(event, jsonData){
    event.stopPropagation(); // 防止事件冒泡，避免觸發 direction()
    let obj = JSON.parse(jsonData);
    //console.log(obj['_id']);
    $('#ModalLabel').text('Edit Tabs');
    let str = '<form>';
        str += '<div class="form-row d-flex justify-content-center">';
        //Scene Name欄位
        str += '<div class="form-group col-12">';
        str += '<label for="scene">Tabs Name:</label>';
        str += '<input type="text" id="tabs" class="form-control" value="'+obj['name']+'" >'; //value 帶入後端值
        str += '</div>';
        str += '</div>';
        str += '</form>';

    $('.body-content').html(str);
    $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"acteditTabs('"+obj['_id']+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button><button type='button' class='btn btn-danger' data-dismiss='modal' onClick=\"actdelTabs('"+obj['_id']+"')\">Delete</button>");

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}


// 編輯Tabs。
// param: db_id: tabs db 索引值
function acteditTabs(db_id){
    let tabs = $('#tabs').val();
    //console.log(scene);
    let url = '***';  //**填入API
    let param = {"tabs": tabs, "db_id": db_id}

    postfun(url, param);
}


// 刪除Tabs。
// param: db_id: tabs db 索引值
function actdelTabs(db_id){
    //console.log(scene);
    let url = '***';  //**填入API
    let param = {"db_id": db_id}

    postfun(url, param);
}

// 新增Tabs的彈跳視窗。
// param: db_id: Scene db 索引值
function createTabs(db_id){
    $('#ModalLabel').text('Create Tabs');
    let str = '<form>';
        str += '<div class="form-row d-flex justify-content-center">';
        //Scene Name欄位
        str += '<div class="form-group col-12">';
        str += '<label for="scene">Tabs Name:</label>';
        str += '<input type="text" id="tabs" class="form-control" value="" >'; //value 帶入後端值
        str += '</div>';
        str += '</div>';
        str += '</form>';

    $('.body-content').html(str);
    $('.footer-content').html("<button type='button' class='btn btn-secondary login100-form-title text-white' onClick=\"actcreateTabs('"+db_id+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}

// 新增Tabs。
// param: db_id: Scene db 索引值
function actcreateTabs(db_id){
    let tabs = $('#tabs').val();
    //console.log(scene);
    let url = '***';  //**填入API
    let param = {"tabs": tabs, "db_id": db_id}

    if(tabs == ''){
        alert('Please fill in required data.');
    }
    else{
        postfun(url, param);
    }
}


// 產生 Card 內含 Chart.js
// param: meter_name 標題, db_id
/*
function createCard(meter_name, db_id) {
    return `
        <div class="grid-stack-item-content">
            <div class="card h-100 w-100">
                <div class="card-header d-flex justify-content-between">
                    <span>${meter_name} <i class="fa fa-exclamation-triangle mx-1 text-danger" aria-hidden="true"></i></span>
                    <span class="h6"><i class="fa fa-trash" onclick="removeWidget(this, '${db_id}')"></i></span>
                </div>
                <div class="card-body">
                    <canvas id="chart-${db_id}" style="border: 0px solid #ff0000;"></canvas>
                </div>
            </div>
        </div>
    `;
}
*/
function createCard(meter_name, db_id, type) {
    return new Promise(function(resolve, reject) {
        //console.log(type);
        let str = '';
        str += '<div class="grid-stack-item-content">';
        if(type == 8){   
            str += '<div id="map"></div>'; 
        }
        else{    
            str += '<div class="card h-100 w-100">';
            str += '<div class="card-header d-flex justify-content-between">';
            str += '<span>'+meter_name+' <i id="warn-'+db_id+'" class="fa fa-exclamation-triangle mx-1 text-danger" aria-hidden="true" style="display: none;"></i> </span>';
            str += '<span class="h6"><i class="fa fa-trash" onclick="removeWidget(this, \''+db_id+'}\')"></i></span>';
            str += '</div>';
            //str += '<div class="card-body">';
            if(type == 0){
                //str += '<div class="card-body d-flex align-items-center justify-content-center">';
                str += '<div class="card-body container-fluid d-flex align-items-center justify-content-center" style="border: 0px solid #ff0000;min-width: fit-content;">';
                str += '<span id="value-'+db_id+'" class="auto-resize-text">112.3</span>';
                str += '<span id="unit-'+db_id+'" class="unit-text m-4 mt-5">V</span>';
                str += '</div>';
            }
            else if(type == 7){
                str += '<div class="card-body container-fluid d-flex align-items-center justify-content-center" style="border: 0px solid #ff0000;min-width: fit-content;">';
                str += '<button type="button" id="switch-'+db_id+'" class="btn btn-lg btn-toggle" data-toggle="button" aria-pressed="true" autocomplete="off" onClick="actSwitch(\''+db_id+'\')"><div class="handle"></div></button>';
                str += '</div>';
            }           
            else{
                str += '<div class="card-body">';
                str += '<canvas id="chart-'+db_id+'" style="border: 0px solid #ff0000;"></canvas>';
            }
            str += '</div>';
            str += '</div>';
        }    
        str += '</div>';

        resolve(str);
    });
}

/*
function createCard(index) {
    return `
        <div class="grid-stack-item-content">
            <div class="card h-100 w-100">
                <div class="card-header d-flex justify-content-between">
                    <span>Chart ${index} <i class="fa fa-exclamation-triangle mx-1 text-danger" aria-hidden="true"></i></span>
                    <span class="h6"><i class="fa fa-trash" onclick="removeWidget(this)"></i></span>
                </div>
                <div class="card-body">
                    <canvas id="chart-${index}" style="border: 0px solid #ff0000;"></canvas>
                </div>
            </div>
        </div>
    `;
}
*/

// 建立 Chart.js 直條圖表
// param: canvasId (canvas id 名稱), label, data_value
function initBarChart(canvasId, jsonData, lab) {
    //console.log(canvasId);
    let jsonObj = JSON.parse(jsonData);
    //圖表 dataset
    let labelList = [];
    let dataList = [];
    jsonObj.forEach(function(item) {
        labelList.push(item['xlabel']);
        dataList.push(item['yValue']);
    });

    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelList,
            datasets: [{
                label: lab,
                data: dataList,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // 圖例 (Legend) 可選擇是否顯示
                },
                title: {
                    display: false // 隱藏標題 (Title)
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero:true
                    }
                },
                x: {
                    // y 軸格線
                    gridLines: {
                      display: true
                    },
                    ticks: {
                        autoSkip: false // Ensure that all labels are displayed
                    }
                  }
            },
        }
    });
}


// 建立 Chart.js 折線圖表
// param: canvasId (canvas id 名稱), label, data_value
function initLineChart(canvasId, jsonData, lab) {
    //console.log(canvasId);
    let jsonObj = JSON.parse(jsonData);
    //圖表 dataset
    let labelList = [];
    let dataList = [];
    jsonObj.forEach(function(item) {
        labelList.push(item['xlabel']);
        dataList.push(item['yValue']);
    });
    //console.log(canvasId);
    let canvas = document.getElementById(canvasId);
    //canvas.height = 120; // 設定顯示高度
    let ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
         data: {
            labels: labelList,
            datasets: [{
                label: lab,
                data: dataList,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                /*
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1.0)',

                ],
                */
                borderWidth: 1
            }
            ]
        },
        options: {
            maintainAspectRatio: false, // 允許手動調整高度
            responsive: true,
            plugins: {
                legend: {
                    display: false // 圖例 (Legend) 可選擇是否顯示
                },
                title: {
                    display: false // 隱藏標題 (Title)
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    //max: 6
                }
            }
        }
    });
}


// 建立 Chart.js 多折線圖表
// param: canvasId (canvas id 名稱), jsonData 屬性
function initMultiLineChart(canvasId, jsonData) {
    //console.log(canvasId);
    //console.log(JSON.parse(jsonData));
    let jsonObj = JSON.parse(jsonData);
    //console.log(jsonObj);
    // 轉換 JSON 資料，使其符合 Chart.js 格式
    let chartLabels = jsonObj[0].data.map(item => item.xlabel); // 提取 X 軸標籤
    let formattedDatasets = jsonObj.map(dataset => ({
      label: dataset.label,
      data: dataset.data.map(item => item.yValue), // 取出 yValue 作為數據
      borderWidth: 1
    }));
    //console.log(chartLabels);
    //console.log(formattedDatasets);
    //圖表 dataset
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
         data: {
            labels: chartLabels,
            datasets: formattedDatasets
        },
        options: {
            maintainAspectRatio: false, // 允許手動調整高度
            responsive: true,
            plugins: {
                legend: {
                    display: true // 圖例 (Legend) 可選擇是否顯示
                },
                title: {
                    display: false // 隱藏標題 (Title)
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    //max: 6
                }
            }
        }
    });
}


// 建立 Chart.js 圓餅圖表
// param: canvasId (canvas id 名稱), jsonData 屬性, label 圖表標籤, category 分類
function initPieChart(canvasId, jsonData, label, category) {
    //console.log(canvasId);
    //console.log(label);
    let jsonObj = JSON.parse(jsonData);
    //console.log(jsonObj);
    let labelsArr= jsonObj.map(item => item.xlabel); // 提取 X 軸標籤
    let valueArr= jsonObj.map(item => item.yValue); // 提取 y 軸值
    let backgroundColor = jsonObj.map(item => hexToRgb(item.color, 0.5) ); // 提取 顏色
    let borderColor = jsonObj.map(item => hexToRgb(item.color, 1) ); // 提取 顏色

    let type = category == 4 ? "pie" : "doughnut";

    //圖表 dataset
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    new Chart(ctx, {
         type: type,
         data: {
            labels: labelsArr,
            datasets: [{
               label: label,
               data: valueArr,
               backgroundColor: backgroundColor,
               borderColor: borderColor,
               borderWidth: 1
            }]
         },
        options: {
            maintainAspectRatio: false, // 允許手動調整高度
            responsive: true,
            plugins: {
                legend: {
                    display: false // 圖例 (Legend) 可選擇是否顯示
                },
                title: {
                    display: false // 隱藏標題 (Title)
                },
                datalabels: {
                  color: "#000", // 文字顏色
                  font: {
                    //weight: "bold",
                    size: 14
                  },
                  anchor: "center", // 文字對齊方式
                  align: "center",  // 讓文字居中
                  formatter: (value, context) => {
                      let label = context.chart.data.labels[context.dataIndex]; // 取得對應的標籤
                      //console.log(label);
                      return `${label}: ${value}`; // 例如："Africa: 2478"
                  }
               }
            }
        }
    });
}

// 建立 Chart.js 圓餅圖表
// param: canvasId (canvas id 名稱), jsonData 屬性, label 圖表標籤
function initHalfDoughnutChart(canvasId, jsonData, label) {
    //console.log(canvasId);
    //console.log(label);
    let jsonObj = JSON.parse(jsonData);
    //console.log(jsonObj);
    let labelsArr= jsonObj.map(item => item.xlabel); // 提取 X 軸標籤
    let valueArr= jsonObj.map(item => item.yValue); // 提取 y 軸值
    let backgroundColor = jsonObj.map(item => hexToRgb(item.color, 0.5) ); // 提取 顏色
    let borderColor = jsonObj.map(item => hexToRgb(item.color, 1) ); // 提取 顏色
    //圖表 dataset
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    new Chart(ctx, {
         type: 'doughnut',
         data: {
            labels: labelsArr,
            datasets: [{
               label: label,
               data: valueArr,
               backgroundColor: backgroundColor,
               borderColor: borderColor,
               borderWidth: 1
            }]
         },
        options: {
            maintainAspectRatio: false, // 允許手動調整高度
            responsive: true,
            cutout: "60%", // 控制內圓大小
            rotation: -90, // 旋轉 -90 度，讓 Doughnut 從底部開始
            circumference: 180, // 設定 180 度，讓 Doughnut 變成半圓
            plugins: {
                legend: {
                    display: false // 圖例 (Legend) 可選擇是否顯示
                },
                title: {
                    display: false // 隱藏標題 (Title)
                },
                datalabels: {
                  color: "#000", // 文字顏色
                  font: {
                    //weight: "bold",
                    size: 14
                  },
                  anchor: "center", // 文字對齊方式
                  align: "center",  // 讓文字居中
                  formatter: (value, context) => {
                      let label = context.chart.data.labels[context.dataIndex]; // 取得對應的標籤
                      //console.log(label);
                      return `${label}: ${value}`; // 例如："Africa: 2478"
                  }
               }
            }
        }
    });
}


// 即時訊息
// param: db_id(DB index), jsonData: Data 資料
function initRealData(db_id, jsonData){
    let jsonObj = JSON.parse(jsonData);
    $('#value-'+db_id).text(jsonObj[0]['yValue']);
    $('#unit-'+db_id).text(jsonObj[0]['xlabel']);
    //console.log(jsonObj[0]);
}

// 顯示開關狀態
// param: dom_id, jsonData: Data 資料
function controlSwitch(dom_id, jsonData){
    let jsonObj = JSON.parse(jsonData);
    //console.log(jsonObj[0]['status']);

    let btn = document.getElementById(dom_id);
    (jsonObj[0]['status'] == 'on')?btn.classList.add("active"):btn.classList.remove("active");
    //console.log( btn.getAttribute("aria-pressed") );
}

// 設定開關
// param: db_id
function actSwitch(db_id){
    //console.log(db_id);
    let btn = document.getElementById("switch-"+db_id);
    //console.log(btn);
    let isPressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", !isPressed);
    //console.log(btn);
    // 取得開關狀態
    let status = !isPressed ? "on" : "off";
    //console.log("status:", status);
    let url = '***';  //**填入API
    let param = {"db_id": db_id, "status": status}

    postfun(url, param);
}


//確認刪除 Widget 提示訊息
// param: db_id(Page頁面的索引值)
function confirmDelWidget(db_id){
    //console.log('delete db_id:', db_id);
    $('#ModalLabel').text( 'Delete Widget' );
    $('.body-content').text( 'Confirm to delete the widget?' );
    $('.footer-content').html("<button type='button' class='btn btn-danger' onClick=\"actionDelWidget('"+db_id+"')\">OK</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>");

    $('#showModal').modal({backdrop: 'static', keyboard: false});
}

// 執行刪除Widget。
// param: db_id: widget db 索引值
function actionDelWidget(db_id){
    //console.log(scene);
    let url = '***';  //**填入API
    let param = {"db_id": db_id}
    postfun(url, param);
}


// JavaScript HEX 色碼轉換為 RGB
function hexToRgb(hex, opacity) {
    // 移除 #
    hex = hex.replace(/^#/, "");

    // 處理 3 位 HEX，如 #f00 轉換為 #ff0000
    if (hex.length === 3) {
        hex = hex.split("").map(char => char + char).join("");
    }

    // 解析 HEX 轉為 R, G, B 數值
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
}


// 根據螢幕尺寸動態調整 GridStack 列數
function updateColumns() {
    let width = window.innerWidth;
    console.log(width);
    /*
    if (width < 576) {
        grid.column(1); // 手機模式：1 列
    } else if (width < 992) {
        grid.column(6); // 平板模式：6 列
    } else {
        grid.column(12); // 桌面模式：12 列
    }
    */
}
