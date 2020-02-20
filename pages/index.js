import fetch from 'isomorphic-unfetch'
import React from 'react';
import Link from "next/link";
import Layout from "../components/myLayout";
import Head from "next/head";

HomePage.getInitialProps = async ({ req, query }) => {
    const pageRequest = `${"http:"}//${"localhost:3000"}/api/candidates?limit=10`
    const res = await fetch(pageRequest)
    const json = await res.json()
    return json
};


function HomePage(ctx) {
    return (
        <>
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            <Layout>
            <h1> <img src="/static/images/logo.png" alt="Trump Logo" style={{width : 50, height: 50}} /> Political Tweet Archive </h1>
                <h2> Candidates </h2>
            {ctx.tweets.map(post => (
                <div key={post.candidate_id} style ={{padding:20, backgroundColor:'#decddd', float: 'left', border: '1px solid #000'}} >
                    <img src={`/static/images/${post.candidate_name}.png`} style={{width : 100, height: 100}}/>
                    <h4>
                        <CLink candidate = {post.candidate_name} id = {post.candidate_id} />
                    </h4>
               </div>
                ))}
            </Layout>
        </>
    )
}
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

export default HomePage