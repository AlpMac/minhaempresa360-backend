import express from "express";
import cors from "cors";



import routeAddServico from "./routers/route.AddServico.js";
import routeAddCliente from "./routers/route.AddCliente.js";
import routeAddServicoProdutoUsado from "./routers/route.AddServicoProdutoUsado.js";
import routeDellServicoItemContratado from "./routers/route.DellServicoItemContratado.js";
import routeDellServicoProdutoUsado from "./routers/route.DellServicoProdutoUsado.js";
import routeAddServicoItemContratado from "./routers/route.AddServicoItemContratado.js";
import routeServico from "./routers/router.servico.js";




const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use(routeServico); //teste OK
///////
app.use(routeAddServicoProdutoUsado); //teste OK
app.use(routeDellServicoProdutoUsado); // teste ok 
///////
app.use(routeAddServicoItemContratado); //test OK
app.use(routeDellServicoItemContratado); // test OK
///////
app.use(routeAddCliente); //teste ok 

app.use(routeAddServico); // Teste OKs





//Porta que o servidor irá levantar
app.listen(4513, () => {
  console.log("Servidor rodando na porta 4513");
});
