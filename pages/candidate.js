import fetch from 'isomorphic-unfetch'
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/myLayout";
import styled from 'styled-components';
import {
    useTable,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
} from 'react-table'


async function fetchData ({req, query})  {
    const pageRequest = `${"http:"}//${"localhost:3000"}/api/tweets?id=${query.id}&keyword=${query.keyword}`;
    const res = await fetch(pageRequest);
    const json = await res.json();
    return {name: query.title, data: json, id: query.id}
}
const TableStyles = styled.div`
  padding: 1rem;
  table {
    font-family: arial, sans-serif;
    font-size: large;
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr:nth-child(even) {
        background: #dddddd;
      }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function getTweets(myData) {

    let data = [];
    {myData.candidates_info.map(post => (
        data.push(
            {
                ID: post.twitter_post_id,
                Keyword: post.keyword,
                TweetDate: post.tweet_date,
                Content: post.tweet_string,
            }
    )))}
    return data;
}
function Table({columns, data}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

function Candidate(ctx) {
    const [
        myData,
        setData
    ] = useState(ctx.data);

    async function refresh(query) {
        const refreshedProps = await fetchData(query);
        setData(refreshedProps.data);
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Post ID',
                accessor: 'ID',
            },
            {
                Header: 'Keyword',
                accessor: 'Keyword',
            },
            {
                Header: 'Tweet Date',
                accessor: 'TweetDate'
            },
            {
                Header: 'Post Content',
                accessor: 'Content'
            },
        ],
        []
    );
    const router = useRouter();
    const [value, setName] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        const req = {pathname: '/candidate', query: {title: ctx.name, id: ctx.id, keyword: value}};
        router.replace(req);
        refresh({query: req.query}).then(r => console.log('Refreshed Data!'));
    };
    const data = getTweets(myData);
    return (
        <Layout>

                <h2 style = {{textAlign: 'left', margin: 'auto'}}>
                    <img src={`/static/images/${ctx.name}.png`} style={{width : 150, height: 150, padding: '10px', margin: 'auto', marginTop: '100px', float: 'center'}} />
                    Tweets from {ctx.name}
                </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Search for a Keyword:
                    <input type="text" onChange = {e => setName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <TableStyles>
                <Table columns = {columns} data = {data} />
            </TableStyles>
        </Layout>

)}
Candidate.getInitialProps = fetchData;
export default Candidate;