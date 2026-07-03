import { Blocks } from 'react-loader-spinner'

export function Loader() {
    return (<section className="loader">
        <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
    />
        <p>Loading...</p>
    </section>)
}