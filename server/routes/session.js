// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/session/new', (req, reply) => {
      const signInForm = {};
      reply.render('session/new', { signInForm });
    })
    .post('/session', app.fp.authenticate('form', async (req, reply, err, user) => {
      if (err) {
        return app.httpErrors.internalServerError(err);
      }
      if (!user) { // errors nearly here
        const signInForm = req.body.data;
        const errors = {
          email: [{ message: i18next.t('flash.session.create.error') }],
        };
        reply.render('session/new', { signInForm, errors });
        return reply;
      }
      await req.logIn(user);
      req.flash('success', i18next.t('flash.session.create.success'));
      return reply.redirect('/');
    }))
    .delete('/session', (req, reply) => {
      req.logOut();
      req.flash('info', i18next.t('flash.session.delete.success'));
      reply.redirect('/');
    });
};
