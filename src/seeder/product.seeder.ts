import {createConnections, getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import {randEmail, randFullName, randPost, randImg, randProduct} from '@ngneat/falso';
import {randomInt} from "crypto";


createConnections().then(async connection =>{
    const repository = getManager().getRepository(Product)
    for (let i = 0; i<100; i++){
        await repository.save({
            title: randProduct().title,
            description: randProduct().description,
            image: randProduct().image,
            price: parseInt(randProduct().price)
        })
    }
    process.exit(0);
})
