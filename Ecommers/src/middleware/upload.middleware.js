import multer from 'multer';

const storage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/upload');
    },
    filename:(req,file,cb)=>{
       const name = file.originalname;
       cb(null,name);
    }
});
export const storagebox = multer({storage:storage});

