module.exports = {
    tokenData: function(args) {

        this.getJSON = function() {

            if (args.hasOwnProperty('token') && args.hasOwnProperty('security_code') && Object.keys(args).length <= 5) {
                return args = {
                    data: {
                        token: args.token,
                        security_code: args.security_code
                    },
                    headers: {
                        apiKey: args.apiKey,
                        'Content-Type': args['Content-Type'],
                        'Cache-Control': args['Cache-Control']
                    }
                }
            }

            dataCompare = {
                card_number: '',
                card_expiration_month: '',
                card_expiration_year: '',
                security_code: '',
                card_holder_name: '',
                type: '',
                number: ''
            };
            Object.keys(dataCompare).map(function(objectKey, value) {
                if (objectKey in args) {

                } else {
                    console.log("Error: el campo requerido " + objectKey + " no está definido o es incorrecto.");
                    return "Error: el campo requerido  " + objectKey + " no está definido o es incorrecto.";
                }
            });


            if (!args.hasOwnProperty('Cache-Control')) {
                args.Cache_Control = "no-cache";
            }

            return args = {
                data: {
                    card_number: args.card_number,
                    card_expiration_month: args.card_expiration_month,
                    card_expiration_year: args.card_expiration_year,
                    security_code: args.security_code,
                    card_holder_name: args.card_holder_name,
                    card_holder_identification: {
                        type: args.type,
                        number: args.number
                    }
                },
                headers: {
                    apiKey: args.apiKey,
                    'Content-Type': args['Content-Type'],
                    'Cache-Control': args['Cache-Control']
                }
            }
        };

        this.getCardNumber = function() {
            return args.card_number;
        };
        this.getCardExpirationMonth = function() {
            return args.card_expiration_month;
        };
        this.getCardExpirationYear = function() {
            return args.card_expiration_year;
        };
        this.getSecurityCode = function() {
            return args.security_code;
        };
        this.getCardHolderName = function() {
            return args.card_holder_name;
        };
        this.getType = function() {
            return args.type;
        };
        this.getNumber = function() {
            return args.number;
        };
        this.getApiKey = function() {
            return args.apiKey;
        };
        this.getContentType = function() {
            return args['Content-Type'];
        };
        this.getCacheControl = function() {
            return args['Cache-Control'];
        };
    }
}
