import * as functions from 'firebase-functions';

const stripe = require('stripe')('sk_test_51HmYhhJfXgRZXtM1rRRNO8z9JmBULUEcg4C058SjduH1ZEU0nNkxyPVi5bm8PofRIrAgDYh2HGJGmzLh2oZM9UBd00L5367Wyn');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge:any) => {
            // asynchronously called
            response.send(charge);
        })
        .catch((err:any) =>{
            console.log(err);
        });
    })