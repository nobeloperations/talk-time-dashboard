import * as Handlebars from 'handlebars'
import * as exphbs from 'express-handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { helpers } from './hbs-helpers/helpers'
import { resolve } from 'path';

export function hbsConfig(app) {
    let hbs = exphbs.create({
        extname: 'hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: 'mainLayout',
        layoutsDir: resolve('./views/layouts'),
        helpers,
        partialsDir: resolve('./views/partials')
      })
      app.set('views', resolve('./views'))
      app.useStaticAssets(resolve('./public'))
      app.useStaticAssets(resolve('./uploads'))
    
      app.engine('hbs', hbs.engine)
      app.set('view engine', 'hbs')
    
}