define(['ojs/ojcore','knockout','jquery',
'ojs/ojinputtext'],
 function(oj,ko,$) {
    class classification{
       
     constructor(){
       this.id=0;
       this.title='no title yet';
       this.description='no description yet';
       this.classendpoint ='https://python110-firebase-project1-default-rtdb.firebaseio.com/classification'
     }// end constructor
   // code refactoring  تحسين الكود المكتوب
   initializeModelCollection(api_url){
      const Key_id = 'id' ;
      this.classmodelDef =oj.Model.extend({    // انا بستخدم ال  this لشاااان يكون عام اقدر اناديه من اي حته
        url:api_url ,
        idAttribute : Key_id, 
      }) ;
      this.classcollDef =oj.Collection.extend({
        url:api_url,
        model:this.classmodelDef,
        comparator : Key_id  
      }) ;
      this.classes = new this.classcollDef ;


   }


    addclass(id,title,desc,notify){
      /*
      console.log(title);
     let x='wait'
    setTimeout(function(){
         var x='finished'
         notify(x)
    },3000);

    */

   let api_url = this.classendpoint +'/'+ id + ".json" ;
   this.initializeModelCollection(api_url); //refactoring code to improvement quality of code
   let classRow = new this.classmodelDef ({
     'id': id ,
     "title" : title ,
     "description" : desc ,
      } , this.classes ) ;
      
      // ajax ( Take Time) 
      classRow.save(null ,{
        type : 'PUT' ,
        success : function ( model ,response ,options ){
          notify(true,response.id)
        },
        error : function ( model ,xhr ,options ){
          notify(false,`Error Code :${xhr.status} , msg : ${options.textStatus}`)
        },

      })
   

     // operation
  

    }
    updateclass(id,title,notify){
        
  }
    deleteclass(id,notify){
        
  }
    findclass(filtervalue,notify){
        
  }
    getallclasses(notify){

      let api_url = this.classendpoint + ".json" ;
      this.initializeModelCollection(api_url);
      let classRow = new this.classmodelDef ({ } , this.classes ) ;
         
         classRow.fetch( {
           type : 'GET' ,
           success : function ( coll , data ){
             var arrobj = Object.entries(data).map((val)=>{
              return  val[1] // or only   val  
           });   // if we use { } instead of ( ) that mean we should use //return// because this mean that this one order so we dont need //return// but { } mean inside him more than one order so we need return
             notify(true, arrobj )
           },
           error : function ( model ,xhr ,options ){
             notify(false,`Error Code :${xhr.status} , msg : ${options.textStatus}`)
           },
   
         })
      
        
    }   

    }

      return new classification;

    }
  );
 