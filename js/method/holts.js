function datatables_holts($scope,DTOptionsBuilder,$http,SweetAlert,$uibModal){
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {
                extend: 'copy',                 
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                } 
            },
            {
                extend: 'csv',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                } 
            },
            {
                extend: 'excel', 
                title: 'Daftar Saham Holts ',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            },
            {
                extend: 'pdf', 
                title: 'Daftar Saham Holts ',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                },
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.refresh_table = function(){
        var data = $.param({
            table:"holts"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.holts = data;
            });
    }

    $scope.reset_form = function (){
        $scope.actual = null;
        $scope.prediction = null;
        $scope.datedate = null;

    }

    $scope.refresh_table();
    $scope.reset_form();

    $scope.checking_checkbox = function(){
        if($scope.check_prediction)
            $scope.check_prediction = false;
        else
            $scope.check_prediction = true;
    }

    $scope.date_formater = function(){
        var datedate = new Date($scope.datedate);
        var new_date = datedate.getFullYear() + "-" + (datedate.getMonth()+1) + "-" + datedate.getDate();
        return new_date;
    }

    $scope.insert_holts = function(){
        console.log($scope.prediction);
        var new_date = $scope.date_formater();
        var data = $.param({
            table:"holts",
            date:new_date,
            actual:$scope.actual,
            prediction:$scope.prediction
        });
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/insert.php", data, config).
            success(function(data, status, headers, config) {
                console.log(data);
                alert(data);
            });
        setTimeout(function(){  $scope.refresh_table(); $scope.refresh_chart(); }, 200);
    }

    $scope.delete = function (id) {
        SweetAlert.swal({
                title: "Apakah anda yakin?",
                text: "Anda tidak akan bisa mengembalikan data yang sudah terhapus!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ya, silahkan!",
                cancelButtonText: "Tidak, jangan lakukan!",
                closeOnConfirm: false,
                closeOnCancel: false },
            function (isConfirm) {
                if (isConfirm) {
                    $http.get("views/php/delete.php?table=holts&key="+id).then(function(response) {
                        console.log(response.data);
                        if(response.data == 1){
                            SweetAlert.swal("Terhapus!", "Data berhasil dihapus.", "success");
                        }
                        else{
                            SweetAlert.swal("Gagal", "Data akun gagal dihapus.", "error");
                        }
                    });
                    setTimeout(function(){  $scope.refresh_table(); }, 200);
                } else {
                    SweetAlert.swal("Dibatalkan", "Data akun aman :)", "error");
                }
            });
    }

    $scope.open_modal = function (id, date){
        $scope.id = id;
        $scope.date = date;
        var modalInstance = $uibModal.open({
            templateUrl: 'views/method/m_holts.html',
            scope: $scope,
            controller: modal_holts
        });
    }

    $scope.refresh_chart = function(){
        var data = $.param({
            table:"holts_chart"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.flotChartData = data;
                console.log(data);
            });

        data = $.param({
            table:"generate_holts"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.tickMin = data['tickMin'];
                $scope.tickSize = data['tickSize'];
                $scope.generate_chart();
            });
    }

    $scope.generate_chart = function(){
        $scope.flotLineOptions = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [
                            {
                                opacity: 0.0
                            },
                            {
                                opacity: 0.0
                            }
                        ]
                    }
                }
            },
            xaxis: {
                tickDecimals: 0
            },
            yaxis: {
                min: $scope.tickMin,
                tickSize: $scope.tickSize
            },
            colors: ["#1ab394"],
            grid: {
                color: "#999999",
                hoverable: true,
                clickable: true,
                tickColor: "#D4D4D4",
                borderWidth: 0
            },
            legend: {
                show: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "x: %x, Aft: %y"
            }
        };
    }

    $scope.refresh_chart();
}

function modal_holts($scope,DTOptionsBuilder,$http,$uibModalInstance){
    $scope.dtModalOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>tip')
        .withButtons([
            {
                extend: 'copy',                 
                exportOptions: {
                    columns: [ 0, 1, 2 ]
                } 
            },
            {
                extend: 'csv',
                exportOptions: {
                    columns: [ 0, 1, 2 ]
                } 
            },
            {
                extend: 'excel', 
                title: 'Detail Saham Holts '+$scope.i+' '+$scope.date,
                exportOptions: {
                    columns: [ 0, 1, 2 ]
                }
            },
            {
                extend: 'pdf', 
                title: 'Detail Saham Holts '+$scope.i+' '+$scope.date,
                exportOptions: {
                    columns: [ 0, 1, 2 ]
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [ 0, 1, 2 ]
                },
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.refresh_holts_stock = function(){
        var data = $.param({
            table:"detail_holts",
            key:$scope.id
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.detail_holts = data;
                $scope.generate_holts_chart();
            });
    }
    $scope.refresh_holts_stock();

    $scope.generate_holts_chart = function(){
        $scope.data = [];
        var min, max, size;
        $scope.detail_holts.forEach(function(row) {
            min = row["aft"];
            max = row["aft"];
            $scope.detail_holts.forEach(function(row) {
                if (min > row["aft"])
                    min = row["aft"];
                if (max < row["aft"])
                    max = row["aft"];
            });
            $scope.data.push(
                [row["i"], row["aft"]]
            );
        });
        $scope.flotChartData = [];
        $scope.flotChartData.push({
            label:"Data "+$scope.id,
            data:$scope.data
        });

        min = min-(min%100);
        size = ((max-min) - ((max-min)%100)+100)/4


        $scope.flotLineOptions = {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {
                        colors: [
                            {
                                opacity: 0.0
                            },
                            {
                                opacity: 0.0
                            }
                        ]
                    }
                }
            },
            xaxis: {
                tickDecimals: 0,
            },
            yaxis: {
                min: min,
                tickSize: size
            },
            colors: ["#1ab394"],
            grid: {
                color: "#999999",
                hoverable: true,
                clickable: true,
                tickColor: "#D4D4D4",
                borderWidth: 0
            },
            legend: {
                show: true
            },
            tooltip: true,
            tooltipOpts: {
                content: "x: %x, Aft: %y"
            }
        };
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

angular
    .module('spps')
    .controller('datatables_holts', datatables_holts)
    .controller('modal_holts', modal_holts);