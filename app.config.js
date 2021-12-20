import 'dotenv/config';

export default {
    ios: {
        "config": {
            "googleMapsApiKey": process.env.API_KEY,
        },
    },
    extra: {
        API_KEY: process.env.API_KEY,
    },
};