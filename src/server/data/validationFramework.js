var cartItemSchema = require('./schema/cart-item-schema.json');
var categorySchema = require('./schema/category-schema.json');
var orderItemSchema = require('./schema/order-item-schema.json');
var productItemSchema = require('./schema/product-item-schema.json');
var userSchema = require('./schema/user-schema.json');

var Constants = require('../Constants');

module.exports.validate = function(modelName, newObject) {
    var schema = null;
    switch (modelName) {
        case Constants.LABEL_CART_ITEM:
            schema = cartItemSchema;
            break;
        case Constants.LABEL_CATEGORY:
            schema = categorySchema;
            break;
        case Constants.LABEL_ORDER_ITEM:
            schema = orderItemSchema;
            break;
        case Constants.LABEL_PRODUCT_ITEM:
            schema = productItemSchema;
            break;
        case Constants.LABEL_USER:
        default:
            schema = null;
    }

    if (schema == null) {
        return false;
    }

    return validateUtil(newObject, schema);
}

function validateUtil(newObject, schema) {
    var newObjectKeys = Object.keys(newObject);
    var requiredKeys = schema.required;

    // if object doesn't have any of the required keys, then reject
    for (index in requiredKeys) {
        if (!newObjectKeys.includes(requiredKeys[index])) {
            return false;
        }
    }

    var result = true;

    newObjectKeys.map((key, element) => {
        if (schema[key] === undefined) {
            return false;
        }

        // do type specific testing here
        if (typeof newObject[key] == 'string') {
            result = validateString(newObject[key], schema[key]);
        } else if (typeof newObject[key] == 'number') {
            result = validateNumber(newObject[key], schema[key]);
        } else if (newObject[key] instanceof Array) {
            result = validateArray(newObject[key], schema[key])
        } else if (typeof newObject[key] == 'object') {
            result = validateUtil(newObject[key], schema[key].properties)
        } else {

        }

        // if any of the tests failed, reject the input object

    });
    return result;
}

function validateString(input, conditionObject) {
    if (typeof input != conditionObject.type) {
        return false;
    }
    if (conditionObject.minLen && input.trim().length < conditionObject.minLen) {
        return false;
    }
    if (conditionObject.maxLen && input.trim().length > conditionObject.maxLen) {
        return false;
    }
    return true;
}

function validateNumber(input, conditionObject) {
    if (typeof input != conditionObject.type) {
        return false;
    }
    if (conditionObject.min && input < conditionObject.min) {
        return false;
    }
    if (conditionObject.max && input > conditionObject.max) {
        return false;
    }
    return true;
}

function validateArray(input, conditionObject) {
    if (conditionObject.type !== 'array') {
        return false;
    }

    if (conditionObject.minLen && input.length < conditionObject.minLen) {
        return false;
    }

    if (conditionObject.maxLen && input.length > conditionObject.maxLen) {
        return false;
    }

    var schemaProp = conditionObject.items.properties;
    if (conditionObject.items.type == 'string') {
        for (obj in input) {
            if (!validateString(obj, schemaProp)) {
                return false;
            }
        }
    } else if (conditionObject.items.type == 'number') {
        for (obj in input) {
            if (!validateNumber(obj, schemaProp)) {
                return false;
            }
        }
    } else if (conditionObject.items.type == 'object') {
        for (index in input) {
            if (!validateUtil(input[index], schemaProp)) {
                return false;
            }
        }
    } else {

    }
    return true;
}