import React, { Fragment, useEffect, useState } from 'react';
// import './style.scss'
// import { strapiFreshFast, strapiFreshFastImage, strapiFreshFastClient } from 'utils/utils';
// import NewsRelated from '../../../components/NewsRelated';
// import CarouselItem from 'components/Common/CarouselItem';
// import imageSetup from './../../../helpers/loadImageStrapi';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// export async function getServerSideProps(context) {
//     const [resJob] = await Promise.all([
//         fetch(`${strapiFreshFast}/trang-dai-ly-ctv`),
//     ])
//     const [job] = await Promise.all([
//         resJob.json(),
//     ])
//     return {
//         props: {
//             job,
//         }
//     };
// }

function Introduction(props) {
    // const [item, setItem] = useState(props.job);
    return (
        <>
            <main className="main_page">
                <section className="list_news_page customer">
                    <div className="container">
                        <div className="row">
                            <p> Đây là trang Giới thiệu </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
    // return <div></div>
}

export default Introduction;