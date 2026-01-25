import Joi from 'joi';
export declare class WalletValidator {
    static fund: Joi.ObjectSchema<any>;
    static transfer: Joi.ObjectSchema<any>;
    static withdraw: Joi.ObjectSchema<any>;
}
