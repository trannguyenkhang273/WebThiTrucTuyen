var app = angular.module("myApp", ["ngRoute"]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when("/dangnhap", { templateUrl: "dangnhap.html" ,controller:"dangky"})
      .when("/dangky", { templateUrl: "dangky.html",controller:"dangky" })
      .when("/lienhe", { templateUrl: "contact.html" })
      .when("/capnhattaikhoan", { templateUrl: "suadoitaikhoan.html" ,controller:"capnhaptaikhoan"})
      .when("/trangchu", { templateUrl: "index.html",controller:"danhsach" })
      .when("/tracnghiem/:idMH/:tenMH", { templateUrl: "dongho1.html",controller:"cauhoi" })
      .otherwise({ templateUrl: "index.html", controller:"danhsach"})
  });
  
  app.controller("danhsach",function($scope,$http,$rootScope){
    console.log($scope.taikhoanTam);
    var checktaikhoan = localStorage.getItem("username");
    var checkpassword = localStorage.getItem("password");
    $scope.dangxuat = function(){
      localStorage.clear();
      document.location.href = "/ASM_GD1/layout.html#!/trangchu#";
      $rootScope.taikhoanChinh = null;
    }
    $http.get("db/Students.js").then(
      function(d){
        if($rootScope.taikhoanTam==null){
          $rootScope.taikhoanTam = d.data;
        }

        if(checktaikhoan!= null && checkpassword!= null){
          // alert($scope.taikhoanTam.length);
          for(var i = 0 ; i<$rootScope.taikhoanTam.length;i++){
            if(checktaikhoan==$rootScope.taikhoanTam[i].username && checkpassword==$rootScope.taikhoanTam[i].password){
              $rootScope.taikhoanChinh = angular.copy($rootScope.taikhoanTam[i]);
                break;
            }
        }
        }
      });
    
    // $scope.testdangnhap = function(){
    //   alert(luutaikhoan.username);
    // }
    $scope.soluongmonhoc = -1;
    $scope.start=0;
    
    $scope.disableNext = "";
    $scope.so1 = 1;
    $scope.so2 = 2;
    $scope.so3 = 3;
    $scope.active1 = "";
    $scope.active2 = "";
    $scope.active3 = "";

    $scope.tongtrang = 0;

    $scope.cacmonhoc = [];

    $http.get("db/Subjects.js").then(function(d){
      $scope.cacmonhoc = d.data;
      $scope.soluongmonhoc = d.data.length;
      if($scope.start >= $scope.soluongmonhoc-4){
        $scope.disableNext = "disabled";
      }
      if($scope.start <= $scope.soluongmonhoc){
        $scope.disableLui = "disabled";
      }
      $scope.tinhso1();
      if($scope.start==0){
        $scope.active1 = "active";
      }
      if($scope.so3>$scope.tongtrang){
        $scope.active3 = "disabled";
      }
      if($scope.so2>$scope.tongtrang){
        $scope.active2 = "disabled";
      }
    });
    
    $scope.tiep = function(){
        if($scope.start >= $scope.soluongmonhoc-4){
            $scope.disableNext = "disabled";
            
        }else{
            $scope.start+=4;
            $scope.disableLui ="";
            $scope.TinhActiveTiep();
        }
        if($scope.start >= $scope.soluongmonhoc-4){
            $scope.disableNext = "disabled";
      }
    }
    //tính nút active của phân trang
    $scope.TinhActiveTiep = function(){
      if($scope.active1 == "active"){
        $scope.active1 = "";
        $scope.active2 = "active";
      }
      else if($scope.active2 == "active"){
        if($scope.active3 == "disabled"){

        }else{
          if($scope.so3>=$scope.tongtrang){
            $scope.active3 = "active";
            $scope.active2 = "";
          }else{
            $scope.so1 += 1;
            $scope.so2 += 1;
            $scope.so3 += 1;
          }
        }
      }
    }
    $scope.TinhActiveLui = function(){
      if($scope.active3 == "active"){
        $scope.active3 = "";
        $scope.active2 = "active";
      }
      else if($scope.active2 == "active"){
        if($scope.so1 == 1){
          $scope.active2 = "";
          $scope.active1 = "active";
        }else{
          
            $scope.so1 -= 1;
            $scope.so2 -= 1;
            $scope.so3 -= 1;
          
        }
      }
    }

    $scope.lui = function(){
        if($scope.start <=0){
            $scope.disableLui = "disabled";
        }else{
            $scope.start-=4;
            $scope.disableNext="";
            $scope.TinhActiveLui();
      }
        if($scope.start <= 0){
            $scope.disableLui = "disabled";
      }
    }
    
    //tính tổng trang
    $scope.tinhso1 = function(){
            if($scope.soluongmonhoc % 4==0){
            $scope.tongtrang = $scope.soluongmonhoc/4;
        }else{
            var so1tam =  $scope.soluongmonhoc/4;
            $scope.tongtrang = Math.floor(so1tam)+1;
        }
    }

    // bấm vào số 1 2 3 của phân trang bên danh sách môn học
   $scope.nextso3 = function(){
    if($scope.active1 == "active"){
      $scope.tiep();
      $scope.tiep();
    }
    else if($scope.active2 == "active"){
      $scope.tiep();
    }
    else if($scope.active3 == "active"){
    }
   }

   $scope.nextso2 = function(){
    if($scope.active1 == "active"){
      $scope.tiep();
    }
    else if($scope.active2 == "active"){
      
    }
    else if($scope.active3 == "active"){
      $scope.lui();
    }
   }

   $scope.nextso1 = function(){
    if($scope.active3 == "active"){
      $scope.lui();
      $scope.lui();
    }
    else if($scope.active2 == "active"){
      $scope.lui();
    }
    else if($scope.active3 == "active"){
    }
   }
  });


  app.controller("cauhoi",function($scope,$http,$routeParams,$rootScope){
    
    $scope.start=0;
    $scope.caccauhoi = [];
    $scope.soluongcauhoi = 0;
    $scope.idMH = $routeParams.idMH;
    $scope.tenMH= $routeParams.tenMH;
    $scope.diem = 0;
    $scope.so1 = 1;
    $scope.so2 = 2;
    $scope.so3 = 3;
    $scope.active1 = "";
    $scope.active2 = "";
    $scope.active3 = "";
    $scope.disableNext = "";

    $http.get("db/Quizs/"+$scope.idMH+".js").then( function(d) {
       $scope.caccauhoi=d.data;
       $scope.soluongcauhoi=$scope.caccauhoi.length;
       if($scope.start >= $scope.soluongcauhoi-1){
        $scope.disableNext = "disabled";
      }
      if($scope.start <=0){
          $scope.disableLui = "disabled";
      }
      if($scope.start==0){
        $scope.active1 = "active";
      }
      if($scope.so3>$scope.soluongcauhoi){
        $scope.active3 = "disabled";
      }
      if($scope.so2>$scope.soluongcauhoi){
        $scope.active2 = "disabled";
      }
      }
    )
    
    $scope.tinhdiem = function(){
      var traloi2 = document.getElementsByName("chon");
      var dapanduocchon = "";
      for(let i =0;i<traloi2.length;i++){
        if(document.getElementsByName("chon")[i].checked){
          dapanduocchon = document.getElementsByName("chon")[i].value;
        }
      }
      
      var testsai = false;
      for(let i of $scope.caccauhoi){
        if(i.AnswerId==dapanduocchon){
          $scope.diem+=1;
          testsai  = true;
          alert("Bạn trả lời đúng!");
        }

      }
      if(!testsai){
        alert("Bạn trả lời sai!");
      }
      
    }

    $scope.tiepcauhoi = function(){
      if($scope.start >= $scope.soluongcauhoi-1){
          $scope.disableNext = "disabled";
      }else{
          $scope.start+=1;
          $scope.disableLui ="";
          $scope.TinhActiveTiep();
      }
      if($scope.start >= $scope.soluongcauhoi-1){
          $scope.disableNext = "disabled";
    }
  }

  $scope.luicauhoi = function(){
      if($scope.start <=0){
          $scope.disableLui = "disabled";
      }else{
          $scope.start-=1;
          $scope.disableNext="";
          $scope.TinhActiveLui();
    }
      if($scope.start <= 0){
          $scope.disableLui = "disabled";
    }
  }
  $scope.ketthuc = function(){
    alert("Bài thi của bạn được: "+$scope.diem + " điểm");
    document.location.href = "/ASM_GD1/layout.html#!/trangchu";
  }

  //tính nút active của phân trang
  $scope.TinhActiveTiep = function(){
    if($scope.active1 == "active"){
      $scope.active1 = "";
      $scope.active2 = "active";
    }
    else if($scope.active2 == "active"){
      if($scope.active3 == "disabled"){

      }else{
        if($scope.so3>=$scope.soluongcauhoi){
          $scope.active3 = "active";
          $scope.active2 = "";
        }else{
          $scope.so1 += 1;
          $scope.so2 += 1;
          $scope.so3 += 1;
        }
      }
    }
  }
  $scope.TinhActiveLui = function(){
    if($scope.active3 == "active"){
      $scope.active3 = "";
      $scope.active2 = "active";
    }
    else if($scope.active2 == "active"){
      if($scope.so1 == 1){
        $scope.active2 = "";
        $scope.active1 = "active";
      }else{
        
          $scope.so1 -= 1;
          $scope.so2 -= 1;
          $scope.so3 -= 1;
        
      }
    }
  }


  // bấm vào số 1 2 3 của phân trang bên danh sách môn học
  $scope.nextso3 = function(){
    if($scope.active1 == "active"){
      $scope.tiepcauhoi();
      $scope.tiepcauhoi();
    }
    else if($scope.active2 == "active"){
      $scope.tiepcauhoi();
    }
    else if($scope.active3 == "active"){
    }
   }

   $scope.nextso2 = function(){
    if($scope.active1 == "active"){
      $scope.tiepcauhoi();
    }
    else if($scope.active2 == "active"){
      
    }
    else if($scope.active3 == "active"){
      $scope.luicauhoi();
    }
   }

   $scope.nextso1 = function(){
    if($scope.active3 == "active"){
      $scope.luicauhoi();
      $scope.luicauhoi();
    }
    else if($scope.active2 == "active"){
      $scope.luicauhoi();
    }
    else if($scope.active3 == "active"){
    }
   }
   $scope.luuradio = [
    {
    idCau : "",
    idDapan : ""
    },
  ]
   $scope.luudapan=function(IdCau,IdDapan){
   
    $scope.luutam = angular.copy($scope.luuradio[0]);
    $scope.luutam.idCau = IdCau;
    $scope.luutam.idDapan = IdDapan;
    
    var flag = false;
    try {
    for(let i =0;i< $scope.luuradio.length;i++){
      if($scope.luuradio[i].idCau==IdCau){
        $scope.luuradio[i].idDapan = IdDapan;
        flag = true;
      }
    } 
  } catch (error) {  }
    if(!flag){
      $scope.luuradio.push($scope.luutam);
      console.log(...$scope.luuradio);
    }

   }
   $scope.checkedRadio = function(IdDapan){
    for(let i =0;i< $scope.luuradio.length;i++){
      if($scope.luuradio[i].idDapan==IdDapan){
        return true;
      }
    } 
    return false;
   }
   $scope.disradio = [];
  
   $scope.disableradio = function(idCau){
    $scope.disradio.push(idCau);
   }
   $scope.dissablecauhoi = function(idCau){
    for(let i =0;i< $scope.disradio.length;i++){
      if($scope.disradio[i]==idCau){
        return "pointer-events: none;";
      }
    } 
    return "";
   }
  });

  var luutaikhoan = [];
  
  

  app.controller("dangky",function($scope,$http,$rootScope){
    $scope.taikhoandangky = angular.copy($rootScope.taikhoanTam[1]);
    $scope.dangky = function(){
      if($scope.gioitinhdk==0){
        $scope.gioitinhdk=="nam";
      }else{
        $scope.gioitinhdk=="nữ";
      }
      $scope.taikhoandangky.username = $scope.userdk;
      $scope.taikhoandangky.password = $scope.passdk;
      $scope.taikhoandangky.fullname = $scope.fullnamedk;
      $scope.taikhoandangky.email = $scope.emaildk;
      $scope.taikhoandangky.birthday = $scope.ngaysinhdk;
      $scope.taikhoandangky.schoolfee =  $scope.hocphidk;
      $scope.taikhoandangky.marks = $scope.diemdk;
      $scope.taikhoandangky.gender = $scope.gioitinhdk;
      
      $rootScope.taikhoanTam.push($scope.taikhoandangky);
      console.log($scope.taikhoanTam);
      alert("Đăng ký thành công!");
      document.location.href = "/ASM_GD1/layout.html#!/trangchu";
    }

    $scope.login = function(){
      var u  =$scope.u;
      var p = $scope.p;
      var checkx = false;
      for(var i = 0 ; i<$rootScope.taikhoanTam.length;i++){
        if(u==$rootScope.taikhoanTam[i].username && p==$rootScope.taikhoanTam[i].password){
            alert("Đăng nhập thành công!");
            // luutaikhoan = angular.copy($scope.taikhoan[i]);
            localStorage.setItem("username",$rootScope.taikhoanTam[i].username);
            localStorage.setItem("password",$rootScope.taikhoanTam[i].password);
            document.location.href = "/ASM_GD1/layout.html#!/trangchu";
            checkx = true;
            break;
        }
    }
      if(checkx==false){
        alert("Đăng nhập thất bại!")
      }
    }
  });
 
