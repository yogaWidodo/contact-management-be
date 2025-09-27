import {web} from "./application/web.js";
import {logger} from "./application/logging.js";


web.listen(3000,()=>{
    logger.info("Web server started on port 3000");
})