import { Router } from "express";
// instancio el router
const viewsRouter = Router();

// defino la ruta para index
viewsRouter.get('/', (req, res)=>{
    //renderizo la vista index
    res.render('index');
})

// exporto
export default viewsRouter;