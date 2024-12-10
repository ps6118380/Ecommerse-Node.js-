import fs from 'fs';
const fspromise = fs.promises;

async function log(logdata){
    try{
        logdata = `\n ${new Date().toString()}-${logdata}`;
    await fspromise.appendFile('log.txt',logdata);
    }catch(err){
        console.log(err);
    };
}

const loggermiddleware = async(req,res,next)=>{
    const logdata = req.url + " " + JSON.stringify(req.body);

    await log(logdata);
    next();
}

export default loggermiddleware;
