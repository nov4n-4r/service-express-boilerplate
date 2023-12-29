import * as yup from "yup"
import { getUserById } from "../../../../service/user.service";

yup.addMethod(yup.string, 'validUser', function (message = "User not found") {
    return this.test('valid-user', message, async function (value) {
        
        if (!value) return true; // Allow empty values (or use .required() if you want to make it required)

        return await getUserById(value)
            .then(
                resolve => true
            )
            .catch(
                err => false
            )
    
    });
});