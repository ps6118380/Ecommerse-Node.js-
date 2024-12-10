import express from 'express';
import productscontroller from './prod.controller.js';
import {storagebox} from '../../middleware/upload.middleware.js'

const productcontroler = new productscontroller();
const productrouter = express.Router();



productrouter.post('/rate' , productcontroler. getrateproduct);
productrouter.get('/filter' , productcontroler.getfilterproduct);

productrouter.get('/',productcontroler.getallproduct);
productrouter.post('/', storagebox.single('image'), productcontroler.postproduct);
productrouter.get('/:id',productcontroler.getoneproduct);
productrouter.get('/',productcontroler.averageprice);


export default productrouter;

