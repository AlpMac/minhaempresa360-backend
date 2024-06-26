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
import buscaServicoConcluido from "./routers/route.buscaServicoConcluido.js";
import buscaServicoCancelado from "./routers/route.buscaCancelamentoRealizado.js";
import routeAddProduto from "./routers/route.AddProdutos.js";
import routeBuscaCliente from "./routers/route.buscaCliente.js";
import routeAdditemDescricaoServico from "./routers/route.AdditemDescricaoServico.js";
import routeBuscatiposItensDoServico from "./routers/route.BuscaItensServico.js";


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

app.use(buscaServicoConcluido); //teste ok
app.use(buscaServicoCancelado); //teste ok
app.use(routeAddProduto); //teste ok
app.use(routeBuscaCliente); //teste ok

app.use(routeBuscatiposItensDoServico); //teste ok

app.use(routeAdditemDescricaoServico); //teste ok
//Porta que o servidor irá levantar
app.listen(4513, () => {
  console.log("Servidor rodando na porta 4513");
});
