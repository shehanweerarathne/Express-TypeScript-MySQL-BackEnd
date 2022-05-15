import {createConnections, getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import {
    randEmail,
    randFullName,
    randPost,
    randImg,
    randFirstName,
    randLastName,
    randNumber,
    randProduct
} from '@ngneat/falso';
import {randomInt} from "crypto";
import {Order} from "../entity/order.entity";
import {OrderItem} from "../entity/order-item";


createConnections().then(async connection =>{
    const orderRepository = getManager().getRepository(Order);
    const orderItemRepository = getManager().getRepository(OrderItem);
    for (let i = 0; i<100; i++){
        const order = await orderRepository.save({
            first_name: randFirstName(),
            last_name: randLastName(),
            email:randEmail()
        });
        for(let j=0; j<randomInt(1,5); j++){
            await orderItemRepository.save({
                order,
                product_title:randProduct().title,
                price:randomInt(10,100),
                quantity:randomInt(1,10)
            })
        }

    }
    process.exit(0);
})
//
// for (let j=0; j<randomInt(1,5); j++){
//     await orderItemRepository.save({order,
//         product_title:randProduct(),
//         price:randomInt(10,100),
//         quantuty:randomInt(1,5)
//     })
