function datatables_factor($scope,DTOptionsBuilder,$http,SweetAlert,$uibModal){
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
                title: 'Daftar Faktor ',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            },
            {
                extend: 'pdf', 
                title: 'Daftar Faktor ',
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
            table:"factor"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.factor = data;
            });
    }
    $scope.refresh_table();

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
                    $http.get("views/php/delete.php?table=factor&key="+id).then(function(response) {
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
        $scope.type = null;
        $scope.value = null;
    }

    $scope.open_modal = function (id, name, id_jenis, nama_jenis, nilai){
        $scope.id = id;
        $scope.name = name;
        $scope.id_before = id_jenis;
        $scope.type = id_jenis;
        $scope.name_before = nama_jenis;
        $scope.value = nilai;
        $scope.name_before = name;

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

        var modalInstance = $uibModal.open({
            templateUrl: 'views/attributes/m_factor.html',
            scope: $scope,
            controller: modal_factor
        });
    }
}

function modal_factor($scope,$http,$uibModalInstance){
    $scope.update_factor = function () {
        var data = $.param({
            table:"factor", id:$scope.id, name:$scope.name, type:$scope.type, value:$scope.value
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post("views/php/update.php", data, config).
            success(function(data, status, headers, config) {
                if(data==0){
                    $scope.message = "Gagal update factor";
                }
                else{
                    console.log(data);
                    $scope.refresh_table();
                    $uibModalInstance.close();
                }
            }).
            error(function(data, status, headers, config) {
                $scope.message = "Gagal update factor";
            });
    };

    $scope.cancel = function () {
        $scope.reset_form();
        $uibModalInstance.dismiss('cancel');
    };
}

angular
    .module('spps')
    .controller('datatables_factor', datatables_factor)
    .controller('modal_factor', modal_factor);