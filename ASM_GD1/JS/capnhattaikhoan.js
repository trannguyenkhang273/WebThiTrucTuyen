// var app = angular.module("myApp", ["ngRoute"]);
app.controller("capnhaptaikhoan",function($scope,$http,$rootScope){
    $scope.doimatkhau = function(){
            if($scope.mkcu == $rootScope.taikhoanChinh.password){
                if($scope.mkmoi==$scope.mkxacnhan){
                    $rootScope.taikhoanChinh.password = $scope.mkmoi;
                }else{
                    alert("Xác nhận mật khẩu không chính xác!");
                }
            }else{
                alert("Mật khẩu cũ không chính xác!");
            }
        
    }
    $scope.doihoten = function(){
        $rootScope.taikhoanChinh.fullname= $scope.hotenmoi;
    }

    $scope.doiemail = function(){
        if($scope.emailcu == $rootScope.taikhoanChinh.email){
                $rootScope.taikhoanChinh.email = $scope.emailmoi;
            
        }else{
            alert("Email cũ không chính xác!");
        }
    }

    $scope.doigioitinh = function(){
        $rootScope.taikhoanChinh.gender = $scope.gioitinh;
    }

    $scope.doingaysinh = function(){
        $rootScope.taikhoanChinh.birthday = $scope.ngaysinhmoi;
    }
    $scope.capnhattk = function(){
        for(var i = 0 ; i<$rootScope.taikhoanTam.length;i++){
            if($rootScope.taikhoanChinh.username==$rootScope.taikhoanTam[i].username){
                
                $rootScope.taikhoanTam[i] = angular.copy($rootScope.taikhoanChinh);
                alert("Cập nhật thanh công!")
                break;
            }
        }
    }
  });