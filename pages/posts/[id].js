import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article>
        </Layout>
    );
}

export function getStaticPaths() {
    // Ritorna una lista di possibili valori per id
    const paths = getAllPostsIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch i dati necessari dei Posts usando param.id
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}