import { Router } from 'express';

const subscriptionRouter =  Router();

subscriptionRouter.get('/', (req, res) => res.send ({ title: 'GET all subscriptions' }));

subscriptionRouter.get('/:id', (req, res) => res.send ({ title: 'GET subscription details by id' }));

subscriptionRouter.post('/', (req, res) => res.send ({ title: 'CREATE a subscription' }));

subscriptionRouter.put('/:id', (req, res) => res.send ({ title: 'UPDATE a subscription' }));

subscriptionRouter.delete('/:id', (req, res) => res.send ({ title: 'DELETE a subscription' }));

subscriptionRouter.get('/user/:id', (req, res) => res.send ({ title: 'GET all subscriptions for a specific user' }));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send ({ title: 'CANCEL a subscriptions' }));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send ({ title: 'GET upcoming subscription renewals' }));

export default subscriptionRouter;