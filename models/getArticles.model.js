const db = require('../db/connection')

function getAllArticles() {
    const queryString = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.author, articles.title, articles.article_id
    ORDER BY articles.created_at DESC;
    `
    return db.query(queryString)
    .then((articles) => {
        return articles.rows
    })
}

module.exports = getAllArticles