// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect("/");
        
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .get('/users/:id/edit', async (req, reply) => {
      if (!req.user) {
        req.flash('error', i18next.t('flash.edit.accessDenied'))
        reply.redirect('/users');
        return reply;
      }

      if (Number(req.user.id) !== Number(req.params.id)) {
        req.flash('error', i18next.t('flash.edit.accessDenied'));
        reply.redirect('/users');
        return reply;
      } 

      const user = await app.objection.models.user.query().select('firstname', 'lastname', 'email').findById(req.params.id);
      const path = `/users/${req.params.id}`;
      reply.render('/users/profile', {user, path});
      return reply;

    })
    .patch('/users/:id', async (req, reply) => {
      const user = new app.objection.models.user();
      const id = req.params.id;
      user.$set({ id, ...req.body.data });

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        const currentUser = await app.objection.models.user.query().findById(id);
        await currentUser.$query().update(validUser);
        req.flash('info', i18next.t('flash.edit.success'));
        reply.redirect('/users');
        return reply;

      } catch(err) {
        req.flash('error', i18next.t('flash.edit.error'));
        reply.render('users/profile', { user, errors: err.data });
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => {
      const id = req.params.id;
      const user = new app.objection.models.user();
      user.$set({ id, ...req.body.data });
      try {
        await app.objection.models.user.query().deleteById(id);
        await req.logOut();
        req.flash('info', i18next.t('flash.edit.delete.success'));
        reply.redirect('/users');

      } catch(err) {
        req.flash('error', i18next.t('flash.edit.delete.error'));
        reply.render('users/profile', {user, errors: err.data});
      }

      return reply;
    });
};
