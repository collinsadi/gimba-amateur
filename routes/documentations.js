
const userRoute = require('../documentations/Users.doc')


const swaggerDocumentations = {

    openapi: "3.0.0",
    info: {

        title : "Gimba",
        version: "0.0.1"
    },
    components: {
        authAction: {
            Basic: {
              name: "user1",
              schema: {
                type:"application/json",
                in: "header",
                name: "Authorization",
              },
              value: "Basic bG9naW46cGFzc3dvcmQ="
            }
          },
        },
    servers: [

        {
            url: "http://localhost:4000",
            description: "Local Server"
        },
        {
            url: "https://gimbamini5.onrender.com",
            description: "Production Server"
        }


    ],
    tags: [

      {  
        name: "User",
        description: "Users Routes"
    }


    ],
    paths: {

        ...userRoute
        
    }

};




module.exports = swaggerDocumentations