
# Strapi Provider Upload R2

A Strapi plugin for uploading files to Cloudflare R2.


## Installation

```bash
npm i @bg-dev/strapi-provider-upload-r2
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`R2_ACCOUNT_ID`

`R2_ACCESS_KEY_ID`

`R2_SECRET_ACCESS_KEY`

`R2_BUCKET`

`R2_PUBLIC_URL`


## Setup

### config/plugins

```javascript
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "@bg-dev/strapi-provider-upload-r2",
      providerOptions: {
        accessKeyId: env("R2_ACCESS_KEY_ID"),
        secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
        bucket: env("R2_BUCKET"),
        accountId: env("R2_ACCOUNT_ID"),
        publicUrl: env("R2_PUBLIC_URL"),
      },
    },
  },
  // ...
})
```

### config/middlewares
```javascript
 // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            env("R2_PUBLIC_URL").replace(/^https?:\/\//, ""),
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
            env("R2_PUBLIC_URL").replace(/^https?:\/\//, ""),
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
```



## Appendix

Allow public access to the Bucket:

https://developers.cloudflare.com/r2/data-access/public-buckets/#enable-managed-public-access-for-your-bucket
