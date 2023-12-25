const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const apiRoutes=require('./routes/index');
const {PORT,FLIGHT_SERVICE_PATH}=require('./config/serverConfig');
const db=require('./models/index');
const setupStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true})); //to read the request body properly

    app.use('/api',apiRoutes);
      app.listen(PORT,()=>{
        console.log(`Server started on ${PORT}`);
        if(process.env.DB_SYNC){
          db.sequelize.sync({alter:true});
        }
        //console.log(FLIGHT_SERVICE_PATH);

      });
}
setupStartServer();