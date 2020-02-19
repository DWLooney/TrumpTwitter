import fetch from 'isomorphic-unfetch'
import React from 'react';
import Link from "next/link";
import Layout from "../components/myLayout";

HomePage.getInitialProps = async ({ req, query }) => {
    const pageRequest = `${"http:"}//${"localhost:3000"}/api/candidates?limit=10`
    const res = await fetch(pageRequest)
    const json = await res.json()
    return json
};


const CLink = props => (
    <>
    <Link href={`/candidate?title=${props.candidate}&id=${props.id}`}>
        <a>{props.candidate}</a>

    </Link>
        <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
        </>
);

function HomePage(ctx) {
    console.log(ctx)
    return (
        <>
            <Layout>
            <h1> Political Tweeter Prototype V1! </h1>
            <h2> Candidates </h2>
            {ctx.tweets.map(post => (
                <li key={post.candidate_id}>
                    <CLink candidate = {post.candidate_name} id = {post.candidate_id} />
                </li>
                ))}
            </Layout>
        </>
    )
}

export default HomePage