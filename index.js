import { Router } from 'itty-router'
import { createShortUrl } from './src/handlers/createShortUrl'
import { redirectShortUrl } from './src/handlers/redirectShortUrl'

const router = Router()

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
    return new Response('Hello, world! Welcome to Cloudflare URL Shortener.')
})

/*
Redirects short URL to its original URL.
*/
router.get('/:text', redirectShortUrl)

/*
Creates a short URL that is associated with its an original URL.
*/
router.post('/url', createShortUrl)

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('Not Found', { status: 404 }))

/*
This snippet ties our worker to the router we defined above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
    e.respondWith(router.handle(e.request))
})
