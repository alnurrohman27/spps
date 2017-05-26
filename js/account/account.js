function datatables_user($scope,DTOptionsBuilder,$http,SweetAlert,$uibModal){
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
                title: 'Daftar Akun ',
                exportOptions: {
                    columns: [ 0, 1, 2, 3, 4 ]
                }
            },
            {
                extend: 'pdf', 
                title: 'Daftar Akun ',
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
    $scope.password;
    $scope.name;

    $scope.refresh_table = function(){
        var data = $.param({
            table:"user"
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post("views/php/search.php", data, config).
            success(function(data, status, headers, config) {
                $scope.users = data;
            });
    }
    $scope.refresh_table();

    $scope.insert_user = function(){
        var data = $.param({
            table:"user",
            password:$scope.password,
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
                    $http.get("views/php/delete.php?table=user&key="+id).then(function(response) {
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
        $scope.password = null;
        $scope.name = null;
    }

    $scope.open_modal = function (id, name, password){
        $scope.id = id;
        $scope.password = password;
        $scope.name = name;
        $scope.name_before = name;
        var modalInstance = $uibModal.open({
            templateUrl: 'views/account/m_account.html',
            scope: $scope,
            controller: modal_account
        });
    }
}

function modal_account($scope,$http,$uibModalInstance){
    $scope.update_user = function () {
        var data = $.param({
            table:"user", id:$scope.id, password:$scope.password, name:$scope.name
        });
    
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post("views/php/update.php", data, config).
            success(function(data, status, headers, config) {
                if(data==0){
                    $scope.message = "Gagal update user";
                }
                else{
                    console.log(data);
                    $scope.refresh_table();
                    $uibModalInstance.close();
                }
            }).
            error(function(data, status, headers, config) {
                $scope.message = "Gagal update user";
            });
    };

    $scope.cancel = function () {
        $scope.reset_form();
        $uibModalInstance.dismiss('cancel');
    };
}

angular
    .module('spps')
    .controller('datatables_user', datatables_user)
    .controller('modal_account', modal_account);