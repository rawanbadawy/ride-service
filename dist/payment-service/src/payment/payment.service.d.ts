import Stripe from 'stripe';
export declare class PaymentService {
    private stripe;
    constructor();
    createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent>;
    confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string): Promise<Stripe.PaymentIntent>;
}
