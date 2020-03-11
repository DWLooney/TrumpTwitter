import fetch from 'isomorphic-unfetch'
import React from 'react';
import Link from "next/link";
import Layout from "../components/myLayout";

HomePage.getInitialProps = async ({ req, query }) => {
    const protocol = req
        ? `${req.headers['x-forwarded-proto']}:`
        : location.protocol;
    const host = req ? req.headers['x-forwarded-host'] : location.host;
    const pageRequest = `${protocol}//${host}/api/candidates?`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    return json
};


function HomePage(ctx) {
    return (
        <>
            <Layout>
                <h1 style = {{background: '#DDD', marginTop: '55px', textAlign: 'center', }}> <img src="/static/images/logo.png" alt="Trump Logo" style={{width : 50, height: 50}} /> Political Tweet Archive </h1>
                <h2 style = {{textAlign: 'center'}}> Candidates </h2>
                <div style = {{margin: 'auto', width: '75%'}}>
                    {ctx.tweets.map(candidate => (
                        <CLink candidate = {candidate.candidate_name} id = {candidate.twitter_id} page = 'candidate'/>
                    ))}
                    <CLink candidate = {'All Candidates'} id = {0} page = 'allcandidates'/>
                </div>

            </Layout>
        </>
    )
}
const CLink = props => (
    <Link href={`${props.page}?title=${props.candidate}&id=${props.id}&keyword=None`}>
        <div key={props.id} style ={{padding:20, margin: '5px', backgroundColor:'#e3667f', float: 'left', border: '1px solid #000', cursor: 'pointer'}} >
            <img src={`/static/images/${props.candidate}.png`} style={{width : 200, height: 200}}/>
            <h4>
                <a style = {{marginLeft: '25px'}}>{props.candidate}</a>
            </h4>

            <style jsx>{`
            h4,
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
        </div>
    </Link>
);

export default HomePage