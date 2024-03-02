import express from "express";
import cors from "cors";



import routeAddServico from "./routers/route.AddServico.js";
import routeAddCliente from "./routers/route.AddCliente.js";
import routeAddServicoProdutoUsado from "./routers/route.AddServicoProdutoUsado.js";
import routeDellServicoItemContratado from "./routers/route.DellServicoItemContratado.js";
import routeDellServicoProdutoUsado from "./routers/route.DellServicoProdutoUsado.js";
import routeAddServicoItemContratado from "./routers/route.AddServicoItemContratado.js";
import routeServico from "./routers/router.servico.js";
import routeboxDeDados from "./routers/route.boxDeDados.js";
import routeverificaLoginGeratoken from "./routers/route.verficaLoginGeraToken.js";
import routeSalvarTokenBD from "./routers/route.SalvarTokenBD.js";
import routeServicoCancelar from "./routers/route.servicoCancelar.js";




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
app.use(routeboxDeDados); // test ok 

app.use(routeverificaLoginGeratoken); //OK
app.use(routeSalvarTokenBD); 
app.use(routeServicoCancelar); //teste ok




//Porta que o servidor irá levantar
app.listen(4513, () => {
  console.log("Servidor rodando na porta 4513");
});
