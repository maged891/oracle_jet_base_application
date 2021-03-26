define(['ojs/ojcore','knockout','jquery',
'Models/class.model','ojs/ojarraydataprovider','ojs/ojinputtext','ojs/ojdialog','ojs/ojtable'],
 function(oj,ko,$,classmodel,ArrayDataProvider) {
    function HomeViewModel() { 
      self=this;
      self.id=ko.observable();
      self.title=ko.observable();
      self.desc=ko.observable();
      self.msgTitle=ko.observable();
      self.msgBody=ko.observable();
      self.allclasses =ko.observableArray([]) ; // to populate this array from model of data
      self.dataprovider = new ArrayDataProvider(self.allclasses,{   // it take data (allclasses) and options means that how you want to view data ???
          keyAttributes : "id" ,
          implicitSort :[{attribute:"id" ,direction:"ascending"}]  // ascending تصاعدي
      });   


      // functions methods procedures 
       
      classmodel.getallclasses((sucess,result)=>{
        console.log(result);
        self.allclasses(result); // // populate allclasses with data
        self.allclasses.valueHasMutated(); //mutated the data and notify to subscribers
     });

      self.addclass = (event)=>{
        res = classmodel.addclass(self.id(),self.title(),self.desc(),function(success,msg){
        //  alert( "Added Successfully ID :" + msg)
        if(success){
            self.msgTitle('success message');
            self.msgBody("saved Successfully ID :" + msg);
        }else{
            self.msgTitle('Error message');
            self.msgBody(msg);
        }
            document.getElementById("msgDialog").open() ;
        });
          
         
    } // end of addclass

    self.closeDialog = ()=>{
        document.getElementById('msgDialog').close();
    }

    }
        return  HomeViewModel;
    }
  );
 