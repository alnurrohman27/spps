function datatables_types($scope,DTOptionsBuilder,$http,SweetAlert,$uibModal){
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
                title: 'Daftar Jenis Faktor ',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            },
            {
                extend: 'pdf', 
                title: 'Daftar Jenis Faktor ',
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

    $scope.id;
    $scope.name;

    $scope.refresh_table = function(){
        var data = $.param({
            table:"types"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.types = data;
            });
    }
    $scope.refresh_table();

    $scope.insert_types = function(){
        var data = $.param({
            table:"types",
            name:$scope.name
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
        setTimeout(function(){  $scope.refresh_table(); }, 200);
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
                    $http.get("views/php/delete.php?table=types&key="+id).then(function(response) {
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

    $scope.reset_form = function (){
        $scope.id = null;
        $scope.name = null;
    }

    $scope.open_modal = function (id, name){
        $scope.id = id;
        $scope.name = name;
        $scope.name_before = name;
        
        var modalInstance = $uibModal.open({
            templateUrl: 'views/attributes/m_types.html',
            scope: $scope,
            controller: modal_types
        });
    }
}

function modal_types($scope,$http,$uibModalInstance){
    $scope.update_types = function () {
        var data = $.param({
            table:"types", id:$scope.id, name:$scope.name
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post("views/php/update.php", data, config).
            success(function(data, status, headers, config) {
                if(data==0){
                    $scope.message = "Gagal update jenis faktor";
                }
                else{
                    console.log(data);
                    $scope.refresh_table();
                    $uibModalInstance.close();
                }
            }).
            error(function(data, status, headers, config) {
                $scope.message = "Gagal update jenis faktor";
            });
    };

    $scope.cancel = function () {
        $scope.reset_form();
        $uibModalInstance.dismiss('cancel');
    };
}

angular
    .module('spps')
    .controller('datatables_types', datatables_types)
    .controller('modal_types', modal_types);