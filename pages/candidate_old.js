import fetch from 'isomorphic-unfetch'
import React from "react";
import Layout from "../components/myLayout";
import Link from "next/link";
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from 'react-table'

Candidate.getInitialProps = async ({ req, query }) => {
    const pageRequest = `${"http:"}//${"localhost:3000"}/api/tweets?id=${query.id}`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    console.log(json);
    return {name: query.title, data: json}
};


function Candidate(ctx) {
    return (
        <>
        <Layout>
        <h1> Political Tweet Archive </h1>
        <h2><img src={`/static/images/${ctx.name}.png`} style={{width : 100, height: 100}}/>Tweets from {ctx.name}</h2>
            <Table>
                <tr style = {TStyle}>
                    <th>ID</th>
                    <th>Term</th>
                    <th>Hashtag</th>
                    <th>Tweet Date</th>
                </tr>
                {ctx.data.candidates_info.map(post => (
                    <tr key={post.twitter_post_id} index = {post.index} style = {TStyle}>
                        <td style = {TStyle}>{post.twitter_post_id}</td>
                        <td>{post.primary_term}</td>
                        <td>{post.hashtag}</td>
                        <td>{post.tweet_date}</td>
                    </tr>
                ))}
            </Table>
        </Layout>
        </>
    );
}

const TStyle = {fontFamily: 'Arial', border: '1px solid #000'};

export default Candidate