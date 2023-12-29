import * as yup from "yup"
import { getCustomerById } from "../../../../service/customer.service";

yup.addMethod(yup.string, 'validCustomer', function (message = "Customer not found") {
    return this.test('valid-customer', message, async function (value) {
        
        if (!value) return true; // Allow empty values (or use .required() if you want to make it required)

        return await getCustomerById(value)
            .then(
                resolve => {
                    return true
                }
            )
            .catch(
                err => false
            )
    
    });
});