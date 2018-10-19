export const environment = {
    db: {url: process.env.DB_URL || 'mongodb://localhost/establishment-review-api'},
    server: {port: process.env.SERVER_PORT || 3000}
}