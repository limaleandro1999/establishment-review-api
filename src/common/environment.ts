export const environment = {
    db: {url: process.env.DB_URL || 'mongodb://localhost/establishment-review-api'},
    server: {port: process.env.PORT || 3000}
}