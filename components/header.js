import Link from 'next/link';
import Head from 'next/head'

const linkStyle = {
    marginRight: 15
};

const Header = () => (
    <div>
        <Head>
            <title>Political Tweet Database</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </div>
);

export default Header;