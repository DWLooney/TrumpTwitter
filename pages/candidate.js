import fetch from 'isomorphic-unfetch'
import React from "react";
import Divider from '@material-ui/core/Divider';
import Layout from "../components/myLayout";

Candidate.getInitialProps = async ({ req, query }) => {
    const pageRequest = `${"http:"}//${"localhost:3000"}/api/tweets?id=${query.id}`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    console.log(json);
    return {name: query.title, data: json}
};


export default function Candidate(ctx) {
    return (
        <>
        <Layout>
        <h1> Political Tweeter Prototype V1! </h1>
        <h2> Tweets from {ctx.name}  </h2>
            {ctx.data.candidates_info.map(post => (
                <li key={post.twitter_post_id}>
                    <a> ID: {post.twitter_post_id}</a>
                    <p>Primary term: {post.primary_term}</p>
                    <p>Hashtag: {post.hashtag}</p>
                    <p>Date: {post.tweet_date}</p>
                    <Divider/>
                </li>
    ))}
        </Layout>
        </>
    );
}
